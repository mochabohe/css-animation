// FC 代理地址：部署函数计算后填入触发器 URL，留空则直连 DeepSeek
// 填入后同事无需各自配置 API Key，Key 由服务端持有
export const PROXY_URL = "https://deepseek-stream-cgpnjvcloa.cn-hangzhou.fcapp.run";

// API Key 管理（从 localStorage 读取；PROXY_URL 已配置时无需设置）
export function getApiKey() {
  return localStorage.getItem("deepseek-api-key") || "";
}

export function saveApiKey(key) {
  localStorage.setItem("deepseek-api-key", key);
}

// 构建请求 URL 和 Headers
function buildRequest() {
  const url = PROXY_URL || "https://api.deepseek.com/chat/completions";
  const headers = { "Content-Type": "application/json" };
  if (!PROXY_URL) {
    const key = getApiKey();
    if (!key) throw new Error("请先设置 DeepSeek API Key");
    headers.Authorization = `Bearer ${key}`;
  }
  return { url, headers };
}

const SYSTEM_PROMPT = `你是 CSS 动画专家，专门为 CSS 动画展示工具生成代码片段。
规则：
- 返回 JSON 格式：{"html": "演示元素HTML", "css": "CSS规则和@keyframes"}
- HTML 必须用一个 <div class="demo-wrap"> 包裹所有内容，不含 html/body/head 标签
- CSS 必须包含 .demo-wrap { width:100%; min-height:180px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
- .demo-wrap 不得设置 background 或 background-color（预览容器已提供背景，避免遮挡主题色）
- 颜色规则：
  1) 若用户明确指定颜色（例如红色、紫色、#ff00aa、rgb(...) 等），必须优先使用用户指定颜色，不要强制替换为主题变量
  2) 若用户未指定颜色，再使用 var(--accent) / var(--accent-soft) / var(--accent-deep)
- CSS 包含完整选择器、属性、@keyframes，不含 body/html 等页面级选择器
- 动画元素使用相对/绝对定位均可，但坐标基于 .demo-wrap 容器，确保视觉居中
- 动画应当精简、美观，适合在 160×240px 的预览区中展示`;

const EXPLICIT_COLOR_PATTERNS = [
  /#(?:[0-9a-fA-F]{3,8})\b/,
  /\b(?:rgb|rgba|hsl|hsla)\s*\(/i,
  /(红色|橙色|黄色|绿色|青色|蓝色|紫色|粉色|黑色|白色|灰色|金色|银色|棕色|米色|青柠色|靛蓝色)/,
  /\b(red|orange|yellow|green|cyan|blue|purple|pink|black|white|gray|grey|gold|silver|brown|beige|indigo|teal|lime)\b/i,
  /(改成|换成|使用|主色|颜色|配色).{0,10}(红|橙|黄|绿|青|蓝|紫|粉|黑|白|灰|金|银|棕|米|青柠|靛蓝)/,
];

const RAINBOW_INTENT_PATTERNS = [/(彩虹|七彩|多彩|彩色渐变|rainbow|multicolor|spectrum)/i];

function hasRainbowIntent(text) {
  if (!text) return false;
  return RAINBOW_INTENT_PATTERNS.some((pattern) => pattern.test(text));
}

function hasExplicitColorIntent(text) {
  if (!text) return false;
  return hasRainbowIntent(text) || EXPLICIT_COLOR_PATTERNS.some((pattern) => pattern.test(text));
}

function buildColorDirective(text) {
  if (hasRainbowIntent(text)) {
    return [
      "用户要求彩虹/多彩效果：必须使用多色方案。",
      "请使用至少 6 个不同色相（例如红橙黄绿蓝紫），且颜色应在视觉上明显可区分。",
      "不要把主视觉颜色写成 var(--accent*) 主题变量。",
    ].join("\n");
  }
  if (hasExplicitColorIntent(text)) {
    return "用户已明确指定颜色：请严格按用户颜色生成/修改，不要回退到 var(--accent*) 主题变量。";
  }
  return "用户未明确指定颜色：优先使用 var(--accent) / var(--accent-soft) / var(--accent-deep) 与当前主题保持一致。";
}

const CSS_CONCRETE_COLOR_PATTERNS = [
  /#(?:[0-9a-fA-F]{3,8})\b/,
  /\b(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\s*\(/i,
  /\b(red|orange|yellow|green|cyan|blue|purple|pink|black|white|gray|grey|gold|silver|brown|beige|indigo|teal|lime)\b/i,
];

function hasThemeAccentVariables(cssText) {
  if (!cssText) return false;
  return /var\(--accent(?:-[a-z0-9-]+)?\)/i.test(cssText);
}

function hasConcreteColorValues(cssText) {
  if (!cssText) return false;
  return CSS_CONCRETE_COLOR_PATTERNS.some((pattern) => pattern.test(cssText));
}

function hasRainbowPalette(cssText) {
  if (!cssText) return false;
  const hexCount = (cssText.match(/#(?:[0-9a-fA-F]{3,8})\b/g) || []).length;
  const hslCount = (cssText.match(/\bhsla?\s*\(/gi) || []).length;
  const namedRainbowHits =
    (cssText.match(/\b(red|orange|yellow|green|cyan|blue|purple|violet|indigo)\b/gi) || []).length;
  return hexCount >= 4 || hslCount >= 4 || namedRainbowHits >= 4;
}

function shouldRetryForColorIntent(cssText, userInstruction) {
  if (!cssText) return false;
  if (hasRainbowIntent(userInstruction)) {
    return hasThemeAccentVariables(cssText) || !hasRainbowPalette(cssText);
  }
  return hasThemeAccentVariables(cssText) && !hasConcreteColorValues(cssText);
}

async function callAIWithColorFallback({ userInstruction, buildUserContent, onChunk }) {
  const colorDirective = buildColorDirective(userInstruction);
  const firstResult = await callAI(
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserContent(colorDirective) },
    ],
    onChunk,
  );

  if (!hasExplicitColorIntent(userInstruction) || !shouldRetryForColorIntent(firstResult?.css, userInstruction)) {
    return firstResult;
  }

  const retryDirective = hasRainbowIntent(userInstruction)
    ? [
        colorDirective,
        "检测到你上一版没有形成明显彩虹配色。",
        "本次必须提供至少 6 个明显不同色相，并避免单色/同色系。",
        "禁止使用 var(--accent*) 作为主视觉颜色来源。",
      ].join("\n")
    : [
        colorDirective,
        "检测到你上一版仍主要使用 var(--accent*) 主题变量。",
        "本次必须优先使用用户明确提到的颜色值（hex/rgb/hsl/英文色名均可）。",
        "不要把主视觉颜色写成 var(--accent*)。",
      ].join("\n");

  onChunk?.("检测到颜色未按用户要求落地，正在自动重试...\n");

  return callAI(
    [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserContent(retryDirective) },
    ],
    onChunk,
  );
}

// SSE 流式读取公共逻辑
async function streamSSE(res, onChunk) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullContent = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    for (const line of chunk.split("\n")) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") continue;
      try {
        const delta = JSON.parse(data).choices[0]?.delta?.content || "";
        if (delta) {
          fullContent += delta;
          onChunk?.(fullContent);
        }
      } catch {
        // 跳过不完整的 SSE 块
      }
    }
  }

  return JSON.parse(fullContent);
}

// 调用 DeepSeek（流式，代理和直连均支持）
async function callAI(messages, onChunk) {
  const { url, headers } = buildRequest();

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      response_format: { type: "json_object" },
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`API 错误：${res.status}${errText ? " - " + errText : ""}`);
  }

  return streamSSE(res, onChunk);
}

// Text-to-Animation
export async function generateAnimation(description, onChunk) {
  return callAIWithColorFallback({
    userInstruction: description,
    buildUserContent: (directive) => `生成一个 CSS 动画。\n${directive}\n用户需求：${description}`,
    onChunk,
  });
}

// Style Variations
export async function transformAnimation(instruction, html, css, onChunk) {
  return callAIWithColorFallback({
    userInstruction: instruction,
    buildUserContent: (directive) =>
      `修改以下动画。\n${directive}\n修改要求：${instruction}\n\nHTML:\n${html}\n\nCSS:\n${css}`,
    onChunk,
  });
}

// ===== 本地保存 =====
const SAVED_KEY = "ai-saved-animations";

export function saveAnimation(title, html, css) {
  const list = loadSavedAnimations();
  list.unshift({ title, html, css, ts: Date.now() });
  localStorage.setItem(SAVED_KEY, JSON.stringify(list.slice(0, 30)));
}

export function loadSavedAnimations() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
  } catch {
    return [];
  }
}

export function deleteSavedAnimation(ts) {
  const list = loadSavedAnimations().filter((item) => item.ts !== ts);
  localStorage.setItem(SAVED_KEY, JSON.stringify(list));
}
