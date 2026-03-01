'use strict';

/**
 * 阿里云函数计算 事件函数 — DeepSeek API 代理
 *
 * 运行时：Node.js 18 / 20（内置 fetch，无需额外依赖）
 *
 * 环境变量（在函数计算控制台配置）：
 *   DEEPSEEK_API_KEY  — 你的 DeepSeek API Key（不要写在代码里）
 */

const TARGET = 'https://api.deepseek.com/chat/completions';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports.handler = async (event, context) => {
  // 事件函数的 event 是 Buffer，需要先解析
  const evt = JSON.parse(event.toString());

  // CORS 预检请求
  if (evt.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  // 仅允许 POST
  if (evt.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers: CORS_HEADERS, body: 'DEEPSEEK_API_KEY 未配置' };
  }

  let reqBody;
  try {
    reqBody = JSON.parse(evt.body || '{}');
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: '请求体必须为 JSON' };
  }

  // 转发到 DeepSeek
  const upstreamRes = await fetch(TARGET, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(reqBody),
  });

  const resText = await upstreamRes.text();

  return {
    statusCode: upstreamRes.status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': upstreamRes.headers.get('content-type') || 'application/json',
    },
    body: resText,
    isBase64Encoded: false,
  };
};
