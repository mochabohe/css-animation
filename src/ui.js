import { rgbToHsl, hslToRgb, generateColorVariants } from "./utils.js";

const categoryNames = {
  loading: "加载反馈",
  motion: "运动效果",
  interactive: "交互按钮",
  empty: "空结果",
  text: "文字特效",
  background: "背景氛围",
  wave: "声波条纹",
  bigdata: "大数据",
};

export function createCardRenderer(cards, filterButtons, viewState) {
  const resultCountEl = document.querySelector("#resultCount");
  const emptyStateEl = document.querySelector("#emptyState");

  return function renderCards() {
    const normalizedKeyword = viewState.keyword.trim().toLowerCase();
    // 按关键词统计各分类数量（不受 filter 限制，用于按钮徽章）
    const categoryCount = {};
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.dataset.category;
      const title = card.querySelector("h2")?.textContent?.toLowerCase() || "";
      const tag = card.querySelector(".card-tag")?.textContent?.toLowerCase() || "";
      const categoryName = categoryNames[category]?.toLowerCase() || "";

      const matchKeyword =
        !normalizedKeyword ||
        title.includes(normalizedKeyword) ||
        tag.includes(normalizedKeyword) ||
        categoryName.includes(normalizedKeyword);

      if (matchKeyword) {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      }

      const matchFilter = viewState.filter === "all" || category === viewState.filter;
      const visible = matchFilter && matchKeyword;
      card.hidden = !visible;
      card.setAttribute("aria-hidden", String(!visible));
      if (visible) visibleCount++;
    });

    const totalKeywordMatch = Object.values(categoryCount).reduce((s, n) => s + n, 0);

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === viewState.filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));

      const countEl = button.querySelector(".filter-count");
      if (countEl) {
        const filter = button.dataset.filter;
        const count = filter === "all" ? totalKeywordMatch : (categoryCount[filter] || 0);
        countEl.textContent = count > 0 ? count : "";
      }
    });

    if (emptyStateEl) emptyStateEl.hidden = visibleCount > 0;
    if (resultCountEl) {
      resultCountEl.textContent =
        normalizedKeyword || viewState.filter !== "all"
          ? `找到 ${visibleCount} 个动画`
          : `共 ${visibleCount} 个动画`;
    }
  };
}

export function bindFiltering({ filterButtons, searchInput, viewState }) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      viewState.filter = button.dataset.filter || "all";
    });
  });

  if (!searchInput) return;
  let searchDebounceTimer = null;
  searchInput.addEventListener("input", (event) => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      viewState.keyword = event.target.value || "";
    }, 100);
  });
}

export function bindToggles({ motionToggle, colorModeToggle }) {
  if (motionToggle) {
    // 初始化：读取 body 当前状态，同步 aria-pressed 和文本
    const initialReduced = document.body.classList.contains("reduced-preview");
    motionToggle.setAttribute("aria-pressed", String(initialReduced));
    motionToggle.textContent = initialReduced ? "开启" : "关闭";

    motionToggle.addEventListener("click", () => {
      const enabled = document.body.classList.toggle("reduced-preview");
      motionToggle.setAttribute("aria-pressed", String(enabled));
      motionToggle.textContent = enabled ? "开启" : "关闭";
    });
  }

  if (colorModeToggle) {
    // 系统偏好检测
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // 读取 localStorage，未设置则跟随系统偏好
    const stored = localStorage.getItem("color-mode");
    const initialMode = stored || (prefersDark.matches ? "dark" : "light");
    applyColorMode(initialMode, colorModeToggle);

    colorModeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-color-mode") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyColorMode(next, colorModeToggle);
      localStorage.setItem("color-mode", next);
    });

    // 系统主题变化时，若用户未手动设置则跟随
    prefersDark.addEventListener("change", (e) => {
      if (!localStorage.getItem("color-mode")) {
        applyColorMode(e.matches ? "dark" : "light", colorModeToggle);
      }
    });
  }
}

function applyColorMode(mode, button) {
  document.documentElement.setAttribute("data-color-mode", mode);
  if (button) {
    button.textContent = mode === "dark" ? "亮色模式" : "暗色模式";
    button.setAttribute("aria-pressed", String(mode === "light"));
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

/**
 * 使用 IntersectionObserver 对卡片按需暂停/恢复动画。
 * 当卡片离开视口时，给卡片加 data-paused 属性，CSS 负责暂停其内所有动画；
 * 重新进入视口时移除属性，动画自动恢复，大幅降低 CPU/GPU 占用。
 * @param {NodeList|Element[]} cards - 所有动画卡片
 */
export function bindIntersectionPause(cards) {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          delete entry.target.dataset.paused;
        } else {
          entry.target.dataset.paused = '';
        }
      });
    },
    {
      rootMargin: '80px 0px',  // 提前 80px 恢复，避免动画首帧跳变
      threshold: 0,
    }
  );

  cards.forEach((card) => observer.observe(card));
}
