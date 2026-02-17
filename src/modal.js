import { normalizeCssVariables, copyToClipboard } from "./utils.js";

function markButtonState(button, text, originalText) {
  button.textContent = text;
  button.classList.add("is-copied");
  setTimeout(() => {
    button.classList.remove("is-copied");
    button.textContent = originalText;
  }, 1200);
}

function buildParamPanel(currentParams, paramValues, onParamChange) {
  if (!currentParams) return null;

  const paramsPanel = document.createElement("div");
  paramsPanel.className = "modal-params-panel";

  const paramsLabel = document.createElement("div");
  paramsLabel.className = "modal-editor-label";
  paramsLabel.textContent = "⚙️ 参数调整";

  const paramsContainer = document.createElement("div");
  paramsContainer.className = "params-container";

  Object.entries(currentParams).forEach(([key, config]) => {
    const paramRow = document.createElement("div");
    paramRow.className = "param-row";

    const paramLabel = document.createElement("label");
    paramLabel.className = "param-label";
    paramLabel.textContent = config.label;

    paramValues[key] = config.default;

    if (config.type === "range") {
      const rangeWrapper = document.createElement("div");
      rangeWrapper.className = "param-range-wrapper";

      const input = document.createElement("input");
      input.type = "range";
      input.className = "param-range";
      input.min = config.min;
      input.max = config.max;
      input.step = config.step;
      input.value = config.default;

      const valueDisplay = document.createElement("span");
      valueDisplay.className = "param-value";
      valueDisplay.textContent = `${config.default}${config.unit}`;

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
      const select = document.createElement("select");
      select.className = "param-select";

      config.options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent =
          option === "cubic-bezier(0.68, -0.55, 0.27, 1.55)" ? "bounce" : option;
        if (option === config.default) {
          optionElement.selected = true;
        }
        select.append(optionElement);
      });

      select.addEventListener("change", (event) => {
        paramValues[key] = event.target.value;
        onParamChange();
      });

      paramRow.append(paramLabel, select);
    }

    paramsContainer.append(paramRow);
  });

  paramsPanel.append(paramsLabel, paramsContainer);
  return paramsPanel;
}

export function createCodeModal({
  title,
  demoHtml,
  fullCss,
  currentParams,
  previousActiveElement,
  onTrackCopy,
}) {
  const modal = document.createElement("div");
  modal.className = "code-modal";
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

  const cssTextarea = document.createElement("textarea");
  cssTextarea.className = "modal-code-editor css-editor";
  cssTextarea.value = normalizeCssVariables(fullCss);
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

  const styleTag = document.createElement("style");
  styleTag.textContent = cssTextarea.value;

  const shadowContainer = document.createElement("div");
  shadowContainer.innerHTML = demoHtml;
  shadowContainer.style.cssText =
    "display:flex;align-items:center;justify-content:center;width:100%;height:100%;";

  shadowRoot.append(styleTag, shadowContainer);
  previewPanel.append(previewLabel, previewBox);

  const paramValues = {};
  const updatePreview = () => {
    shadowContainer.innerHTML = htmlTextarea.value;
    styleTag.textContent = cssTextarea.value;
  };

  const updatePreviewWithParams = () => {
    if (!currentParams) return;

    let updatedCss = normalizeCssVariables(fullCss);
    Object.entries(currentParams).forEach(([key, config]) => {
      const value = paramValues[key];
      const target = config.target;

      if (config.type === "range") {
        const durationRegex = new RegExp(`(${target}\\s+)(\\d+\\.?\\d*)(s)`, "g");
        updatedCss = updatedCss.replace(durationRegex, (_match, prefix, _oldDuration, unit) => {
          return `${prefix}${value}${unit}`;
        });
      }

      if (config.type === "select" && key === "timing") {
        const timingRegex = new RegExp(
          `(${target}\\s+\\d+\\.?\\d*s\\s+)(linear|ease(?:-in)?(?:-out)?|ease-in-out|cubic-bezier\\([^)]+\\))`,
          "g",
        );
        updatedCss = updatedCss.replace(timingRegex, (_match, prefix) => `${prefix}${value}`);
      }
    });

    cssTextarea.value = updatedCss;
    styleTag.textContent = updatedCss;
  };

  const paramsPanel = buildParamPanel(currentParams, paramValues, updatePreviewWithParams);

  const leftColumn = document.createElement("div");
  leftColumn.className = "modal-left-column";
  if (paramsPanel) {
    leftColumn.append(previewPanel, paramsPanel, htmlPanel);
  } else {
    leftColumn.append(previewPanel, htmlPanel);
  }

  editorContainer.append(leftColumn, cssPanel);
  modalContent.append(modalHeader, editorContainer);
  modal.append(modalContent);

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.removeEventListener("keydown", onEscape);
    document.removeEventListener("keydown", onTabTrap);
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

  copyBtn.addEventListener("click", async () => {
    try {
      if (typeof onTrackCopy === "function") {
        onTrackCopy(title);
      }

      const fullTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - CSS Animation</title>
  <style>
${cssTextarea.value
  .split("\n")
  .map((line) => `    ${line}`)
  .join("\n")}
  </style>
</head>
<body>
${htmlTextarea.value
  .split("\n")
  .map((line) => `  ${line}`)
  .join("\n")}
</body>
</html>`;
      await copyToClipboard(fullTemplate);
      markButtonState(copyBtn, "✓ 已复制", "复制全部");
    } catch {
      copyBtn.textContent = "复制失败";
    }
  });

  resetBtn.addEventListener("click", () => {
    htmlTextarea.value = demoHtml;
    cssTextarea.value = normalizeCssVariables(fullCss);

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
      });
    }

    updatePreview();
    markButtonState(resetBtn, "✓ 已重置", "重置");
  });

  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", onEscape);
  document.addEventListener("keydown", onTabTrap);

  return modal;
}
