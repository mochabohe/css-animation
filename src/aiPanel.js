import { generateAnimation, transformAnimation, saveAnimation, loadSavedAnimations, deleteSavedAnimation, getApiKey, saveApiKey, PROXY_URL } from "./ai.js";
import { createCodeModal } from "./modal.js";

// SVG 眨眼机器人图标
const CHAT_ICON = `<svg class="ai-fab-icon" width="30" height="30" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect class="ai-head" x="5" y="8" width="18" height="14" rx="4.5"/>
  <path d="M14 8V5"/>
  <circle cx="14" cy="4" r="1.4" fill="currentColor" stroke="none"/>
  <circle class="ai-eye ai-eye-left" cx="11" cy="14" r="1.3" fill="currentColor" stroke="none"/>
  <circle class="ai-eye ai-eye-right" cx="17" cy="14" r="1.3" fill="currentColor" stroke="none"/>
  <path class="ai-mouth" d="M10.5 18h7"/>
  <path d="M3.5 14h1.5"/>
  <path d="M23 14h1.5"/>
</svg>`;

export function initAiPanel() {
  document.body.classList.add("has-ai-fab");

  // ===== 面板 =====
  const panel = document.createElement("div");
  panel.className = "ai-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "AI 工坊");
  panel.hidden = true;

  // 面板头部
  const header = document.createElement("div");
  header.className = "ai-panel-header";

  const headerTitle = document.createElement("span");
  headerTitle.className = "ai-panel-title";
  headerTitle.textContent = "✨ AI 工坊";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "ai-panel-close";
  closeBtn.textContent = "×";
  closeBtn.setAttribute("aria-label", "关闭 AI 工坊");

  header.append(headerTitle, closeBtn);

  // 面板主体（可滚动）
  const body = document.createElement("div");
  body.className = "ai-panel-body";

  // ===== 已保存列表（先声明供闭包使用）=====
  const savedSection = document.createElement("div");
  savedSection.className = "ai-saved-section";
  savedSection.hidden = true;

  const savedTitle = document.createElement("div");
  savedTitle.className = "ai-saved-title";
  savedTitle.textContent = "已保存";

  const savedList = document.createElement("ul");
  savedList.className = "ai-saved-list";

  const renderSavedList = () => {
    savedList.innerHTML = "";
    const items = loadSavedAnimations();
    if (items.length === 0) {
      savedSection.hidden = true;
      return;
    }
    savedSection.hidden = false;
    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "ai-saved-item";

      const nameSpan = document.createElement("span");
      nameSpan.className = "ai-saved-name";
      nameSpan.textContent = item.title;
      nameSpan.title = item.title;

      const openBtn = document.createElement("button");
      openBtn.type = "button";
      openBtn.className = "ai-saved-open";
      openBtn.textContent = "打开";
      openBtn.addEventListener("click", () => openModal(item.title, item.html, item.css, openBtn));

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "ai-saved-del";
      delBtn.textContent = "×";
      delBtn.setAttribute("aria-label", `删除 ${item.title}`);
      delBtn.addEventListener("click", () => {
        deleteSavedAnimation(item.ts);
        renderSavedList();
      });

      li.append(nameSpan, openBtn, delBtn);
      savedList.append(li);
    });
  };

  savedSection.append(savedTitle, savedList);

  // ===== 打开 Code Lab =====
  const openModal = (title, html, css, triggerEl) => {
    const modal = createCodeModal({
      title,
      demoHtml: html,
      fullCss: css,
      currentParams: null,
      previousActiveElement: triggerEl,
      onAiTransform: (instruction, h, c, onChunk) => transformAnimation(instruction, h, c, onChunk),
      onSave: (t, h, c) => {
        saveAnimation(t, h, c);
        renderSavedList();
      },
    });

    document.body.append(modal);
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      modal.focus();
      const firstFocusable = modal.querySelector("button");
      if (firstFocusable) firstFocusable.focus();
    });
  };

  // ===== API Key 区域（代理已配置时自动隐藏）=====
  const keySection = document.createElement("div");
  keySection.className = "ai-key-section";
  // 有代理地址时无需 Key，直接隐藏
  keySection.hidden = Boolean(PROXY_URL);

  if (!PROXY_URL) {
    const keyRow = document.createElement("div");
    keyRow.className = "ai-key-row";

    const keyLabel = document.createElement("span");
    keyLabel.className = "ai-key-label";
    keyLabel.textContent = "API Key";

    const keyStatus = document.createElement("span");
    keyStatus.className = "ai-key-status";

    const keyEditBtn = document.createElement("button");
    keyEditBtn.type = "button";
    keyEditBtn.className = "ai-key-edit-btn";

    keyRow.append(keyLabel, keyStatus, keyEditBtn);

    const keyForm = document.createElement("div");
    keyForm.className = "ai-key-form";
    keyForm.hidden = true;

    const keyInput = document.createElement("input");
    keyInput.type = "password";
    keyInput.className = "ai-key-input";
    keyInput.placeholder = "sk-xxxxxxxx…";
    keyInput.setAttribute("aria-label", "DeepSeek API Key");

    const keySaveBtn = document.createElement("button");
    keySaveBtn.type = "button";
    keySaveBtn.className = "ai-key-save-btn";
    keySaveBtn.textContent = "保存";

    keyForm.append(keyInput, keySaveBtn);
    keySection.append(keyRow, keyForm);

    const updateKeyStatus = () => {
      const key = getApiKey();
      if (key) {
        keyStatus.textContent = "已配置 ✓";
        keyStatus.classList.add("is-set");
        keyEditBtn.textContent = "修改";
      } else {
        keyStatus.textContent = "未配置";
        keyStatus.classList.remove("is-set");
        keyEditBtn.textContent = "设置";
      }
    };

    updateKeyStatus();

    keyEditBtn.addEventListener("click", () => {
      keyForm.hidden = !keyForm.hidden;
      if (!keyForm.hidden) {
        keyInput.value = "";
        keyInput.focus();
      }
    });

    keySaveBtn.addEventListener("click", () => {
      const val = keyInput.value.trim();
      if (!val) return;
      saveApiKey(val);
      keyInput.value = "";
      keyForm.hidden = true;
      updateKeyStatus();
    });

    keyInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") keySaveBtn.click();
    });
  }

  // ===== 生成区域 =====
  const genSection = document.createElement("div");
  genSection.className = "ai-gen-section";

  const genLabel = document.createElement("label");
  genLabel.className = "ai-gen-label";
  genLabel.textContent = "描述你想要的动画";

  const genInput = document.createElement("textarea");
  genInput.className = "ai-gen-input";
  genInput.rows = 3;
  genInput.placeholder = "例如：一个彩色气泡向上漂浮的动画…";
  genInput.setAttribute("aria-label", "动画描述");

  const genBtn = document.createElement("button");
  genBtn.type = "button";
  genBtn.className = "ai-gen-btn";
  genBtn.textContent = "✨ 生成动画";

  // 思考过程滚动显示区
  const thinkingBox = document.createElement("div");
  thinkingBox.className = "ai-thinking";
  thinkingBox.setAttribute("aria-live", "polite");
  thinkingBox.hidden = true;

  const thinkingPre = document.createElement("pre");
  thinkingPre.className = "ai-thinking-content";
  thinkingBox.append(thinkingPre);

  genBtn.addEventListener("click", async () => {
    const description = genInput.value.trim();
    if (!description) {
      genInput.focus();
      return;
    }

    genBtn.disabled = true;
    genBtn.textContent = "生成中…";
    thinkingBox.hidden = false;
    thinkingPre.textContent = "";

    try {
      const result = await generateAnimation(description, (accumulated) => {
        thinkingPre.textContent = accumulated;
        // 自动滚动到底部
        thinkingBox.scrollTop = thinkingBox.scrollHeight;
      });

      if (!result?.html || !result?.css) {
        throw new Error("返回格式异常，未包含 html 或 css 字段");
      }
      thinkingBox.hidden = true;
      thinkingPre.textContent = "";
      openModal(description.slice(0, 30), result.html, result.css, genBtn);
    } catch (err) {
      thinkingPre.textContent = `生成失败：${err.message}`;
    } finally {
      genBtn.disabled = false;
      genBtn.textContent = "✨ 生成动画";
    }
  });

  genInput.addEventListener("keydown", (event) => {
    // Enter 发送，Shift+Enter 换行
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      genBtn.click();
    }
  });

  genSection.append(genLabel, genInput, genBtn, thinkingBox);
  body.append(keySection, genSection, savedSection);
  panel.append(header, body);

  // ===== 浮动按钮 =====
  const fab = document.createElement("button");
  fab.type = "button";
  fab.className = "ai-fab";
  fab.setAttribute("aria-label", "打开 AI 工坊");
  fab.innerHTML = CHAT_ICON;

  const togglePanel = () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    fab.classList.toggle("is-open", !isOpen);
    if (!isOpen) {
      genInput.focus();
    }
  };

  fab.addEventListener("click", togglePanel);
  closeBtn.addEventListener("click", () => {
    panel.hidden = true;
    fab.classList.remove("is-open");
    fab.focus();
  });

  document.body.append(panel, fab);
  renderSavedList();
}
