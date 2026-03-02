import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { categoryInsights, animationNamesByTitle, animationParams } from "./data.js";
import { snippetsByTitle } from "./snippets.js";
import { cssVarFallback } from "./utils.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function extractCardTitles(html) {
  const titles = [];
  const regex = /<h2>([^<]+)<\/h2>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const title = match[1].trim();
    if (title) titles.push(title);
  }
  return titles;
}

// 测试环境的 CSS 变量替换（不依赖 DOM）
function testNormalizeCss(cssText) {
  return cssText.replace(
    /var\((--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\)/gi,
    (_, name, fallback) => {
      if (cssVarFallback[name]) return cssVarFallback[name];
      if (fallback) return fallback.trim();
      return name;
    },
  );
}

// 从 animations.css 提取所有 @keyframes 名称
function extractKeyframeNames(cssText) {
  const names = new Set();
  const re = /@keyframes\s+(\w+)/g;
  let m;
  while ((m = re.exec(cssText)) !== null) {
    names.add(m[1]);
  }
  return names;
}

// transition 类 target（CSS 属性名，而非 keyframe 名），这些不需要在 animation: 中匹配
const TRANSITION_TARGETS = new Set([
  "all", "transform", "opacity", "fill", "stroke-dashoffset",
]);

// 与 modal.js 中一致的正则常量
const DURATION_RE = "(?:\\d+\\.?\\d*s|calc\\([^)]+\\))";
const MID_GAP_RE = "\\s+(?:(?:infinite|both|forwards|backwards|\\d+)\\s+)?";
const TIMING_PATTERN =
  "ease-in-out|ease-in|ease-out|ease|linear|step-start|step-end|cubic-bezier\\([^)]+\\)|steps\\([^)]+\\)";

describe("animation data integrity", () => {
  it("keeps required category mappings", () => {
    expect(categoryInsights.loading?.scenario).toBeTruthy();
    expect(categoryInsights.interactive?.token).toBe("motion.interactive");
  });

  it("keeps keyframe name mapping for major demos", () => {
    expect(animationNamesByTitle["加载脉冲"]).toContain("spin");
    expect(animationNamesByTitle["柱状图生长"]).toContain("barGrow");
  });

  it("keeps snippet and keyframe mapping for all cards", () => {
    const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
    const titles = extractCardTitles(html);
    expect(titles.length).toBeGreaterThan(0);

    titles.forEach((title) => {
      expect(snippetsByTitle[title]).toBeTruthy();
      expect(Object.prototype.hasOwnProperty.call(animationNamesByTitle, title)).toBe(true);
    });
  });
});

describe("animationNamesByTitle — keyframes exist in animations.css", () => {
  const animCss = fs.readFileSync(
    path.join(projectRoot, "src", "css", "animations.css"),
    "utf8",
  );
  const allKeyframes = extractKeyframeNames(animCss);

  for (const [title, names] of Object.entries(animationNamesByTitle)) {
    if (names.length === 0) continue; // 纯 transition 动画无 keyframe

    it(`"${title}" 的所有 keyframe 名称都存在于 animations.css`, () => {
      for (const name of names) {
        expect(
          allKeyframes.has(name),
          `keyframe "${name}" (动画 "${title}") 在 animations.css 中不存在`,
        ).toBe(true);
      }
    });
  }
});

describe("animationParams — target 在对应 snippet CSS 中有效", () => {
  for (const [title, params] of Object.entries(animationParams)) {
    const snippet = snippetsByTitle[title];
    if (!snippet) continue;

    const normalizedCss = testNormalizeCss(snippet);

    // 收集所有去重后的 target
    const targets = [...new Set(
      Object.values(params).map((c) => c.target),
    )];

    for (const target of targets) {
      if (TRANSITION_TARGETS.has(target)) continue; // 跳过 transition 类

      it(`"${title}" 的 target "${target}" 出现在 snippet CSS 中`, () => {
        // target 可能是正则模式如 (?:sandStream|sandTop|sandBottom|hgFlip)
        const re = new RegExp(target);
        expect(
          re.test(normalizedCss),
          `target "${target}" 在 "${title}" 的 snippet CSS 中未找到匹配`,
        ).toBe(true);
      });
    }
  }
});

describe("animationParams — 参数调节正则能匹配 snippet CSS", () => {
  for (const [title, params] of Object.entries(animationParams)) {
    const snippet = snippetsByTitle[title];
    if (!snippet) continue;

    const normalizedCss = testNormalizeCss(snippet);

    // 按 target 分组
    const byTarget = {};
    for (const [, config] of Object.entries(params)) {
      const t = config.target;
      if (TRANSITION_TARGETS.has(t)) continue;
      if (!byTarget[t]) byTarget[t] = [];
      byTarget[t].push(config);
    }

    for (const [target, configs] of Object.entries(byTarget)) {
      const hasDuration = configs.some((c) => c.type === "range");
      const hasTiming = configs.some((c) => c.type === "select");

      if (hasDuration && hasTiming) {
        it(`"${title}" target "${target}" 的 duration+timing 正则能匹配`, () => {
          const re = new RegExp(
            `${target}\\s+(${DURATION_RE})(${MID_GAP_RE})(${TIMING_PATTERN})`,
          );
          const matched = re.test(normalizedCss);
          // 若主正则不匹配，检查是否有 animation-duration 备用声明（如流星雨）
          if (!matched) {
            const fallback = /animation-duration:\s*\d+\.?\d*s/.test(normalizedCss);
            expect(
              fallback,
              `"${title}" target "${target}" 既无 shorthand 匹配也无 animation-duration 声明`,
            ).toBe(true);
          }
        });
      } else if (hasDuration) {
        it(`"${title}" target "${target}" 的 duration 正则能匹配`, () => {
          const re = new RegExp(`${target}\\s+(${DURATION_RE})`);
          const matched = re.test(normalizedCss);
          if (!matched) {
            const fallback = /animation-duration:\s*\d+\.?\d*s/.test(normalizedCss);
            expect(
              fallback,
              `"${title}" target "${target}" 既无 shorthand 匹配也无 animation-duration 声明`,
            ).toBe(true);
          }
        });
      }
    }
  }
});

describe("animationParams — shorthand duration 不被 animation-duration 覆盖", () => {
  for (const [title, params] of Object.entries(animationParams)) {
    const snippet = snippetsByTitle[title];
    if (!snippet) continue;

    const normalizedCss = testNormalizeCss(snippet);

    const targets = [...new Set(
      Object.values(params).filter((c) => c.type === "range").map((c) => c.target),
    )];

    for (const target of targets) {
      if (TRANSITION_TARGETS.has(target)) continue;

      // 检查 shorthand 中是否带了 duration
      const shorthandRe = new RegExp(`${target}\\s+(${DURATION_RE})`);
      const hasShorthandDuration = shorthandRe.test(normalizedCss);
      if (!hasShorthandDuration) continue; // 走 fallback 比例缩放逻辑，不受此约束

      it(`"${title}" shorthand 已含 duration，不应有 animation-duration 覆盖`, () => {
        // 如果 shorthand 中已有 duration，snippet 中不应出现 animation-duration 覆盖
        // 否则参数面板改 shorthand 的值会被覆盖，用户看不到效果
        const overrideRe = /animation-duration:\s*\d+\.?\d*s/;
        expect(
          overrideRe.test(normalizedCss),
          `"${title}" 的 snippet 中 shorthand 已包含 duration，但又有 animation-duration 覆盖，参数调节会失效`,
        ).toBe(false);
      });
    }
  }
});
