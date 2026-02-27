import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { categoryInsights, animationNamesByTitle } from "./data.js";
import { snippetsByTitle } from "./snippets.js";

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
