'use strict';

/**
 * 阿里云函数计算 — 通用 AI API 代理
 *
 * 运行时：Node.js 18 / 20（内置 fetch，无需额外依赖）
 *
 * 两种模式：
 *   1. 默认模式：转发到 DeepSeek（使用服务端 DEEPSEEK_API_KEY）
 *   2. 透传模式：前端通过 X-Target-Url 指定目标，认证头由前端提供
 *
 * 环境变量：
 *   DEEPSEEK_API_KEY — DeepSeek API Key（默认模式必需）
 */

const DEFAULT_TARGET = 'https://api.deepseek.com/chat/completions';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Api-Key, X-Target-Url, Anthropic-Version',
};

module.exports.handler = async (event) => {
  const evt = JSON.parse(event.toString());
  const method = evt.requestContext?.http?.method;

  // CORS 预检
  if (method === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (method !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method Not Allowed' };
  }

  let reqBody;
  try {
    reqBody = JSON.parse(evt.body || '{}');
  } catch {
    return { statusCode: 400, headers: CORS_HEADERS, body: '请求体必须为 JSON' };
  }

  // 解析前端传入的请求头
  const inHeaders = evt.headers || {};
  const targetUrl = inHeaders['x-target-url'];

  let upstreamUrl;
  const upstreamHeaders = { 'Content-Type': 'application/json' };

  if (targetUrl) {
    // 透传模式：前端指定目标 URL，认证头由前端提供
    upstreamUrl = targetUrl;
    // 转发 Authorization 头（OpenAI 兼容格式）
    if (inHeaders['authorization']) {
      upstreamHeaders['Authorization'] = inHeaders['authorization'];
    }
    // 转发 x-api-key 头（Claude 原生格式）
    if (inHeaders['x-api-key']) {
      upstreamHeaders['x-api-key'] = inHeaders['x-api-key'];
    }
    // 转发 anthropic-version 头
    if (inHeaders['anthropic-version']) {
      upstreamHeaders['anthropic-version'] = inHeaders['anthropic-version'];
    }
  } else {
    // 默认模式：转发到 DeepSeek
    upstreamUrl = DEFAULT_TARGET;
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers: CORS_HEADERS, body: 'DEEPSEEK_API_KEY 未配置' };
    }
    upstreamHeaders['Authorization'] = `Bearer ${apiKey}`;
  }

  const upstreamRes = await fetch(upstreamUrl, {
    method: 'POST',
    headers: upstreamHeaders,
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
