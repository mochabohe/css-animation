import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { animationParams } from "../src/data.js";
import { snippetsByTitle } from "../src/snippets.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const TRANSITION_TARGETS = new Set([
  "all",
  "transform",
  "opacity",
  "fill",
  "stroke-dashoffset",
]);

const MID_GAP_RE = "\\s+(?:(?:infinite|both|forwards|backwards|\\d+)\\s+)?";
const TIMING_PATTERN =
  "ease-in-out|ease-in|ease-out|ease|linear|step-start|step-end|cubic-bezier\\([^)]+\\)|steps\\([^)]+\\)";

const cssVarFallback = {
  "--fx-duration": "calc(1.4s / 1)",
  "--fx-easing": "ease-in-out",
  "--speed-multiplier": "1",
};

function parseDurationSeconds(raw) {
  const match = String(raw).match(/(\d+\.?\d*)\s*s/);
  return match ? Number.parseFloat(match[1]) : Number.NaN;
}

function normalizeCssVariables(cssText) {
  let result = cssText.replace(
    /var\((--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\)/gi,
    (_match, name, fallback) => {
      if (cssVarFallback[name]) return cssVarFallback[name];
      if (fallback) return fallback.trim();
      return name;
    },
  );

  result = result.replace(/(--[a-z0-9-]+)/gi, (token) => cssVarFallback[token] ?? token);
  return result;
}

function readDurationPattern() {
  const modalPath = path.join(projectRoot, "src", "modal.js");
  const modalText = fs.readFileSync(modalPath, "utf8");
  const match = modalText.match(/const DURATION_RE = "([^"]+)";/);
  if (!match) {
    throw new Error("未在 src/modal.js 中找到 DURATION_RE");
  }
  return match[1].replace(/\\\\/g, "\\");
}

function collectIssues(durationPattern) {
  const issues = [];

  const nestedCalcProbe = "calc(calc(1.4s / 1) * 1.2 / 1)";
  const nestedCalcSupported = new RegExp(`^${durationPattern}$`).test(nestedCalcProbe);
  if (!nestedCalcSupported) {
    issues.push("DURATION_RE 不支持嵌套 calc(...)");
  }

  for (const [title, params] of Object.entries(animationParams)) {
    const snippet = snippetsByTitle[title];
    if (!snippet) continue;

    const normalizedCss = normalizeCssVariables(snippet);
    const byTarget = {};

    for (const [key, config] of Object.entries(params)) {
      const target = config.target;
      if (!byTarget[target]) byTarget[target] = { duration: null, timing: null };
      if (config.type === "range" && !byTarget[target].duration) {
        byTarget[target].duration = { key, config };
      }
      if (config.type === "select" && !byTarget[target].timing) {
        byTarget[target].timing = { key, config };
      }
    }

    for (const [target, entry] of Object.entries(byTarget)) {
      if (TRANSITION_TARGETS.has(target)) continue;
      if (!entry.duration && !entry.timing) continue;

      const animRegex = new RegExp(
        `(${target}\\s+)(${durationPattern})(${MID_GAP_RE})(${TIMING_PATTERN})`,
        "g",
      );

      let matched = false;
      const replacedCss = normalizedCss.replace(
        animRegex,
        (_match, name, _dur, mid, timing) => {
          matched = true;
          let newDur = _dur;
          if (entry.duration) {
            const current = parseDurationSeconds(_dur);
            const next = Number.isFinite(current) ? current + 0.1 : 1.6;
            newDur = `${next.toFixed(1)}s`;
          }
          const newTiming = entry.timing
            ? (timing === "linear" ? "ease-in-out" : "linear")
            : timing;
          return `${name}${newDur}${mid}${newTiming}`;
        },
      );

      if (!matched && entry.duration) {
        const hasDurationFallback = /animation-duration:\s*\d+\.?\d*s/.test(normalizedCss);
        if (!hasDurationFallback) {
          issues.push(`${title} -> ${target}: 未命中参数替换正则且无 animation-duration fallback`);
        }
        continue;
      }

      if (matched && replacedCss === normalizedCss) {
        issues.push(`${title} -> ${target}: 命中正则但 CSS 未发生变化`);
      }
    }
  }

  return issues;
}

function main() {
  const durationPattern = readDurationPattern();
  const issues = collectIssues(durationPattern);

  if (issues.length) {
    console.error("动画参数替换守卫失败：");
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log("动画参数替换守卫通过。");
}

main();
