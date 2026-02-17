import "./styles.css";

import { categoryInsights, animationParams, animationNamesByTitle } from './data.js';
import { snippetsByTitle } from './snippets.js';
import {
  normalizeCssVariables,
  extractKeyframesMap,
  copyToClipboard,
  collectDemoHtml,
  rgbToHsl,
  hslToRgb,
  generateColorVariants,
} from './utils.js';

const filterButtons = document.querySelectorAll(".filter-btn");
const animationCards = document.querySelectorAll(".card[data-category]");
const searchInput = document.querySelector("#searchInput");
const motionToggle = document.querySelector("#motionToggle");
const metaToggle = document.querySelector("#metaToggle");

const viewState = {
  filter: "all",
  keyword: "",
};

function renderCards() {
  const normalizedKeyword = viewState.keyword.trim().toLowerCase();

  const categoryNames = {
    loading: "加载反馈",
    motion: "运动效果",
    interactive: "交互按钮",
    transform: "3D 变换",
    text: "文字特效",
    background: "背景氛围",
    wave: "声波条纹"
  };

  animationCards.forEach((card) => {
    const category = card.dataset.category;
    const h2Element = card.querySelector("h2");
    const title = h2Element?.textContent?.toLowerCase() || "";
    const tagElement = card.querySelector(".card-tag");
    const tag = tagElement?.textContent?.toLowerCase() || "";
    const categoryName = categoryNames[category]?.toLowerCase() || "";

    const matchFilter = viewState.filter === "all" || category === viewState.filter;
    const matchKeyword = !normalizedKeyword ||
                        title.includes(normalizedKeyword) ||
                        tag.includes(normalizedKeyword) ||
                        categoryName.includes(normalizedKeyword);
    const visible = matchFilter && matchKeyword;

    card.hidden = !visible;
    card.setAttribute("aria-hidden", String(!visible));
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === viewState.filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function attachSnippetPanels() {
  const keyframesMap = extractKeyframesMap();

  animationCards.forEach((card) => {
    if (card.querySelector(".card-inner")) {
      return;
    }

    const title = card.querySelector("h2")?.textContent?.trim();
    if (!title || !snippetsByTitle[title]) {
      return;
    }

    const originalNodes = [...card.childNodes];
    const liteSnippet = snippetsByTitle[title];
    const keyframeNames = animationNamesByTitle[title] || [];
    const keyframesCss = keyframeNames
      .map((name) => keyframesMap.get(name))
      .filter(Boolean)
      .join("\n\n");
    const demoHtml = collectDemoHtml(originalNodes);
    const fullCss = keyframesCss
      ? `${liteSnippet}\n\n${keyframesCss}`
      : `${liteSnippet}\n\n/* 此效果主要依赖 transition/transform，无额外 keyframes */`;

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-face card-front";

    originalNodes.forEach((node) => {
      front.append(node);
    });

    const category = card.dataset.category || "loading";
    const insight = categoryInsights[category] || categoryInsights.loading;

    const metaRow = document.createElement("div");
    metaRow.className = "meta-row";

    const sceneBadge = document.createElement("span");
    sceneBadge.className = "meta-badge";
    sceneBadge.textContent = `场景: ${insight.scenario}`;

    metaRow.append(sceneBadge);

    const openBtn = document.createElement("button");
    openBtn.className = "snippet-toggle";
    openBtn.type = "button";
    openBtn.textContent = "代码实验室";

    // 创建弹窗元素
    const createModal = (previousActiveElement) => {
      const modal = document.createElement("div");
      modal.className = "code-modal";
      // 无障碍属性
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");

      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";

      const modalHeader = document.createElement("div");
      modalHeader.className = "modal-header";

      const modalTitle = document.createElement("h3");
      modalTitle.className = "modal-title";
      modalTitle.id = `modal-title-${Date.now()}`;
      modalTitle.textContent = `${title} - 代码实验室`;

      // 关联标题与对话框
      modal.setAttribute("aria-labelledby", modalTitle.id);

      const modalActions = document.createElement("div");
      modalActions.className = "modal-actions";

      const copyBtn = document.createElement("button");
      copyBtn.className = "modal-btn";
      copyBtn.type = "button";
      copyBtn.textContent = "复制全部";

      const resetBtn = document.createElement("button");
      resetBtn.className = "modal-btn";
      resetBtn.type = "button";
      resetBtn.textContent = "重置";

      const closeModalBtn = document.createElement("button");
      closeModalBtn.className = "modal-btn modal-close";
      closeModalBtn.type = "button";
      closeModalBtn.textContent = "✕ 关闭";

      modalActions.append(copyBtn, resetBtn, closeModalBtn);
      modalHeader.append(modalTitle, modalActions);

      // 编辑器容器 - 改为上下布局
      const editorContainer = document.createElement("div");
      editorContainer.className = "modal-editor-container";

      // 上方：HTML代码区
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

      // 中间：CSS代码编辑区
      const cssPanel = document.createElement("div");
      cssPanel.className = "modal-code-panel css-panel";

      const cssLabel = document.createElement("div");
      cssLabel.className = "modal-editor-label";
      cssLabel.textContent = "🎨 CSS 样式";

      const cssTextarea = document.createElement("textarea");
      cssTextarea.className = "modal-code-editor css-editor";
      cssTextarea.value = normalizeCssVariables(fullCss);
      cssTextarea.spellcheck = false;

      cssPanel.append(cssLabel, cssTextarea);

      // 下方：实时预览
      const previewPanel = document.createElement("div");
      previewPanel.className = "modal-preview-panel";

      const previewLabel = document.createElement("div");
      previewLabel.className = "modal-editor-label";
      previewLabel.textContent = "👁️ 实时预览";

      // 使用 Shadow DOM 隔离预览样式，避免污染全局
      const previewBox = document.createElement("div");
      previewBox.className = "modal-preview-box";

      const shadowRoot = previewBox.attachShadow({ mode: "open" });

      // 在 Shadow DOM 中创建容器
      const shadowContainer = document.createElement("div");
      shadowContainer.innerHTML = demoHtml;
      shadowContainer.style.cssText = "display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;";

      const styleTag = document.createElement("style");
      styleTag.textContent = cssTextarea.value;

      shadowRoot.appendChild(styleTag);
      shadowRoot.appendChild(shadowContainer);

      previewPanel.append(previewLabel, previewBox);

      // 参数调整面板（如果该动画支持参数配置）
      let paramsPanel = null;
      const currentParams = animationParams[title];
      const paramValues = {}; // 存储当前参数值

      if (currentParams) {
        paramsPanel = document.createElement("div");
        paramsPanel.className = "modal-params-panel";

        const paramsLabel = document.createElement("div");
        paramsLabel.className = "modal-editor-label";
        paramsLabel.textContent = "⚙️ 参数调整";

        const paramsContainer = document.createElement("div");
        paramsContainer.className = "params-container";

        // 为每个参数创建控件
        Object.entries(currentParams).forEach(([key, config]) => {
          const paramRow = document.createElement("div");
          paramRow.className = "param-row";

          const paramLabel = document.createElement("label");
          paramLabel.className = "param-label";
          paramLabel.textContent = config.label;

          let paramControl;
          paramValues[key] = config.default;

          if (config.type === "range") {
            const rangeWrapper = document.createElement("div");
            rangeWrapper.className = "param-range-wrapper";

            paramControl = document.createElement("input");
            paramControl.type = "range";
            paramControl.className = "param-range";
            paramControl.min = config.min;
            paramControl.max = config.max;
            paramControl.step = config.step;
            paramControl.value = config.default;

            const valueDisplay = document.createElement("span");
            valueDisplay.className = "param-value";
            valueDisplay.textContent = `${config.default}${config.unit}`;

            paramControl.addEventListener("input", (e) => {
              const value = parseFloat(e.target.value);
              paramValues[key] = value;
              valueDisplay.textContent = `${value}${config.unit}`;
              updatePreviewWithParams();
            });

            rangeWrapper.append(paramControl, valueDisplay);
            paramRow.append(paramLabel, rangeWrapper);
          } else if (config.type === "select") {
            paramControl = document.createElement("select");
            paramControl.className = "param-select";

            config.options.forEach(option => {
              const optionEl = document.createElement("option");
              optionEl.value = option;
              optionEl.textContent = option === "cubic-bezier(0.68, -0.55, 0.27, 1.55)" ? "bounce" : option;
              if (option === config.default) optionEl.selected = true;
              paramControl.appendChild(optionEl);
            });

            paramControl.addEventListener("change", (e) => {
              paramValues[key] = e.target.value;
              updatePreviewWithParams();
            });

            paramRow.append(paramLabel, paramControl);
          }

          paramsContainer.appendChild(paramRow);
        });

        paramsPanel.append(paramsLabel, paramsContainer);
      }

      // 创建左侧列，包含预览、参数面板和HTML（上下排列）
      const leftColumn = document.createElement("div");
      leftColumn.className = "modal-left-column";
      if (paramsPanel) {
        leftColumn.append(previewPanel, paramsPanel, htmlPanel);
      } else {
        leftColumn.append(previewPanel, htmlPanel);
      }

      editorContainer.append(leftColumn, cssPanel);

      modalContent.append(modalHeader, editorContainer);
      modal.appendChild(modalContent);

      const markCopied = (button, text, originalText) => {
        button.textContent = text;
        button.classList.add("is-copied");
        setTimeout(() => {
          button.classList.remove("is-copied");
          button.textContent = originalText;
        }, 1200);
      };

      // 根据参数值更新 CSS 代码
      const updatePreviewWithParams = () => {
        if (!currentParams) return;

        let updatedCss = normalizeCssVariables(fullCss);

        // 遍历所有参数，替换 CSS 中的值
        Object.entries(currentParams).forEach(([key, config]) => {
          const value = paramValues[key];
          const target = config.target; // 动画名称，如 "spin", "pulse"

          if (config.type === "range") {
            // 替换时长：精确匹配 "动画名 时长"
            // 例如：spin 1s -> spin 2s
            const durationRegex = new RegExp(
              `(${target}\\s+)(\\d+\\.?\\d*)(s)`,
              'g'
            );

            updatedCss = updatedCss.replace(durationRegex, (match, prefix, oldDuration, unit) => {
              return `${prefix}${value}${unit}`;
            });
          } else if (config.type === "select" && key === "timing") {
            // 替换缓动函数：精确匹配 "动画名 时长 缓动函数"
            // 例如：spin 1s linear -> spin 1s ease-in-out
            const timingRegex = new RegExp(
              `(${target}\\s+\\d+\\.?\\d*s\\s+)(linear|ease(?:-in)?(?:-out)?|ease-in-out|cubic-bezier\\([^)]+\\))`,
              'g'
            );

            updatedCss = updatedCss.replace(timingRegex, (match, prefix, oldTiming) => {
              return `${prefix}${value}`;
            });
          }
        });

        cssTextarea.value = updatedCss;
        styleTag.textContent = updatedCss;
      };

      // 实时更新预览（在 Shadow DOM 中）
      const updatePreview = () => {
        shadowContainer.innerHTML = htmlTextarea.value;
        styleTag.textContent = cssTextarea.value;
      };

      htmlTextarea.addEventListener("input", updatePreview);

      cssTextarea.addEventListener("input", () => {
        styleTag.textContent = cssTextarea.value;
      });

      copyBtn.addEventListener("click", async () => {
        try {
          // 发送到百度统计
          if (typeof _hmt !== 'undefined') {
            _hmt.push(['_trackEvent', '动画复制', 'copy', title]);
            console.log(`📤 已发送到百度统计: ${title}`);
          }

          // 生成可直接运行的完整 HTML 模板
          const fullTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - CSS Animation</title>
  <style>
${cssTextarea.value.split('\n').map(line => '    ' + line).join('\n')}
  </style>
</head>
<body>
${htmlTextarea.value.split('\n').map(line => '  ' + line).join('\n')}
</body>
</html>`;
          await copyToClipboard(fullTemplate);
          markCopied(copyBtn, "✓ 已复制", "复制全部");
        } catch {
          copyBtn.textContent = "复制失败";
        }
      });

      resetBtn.addEventListener("click", () => {
        htmlTextarea.value = demoHtml;
        cssTextarea.value = normalizeCssVariables(fullCss);

        // 重置所有参数控件到默认值
        if (currentParams && paramsPanel) {
          Object.entries(currentParams).forEach(([key, config]) => {
            paramValues[key] = config.default;

            // 查找并更新对应的控件
            const controls = paramsPanel.querySelectorAll('input, select');
            controls.forEach(control => {
              if (control.type === 'range') {
                // 检查这个滑块是否属于当前参数
                const paramRow = control.closest('.param-row');
                const label = paramRow?.querySelector('.param-label')?.textContent;
                if (label === config.label) {
                  control.value = config.default;
                  // 更新数值显示
                  const valueDisplay = paramRow.querySelector('.param-value');
                  if (valueDisplay) {
                    valueDisplay.textContent = `${config.default}${config.unit}`;
                  }
                }
              } else if (control.tagName === 'SELECT') {
                const paramRow = control.closest('.param-row');
                const label = paramRow?.querySelector('.param-label')?.textContent;
                if (label === config.label) {
                  control.value = config.default;
                }
              }
            });
          });
        }

        updatePreview();
        markCopied(resetBtn, "✓ 已重置", "重置");
      });

      // 获取所有可聚焦元素用于焦点陷阱
      const getFocusableElements = () => {
        return modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
      };

      // 焦点陷阱：Tab 键循环聚焦
      const handleTab = (e) => {
        if (e.key !== "Tab") return;

        const focusableElements = getFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      };

      // Escape 键处理函数（需要是具名函数以便移除监听器）
      const handleEscape = (e) => {
        if (e.key === "Escape") closeModal();
      };

      const closeModal = () => {
        modal.classList.remove("is-open");
        // 移除事件监听器，避免事件泄漏
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleTab);
        setTimeout(() => {
          modal.remove();
          // 焦点归还
          if (previousActiveElement) {
            previousActiveElement.focus();
          }
        }, 300);
      };

      closeModalBtn.addEventListener("click", closeModal);

      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });

      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTab);

      return modal;
    };

    openBtn.addEventListener("click", () => {
      // 保存当前焦点
      const previousActiveElement = document.activeElement;
      const modal = createModal(previousActiveElement);

      document.body.appendChild(modal);
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
        // 设置初始焦点到第一个按钮（通常是复制按钮）
        const firstFocusable = modal.querySelector("button");
        if (firstFocusable) {
          firstFocusable.focus();
        }
      });
    });

    front.append(metaRow, openBtn);

    card.replaceChildren(inner);
    inner.append(front);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    viewState.filter = button.dataset.filter || "all";
    renderCards();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    viewState.keyword = event.target.value || "";
    renderCards();
  });
}

if (motionToggle) {
  motionToggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("reduced-preview");
    motionToggle.setAttribute("aria-pressed", String(enabled));
    motionToggle.textContent = enabled ? "开启" : "关闭";
  });
}

if (metaToggle) {
  metaToggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("show-meta");
    metaToggle.setAttribute("aria-pressed", String(enabled));
    metaToggle.textContent = enabled ? "开启" : "关闭";
  });
}

const themeButtons = document.querySelectorAll(".theme-btn");
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;
    document.documentElement.setAttribute("data-theme", theme);

    // 清除自定义颜色设置的内联样式
    document.documentElement.style.removeProperty("--accent");
    document.documentElement.style.removeProperty("--accent-rgb");
    document.documentElement.style.removeProperty("--accent-2");
    document.documentElement.style.removeProperty("--accent-2-rgb");
    document.documentElement.style.removeProperty("--accent-soft");
    document.documentElement.style.removeProperty("--accent-soft-rgb");
    document.documentElement.style.removeProperty("--accent-deep");
    document.documentElement.style.removeProperty("--accent-deep-rgb");

    themeButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn === button);
    });

    document.querySelector(".custom-color-wrapper")?.classList.remove("is-active");

    // 清空文本输入框
    const colorTextInput = document.querySelector("#colorTextInput");
    if (colorTextInput) {
      colorTextInput.value = "";
      colorTextInput.classList.remove("error");
    }
  });
});

function applyCustomColor(color) {
  const variants = generateColorVariants(color);

  if (variants) {
    document.documentElement.removeAttribute("data-theme");

    document.documentElement.style.setProperty("--accent", variants.hexColor);
    document.documentElement.style.setProperty("--accent-rgb", variants.accent);
    document.documentElement.style.setProperty("--accent-2-rgb", variants.accent2);
    document.documentElement.style.setProperty("--accent-soft-rgb", variants.accentSoft);
    document.documentElement.style.setProperty("--accent-deep-rgb", variants.accentDeep);

    const hsl = rgbToHsl(...variants.accent.split(", ").map(Number));
    const accent2Hsl = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 15, 10));
    const accentSoftHsl = hslToRgb(hsl.h, Math.max(hsl.s - 10, 30), Math.min(hsl.l + 20, 85));
    const accentDeepHsl = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 25, 5));

    document.documentElement.style.setProperty(
      "--accent-2",
      `rgb(${accent2Hsl.r}, ${accent2Hsl.g}, ${accent2Hsl.b})`
    );
    document.documentElement.style.setProperty(
      "--accent-soft",
      `rgb(${accentSoftHsl.r}, ${accentSoftHsl.g}, ${accentSoftHsl.b})`
    );
    document.documentElement.style.setProperty(
      "--accent-deep",
      `rgb(${accentDeepHsl.r}, ${accentDeepHsl.g}, ${accentDeepHsl.b})`
    );

    themeButtons.forEach((btn) => {
      btn.classList.remove("is-active");
    });
    customColorWrapper?.classList.add("is-active");

    return variants.hexColor;
  }
  return null;
}

const customColorInput = document.querySelector("#customColor");
const customColorWrapper = document.querySelector(".custom-color-wrapper");
const colorTextInput = document.querySelector("#colorTextInput");

if (customColorInput) {
  customColorInput.addEventListener("input", (event) => {
    const hexColor = applyCustomColor(event.target.value);
    if (hexColor && colorTextInput) {
      colorTextInput.value = hexColor;
      colorTextInput.classList.remove("error");
    }
  });
}

if (colorTextInput) {
  colorTextInput.addEventListener("input", (event) => {
    const color = event.target.value.trim();
    if (!color) return;

    const hexColor = applyCustomColor(color);
    if (hexColor) {
      colorTextInput.classList.remove("error");
      if (customColorInput) {
        customColorInput.value = hexColor;
      }
    } else {
      colorTextInput.classList.add("error");
    }
  });

  // 支持回车键提交
  colorTextInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  });
}

attachSnippetPanels();
renderCards();

// 默认开启工程信息
document.body.classList.add("show-meta");

// 点赞按钮点击动画 - 支持状态切换
const likeButtons = document.querySelectorAll(".like-btn");
likeButtons.forEach((btn) => {
  let isLiked = false;

  btn.addEventListener("click", () => {
    isLiked = !isLiked;

    if (isLiked) {
      // 点赞：添加动画类
      btn.classList.add("liked", "animating");

      // 动画结束后移除动画类，但保留 liked 状态
      setTimeout(() => {
        btn.classList.remove("animating");
      }, 600);
    } else {
      // 取消点赞：添加缩小动画
      btn.classList.add("unliking");

      setTimeout(() => {
        btn.classList.remove("liked", "unliking");
      }, 300);
    }
  });
});
