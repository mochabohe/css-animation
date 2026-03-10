import { describe, expect, it } from "vitest";
import {
  generateColorVariants,
  hexToRgb,
  hslToRgb,
  normalizeCssVariables,
  parseColor,
  rgbToHsl,
} from "./utils.js";

describe("hexToRgb", () => {
  it("解析六位十六进制颜色", () => {
    expect(hexToRgb("#2cb9c5")).toEqual({ r: 44, g: 185, b: 197 });
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("解析三位十六进制颜色（自动展开）", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("不带 # 前缀也能解析", () => {
    expect(hexToRgb("2cb9c5")).toEqual({ r: 44, g: 185, b: 197 });
  });

  it("无效输入返回 null", () => {
    expect(hexToRgb("gggggg")).toBeNull();
    expect(hexToRgb("")).toBeNull();
  });
});

describe("rgbToHsl", () => {
  it("纯红色转换正确", () => {
    const { h, s, l } = rgbToHsl(255, 0, 0);
    expect(h).toBeCloseTo(0, 0);
    expect(s).toBeCloseTo(100, 0);
    expect(l).toBeCloseTo(50, 0);
  });

  it("纯绿色转换正确", () => {
    const { h, s, l } = rgbToHsl(0, 255, 0);
    expect(h).toBeCloseTo(120, 0);
    expect(s).toBeCloseTo(100, 0);
    expect(l).toBeCloseTo(50, 0);
  });

  it("白色转换正确（饱和度为 0）", () => {
    const { s, l } = rgbToHsl(255, 255, 255);
    expect(s).toBeCloseTo(0, 0);
    expect(l).toBeCloseTo(100, 0);
  });

  it("黑色转换正确", () => {
    const { s, l } = rgbToHsl(0, 0, 0);
    expect(s).toBeCloseTo(0, 0);
    expect(l).toBeCloseTo(0, 0);
  });

  it("项目主色调转换正确", () => {
    // #2cb9c5 → rgb(44, 185, 197)
    const { h, s, l } = rgbToHsl(44, 185, 197);
    expect(h).toBeCloseTo(185, 0);
    expect(s).toBeGreaterThan(60);
    expect(l).toBeGreaterThan(40);
  });
});

describe("hslToRgb", () => {
  it("纯红色转换正确", () => {
    expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("纯绿色转换正确", () => {
    expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
  });

  it("纯蓝色转换正确", () => {
    expect(hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
  });

  it("白色转换正确", () => {
    expect(hslToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("黑色转换正确", () => {
    expect(hslToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("与 rgbToHsl 互为逆运算", () => {
    const original = { r: 44, g: 185, b: 197 };
    const { h, s, l } = rgbToHsl(original.r, original.g, original.b);
    const result = hslToRgb(h, s, l);
    expect(result.r).toBeCloseTo(original.r, -1);
    expect(result.g).toBeCloseTo(original.g, -1);
    expect(result.b).toBeCloseTo(original.b, -1);
  });
});

describe("parseColor", () => {
  it("解析 hex 格式", () => {
    expect(parseColor("#2cb9c5")).toEqual({ r: 44, g: 185, b: 197 });
    expect(parseColor("#fff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("解析 rgb() 格式", () => {
    expect(parseColor("rgb(44, 185, 197)")).toEqual({ r: 44, g: 185, b: 197 });
    expect(parseColor("rgb(0,0,0)")).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("解析 rgba() 格式（忽略 alpha）", () => {
    expect(parseColor("rgba(44, 185, 197, 0.5)")).toEqual({ r: 44, g: 185, b: 197 });
  });

  it("空值或无效输入返回 null", () => {
    expect(parseColor("")).toBeNull();
    expect(parseColor(null)).toBeNull();
    expect(parseColor("notacolor123xyz")).toBeNull();
  });

  it("命中缓存时返回相同引用", () => {
    const first = parseColor("#ff0000");
    const second = parseColor("#ff0000");
    expect(first).toBe(second);
  });
});

describe("normalizeCssVariables", () => {
  it("保留未知的自定义 var() 表达式", () => {
    const css = ".demo { transform: translate(var(--p0x), var(--p0y)); }";
    expect(normalizeCssVariables(css)).toContain("translate(var(--p0x), var(--p0y))");
  });
});

describe("generateColorVariants", () => {
  it("有效颜色返回包含所有变体属性的对象", () => {
    const result = generateColorVariants("#2cb9c5");
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("accent");
    expect(result).toHaveProperty("accent2");
    expect(result).toHaveProperty("accentSoft");
    expect(result).toHaveProperty("accentDeep");
    expect(result).toHaveProperty("hexColor");
  });

  it("变体值为合法的 'r, g, b' 字符串格式", () => {
    const result = generateColorVariants("#2cb9c5");
    const rgbPattern = /^\d+,\s*\d+,\s*\d+$/;
    expect(result.accent).toMatch(rgbPattern);
    expect(result.accent2).toMatch(rgbPattern);
    expect(result.accentSoft).toMatch(rgbPattern);
    expect(result.accentDeep).toMatch(rgbPattern);
  });

  it("hexColor 为合法的 #rrggbb 格式", () => {
    const result = generateColorVariants("#2cb9c5");
    expect(result.hexColor).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("accent 与输入颜色的 rgb 一致", () => {
    const result = generateColorVariants("#ff0000");
    expect(result.accent).toBe("255, 0, 0");
  });

  it("无效颜色返回 null", () => {
    expect(generateColorVariants("notacolor")).toBeNull();
    expect(generateColorVariants("")).toBeNull();
  });
});


