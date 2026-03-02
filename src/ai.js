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

// SSE 流式读取公共逻辑（parseJson: false 时返回纯文本，用于解释、导出等场景）
async function streamSSE(res, onChunk, { parseJson = true } = {}) {
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

  if (!parseJson) return fullContent;
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

// 纯文本流式调用（用于搜索、解释等不需要 JSON 返回的场景）
async function callAIText(messages, onChunk) {
  const { url, headers } = buildRequest();

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`API 错误：${res.status}${errText ? " - " + errText : ""}`);
  }

  return streamSSE(res, onChunk, { parseJson: false });
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

// ===== 多轮对话管理 =====
class ConversationManager {
  constructor(maxRounds = 6) {
    this.maxRounds = maxRounds;
    this.conversations = new Map();
  }

  create() {
    const id = `conv_${Date.now()}`;
    this.conversations.set(id, {
      messages: [{ role: "system", content: SYSTEM_PROMPT }],
      currentResult: null,
    });
    return id;
  }

  addUserMessage(id, content) {
    const conv = this.conversations.get(id);
    if (!conv) return;
    conv.messages.push({ role: "user", content });
    this._trimHistory(conv);
  }

  addAssistantMessage(id, content) {
    const conv = this.conversations.get(id);
    if (!conv) return;
    conv.messages.push({ role: "assistant", content });
  }

  getMessages(id) {
    return this.conversations.get(id)?.messages || [];
  }

  setResult(id, result) {
    const conv = this.conversations.get(id);
    if (conv) conv.currentResult = result;
  }

  getResult(id) {
    return this.conversations.get(id)?.currentResult || null;
  }

  clear(id) {
    this.conversations.delete(id);
  }

  _trimHistory(conv) {
    // 保留 system + 最近 maxRounds*2 条消息
    if (conv.messages.length > 1 + this.maxRounds * 2) {
      conv.messages = [
        conv.messages[0],
        ...conv.messages.slice(-(this.maxRounds * 2)),
      ];
    }
  }
}

export const conversationManager = new ConversationManager();

// 多轮对话式动画生成/修改
export async function chatAnimation(message, conversationId, onChunk) {
  const conv = conversationManager.conversations.get(conversationId);
  if (!conv) throw new Error("会话不存在");

  const colorDirective = buildColorDirective(message);
  const prevResult = conversationManager.getResult(conversationId);

  // 构建用户消息：首轮为生成指令，后续轮为修改指令（自动携带当前代码上下文）
  let userContent;
  if (prevResult) {
    userContent = `修改以下动画。\n${colorDirective}\n修改要求：${message}\n\nHTML:\n${prevResult.html}\n\nCSS:\n${prevResult.css}`;
  } else {
    userContent = `生成一个 CSS 动画。\n${colorDirective}\n用户需求：${message}`;
  }

  conversationManager.addUserMessage(conversationId, userContent);

  const messages = conversationManager.getMessages(conversationId);
  const result = await callAI(messages, onChunk);

  // 保存 AI 回复到会话历史
  conversationManager.addAssistantMessage(conversationId, JSON.stringify(result));
  conversationManager.setResult(conversationId, result);

  return result;
}

// ===== 智能搜索 =====
const searchCache = new Map();

export async function searchAnimations(query, animationIndex) {
  // 检查缓存
  const cacheKey = query.trim().toLowerCase();
  if (searchCache.has(cacheKey)) return searchCache.get(cacheKey);

  // 构建精简上下文
  const indexLines = Object.entries(animationIndex)
    .map(([title, tags]) => `${title}: ${tags.join(", ")}`)
    .join("\n");

  const messages = [
    {
      role: "system",
      content: `你是动画搜索助手。根据用户查询，从动画列表中返回最匹配的动画。
返回 JSON 格式：{"matches": [{"title": "动画标题", "reason": "推荐理由(10字内)"}]}
只返回确实相关的动画，最多返回 8 个。标题必须与列表中的完全一致。`,
    },
    {
      role: "user",
      content: `动画列表：\n${indexLines}\n\n用户查询：${query}`,
    },
  ];

  const result = await callAI(messages);

  // 缓存结果
  if (result?.matches) {
    searchCache.set(cacheKey, result.matches);
    // 最多缓存 20 条
    if (searchCache.size > 20) {
      const firstKey = searchCache.keys().next().value;
      searchCache.delete(firstKey);
    }
  }

  return result?.matches || [];
}

// ===== CSS 代码解释 =====
export async function explainAnimation(html, css, onChunk) {
  const messages = [
    {
      role: "system",
      content: `你是 CSS 动画教学专家。用中文对动画代码进行逐段解释。
格式要求：
- 先用一句话概述动画整体效果
- 用 ## 分段解释每个关键部分（@keyframes、animation 属性、transform 等）
- 重要属性用 **加粗**
- 每段用"通俗比喻 + 技术细节"的方式解释
- 最后给出 1-2 条优化建议
保持简洁，总字数不超过 500 字。`,
    },
    {
      role: "user",
      content: `请解释以下动画代码：\n\nHTML:\n${html}\n\nCSS:\n${css}`,
    },
  ];

  return callAIText(messages, onChunk);
}

// ===== 框架适配导出 =====
const FRAMEWORK_PROMPTS = {
  react: `将以下 HTML+CSS 动画转换为 React 函数组件。
要求：
- 使用 JSX 语法，className 替代 class
- CSS 作为单独的 CSS Module 或内联 style 对象
- 包含完整的 @keyframes（放在 CSS 部分）
- 导出组件名使用 PascalCase
- 输出格式：先组件代码，再 CSS 代码，用 --- 分隔`,

  vue: `将以下 HTML+CSS 动画转换为 Vue 3 单文件组件（SFC）。
要求：
- 使用 <template>、<script setup>、<style scoped> 三段式
- 包含完整的 @keyframes
- 保持所有动画效果不变
- 输出完整的 .vue 文件内容`,

  tailwind: `将以下 HTML+CSS 动画转换为 Tailwind CSS 格式。
要求：
- 尽量使用 Tailwind 工具类替代自定义 CSS
- 无法用工具类实现的部分（如 @keyframes）用 @layer 或 CSS-in-JS 补充
- 保持所有动画效果不变
- 输出 HTML（含 Tailwind 类）和补充 CSS`,
};

export async function convertToFramework(html, css, framework, onChunk) {
  const frameworkPrompt = FRAMEWORK_PROMPTS[framework];
  if (!frameworkPrompt) throw new Error(`不支持的框架: ${framework}`);

  const messages = [
    {
      role: "system",
      content: `你是前端代码转换专家。${frameworkPrompt}`,
    },
    {
      role: "user",
      content: `HTML:\n${html}\n\nCSS:\n${css}`,
    },
  ];

  return callAIText(messages, onChunk);
}

// ===== 意图驱动调参 =====
export async function suggestParams(intent, currentParams, currentValues) {
  const paramsDesc = Object.entries(currentParams)
    .map(([key, config]) => {
      const current = currentValues[key];
      if (config.type === "range") {
        return `${key}(${config.label}): 当前=${current}${config.unit}, 范围=${config.min}-${config.max}${config.unit}`;
      }
      return `${key}(${config.label}): 当前=${current}, 可选=${config.options.join("/")}`;
    })
    .join("\n");

  const messages = [
    {
      role: "system",
      content: `你是 CSS 动画参数调优专家。根据用户的调整意图，返回推荐的参数值。
返回 JSON 格式：{"params": {"参数key": 新值, ...}}
只修改与意图相关的参数，不要修改无关参数。数值类型返回数字，选择类型返回字符串。`,
    },
    {
      role: "user",
      content: `当前参数：\n${paramsDesc}\n\n调整意图：${intent}`,
    },
  ];

  const result = await callAI(messages);
  return result?.params || {};
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
