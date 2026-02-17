import { describe, expect, it } from "vitest";
import { categoryInsights, animationNamesByTitle } from "./data.js";

describe("animation data integrity", () => {
  it("keeps required category mappings", () => {
    expect(categoryInsights.loading?.scenario).toBeTruthy();
    expect(categoryInsights.interactive?.token).toBe("motion.interactive");
  });

  it("keeps keyframe name mapping for major demos", () => {
    expect(animationNamesByTitle["加载脉冲"]).toContain("spin");
    expect(animationNamesByTitle["环形进度"]).toContain("progressGrow");
  });
});
