import { categoryInsights, animationParams, animationNamesByTitle } from "./data.js";
import { snippetsByTitle } from "./snippets.js";
import { extractKeyframesMap, collectDemoHtml } from "./utils.js";
import { createCodeModal } from "./modal.js";

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
    sceneBadge.textContent = `场景: ${insight.scenario}`;
    metaRow.append(sceneBadge);

    const openBtn = document.createElement("button");
    openBtn.className = "snippet-toggle";
    openBtn.type = "button";
    openBtn.textContent = "代码实验室";

    openBtn.addEventListener("click", () => {
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
      });

      document.body.append(modal);
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
        const firstFocusable = modal.querySelector("button");
        if (firstFocusable) {
          firstFocusable.focus();
        }
      });
    });

    front.append(metaRow, openBtn);

    card.replaceChildren(inner);
    inner.append(front);
  });
}
