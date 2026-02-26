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

// 使用 Proxy 实现自动响应式状态：任何属性变更自动触发渲染
let renderCards;
const viewState = new Proxy(
  { filter: "all", keyword: "" },
  {
    set(target, prop, value) {
      target[prop] = value;
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
  renderCards,
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

