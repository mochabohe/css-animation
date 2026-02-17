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
} from "./ui.js";

const filterButtons = document.querySelectorAll(".filter-btn");
const animationCards = document.querySelectorAll(".card[data-category]");
const searchInput = document.querySelector("#searchInput");
const motionToggle = document.querySelector("#motionToggle");
const metaToggle = document.querySelector("#metaToggle");
const themeButtons = document.querySelectorAll(".theme-btn");
const likeButtons = document.querySelectorAll(".like-btn");

const viewState = {
  filter: "all",
  keyword: "",
};

const renderCards = createCardRenderer(animationCards, filterButtons, viewState);

bindFiltering({
  filterButtons,
  searchInput,
  viewState,
  renderCards,
});

bindToggles({ motionToggle, metaToggle });

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
