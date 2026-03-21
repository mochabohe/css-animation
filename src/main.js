import "./css/variables.css";
import "./css/themes.css";
import "./css/base.css";
import "./css/layout.css";
import "./css/components.css";
import "./css/animations.css";

import {
  createCardRenderer,
  bindFiltering,
  bindToggles,
  bindThemeControls,
  bindLikeButtons,
  bindIntersectionPause,
} from "./ui.js";

const filterButtons = document.querySelectorAll(".filter-btn");
const animationCards = document.querySelectorAll(".card[data-category]");
const searchInput = document.querySelector("#searchInput");
const motionToggle = document.querySelector("#motionToggle");
const themeButtons = document.querySelectorAll(".theme-btn");
const likeButtons = document.querySelectorAll(".like-btn");

// 解析当前 URL 参数做首屏初始化
const urlParams = new URLSearchParams(window.location.search);
const initialFilter = urlParams.get("filter") || "all";
const initialKeyword = urlParams.get("keyword") || "";
const initialOpen = urlParams.get("open") || "";

if (searchInput) {
  searchInput.value = initialKeyword;
}

// 帮助函数：同步状态到 URL（不增加历史堆栈）
const updateURL = (state) => {
  const params = new URLSearchParams(window.location.search);
  if (state.filter && state.filter !== "all") {
    params.set("filter", state.filter);
  } else {
    params.delete("filter");
  }

  if (state.keyword) {
    params.set("keyword", state.keyword);
  } else {
    params.delete("keyword");
  }

  const newUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
  window.history.replaceState(null, "", newUrl);
};

// 使用 Proxy 实现自动响应式状态：任何属性变更自动触发渲染并同步 URL
let renderCards;
const viewState = new Proxy(
  { filter: initialFilter, keyword: initialKeyword, aiMatches: null },
  {
    set(target, prop, value) {
      target[prop] = value;
      if (prop !== "aiMatches") updateURL(target);
      // renderCards 在初始化后赋值，Proxy set 触发时已存在
      if (typeof renderCards === "function") renderCards();
      return true;
    },
  }
);

renderCards = createCardRenderer(animationCards, filterButtons, viewState);

bindFiltering({
  filterButtons,
  searchInput,
  aiSearchBtn: document.querySelector("#aiSearchBtn"),
  viewState,
});

bindToggles({ motionToggle, colorModeToggle: document.querySelector("#colorModeToggle") });

bindThemeControls({
  themeButtons,
  customColorInput: document.querySelector("#customColor"),
  customColorWrapper: document.querySelector(".custom-color-wrapper"),
  colorTextInput: document.querySelector("#colorTextInput"),
});

bindLikeButtons(likeButtons);
renderCards();

document.body.classList.add("show-meta");

// 按需暂停：只有滚动进视口的卡片才运行动画
bindIntersectionPause(animationCards);

// 全局 AI 接口配置（弹窗）
import("./ai.js").then(({ getCustomApi, saveCustomApi, clearCustomApi, PROXY_URL }) => {
  const statusEl = document.getElementById("apiConfigStatus");
  const toggleBtn = document.getElementById("apiConfigToggle");
  if (!statusEl || !toggleBtn) return;

  const updateStatus = () => {
    const { url, key } = getCustomApi();
    if (url && key) {
      statusEl.textContent = "自定义接口";
      statusEl.classList.add("is-custom");
      toggleBtn.textContent = "修改";
    } else {
      statusEl.textContent = "默认 DeepSeek";
      statusEl.classList.remove("is-custom");
      toggleBtn.textContent = "设置";
    }
  };

  updateStatus();

  const openConfigModal = () => {
    // 避免重复打开
    if (document.querySelector(".api-modal-overlay")) return;

    const { url, key, model, format } = getCustomApi();

    const overlay = document.createElement("div");
    overlay.className = "api-modal-overlay";

    const modal = document.createElement("div");
    modal.className = "api-modal";

    modal.innerHTML = `
      <h3 class="api-modal-title">AI 接口配置</h3>
      <p class="api-modal-desc">配置自定义接口后，所有 AI 功能将使用该接口。留空则使用默认 DeepSeek。</p>
      <label class="api-modal-label">接口格式</label>
      <div class="api-modal-format-row">
        <label class="api-modal-radio"><input type="radio" name="_apiFormat" value="openai" ${format !== "claude" ? "checked" : ""} /> OpenAI 兼容 <span class="api-modal-optional">大部分转发代理</span></label>
        <label class="api-modal-radio"><input type="radio" name="_apiFormat" value="claude" ${format === "claude" ? "checked" : ""} /> Claude 原生</label>
      </div>
      <label class="api-modal-label">API URL</label>
      <input class="api-modal-input" id="_apiUrl" type="text" placeholder="${format === "claude" ? "如 https://api.anthropic.com/v1/messages" : "如 https://api.ai-turing.net/v1/chat/completions"}" value="${url}" />
      <label class="api-modal-label">API Key</label>
      <input class="api-modal-input" id="_apiKey" type="password" placeholder="sk-xxxxxxxx" value="${key}" />
      <label class="api-modal-label">模型名称 <span class="api-modal-optional">选填</span></label>
      <input class="api-modal-input" id="_apiModel" type="text" placeholder="默认 claude-sonnet-4-20250514" value="${model}" />
      <div id="_apiTestResult" class="api-config-test-result" hidden></div>
      <div class="api-modal-actions">
        <button id="_apiSave" class="api-modal-btn primary">保存</button>
        <button id="_apiTest" class="api-modal-btn">测试连接</button>
        <button id="_apiClear" class="api-modal-btn danger">恢复默认</button>
        <button id="_apiCancel" class="api-modal-btn">取消</button>
      </div>
    `;

    // 切换格式时更新 placeholder
    modal.querySelectorAll('input[name="_apiFormat"]').forEach(radio => {
      radio.addEventListener("change", () => {
        const f = modal.querySelector('input[name="_apiFormat"]:checked').value;
        modal.querySelector("#_apiUrl").placeholder = f === "claude"
          ? "如 https://api.anthropic.com/v1/messages"
          : "如 https://api.ai-turing.net/v1/chat/completions";
      });
    });

    overlay.append(modal);
    document.body.append(overlay);

    // 动画入场
    requestAnimationFrame(() => overlay.classList.add("is-open"));

    const close = () => {
      overlay.classList.remove("is-open");
      overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
      // 兜底：如果没有 transition 也能清除
      setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 300);
    };

    // 点遮罩关闭
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

    // ESC 关闭
    const onKey = (e) => { if (e.key === "Escape") { close(); document.removeEventListener("keydown", onKey); } };
    document.addEventListener("keydown", onKey);

    // 读取当前选中的格式
    const getFormat = () => modal.querySelector('input[name="_apiFormat"]:checked').value;

    // 保存
    modal.querySelector("#_apiSave").addEventListener("click", () => {
      const u = modal.querySelector("#_apiUrl").value.trim();
      const k = modal.querySelector("#_apiKey").value.trim();
      const m = modal.querySelector("#_apiModel").value.trim();
      const f = getFormat();
      if (!u || !k) { modal.querySelector("#_apiUrl").focus(); return; }
      saveCustomApi(u, k, m, f);
      updateStatus();
      close();
    });

    // 清除
    modal.querySelector("#_apiClear").addEventListener("click", () => {
      clearCustomApi();
      updateStatus();
      close();
    });

    // 取消
    modal.querySelector("#_apiCancel").addEventListener("click", close);

    // 测试连接
    modal.querySelector("#_apiTest").addEventListener("click", async () => {
      const u = modal.querySelector("#_apiUrl").value.trim();
      const k = modal.querySelector("#_apiKey").value.trim();
      const m = modal.querySelector("#_apiModel").value.trim() || "claude-sonnet-4-20250514";
      const f = getFormat();
      const testBtn = modal.querySelector("#_apiTest");
      const resultEl = modal.querySelector("#_apiTestResult");

      if (!u || !k) {
        resultEl.hidden = false;
        resultEl.textContent = "请先填写 URL 和 Key";
        resultEl.className = "api-config-test-result is-error";
        return;
      }

      testBtn.disabled = true;
      testBtn.textContent = "测试中…";
      resultEl.hidden = false;
      resultEl.textContent = "正在连接…";
      resultEl.className = "api-config-test-result";

      // 根据格式构建请求头；相对路径走 Vite 本地代理，否则通过 FC 代理转发
      const isLocalProxy = u.startsWith("/");
      const fetchUrl = isLocalProxy ? u : (PROXY_URL || u);
      const headers = { "Content-Type": "application/json" };
      if (!isLocalProxy && PROXY_URL) headers["X-Target-Url"] = u;
      let body;
      if (f === "claude") {
        headers["x-api-key"] = k;
        headers["anthropic-version"] = "2023-06-01";
        body = JSON.stringify({ model: m, max_tokens: 16, messages: [{ role: "user", content: "Say hi in 3 words" }] });
      } else {
        headers.Authorization = `Bearer ${k}`;
        body = JSON.stringify({ model: m, messages: [{ role: "user", content: "Say hi in 3 words" }], max_tokens: 16, stream: false });
      }

      try {
        const res = await fetch(fetchUrl, { method: "POST", headers, body });
        if (res.ok) {
          const data = await res.json();
          // 兼容两种响应格式
          const content = data.choices?.[0]?.message?.content || data.content?.[0]?.text || "";
          resultEl.textContent = `连接成功 ✓  模型: ${m}${content ? "  回复: " + content.slice(0, 30) : ""}`;
          resultEl.className = "api-config-test-result is-success";
        } else {
          const errText = await res.text().catch(() => "");
          let hint = "";
          if (res.status === 401) hint = " (Key 无效或已过期)";
          else if (res.status === 403) hint = " (无权限访问)";
          else if (res.status === 404) hint = " (URL 路径不正确)";
          resultEl.textContent = `失败 (${res.status}${hint})${errText ? ": " + errText.slice(0, 80) : ""}`;
          resultEl.className = "api-config-test-result is-error";
        }
      } catch (err) {
        resultEl.textContent = `网络错误: ${err.message}`;
        resultEl.className = "api-config-test-result is-error";
      } finally {
        testBtn.disabled = false;
        testBtn.textContent = "测试连接";
      }
    });

    // Enter 快捷保存
    modal.querySelectorAll(".api-modal-input").forEach(el => {
      el.addEventListener("keydown", (e) => { if (e.key === "Enter") modal.querySelector("#_apiSave").click(); });
    });

    modal.querySelector("#_apiUrl").focus();
  };

  toggleBtn.addEventListener("click", openConfigModal);
});

// 异步加载 AI 工坊模块，不阻塞首屏渲染
import("./aiPanel.js").then(({ initAiPanel }) => {
  initAiPanel();
});

// 异步加载 Code Lab 模块（snippets.js 67KB + modal.js 18KB），不阻塞首屏渲染
import("./snippetPanels.js").then(({ attachSnippetPanels }) => {
  attachSnippetPanels(animationCards);

  // URL 带 open 参数时，等 snippetPanels 就绪后再自动触发
  if (initialOpen) {
    const targetCard = Array.from(animationCards).find((card) => {
      const title = card.querySelector("h2")?.textContent?.trim() || "";
      return title === initialOpen;
    });
    if (targetCard) {
      const toggleBtn = targetCard.querySelector(".snippet-toggle");
      if (toggleBtn) {
        // 延迟一帧让UI稳定后自动触发
        requestAnimationFrame(() => {
          toggleBtn.click();
        });
      }
    }
  }
});

