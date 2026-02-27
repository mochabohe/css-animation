import "./css/variables.css";
import "./css/themes.css";
import "./css/base.css";
import "./css/layout.css";
import "./css/components.css";
import "./css/animations.css";

import { attachSnippetPanels } from "./snippetPanels.js";
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
const metaToggle = document.querySelector("#metaToggle");
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
  { filter: initialFilter, keyword: initialKeyword },
  {
    set(target, prop, value) {
      target[prop] = value;
      updateURL(target);
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
  viewState,
});

bindToggles({ motionToggle, metaToggle, colorModeToggle: document.querySelector("#colorModeToggle") });

bindThemeControls({
  themeButtons,
  customColorInput: document.querySelector("#customColor"),
  customColorWrapper: document.querySelector(".custom-color-wrapper"),
  colorTextInput: document.querySelector("#colorTextInput"),
});

bindLikeButtons(likeButtons);
attachSnippetPanels(animationCards);
renderCards();

document.body.classList.add("show-meta");

// 按需暂停：只有滚动进视口的卡片才运行动画
bindIntersectionPause(animationCards);

// 如果 URL 带了 open 参数，自动弹开特定配置的 Code Lab
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

