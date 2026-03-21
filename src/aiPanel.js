import { chatAnimation, transformAnimation, saveAnimation, loadSavedAnimations, deleteSavedAnimation, getApiKey, saveApiKey, PROXY_URL, conversationManager } from "./ai.js";
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
const FAB_MARGIN = 8;
const FAB_DEFAULT_OFFSET = 24;

export function initAiPanel() {
  document.body.classList.add("has-ai-fab");

  // 当前会话 ID
  let currentConvId = null;

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

  const newChatBtn = document.createElement("button");
  newChatBtn.type = "button";
  newChatBtn.className = "ai-new-chat";
  newChatBtn.textContent = "新对话";
  newChatBtn.setAttribute("aria-label", "开始新对话");

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "ai-panel-close";
  closeBtn.textContent = "×";
  closeBtn.setAttribute("aria-label", "关闭 AI 工坊");

  header.append(headerTitle, newChatBtn, closeBtn);

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

  // ===== 多轮对话区域 =====
  const chatSection = document.createElement("div");
  chatSection.className = "ai-gen-section";

  const chatLabel = document.createElement("label");
  chatLabel.className = "ai-gen-label";
  chatLabel.textContent = "描述你想要的动画";

  // 对话消息列表
  const chatMessages = document.createElement("div");
  chatMessages.className = "ai-chat-messages";

  // 底部输入行
  const inputRow = document.createElement("div");
  inputRow.className = "ai-chat-input-row";

  const chatInput = document.createElement("input");
  chatInput.type = "text";
  chatInput.className = "ai-chat-input";
  chatInput.placeholder = "例如：一个彩色气泡向上漂浮的动画…";
  chatInput.setAttribute("aria-label", "动画描述");

  const sendBtn = document.createElement("button");
  sendBtn.type = "button";
  sendBtn.className = "ai-chat-send";
  sendBtn.textContent = "✨ 发送";

  inputRow.append(chatInput, sendBtn);

  // 添加用户消息气泡
  const addUserBubble = (text) => {
    const bubble = document.createElement("div");
    bubble.className = "ai-msg ai-msg-user";
    bubble.textContent = text;
    chatMessages.append(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return bubble;
  };

  // 添加 AI 消息气泡（包含思考过程和预览按钮）
  const addAiBubble = () => {
    const bubble = document.createElement("div");
    bubble.className = "ai-msg ai-msg-ai";

    const thinkingBox = document.createElement("div");
    thinkingBox.className = "ai-thinking";
    const thinkingPre = document.createElement("pre");
    thinkingPre.className = "ai-thinking-content";
    thinkingBox.append(thinkingPre);
    bubble.append(thinkingBox);

    chatMessages.append(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return { bubble, thinkingPre, thinkingBox };
  };

  // 确保会话存在
  const ensureConversation = () => {
    if (!currentConvId) {
      currentConvId = conversationManager.create();
    }
    return currentConvId;
  };

  // 发送消息
  const handleSend = async () => {
    const text = chatInput.value.trim();
    if (!text) {
      chatInput.focus();
      return;
    }

    chatInput.value = "";
    sendBtn.disabled = true;
    sendBtn.textContent = "生成中…";

    addUserBubble(text);
    const convId = ensureConversation();
    const { bubble, thinkingPre, thinkingBox } = addAiBubble();

    try {
      const result = await chatAnimation(text, convId, (accumulated) => {
        thinkingPre.textContent = accumulated;
        thinkingBox.scrollTop = thinkingBox.scrollHeight;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });

      if (!result?.html || !result?.css) {
        throw new Error("返回格式异常，未包含 html 或 css 字段");
      }

      // 使用 AI 返回的简短标题，回退到截取用户输入
      const animTitle = result.title || text.slice(0, 30);

      // 隐藏思考过程，显示成功消息和预览按钮
      thinkingBox.hidden = true;
      const successText = document.createElement("div");
      successText.textContent = "动画生成成功";
      successText.style.cssText = "font-size:11px;color:var(--muted);margin-bottom:4px;";

      const previewBtn = document.createElement("button");
      previewBtn.type = "button";
      previewBtn.className = "ai-msg-preview-btn";
      previewBtn.textContent = "打开预览";
      previewBtn.addEventListener("click", () => {
        openModal(animTitle, result.html, result.css, previewBtn);
      });

      bubble.append(successText, previewBtn);

      // 自动打开预览
      openModal(animTitle, result.html, result.css, sendBtn);
    } catch (err) {
      thinkingBox.hidden = true;
      const errMsg = document.createElement("div");
      errMsg.className = "ai-msg-error";
      errMsg.textContent = `生成失败：${err.message}`;
      bubble.append(errMsg);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = "✨ 发送";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  };

  sendBtn.addEventListener("click", handleSend);

  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.isComposing) {
      event.preventDefault();
      handleSend();
    }
  });

  // 新对话按钮
  newChatBtn.addEventListener("click", () => {
    if (currentConvId) {
      conversationManager.clear(currentConvId);
    }
    currentConvId = null;
    chatMessages.innerHTML = "";
    chatInput.focus();
  });

  chatSection.append(chatLabel, chatMessages, inputRow);
  body.append(keySection, chatSection, savedSection);
  panel.append(header, body);

  // ===== 浮动按钮 =====
  const fab = document.createElement("button");
  fab.type = "button";
  fab.className = "ai-fab";
  fab.setAttribute("aria-label", "打开 AI 工坊");
  fab.innerHTML = CHAT_ICON;

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
  const getFabDefaultPosition = () => ({
    x: window.innerWidth - FAB_DEFAULT_OFFSET - 56,
    y: window.innerHeight - FAB_DEFAULT_OFFSET - 56,
  });
  const getClampedPosition = (x, y) => ({
    x: clamp(x, FAB_MARGIN, window.innerWidth - FAB_MARGIN - 56),
    y: clamp(y, FAB_MARGIN, window.innerHeight - FAB_MARGIN - 56),
  });
  const applyFabPosition = (position) => {
    const next = getClampedPosition(position.x, position.y);
    fab.style.left = `${next.x}px`;
    fab.style.top = `${next.y}px`;
    fab.style.right = "auto";
    fab.style.bottom = "auto";
    return next;
  };
  const placePanelNearFab = () => {
    if (panel.hidden) return;
    const fabRect = fab.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();

    const centeredLeft = fabRect.left + (fabRect.width - panelRect.width) / 2;
    const fallbackAbove = fabRect.top - panelRect.height - 12;
    const fallbackBelow = fabRect.bottom + 12;

    const left = clamp(centeredLeft, FAB_MARGIN, window.innerWidth - panelRect.width - FAB_MARGIN);
    const topPreferred = fallbackAbove >= FAB_MARGIN ? fallbackAbove : fallbackBelow;
    const top = clamp(topPreferred, FAB_MARGIN, window.innerHeight - panelRect.height - FAB_MARGIN);

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  };
  let fabPosition = applyFabPosition(getFabDefaultPosition());

  let dragging = false;
  let didMove = false;
  let suppressClick = false;
  let dragPointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let originX = fabPosition.x;
  let originY = fabPosition.y;

  const beginDrag = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    dragging = true;
    didMove = false;
    dragPointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    originX = fabPosition.x;
    originY = fabPosition.y;
    fab.classList.add("is-dragging");
    fab.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event) => {
    if (!dragging || event.pointerId !== dragPointerId) return;
    const dx = event.clientX - dragStartX;
    const dy = event.clientY - dragStartY;
    if (!didMove && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      didMove = true;
    }
    if (!didMove) return;
    event.preventDefault();
    fabPosition = applyFabPosition({
      x: originX + dx,
      y: originY + dy,
    });
    placePanelNearFab();
  };
  const endDrag = (event) => {
    if (!dragging || event.pointerId !== dragPointerId) return;
    dragging = false;
    dragPointerId = null;
    fab.classList.remove("is-dragging");
    fab.releasePointerCapture(event.pointerId);
    if (didMove) {
      suppressClick = true;
      setTimeout(() => {
        suppressClick = false;
      }, 0);
    }
  };

  fab.addEventListener("pointerdown", beginDrag);
  fab.addEventListener("pointermove", moveDrag);
  fab.addEventListener("pointerup", endDrag);
  fab.addEventListener("pointercancel", endDrag);

  const togglePanel = () => {
    if (suppressClick) return;
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    fab.classList.toggle("is-open", !isOpen);
    if (!isOpen) {
      placePanelNearFab();
      chatInput.focus();
    }
  };

  fab.addEventListener("click", togglePanel);
  closeBtn.addEventListener("click", () => {
    panel.hidden = true;
    fab.classList.remove("is-open");
    fab.focus();
  });

  window.addEventListener("resize", () => {
    fabPosition = applyFabPosition(fabPosition);
    placePanelNearFab();
  });

  document.body.append(panel, fab);
  renderSavedList();
}
