import { rgbToHsl, hslToRgb, generateColorVariants } from "./utils.js";

const categoryNames = {
  loading: "加载反馈",
  motion: "运动效果",
  interactive: "交互按钮",
  transform: "3D 变换",
  text: "文字特效",
  background: "背景氛围",
  wave: "声波条纹",
};

export function createCardRenderer(cards, filterButtons, viewState) {
  return function renderCards() {
    const normalizedKeyword = viewState.keyword.trim().toLowerCase();

    cards.forEach((card) => {
      const category = card.dataset.category;
      const title = card.querySelector("h2")?.textContent?.toLowerCase() || "";
      const tag = card.querySelector(".card-tag")?.textContent?.toLowerCase() || "";
      const categoryName = categoryNames[category]?.toLowerCase() || "";

      const matchFilter = viewState.filter === "all" || category === viewState.filter;
      const matchKeyword =
        !normalizedKeyword ||
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
  };
}

export function bindFiltering({ filterButtons, searchInput, viewState, renderCards }) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      viewState.filter = button.dataset.filter || "all";
      renderCards();
    });
  });

  if (!searchInput) return;
  searchInput.addEventListener("input", (event) => {
    viewState.keyword = event.target.value || "";
    renderCards();
  });
}

export function bindToggles({ motionToggle, metaToggle }) {
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
}

function applyCustomColor(color, elements) {
  const variants = generateColorVariants(color);
  if (!variants) return null;

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
    `rgb(${accent2Hsl.r}, ${accent2Hsl.g}, ${accent2Hsl.b})`,
  );
  document.documentElement.style.setProperty(
    "--accent-soft",
    `rgb(${accentSoftHsl.r}, ${accentSoftHsl.g}, ${accentSoftHsl.b})`,
  );
  document.documentElement.style.setProperty(
    "--accent-deep",
    `rgb(${accentDeepHsl.r}, ${accentDeepHsl.g}, ${accentDeepHsl.b})`,
  );

  elements.themeButtons.forEach((button) => {
    button.classList.remove("is-active");
  });
  elements.customColorWrapper?.classList.add("is-active");

  return variants.hexColor;
}

export function bindThemeControls({ themeButtons, customColorInput, customColorWrapper, colorTextInput }) {
  const clearInlineThemeVars = () => {
    const vars = [
      "--accent",
      "--accent-rgb",
      "--accent-2",
      "--accent-2-rgb",
      "--accent-soft",
      "--accent-soft-rgb",
      "--accent-deep",
      "--accent-deep-rgb",
    ];
    vars.forEach((name) => {
      document.documentElement.style.removeProperty(name);
    });
  };

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;
      document.documentElement.setAttribute("data-theme", theme);
      clearInlineThemeVars();

      themeButtons.forEach((btn) => {
        btn.classList.toggle("is-active", btn === button);
      });
      customColorWrapper?.classList.remove("is-active");
      if (colorTextInput) {
        colorTextInput.value = "";
        colorTextInput.classList.remove("error");
      }
    });
  });

  if (customColorInput) {
    customColorInput.addEventListener("input", (event) => {
      const hexColor = applyCustomColor(event.target.value, {
        themeButtons,
        customColorWrapper,
      });
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

      const hexColor = applyCustomColor(color, {
        themeButtons,
        customColorWrapper,
      });

      if (hexColor) {
        colorTextInput.classList.remove("error");
        if (customColorInput) {
          customColorInput.value = hexColor;
        }
      } else {
        colorTextInput.classList.add("error");
      }
    });

    colorTextInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.target.blur();
      }
    });
  }
}

export function bindLikeButtons(buttons) {
  buttons.forEach((button) => {
    let isLiked = false;
    button.addEventListener("click", () => {
      isLiked = !isLiked;

      if (isLiked) {
        button.classList.add("liked", "animating");
        setTimeout(() => {
          button.classList.remove("animating");
        }, 600);
      } else {
        button.classList.add("unliking");
        setTimeout(() => {
          button.classList.remove("liked", "unliking");
        }, 300);
      }
    });
  });
}
