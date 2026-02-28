import {
  animationNamesByTitle,
  animationParams,
  animationScenarioOverrides,
  categoryInsights,
} from "./data.js";
import { snippetsByTitle } from "./snippets.js";
import { extractKeyframesMap, collectDemoHtml } from "./utils.js";
import { createCodeModal } from "./modal.js";
import { transformAnimation } from "./ai.js";

function hashString(value) {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.codePointAt(0)) | 0;
  }
  return Math.abs(hash);
}

function pickScenario(scenario, title) {
  if (Array.isArray(scenario)) {
    if (!scenario.length) return "";
    const index = hashString(title) % scenario.length;
    return scenario[index];
  }
  return scenario || "";
}

function buildFullCss(title, keyframesMap) {
  const liteSnippet = snippetsByTitle[title];
  const keyframeNames = animationNamesByTitle[title] || [];
  const keyframesCss = keyframeNames
    .map((name) => keyframesMap.get(name))
    .filter(Boolean)
    .join("\n\n");

  if (!keyframesCss) {
    return `${liteSnippet}\n\n/* 此效果主要依赖 transition/transform，无额外 keyframes */`;
  }

  return `${liteSnippet}\n\n${keyframesCss}`;
}

export function attachSnippetPanels(cards) {
  const keyframesMap = extractKeyframesMap();

  cards.forEach((card) => {
    if (card.querySelector(".card-inner")) {
      return;
    }

    const title = card.querySelector("h2")?.textContent?.trim();
    if (!title || !snippetsByTitle[title]) {
      return;
    }

    const originalNodes = [...card.childNodes];
    const demoHtml = collectDemoHtml(originalNodes);
    const fullCss = buildFullCss(title, keyframesMap);

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-face card-front";

    originalNodes.forEach((node) => {
      front.append(node);
    });

    const category = card.dataset.category || "loading";
    const insight = categoryInsights[category] || categoryInsights.loading;

    const metaRow = document.createElement("div");
    metaRow.className = "meta-row";

    const sceneBadge = document.createElement("span");
    sceneBadge.className = "meta-badge";
    const overrideScenario = animationScenarioOverrides?.[title];
    const scenarioText = pickScenario(overrideScenario ?? insight.scenario, title);
    sceneBadge.textContent = scenarioText ? `场景: ${scenarioText}` : "场景: 未定义";
    metaRow.append(sceneBadge);

    const openBtn = document.createElement("button");
    openBtn.className = "snippet-toggle";
    openBtn.type = "button";
    openBtn.setAttribute("aria-label", `打开 ${title} 代码实验室`);
    openBtn.textContent = "代码实验室";

    const openModal = () => {
      const previousActiveElement = document.activeElement;
      const modal = createCodeModal({
        title,
        demoHtml,
        fullCss,
        currentParams: animationParams[title],
        previousActiveElement,
        onTrackCopy: (name) => {
          if (typeof _hmt !== "undefined") {
            _hmt.push(["_trackEvent", "动画复制", "copy", name]);
          }
        },
        onAiTransform: (instruction, html, css, onChunk) => transformAnimation(instruction, html, css, onChunk),
      });

      document.body.append(modal);
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
        modal.focus(); // 先聚焦 modal 本身以激活键盘事件接收
        const firstFocusable = modal.querySelector("button");
        if (firstFocusable) {
          firstFocusable.focus();
        }
      });
    };

    openBtn.addEventListener("click", openModal);
    // 键盘无障碍：Enter 和 Space 也可触发
    openBtn.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal();
      }
    });

    front.append(metaRow, openBtn);

    card.replaceChildren(inner);
    inner.append(front);
  });
}
