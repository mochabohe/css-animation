import { rgbToHsl, hslToRgb, generateColorVariants } from "./utils.js";
import { searchAnimations } from "./ai.js";
import { animationSemanticIndex } from "./data.js";

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

  // 预索引：初始化时缓存搜索文本，避免每次渲染重复 DOM 查询
  const cardIndex = [...cards].map((card) => {
    const rawTitle = card.querySelector("h2")?.textContent?.trim() || "";
    return {
      el: card,
      category: card.dataset.category || "",
      titleRaw: rawTitle,
      title: rawTitle.toLowerCase(),
      tag: card.querySelector(".card-tag")?.textContent?.toLowerCase() || "",
      categoryName: categoryNames[card.dataset.category]?.toLowerCase() || "",
    };
  });

  return function renderCards() {
    const normalizedKeyword = viewState.keyword.trim().toLowerCase();
    const aiMatches = viewState.aiMatches;
    // 构建 AI 匹配标题集合和理由映射
    const aiMatchTitles = aiMatches ? new Set(aiMatches.map((m) => m.title)) : null;
    const aiReasonMap = aiMatches
      ? new Map(aiMatches.map((m) => [m.title, m.reason]))
      : null;

    // 按关键词统计各分类数量（不受 filter 限制，用于按钮徽章）
    const categoryCount = {};
    let visibleCount = 0;

    cardIndex.forEach(({ el: card, category, title, titleRaw, tag, categoryName }) => {
      // 清理之前的 AI 匹配状态
      card.classList.remove("ai-matched");
      const oldReason = card.querySelector(".ai-match-reason");
      if (oldReason) oldReason.remove();

      // AI 搜索模式：仅显示匹配的卡片
      if (aiMatchTitles) {
        const isAiMatch = aiMatchTitles.has(titleRaw);
        const matchFilter = viewState.filter === "all" || category === viewState.filter;
        const visible = isAiMatch && matchFilter;
        card.hidden = !visible;
        card.setAttribute("aria-hidden", String(!visible));
        if (visible) {
          visibleCount++;
          card.classList.add("ai-matched");
          // 添加推荐理由标签
          const reason = aiReasonMap.get(titleRaw);
          if (reason) {
            const reasonEl = document.createElement("div");
            reasonEl.className = "ai-match-reason";
            reasonEl.textContent = reason;
            card.style.position = "relative";
            card.append(reasonEl);
          }
        }
        if (isAiMatch) {
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        }
        return;
      }

      // 普通搜索模式
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
    // 有关键词且未使用 AI 搜索时显示 AI 搜索按钮
    const showAiSearchSuggestion = !!normalizedKeyword && !aiMatchTitles;
    const emptyAiBtn = document.querySelector("#emptyAiSearchBtn");
    if (emptyAiBtn) {
      emptyAiBtn.hidden = visibleCount > 0 || !showAiSearchSuggestion;
    }
    const resultAiBtn = document.querySelector("#resultAiSearchBtn");
    if (resultAiBtn) {
      resultAiBtn.hidden = visibleCount === 0 || !showAiSearchSuggestion;
    }
    if (resultCountEl) {
      resultCountEl.textContent =
        aiMatchTitles
          ? `AI 找到 ${visibleCount} 个匹配动画`
          : normalizedKeyword || viewState.filter !== "all"
            ? `找到 ${visibleCount} 个动画`
            : `共 ${visibleCount} 个动画`;
    }
  };
}

export function bindFiltering({ filterButtons, searchInput, aiSearchBtn, viewState }) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.filter || "all";
      // 点击「全部」时同时清空搜索关键词和 AI 搜索状态，实现完整重置
      if (target === "all" && (viewState.keyword || viewState.aiMatches)) {
        if (searchInput) searchInput.value = "";
        viewState.aiMatches = null;
        viewState.keyword = "";
        // 移除 AI 搜索清除按钮
        const clearBtn = document.querySelector(".ai-search-clear");
        if (clearBtn) clearBtn.remove();
      }
      viewState.filter = target;
    });
  });

  if (!searchInput) return;
  let searchDebounceTimer = null;

  // AI 搜索提示气泡
  let aiSearchHint = null;
  const showAiSearchHint = () => {
    if (aiSearchHint || !aiSearchBtn) return;
    aiSearchHint = document.createElement("div");
    aiSearchHint.className = "ai-search-hint";
    aiSearchHint.textContent = "点击 AI 按钮智能搜索";
    aiSearchBtn.parentElement.style.position = "relative";
    aiSearchBtn.parentElement.appendChild(aiSearchHint);
  };
  const hideAiSearchHint = () => {
    if (aiSearchHint) {
      aiSearchHint.remove();
      aiSearchHint = null;
    }
  };

  searchInput.addEventListener("input", (event) => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      // 普通输入时清除 AI 搜索状态
      if (viewState.aiMatches) viewState.aiMatches = null;
      viewState.keyword = event.target.value || "";
      // 有内容且非 AI 搜索状态时显示提示
      if (event.target.value.trim() && !viewState.aiMatches) {
        showAiSearchHint();
      } else {
        hideAiSearchHint();
      }
    }, 100);
  });

  // AI 智能搜索
  if (!aiSearchBtn) return;

  const resultCountEl = document.querySelector("#resultCount");
  const emptyStateEl = document.querySelector("#emptyState");

  const doAiSearch = async () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchInput.focus();
      return;
    }

    hideAiSearchHint();
    const emptyAiBtn = document.querySelector("#emptyAiSearchBtn");
    if (emptyAiBtn) emptyAiBtn.hidden = true;
    const resultAiBtn = document.querySelector("#resultAiSearchBtn");
    if (resultAiBtn) resultAiBtn.hidden = true;
    aiSearchBtn.disabled = true;
    aiSearchBtn.classList.add("is-loading");

    // 搜索期间：隐藏结果计数，在内容区居中显示搜索状态
    if (resultCountEl) resultCountEl.hidden = true;
    if (emptyStateEl) {
      emptyStateEl.hidden = false;
      emptyStateEl.classList.add("ai-searching");
      const title = emptyStateEl.querySelector(".empty-title");
      const hint = emptyStateEl.querySelector(".empty-hint");
      const icon = emptyStateEl.querySelector(".empty-icon");
      if (title) title.textContent = "AI 正在搜索中…";
      if (hint) hint.textContent = "正在理解语义并匹配最相关的动画";
      if (icon) icon.hidden = true;
    }

    try {
      const matches = await searchAnimations(query, animationSemanticIndex);
      viewState.aiMatches = matches.length > 0 ? matches : null;

      // 添加清除按钮
      if (matches.length > 0) {
        showClearButton(viewState, searchInput);
      }
    } catch {
      // 搜索失败时静默处理
    } finally {
      aiSearchBtn.disabled = false;
      aiSearchBtn.classList.remove("is-loading");
      // 恢复空状态区域的默认内容
      if (emptyStateEl) {
        emptyStateEl.classList.remove("ai-searching");
        const title = emptyStateEl.querySelector(".empty-title");
        const hint = emptyStateEl.querySelector(".empty-hint");
        const icon = emptyStateEl.querySelector(".empty-icon");
        if (title) title.textContent = "没有找到匹配的动画";
        if (hint) hint.textContent = "换个关键词试试，或点击「全部」查看所有效果";
        if (icon) icon.hidden = false;
      }
      if (resultCountEl) resultCountEl.hidden = false;
    }
  };

  aiSearchBtn.addEventListener("click", doAiSearch);

  // 空状态 + 结果栏的 AI 搜索按钮
  const emptyAiSearchBtn = document.querySelector("#emptyAiSearchBtn");
  if (emptyAiSearchBtn) {
    emptyAiSearchBtn.addEventListener("click", doAiSearch);
  }
  const resultAiSearchBtn = document.querySelector("#resultAiSearchBtn");
  if (resultAiSearchBtn) {
    resultAiSearchBtn.addEventListener("click", doAiSearch);
  }

  // Ctrl+Enter 快捷键触发 AI 搜索
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      doAiSearch();
    }
  });
}

function showClearButton(viewState, searchInput) {
  // 避免重复添加
  const existing = document.querySelector(".ai-search-clear");
  if (existing) return;

  const resultCountEl = document.querySelector("#resultCount");
  if (!resultCountEl) return;

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "ai-search-clear";
  clearBtn.textContent = "✕ 清除 AI 搜索";
  clearBtn.addEventListener("click", () => {
    viewState.aiMatches = null;
    clearBtn.remove();
    searchInput.focus();
  });

  resultCountEl.after(clearBtn);
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
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      isLiked = !isLiked;
      button.setAttribute("aria-pressed", String(isLiked));

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
