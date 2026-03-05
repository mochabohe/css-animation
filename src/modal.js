import { normalizeCssVariables, copyToClipboard, extractLightModeRulesForClasses } from "./utils.js";
import { explainAnimation, convertToFramework } from "./ai.js";
import animationsCss from "./css/animations.css?raw";

// 轻量 Markdown 解析器（仅支持标题、加粗、代码块、列表）
function parseSimpleMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, '<h4 class="ai-md-h4">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="ai-md-h3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, '<code class="ai-md-code">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ai-md-li">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul class="ai-md-ul">${m}</ul>`)
    .replace(/\n{2,}/g, "<br><br>")
    .replace(/\n/g, "<br>");
}

const easingDescriptions = new Map([
  ["linear", "匀速：从开始到结束速度恒定。"],
  ["ease", "默认缓动：两端慢，中间快。"],
  ["ease-in", "加速：开始慢，后段加速。"],
  ["ease-out", "减速：开始快，后段减速。"],
  ["ease-in-out", "慢入慢出：起步慢，中段快，收尾慢。"],
  ["step-start", "阶梯跳变：开始立即切换到下一段，随后保持。"],
  ["step-end", "阶梯跳变：前段保持，最后瞬间跳到结束。"],
  ["cubic-bezier(0.42, 0, 0.58, 1)", "对称缓入缓出（≈ ease-in-out），节奏更平滑。"],
  ["cubic-bezier(0.68, -0.55, 0.27, 1.55)", "强回弹：末端超调后回落，弹性明显。"],
  ["cubic-bezier(0.175, 0.885, 0.32, 1.275)", "轻回弹：末端略超调后回落。"],
]);

function getEasingDescription(value) {
  if (!value) return "";
  const direct = easingDescriptions.get(value);
  if (direct) return direct;

  const stepsMatch = value.match(/^steps\((\d+),\s*(start|end)\)$/);
  if (stepsMatch) {
    const count = Number.parseInt(stepsMatch[1], 10);
    const edge = stepsMatch[2] === "start" ? "开始即跳" : "末端跳";
    return `${count} 段阶梯跳变（${edge}）。`;
  }

  if (value.startsWith("cubic-bezier(")) {
    return "自定义贝塞尔：可塑造回弹、超调等节奏。";
  }

  if (value.startsWith("steps(")) {
    return "阶梯跳变：按段数分步切换（分段越多越细）。";
  }

  return "";
}

const PREVIEW_SCALE_MIN = 0.5;
const PREVIEW_SCALE_MAX = 1.8;
const PREVIEW_SCALE_STEP = 0.05;
const PREVIEW_SCALE_DEFAULT = 1;
const PREVIEW_SCALE_BLOCK_START = "/* CodeLab Preview Scale:start */";
const PREVIEW_SCALE_BLOCK_END = "/* CodeLab Preview Scale:end */";

function clampPreviewScale(value) {
  return Math.min(PREVIEW_SCALE_MAX, Math.max(PREVIEW_SCALE_MIN, value));
}

function stripPreviewScaleBlock(cssText) {
  const pattern = /\/\* CodeLab Preview Scale:start \*\/[\s\S]*?\/\* CodeLab Preview Scale:end \*\/\s*/g;
  return String(cssText).replace(pattern, "").trimEnd();
}

function appendPreviewScaleBlock(cssText, scale) {
  const clampedScale = clampPreviewScale(scale);
  const normalizedScale = Number(clampedScale.toFixed(2));
  const baseCss = stripPreviewScaleBlock(cssText);
  const block = `${PREVIEW_SCALE_BLOCK_START}
.code-lab-preview-scale {
  transform: scale(${normalizedScale});
  transform-origin: center center;
}
${PREVIEW_SCALE_BLOCK_END}`;
  return `${block}\n\n${baseCss}\n`;
}

function updateEasingHelpForSelect(select) {
  const wrapper = select?.closest(".param-select-wrapper");
  const help = wrapper?.querySelector(".param-help");
  if (!help) return;
  const desc = getEasingDescription(select.value);
  if (desc) {
    help.textContent = desc;
    help.hidden = false;
  } else {
    help.textContent = "";
    help.hidden = true;
  }
}

function markButtonState(button, text, originalText) {
  button.textContent = text;
  button.classList.add("is-copied");
  setTimeout(() => {
    button.classList.remove("is-copied");
    button.textContent = originalText;
  }, 1200);
}

// duration 匹配模式：支持简单值 (1.4s) 和带嵌套括号的 calc(...) 表达式
const DURATION_RE = "(?:\\d+\\.?\\d*s|calc\\((?:[^()]+|\\([^()]*\\))+\\))";
// duration 和 timing 之间可能插有 infinite / both / 数字等 iteration-count 关键字
const MID_GAP_RE = "\\s+(?:(?:infinite|both|forwards|backwards|\\d+)\\s+)?";

// 从 duration 字符串中提取数值（如 "1.4s" → 1.4, "calc(1.4s / 1)" → 1.4）
function parseDurationValue(raw) {
  const m = raw.match(/(\d+\.?\d*)\s*s/);
  return m ? Number.parseFloat(m[1]) : Number.NaN;
}

// 从标准化后的 CSS 中提取动画实际的 duration 和 timing 初始值
function extractActualValues(normalizedCss, currentParams) {
  const actual = {};
  const targets = new Set(Object.values(currentParams).map((c) => c.target));
  const timingPattern =
    "ease-in-out|ease-in|ease-out|ease|linear|step-start|step-end" +
    "|cubic-bezier\\([^)]+\\)|steps\\([^)]+\\)";

  for (const target of targets) {
    const re = new RegExp(
      `${target}\\s+(${DURATION_RE})(${MID_GAP_RE})(${timingPattern})`,
    );
    const m = normalizedCss.match(re);
    if (m) {
      actual[target] = { duration: parseDurationValue(m[1]), timing: m[3] };
    }
  }

  for (const [key, config] of Object.entries(currentParams)) {
    const a = actual[config.target];
    if (!a) continue;
    if (config.type === "range" && a.duration) actual[key] = a.duration;
    if (config.type === "select" && a.timing) actual[key] = a.timing;
  }
  return actual;
}

function buildParamPanel(currentParams, paramValues, onParamChange, normalizedCss, previewScaleOptions = null) {
  if (!currentParams && !previewScaleOptions) return null;

  const paramsPanel = document.createElement("div");
  paramsPanel.className = "modal-params-panel";

  const paramsLabel = document.createElement("div");
  paramsLabel.className = "modal-editor-label";
  paramsLabel.textContent = "⚙️ 参数调整";

  const paramsContainer = document.createElement("div");
  paramsContainer.className = "params-container";
  const currentParamsSafe = currentParams || {};

  let setPreviewScale = null;
  if (previewScaleOptions) {
    const scaleRow = document.createElement("div");
    scaleRow.className = "param-row";

    const scaleLabel = document.createElement("label");
    scaleLabel.className = "param-label";
    scaleLabel.textContent = "整体大小";

    const rangeWrapper = document.createElement("div");
    rangeWrapper.className = "param-range-wrapper";

    const input = document.createElement("input");
    input.type = "range";
    input.className = "param-range";
    input.min = String(Math.round(PREVIEW_SCALE_MIN * 100));
    input.max = String(Math.round(PREVIEW_SCALE_MAX * 100));
    input.step = String(Math.round(PREVIEW_SCALE_STEP * 100));

    const valueDisplay = document.createElement("span");
    valueDisplay.className = "param-value";

    setPreviewScale = (scale) => {
      const clamped = clampPreviewScale(scale);
      const percent = Math.round(clamped * 100);
      input.value = String(percent);
      valueDisplay.textContent = `${percent}%`;
      previewScaleOptions.onChange(clamped);
    };

    input.addEventListener("input", (event) => {
      const percent = Number.parseFloat(event.target.value);
      const scale = Number.isFinite(percent) ? percent / 100 : PREVIEW_SCALE_DEFAULT;
      setPreviewScale(scale);
    });

    setPreviewScale(previewScaleOptions.initialScale ?? PREVIEW_SCALE_DEFAULT);
    rangeWrapper.append(input, valueDisplay);
    scaleRow.append(scaleLabel, rangeWrapper);
    paramsContainer.append(scaleRow);
  }

  // 从 CSS 实际值提取初始参数（解决 data.js default 与 CSS 变量值不一致问题）
  const actualValues = normalizedCss && currentParams ? extractActualValues(normalizedCss, currentParams) : {};

  Object.entries(currentParamsSafe).forEach(([key, config]) => {
    const paramRow = document.createElement("div");
    paramRow.className = "param-row";

    const paramLabel = document.createElement("label");
    paramLabel.className = "param-label";
    paramLabel.textContent = config.label;

    // 优先使用 CSS 中的实际值，回退到 config.default
    const initialValue = (key in actualValues) ? actualValues[key] : config.default;
    paramValues[key] = initialValue;

    if (config.type === "range") {
      const rangeWrapper = document.createElement("div");
      rangeWrapper.className = "param-range-wrapper";

      const input = document.createElement("input");
      input.type = "range";
      input.className = "param-range";
      input.min = config.min;
      input.max = config.max;
      input.step = config.step;
      input.value = initialValue;

      const valueDisplay = document.createElement("span");
      valueDisplay.className = "param-value";
      valueDisplay.textContent = `${initialValue}${config.unit}`;

      input.addEventListener("input", (event) => {
        const value = Number.parseFloat(event.target.value);
        paramValues[key] = value;
        valueDisplay.textContent = `${value}${config.unit}`;
        onParamChange();
      });

      rangeWrapper.append(input, valueDisplay);
      paramRow.append(paramLabel, rangeWrapper);
    }

    if (config.type === "select") {
      const selectWrapper = document.createElement("div");
      selectWrapper.className = "param-select-wrapper";

      const select = document.createElement("select");
      select.className = "param-select";

      config.options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent =
          option === "cubic-bezier(0.68, -0.55, 0.27, 1.55)" ? "bounce" : option;
        if (option === initialValue) {
          optionElement.selected = true;
        }
        select.append(optionElement);
      });

      const shouldShowEasingHelp = key === "timing" || /缓动/.test(config.label);
      if (shouldShowEasingHelp) {
        const helpText = document.createElement("div");
        helpText.className = "param-help";
        selectWrapper.append(helpText);
        paramRow.classList.add("param-row--stacked");
      }

      selectWrapper.prepend(select);

      select.addEventListener("change", (event) => {
        paramValues[key] = event.target.value;
        updateEasingHelpForSelect(select);
        onParamChange();
      });

      if (shouldShowEasingHelp) {
        updateEasingHelpForSelect(select);
      }

      paramRow.append(paramLabel, selectWrapper);
    }

    paramsContainer.append(paramRow);
  });

  paramsPanel.append(paramsLabel, paramsContainer);
  paramsPanel.__setPreviewScale = setPreviewScale;
  return paramsPanel;
}

export function createCodeModal({
  title,
  demoHtml,
  fullCss,
  currentParams,
  previousActiveElement,
  onTrackCopy,
  onAiTransform,
  onSave,
}) {
  const modal = document.createElement("div");
  modal.className = "code-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("tabindex", "-1");

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("h3");
  modalTitle.className = "modal-title";
  modalTitle.id = `modal-title-${Date.now()}`;
  modalTitle.textContent = `${title} - 代码实验室`;
  modal.setAttribute("aria-labelledby", modalTitle.id);

  const modalActions = document.createElement("div");
  modalActions.className = "modal-actions";

  const copyHtmlBtn = document.createElement("button");
  copyHtmlBtn.className = "modal-btn";
  copyHtmlBtn.type = "button";
  copyHtmlBtn.textContent = "复制HTML";

  const copyCssBtn = document.createElement("button");
  copyCssBtn.className = "modal-btn";
  copyCssBtn.type = "button";
  copyCssBtn.textContent = "复制CSS";

  const copyBtn = document.createElement("button");
  copyBtn.className = "modal-btn";
  copyBtn.type = "button";
  copyBtn.textContent = "复制HTML+CSS代码";

  const shareBtn = document.createElement("button");
  shareBtn.className = "modal-btn";
  shareBtn.type = "button";
  shareBtn.textContent = "分享链接";

  const resetBtn = document.createElement("button");
  resetBtn.className = "modal-btn";
  resetBtn.type = "button";
  resetBtn.textContent = "重置";

  const closeModalBtn = document.createElement("button");
  closeModalBtn.className = "modal-btn modal-close";
  closeModalBtn.type = "button";
  closeModalBtn.textContent = "✕ 关闭";

  // AI 解读按钮
  const explainBtn = document.createElement("button");
  explainBtn.className = "modal-btn ai-explain-btn";
  explainBtn.type = "button";
  explainBtn.textContent = "AI 解读";

  // 导出按钮（下拉）
  const exportWrap = document.createElement("div");
  exportWrap.className = "ai-export-wrap";

  const exportBtn = document.createElement("button");
  exportBtn.className = "modal-btn ai-export-btn";
  exportBtn.type = "button";
  exportBtn.textContent = "导出为…";

  const exportMenu = document.createElement("div");
  exportMenu.className = "ai-export-menu";
  exportMenu.hidden = true;

  const frameworks = [
    { key: "react", label: "React JSX" },
    { key: "vue", label: "Vue SFC" },
    { key: "tailwind", label: "Tailwind CSS" },
  ];

  frameworks.forEach(({ key, label }) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "ai-export-menu-item";
    item.textContent = label;
    item.dataset.framework = key;
    exportMenu.append(item);
  });

  exportWrap.append(exportBtn, exportMenu);

  if (onSave) {
    const saveBtn = document.createElement("button");
    saveBtn.className = "modal-btn ai-save-btn";
    saveBtn.type = "button";
    saveBtn.textContent = "💾 保存";
    saveBtn.addEventListener("click", () => {
      onSave(title, htmlTextarea.value, cssTextarea.value);
      markButtonState(saveBtn, "✓ 已保存", "💾 保存");
    });
    modalActions.append(copyHtmlBtn, copyCssBtn, copyBtn, shareBtn, resetBtn, explainBtn, exportWrap, saveBtn, closeModalBtn);
  } else {
    modalActions.append(copyHtmlBtn, copyCssBtn, copyBtn, shareBtn, resetBtn, explainBtn, exportWrap, closeModalBtn);
  }
  modalHeader.append(modalTitle, modalActions);

  const editorContainer = document.createElement("div");
  editorContainer.className = "modal-editor-container";

  const htmlPanel = document.createElement("div");
  htmlPanel.className = "modal-code-panel";

  const htmlLabel = document.createElement("div");
  htmlLabel.className = "modal-editor-label";
  htmlLabel.textContent = "📄 HTML 结构";

  const htmlTextarea = document.createElement("textarea");
  htmlTextarea.className = "modal-code-editor html-editor";
  htmlTextarea.value = demoHtml;
  htmlTextarea.spellcheck = false;

  htmlPanel.append(htmlLabel, htmlTextarea);

  const cssPanel = document.createElement("div");
  cssPanel.className = "modal-code-panel css-panel";

  const cssLabel = document.createElement("div");
  cssLabel.className = "modal-editor-label";
  cssLabel.textContent = "🎨 CSS 样式";

  // 构建 CSS 编辑区内容：亮色模式下自动追加对应的亮色覆盖规则
  const buildInitialCss = () => {
    const base = normalizeCssVariables(fullCss);
    const colorMode = document.documentElement.getAttribute("data-color-mode") || "dark";
    if (colorMode !== "light") return base;
    // 提取当前动画片段里所有类名
    const classNames = [...new Set([...base.matchAll(/\.([a-zA-Z][a-zA-Z0-9-_]*)\b/g)].map((m) => m[1]))];
    const lightRules = extractLightModeRulesForClasses(animationsCss, classNames);
    return lightRules ? `${base}\n\n/* 亮色模式补充样式 (已剥离限制，即插即用) */\n${normalizeCssVariables(lightRules)}` : base;
  };

  const cssTextarea = document.createElement("textarea");
  cssTextarea.className = "modal-code-editor css-editor";
  cssTextarea.value = buildInitialCss();
  cssTextarea.spellcheck = false;

  cssPanel.append(cssLabel, cssTextarea);

  const previewPanel = document.createElement("div");
  previewPanel.className = "modal-preview-panel";

  const previewLabel = document.createElement("div");
  previewLabel.className = "modal-editor-label";
  previewLabel.textContent = "👁️ 实时预览";

  const previewBox = document.createElement("div");
  previewBox.className = "modal-preview-box";
  const shadowRoot = previewBox.attachShadow({ mode: "open" });

  // 注入完整 animations.css（包含亮色模式覆盖规则），确保主题正确
  const animationsStyle = document.createElement("style");
  animationsStyle.textContent = animationsCss;

  const styleTag = document.createElement("style");
  styleTag.textContent = cssTextarea.value;

  const shadowContainer = document.createElement("div");
  shadowContainer.style.cssText =
    "display:flex;align-items:center;justify-content:center;width:100%;height:100%;";
  const previewScaleLayer = document.createElement("div");
  previewScaleLayer.className = "code-lab-preview-scale";
  previewScaleLayer.style.cssText =
    "display:flex;align-items:center;justify-content:center;width:100%;height:100%;";
  const previewDemoHost = document.createElement("div");
  previewDemoHost.style.cssText =
    "display:flex;align-items:center;justify-content:center;width:100%;height:100%;";
  previewDemoHost.innerHTML = demoHtml;
  previewScaleLayer.append(previewDemoHost);
  shadowContainer.append(previewScaleLayer);
  shadowContainer.setAttribute(
    "data-color-mode",
    document.documentElement.getAttribute("data-color-mode") || "dark",
  );

  // 监听主题切换，同步更新 Shadow DOM 内容器的 data-color-mode
  const colorModeObserver = new MutationObserver(() => {
    const mode = document.documentElement.getAttribute("data-color-mode") || "dark";
    shadowContainer.setAttribute("data-color-mode", mode);
  });
  colorModeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-color-mode"],
  });

  // 安全网：确保 AI 生成的 .demo-wrap 始终有正确的定位基准
  const demoWrapGuard = document.createElement("style");
  demoWrapGuard.textContent = ".demo-wrap{position:relative !important;min-height:180px;}";

  shadowRoot.append(animationsStyle, demoWrapGuard, styleTag, shadowContainer);
  previewPanel.append(previewLabel, previewBox);

  let previewScale = PREVIEW_SCALE_DEFAULT;
  const syncPreviewScaleToCss = () => {
    const scaledCss = appendPreviewScaleBlock(cssTextarea.value, previewScale);
    cssTextarea.value = scaledCss;
    styleTag.textContent = scaledCss;
  };

  const applyPreviewScale = (scale) => {
    previewScale = clampPreviewScale(scale);
    syncPreviewScaleToCss();
  };

  const paramValues = {};
  const updatePreview = () => {
    previewDemoHost.innerHTML = htmlTextarea.value;
    styleTag.textContent = cssTextarea.value;
  };

  /**
   * 参数变更时：修改 CSS 文本 + 强制重启动画。
   * 直接替换 styleTag 中的硬编码值（适用于所有动画），
   * 再通过 animation:none → reflow → 恢复 的方式强制浏览器重启动画。
   */
  const updatePreviewWithParams = () => {
    if (!currentParams) return;

    // 1. 通过正则替换更新 CSS 文本（styleTag + cssTextarea）
    exportParamsToCssEditor();

    // 2. 强制重启 Shadow DOM 中所有 CSS 动画
    const animated = previewDemoHost.querySelectorAll("*");
    animated.forEach((el) => { el.style.animation = "none"; });
    // 触发 reflow，让浏览器识别动画已清除
    void previewDemoHost.offsetHeight;
    animated.forEach((el) => { el.style.animation = ""; });
  };

  // AI 改造后更新此基准，使意图按钮基于改造后的 CSS 而非原始 CSS
  let baseCss = fullCss;

  /**
   * 将当前参数导出到 CSS 编辑器和 styleTag。
   * 按 target 分组，对每组进行正则替换 duration / timing。
   */
  const exportParamsToCssEditor = () => {
    if (!currentParams) return;
    let updatedCss = normalizeCssVariables(baseCss);

    // 按 target 分组参数（同一 target 的 duration 和 timing 一起替换）
    const byTarget = {};
    for (const [key, config] of Object.entries(currentParams)) {
      const t = config.target;
      if (!byTarget[t]) byTarget[t] = { dur: null, tim: null };
      if (config.type === "range" && !byTarget[t].dur) {
        byTarget[t].dur = { key, config };
      }
      if (config.type === "select" && !byTarget[t].tim) {
        byTarget[t].tim = { key, config };
      }
    }

    const timingPattern =
      "ease-in-out|ease-in|ease-out|ease|linear|step-start|step-end" +
      "|cubic-bezier\\([^)]+\\)" +
      "|steps\\([^)]+\\)";

    for (const [target, { dur, tim }] of Object.entries(byTarget)) {
      if (!dur && !tim) continue;

      // 匹配 animation/transition 简写：name/prop duration timing ...
      // duration 支持简单值 (1.4s) 和 calc(...) 表达式
      const animRegex = new RegExp(
        `(${target}\\s+)` +
        `(${DURATION_RE})` +
        `(${MID_GAP_RE})` +
        `(${timingPattern})`,
        "g",
      );

      let matched = false;
      updatedCss = updatedCss.replace(animRegex, (_match, name, _dur, mid, _timing) => {
        matched = true;
        let newDur = _dur;
        if (dur) {
          const decimals = (String(dur.config.step).split(".")[1] || "").length;
          newDur = `${Number(paramValues[dur.key]).toFixed(decimals)}${dur.config.unit}`;
        }
        const newTiming = tim ? paramValues[tim.key] : _timing;
        return `${name}${newDur}${mid}${newTiming}`;
      });

      // 回退：animation 简写中无 duration 时，按比例缩放独立的 animation-duration 声明
      if (!matched && dur) {
        const scale = paramValues[dur.key] / dur.config.default;
        const decimals = Math.max((String(dur.config.step).split(".")[1] || "").length, 1);
        updatedCss = updatedCss.replace(
          /animation-duration:\s*(\d+\.?\d*)s/g,
          (_m, orig) => `animation-duration: ${(Number.parseFloat(orig) * scale).toFixed(decimals)}s`,
        );
      }
    }

    const scaledCss = appendPreviewScaleBlock(updatedCss, previewScale);
    cssTextarea.value = scaledCss;
    styleTag.textContent = scaledCss;
  };

  const initialNormalizedCss = normalizeCssVariables(fullCss);
  const paramsPanel = buildParamPanel(
    currentParams,
    paramValues,
    updatePreviewWithParams,
    initialNormalizedCss,
    { initialScale: previewScale, onChange: applyPreviewScale },
  );

  const leftColumn = document.createElement("div");
  leftColumn.className = "modal-left-column";
  if (paramsPanel) {
    leftColumn.append(previewPanel, paramsPanel, htmlPanel);
  } else {
    leftColumn.append(previewPanel, htmlPanel);
  }

  editorContainer.append(leftColumn, cssPanel);

  if (onAiTransform) {
    const aiBar = document.createElement("div");
    aiBar.className = "ai-bar";

    // 改造历史记录
    const aiHistory = document.createElement("div");
    aiHistory.className = "ai-bar-history";

    const aiInput = document.createElement("input");
    aiInput.type = "text";
    aiInput.className = "ai-input";
    aiInput.placeholder = "描述改造方向，如：改成暗夜紫色系、让动画更快更有弹性…";
    aiInput.setAttribute("aria-label", "AI 改造指令");

    const aiBtn = document.createElement("button");
    aiBtn.type = "button";
    aiBtn.className = "modal-btn ai-btn";
    aiBtn.textContent = "✨ AI 改造";

    // 思考过程显示区
    const aiThinking = document.createElement("div");
    aiThinking.className = "ai-thinking ai-thinking--modal";
    aiThinking.setAttribute("aria-live", "polite");
    aiThinking.hidden = true;

    const aiThinkingPre = document.createElement("pre");
    aiThinkingPre.className = "ai-thinking-content";
    aiThinking.append(aiThinkingPre);

    // 添加历史标签
    const addHistoryTag = (text) => {
      const tag = document.createElement("span");
      tag.className = "ai-bar-history-item";
      tag.textContent = text;
      tag.title = text;
      aiHistory.append(tag);
    };

    aiBtn.addEventListener("click", async () => {
      const instruction = aiInput.value.trim();
      if (!instruction) {
        aiInput.focus();
        return;
      }
      aiBtn.disabled = true;
      aiBtn.textContent = "生成中…";
      aiThinking.hidden = false;
      aiThinkingPre.textContent = "";
      try {
        const result = await onAiTransform(instruction, htmlTextarea.value, cssTextarea.value, (accumulated) => {
          aiThinkingPre.textContent = accumulated;
          aiThinking.scrollTop = aiThinking.scrollHeight;
        });
        if (result?.html) {
          htmlTextarea.value = result.html;
          updatePreview();
        }
        if (result?.css) {
          cssTextarea.value = result.css;
          styleTag.textContent = result.css;
          baseCss = result.css;
        }
        // 记录改造历史
        addHistoryTag(instruction);
        aiInput.value = "";
        aiThinking.hidden = true;
        aiThinkingPre.textContent = "";
      } catch {
        aiBtn.textContent = "失败，重试";
        aiThinkingPre.textContent = "";
        aiThinking.hidden = true;
        setTimeout(() => {
          aiBtn.textContent = "✨ AI 改造";
        }, 2000);
      } finally {
        aiBtn.disabled = false;
        if (aiBtn.textContent === "生成中…") aiBtn.textContent = "✨ AI 改造";
      }
    });

    aiInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.isComposing) {
        event.preventDefault();
        aiBtn.click();
      }
    });

    aiBar.append(aiHistory, aiInput, aiBtn, aiThinking);
    modalContent.append(modalHeader, editorContainer, aiBar);
  } else {
    modalContent.append(modalHeader, editorContainer);
  }

  modal.append(modalContent);

  const closeModal = () => {
    modal.classList.remove("is-open");
    colorModeObserver.disconnect();
    modal.removeEventListener("keydown", onEscape);
    modal.removeEventListener("keydown", onTabTrap);
    setTimeout(() => {
      modal.remove();
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    }, 300);
  };

  const onEscape = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const getFocusableElements = () => {
    return modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
  };

  const onTabTrap = (event) => {
    if (event.key !== "Tab") return;
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // modal 容器本身（tabindex="-1"）获得焦点时，Tab 应移至首/末可聚焦元素
    if (document.activeElement === modal) {
      event.preventDefault();
      (event.shiftKey ? lastElement : firstElement)?.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  htmlTextarea.addEventListener("input", updatePreview);
  cssTextarea.addEventListener("input", () => {
    styleTag.textContent = cssTextarea.value;
  });

  copyHtmlBtn.addEventListener("click", async () => {
    try {
      await copyToClipboard(htmlTextarea.value);
      markButtonState(copyHtmlBtn, "✓ 已复制", "复制HTML");
    } catch {
      copyHtmlBtn.textContent = "复制失败";
    }
  });

  copyCssBtn.addEventListener("click", async () => {
    try {
      await copyToClipboard(cssTextarea.value);
      markButtonState(copyCssBtn, "✓ 已复制", "复制CSS");
    } catch {
      copyCssBtn.textContent = "复制失败";
    }
  });

  copyBtn.addEventListener("click", async () => {
    try {
      if (typeof onTrackCopy === "function") {
        onTrackCopy(title);
      }

      const combined = `<style>\n${cssTextarea.value}\n</style>\n\n${htmlTextarea.value}`;
      await copyToClipboard(combined);
      markButtonState(copyBtn, "✓ 已复制", "复制HTML+CSS代码");
    } catch {
      copyBtn.textContent = "复制失败";
    }
  });

  shareBtn.addEventListener("click", async () => {
    try {
      // 构造当前窗口的 URI 并附加 open 参数用于直达
      const url = new URL(window.location.href);
      url.searchParams.set("open", title);
      await copyToClipboard(url.toString());
      markButtonState(shareBtn, "✓ 已复制链接", "分享链接");
    } catch {
      shareBtn.textContent = "复制失败";
    }
  });

  resetBtn.addEventListener("click", () => {
    htmlTextarea.value = demoHtml;
    cssTextarea.value = buildInitialCss();
    baseCss = fullCss;

    if (currentParams && paramsPanel) {
      Object.entries(currentParams).forEach(([key, config]) => {
        paramValues[key] = config.default;
      });

      const controls = paramsPanel.querySelectorAll("input, select");
      controls.forEach((control) => {
        const paramRow = control.closest(".param-row");
        const label = paramRow?.querySelector(".param-label")?.textContent;
        const matchedConfig = Object.values(currentParams).find((item) => item.label === label);
        if (!matchedConfig) return;

        control.value = matchedConfig.default;
        if (control.type === "range") {
          const valueDisplay = paramRow.querySelector(".param-value");
          if (valueDisplay) {
            valueDisplay.textContent = `${matchedConfig.default}${matchedConfig.unit}`;
          }
        }
        if (control.matches(".param-select")) {
          updateEasingHelpForSelect(control);
        }
      });

    }

    paramsPanel?.__setPreviewScale?.(PREVIEW_SCALE_DEFAULT);

    updatePreview();
    // 重置后强制重启动画，确保预览恢复
    const animated = previewDemoHost.querySelectorAll("*");
    animated.forEach((el) => { el.style.animation = "none"; });
    void previewDemoHost.offsetHeight;
    animated.forEach((el) => { el.style.animation = ""; });
    markButtonState(resetBtn, "✓ 已重置", "重置");
  });

  // ===== AI 解读功能 =====
  let explainPanel = null;

  explainBtn.addEventListener("click", async () => {
    // 切换面板
    if (explainPanel && !explainPanel.hidden) {
      explainPanel.hidden = true;
      return;
    }

    if (!explainPanel) {
      explainPanel = document.createElement("div");
      explainPanel.className = "ai-explain-panel";
      const explainContent = document.createElement("div");
      explainContent.className = "ai-explain-content";
      const explainClose = document.createElement("button");
      explainClose.type = "button";
      explainClose.className = "ai-explain-close";
      explainClose.textContent = "×";
      explainClose.addEventListener("click", () => { explainPanel.hidden = true; });
      explainPanel.append(explainClose, explainContent);
      modalContent.append(explainPanel);
    }

    const content = explainPanel.querySelector(".ai-explain-content");
    explainPanel.hidden = false;
    content.textContent = "正在分析代码…";
    explainBtn.disabled = true;

    try {
      await explainAnimation(htmlTextarea.value, cssTextarea.value, (accumulated) => {
        content.innerHTML = parseSimpleMarkdown(accumulated);
      });
    } catch (err) {
      content.textContent = `解读失败：${err.message}`;
    } finally {
      explainBtn.disabled = false;
    }
  });

  // ===== 框架导出功能 =====
  exportBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    exportMenu.hidden = !exportMenu.hidden;
  });

  // 点击外部关闭菜单
  modal.addEventListener("click", () => { exportMenu.hidden = true; });

  exportMenu.addEventListener("click", async (e) => {
    const item = e.target.closest(".ai-export-menu-item");
    if (!item) return;
    e.stopPropagation();
    exportMenu.hidden = true;

    const framework = item.dataset.framework;
    const frameworkLabel = item.textContent;

    // 创建导出结果面板
    const overlay = document.createElement("div");
    overlay.className = "ai-export-overlay";

    const panel = document.createElement("div");
    panel.className = "ai-export-panel";

    const panelHeader = document.createElement("div");
    panelHeader.className = "ai-export-panel-header";

    const panelTitle = document.createElement("span");
    panelTitle.textContent = `导出为 ${frameworkLabel}`;

    const panelCopyBtn = document.createElement("button");
    panelCopyBtn.type = "button";
    panelCopyBtn.className = "modal-btn";
    panelCopyBtn.textContent = "复制代码";

    const panelCloseBtn = document.createElement("button");
    panelCloseBtn.type = "button";
    panelCloseBtn.className = "modal-btn modal-close";
    panelCloseBtn.textContent = "✕ 关闭";

    panelHeader.append(panelTitle, panelCopyBtn, panelCloseBtn);

    const panelCode = document.createElement("textarea");
    panelCode.className = "ai-export-code";
    panelCode.readOnly = true;
    panelCode.value = "正在转换…";

    panel.append(panelHeader, panelCode);
    overlay.append(panel);
    modal.append(overlay);

    panelCloseBtn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (ev) => { if (ev.target === overlay) overlay.remove(); });

    panelCopyBtn.addEventListener("click", async () => {
      try {
        await copyToClipboard(panelCode.value);
        markButtonState(panelCopyBtn, "✓ 已复制", "复制代码");
      } catch { /* ignore */ }
    });

    try {
      await convertToFramework(htmlTextarea.value, cssTextarea.value, framework, (accumulated) => {
        panelCode.value = accumulated;
      });
    } catch (err) {
      panelCode.value = `转换失败：${err.message}`;
    }
  });

  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modal.addEventListener("keydown", onEscape);
  modal.addEventListener("keydown", onTabTrap);

  return modal;
}
