export const cssVarFallback = {
  "--accent": "#2cb9c5",
  "--accent-2": "#1f8f98",
  "--accent-soft": "#7be2e8",
  "--accent-deep": "#15747c",
  "--accent-rgb": "44, 185, 197",
  "--accent-2-rgb": "31, 143, 152",
  "--accent-soft-rgb": "123, 226, 232",
  "--accent-deep-rgb": "21, 116, 124",
  "--motion-linear": "linear",
  "--motion-ease-standard": "ease-in-out",
  "--motion-ease-snappy": "cubic-bezier(0.42, 0, 0.58, 1)",
  "--motion-ease-out": "ease-out",
  "--motion-duration-xs": "0.9s",
  "--motion-duration-sm": "1.1s",
  "--motion-duration-md": "1.4s",
  "--motion-duration-lg": "2.2s",
  "--motion-duration-xl": "3.2s",
  "--motion-duration-xxl": "5s",
  "--fx-duration": "1.4s",
  "--fx-easing": "ease-in-out",
  "--fx-duration-slow": "2.2s",
  "--fx-duration-fast": "1.1s",
};

export function normalizeCssVariables(cssText) {
  // 从当前文档获取实际生效的 CSS 变量值（支持主题切换和自定义颜色）
  const computedStyle = getComputedStyle(document.documentElement);
  const currentValues = {};
  for (const [varName, defaultValue] of Object.entries(cssVarFallback)) {
    const computed = computedStyle.getPropertyValue(varName).trim();
    currentValues[varName] = computed || defaultValue;
  }

  // 先替换 var(--name) 格式
  let result = cssText.replace(/var\((--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\)/gi, (_, name, fallback) => {
    if (currentValues[name]) return currentValues[name];
    if (fallback) return fallback.trim();
    return name;
  });

  // 再替换裸露的 --name 格式（例如在 rgba() 中直接使用的）
  result = result.replace(/(--[a-z0-9-]+)/gi, (match) => {
    if (currentValues[match]) return currentValues[match];
    return match;
  });

  return result;
}

export function extractKeyframesMap() {
  const keyframesMap = new Map();

  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }

    if (!rules) {
      continue;
    }

    for (const rule of rules) {
      if (rule.type === CSSRule.KEYFRAMES_RULE) {
        keyframesMap.set(rule.name, rule.cssText);
      }
    }
  }

  return keyframesMap;
}

export function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  return Promise.resolve();
}

export function collectDemoHtml(elementNodes) {
  const demoElements = elementNodes.filter((node) => {
    if (!(node instanceof HTMLElement)) {
      return false;
    }

    if (node.matches(".card-tag") || node.matches("h2")) {
      return false;
    }

    return true;
  });

  if (demoElements.length === 0) {
    return "";
  }

  return demoElements.map((node) => node.outerHTML).join("\n");
}

// ===== 颜色工具函数 =====

export function hexToRgb(hex) {
  // 移除可能的 # 前缀
  hex = hex.replace(/^#/, '');

  // 支持三位十六进制格式 (#fff -> #ffffff)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function parseColor(color) {
  if (!color) return null;

  color = color.trim();

  // 支持 rgb(r, g, b) 格式
  const rgbMatch = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(color);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  // 支持 rgba(r, g, b, a) 格式（忽略 alpha 通道）
  const rgbaMatch = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)$/i.exec(color);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
    };
  }

  // 支持 # 格式（六位和三位）
  if (color.startsWith('#') || /^[a-f\d]{3}$/i.test(color) || /^[a-f\d]{6}$/i.test(color)) {
    return hexToRgb(color);
  }

  // 支持颜色名称（如 white, red, blue 等）
  // 使用 canvas 来解析颜色名称
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;

  // 检查颜色是否有效
  if (ctx.fillStyle === color.toLowerCase() || /^#[0-9a-f]{6}$/i.test(ctx.fillStyle)) {
    // fillStyle 会被规范化为 #rrggbb 格式
    return hexToRgb(ctx.fillStyle);
  }

  return null;
}

export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function generateColorVariants(baseColor) {
  const rgb = parseColor(baseColor);
  if (!rgb) return null;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const accent2 = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 15, 10));
  const accentSoft = hslToRgb(hsl.h, Math.max(hsl.s - 10, 30), Math.min(hsl.l + 20, 85));
  const accentDeep = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 25, 5));

  return {
    accent: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    accent2: `${accent2.r}, ${accent2.g}, ${accent2.b}`,
    accentSoft: `${accentSoft.r}, ${accentSoft.g}, ${accentSoft.b}`,
    accentDeep: `${accentDeep.r}, ${accentDeep.g}, ${accentDeep.b}`,
    hexColor: `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`,
  };
}
