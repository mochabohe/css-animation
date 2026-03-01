// FC 代理地址：部署函数计算后填入触发器 URL，留空则直连 DeepSeek
// 填入后同事无需各自配置 API Key，Key 由服务端持有
export const PROXY_URL = "https://deepseek-proxy-xfsnayfbvj.cn-hangzhou.fcapp.run";

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
- CSS 使用 var(--accent) 作为主色、var(--accent-soft) 作为浅色变体、var(--accent-deep) 作为深色变体
- CSS 包含完整选择器、属性、@keyframes，不含 body/html 等页面级选择器
- 动画元素使用相对/绝对定位均可，但坐标基于 .demo-wrap 容器，确保视觉居中
- 动画应当精简、美观，适合在 160×240px 的预览区中展示`;

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

// Text-to-Animation（流式，onChunk 接收累计文本）
export async function generateAnimation(description, onChunk) {
  const { url, headers } = buildRequest();

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `生成一个 CSS 动画：${description}` },
  ];

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

// Style Variations（流式，onChunk 接收累计文本）
export async function transformAnimation(instruction, html, css, onChunk) {
  const { url, headers } = buildRequest();

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `修改以下动画，${instruction}\n\nHTML:\n${html}\n\nCSS:\n${css}`,
    },
  ];

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
