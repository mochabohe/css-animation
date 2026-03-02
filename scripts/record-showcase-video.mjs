/**
 * CSS Animation 项目宣传视频录制脚本
 *
 * 使用 Playwright 打开真实网页，自动执行各功能操作，
 * 同时在页面上注入文字说明浮层，录制整个过程为一段完整视频。
 *
 * 用法:
 *   npm run showcase:video
 *   node scripts/record-showcase-video.mjs --no-server --url http://localhost:5173/
 */
import {spawn} from "node:child_process";
import {access, mkdir, rename} from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_PORT = 4173;
const DEFAULT_HOST = "localhost";
const DEFAULT_OUT_DIR = "out";
const VIEWPORT = {width: 1920, height: 1080};

function getArgValue(name) {
  const idx = process.argv.indexOf(name);
  return idx === -1 ? null : process.argv[idx + 1] || null;
}
function hasArg(name) {
  return process.argv.includes(name);
}
function getTimestamp() {
  const d = new Date();
  const p = (v) => String(v).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

async function waitForHttp(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, {method: "GET"});
      if (res.ok || res.status === 304) return;
    } catch {
      /* 重试 */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`等待服务超时：${url}`);
}

async function startViteServer(port) {
  const {createServer} = await import("vite");
  const server = await createServer({
    server: {host: DEFAULT_HOST, port, strictPort: true},
    clearScreen: false,
    logLevel: "info",
  });
  await server.listen();
  return server;
}

async function maybeConvertToMp4(webmPath) {
  const mp4Path = webmPath.replace(/\.webm$/i, ".mp4");
  try {
    const check = spawn("ffmpeg", ["-version"], {stdio: "ignore"});
    const has = await new Promise((r) => {
      check.on("error", () => r(false));
      check.on("close", (c) => r(c === 0));
    });
    if (!has) return null;
    await new Promise((resolve, reject) => {
      const p = spawn(
        "ffmpeg",
        ["-y", "-i", webmPath, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4Path],
        {stdio: "ignore"}
      );
      p.on("close", (c) => (c === 0 ? resolve() : reject(new Error(`ffmpeg 退出码 ${c}`))));
      p.on("error", reject);
    });
    await access(mp4Path);
    return mp4Path;
  } catch {
    return null;
  }
}

/* ═══════════════════════════════════════════════
   页面注入：文字说明浮层
   ═══════════════════════════════════════════════ */

/**
 * 在页面上注入/更新一个美观的文字说明浮层
 */
async function showCaption(page, title, subtitle = "", position = "bottom") {
  await page.evaluate(
    ({title, subtitle, position}) => {
      let overlay = document.getElementById("__showcase-caption");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "__showcase-caption";
        document.body.appendChild(overlay);
      }

      const isTop = position === "top";
      overlay.style.cssText = `
        position: fixed;
        ${isTop ? "top: 0" : "bottom: 0"};
        left: 0;
        right: 0;
        z-index: 999999;
        padding: 28px 48px;
        background: ${isTop
          ? "linear-gradient(180deg, rgba(7,11,20,0.92) 0%, rgba(7,11,20,0.7) 70%, transparent 100%)"
          : "linear-gradient(0deg, rgba(7,11,20,0.92) 0%, rgba(7,11,20,0.7) 70%, transparent 100%)"};
        font-family: "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif;
        pointer-events: none;
        transition: opacity 0.5s ease;
        opacity: 1;
      `;

      overlay.innerHTML = `
        <div style="
          font-size: 36px;
          font-weight: 800;
          color: #EAF1FF;
          letter-spacing: -0.01em;
          margin-bottom: ${subtitle ? "8px" : "0"};
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        ">${title}</div>
        ${subtitle ? `<div style="
          font-size: 22px;
          color: #B8C8EE;
          line-height: 1.4;
          text-shadow: 0 1px 8px rgba(0,0,0,0.4);
        ">${subtitle}</div>` : ""}
      `;
    },
    {title, subtitle, position}
  );
}

/**
 * 隐藏文字说明浮层
 */
async function hideCaption(page) {
  await page.evaluate(() => {
    const el = document.getElementById("__showcase-caption");
    if (el) {
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 500);
    }
  });
}

/**
 * 在页面上注入功能标签（右上角小标签）
 */
async function showFeatureTag(page, text, color = "#4DD7FF") {
  await page.evaluate(
    ({text, color}) => {
      let tag = document.getElementById("__showcase-tag");
      if (!tag) {
        tag = document.createElement("div");
        tag.id = "__showcase-tag";
        document.body.appendChild(tag);
      }
      tag.style.cssText = `
        position: fixed;
        top: 24px;
        right: 32px;
        z-index: 999999;
        font-size: 20px;
        font-weight: 700;
        color: ${color};
        padding: 8px 20px;
        border-radius: 999px;
        border: 2px solid ${color};
        background: rgba(7, 11, 20, 0.75);
        backdrop-filter: blur(8px);
        letter-spacing: 0.03em;
        font-family: "PingFang SC", "Microsoft YaHei", "Segoe UI", sans-serif;
        pointer-events: none;
        transition: opacity 0.4s ease;
        opacity: 1;
      `;
      tag.textContent = text;
    },
    {text, color}
  );
}

async function hideFeatureTag(page) {
  await page.evaluate(() => {
    const el = document.getElementById("__showcase-tag");
    if (el) {
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 400);
    }
  });
}

/* ═══════════════════════════════════════════════
   操作辅助
   ═══════════════════════════════════════════════ */

async function clickAndWait(page, selector, pause = 900) {
  const loc = page.locator(selector).first();
  await loc.waitFor({state: "visible", timeout: 15_000});
  await loc.click();
  await page.waitForTimeout(pause);
}

async function smoothScroll(page, y, pause = 1000) {
  await page.evaluate((targetY) => {
    window.scrollTo({top: targetY, behavior: "smooth"});
  }, y);
  await page.waitForTimeout(pause);
}

/* ═══════════════════════════════════════════════
   录制流程：完整功能演示
   ═══════════════════════════════════════════════ */

/**
 * 模拟逐字输入（比 fill 更自然）
 */
async function typeSlowly(page, selector, text, delay = 80) {
  const el = page.locator(selector).first();
  await el.click();
  for (const char of text) {
    await el.press(char === " " ? "Space" : `Key${char}`, {delay: 10}).catch(() => {});
    await page.keyboard.insertText(char);
    await page.waitForTimeout(delay);
  }
}

async function runShowcase(page) {
  // ── 1. 开场：首页展示（暗色模式默认） ──
  await page.waitForTimeout(1000);
  await showCaption(
    page,
    "CSS Animation — 一站式动画资源平台",
    "覆盖交互、加载、文字、背景、大数据等 80+ 精选 CSS 动画效果"
  );
  await page.waitForTimeout(4000);
  await hideCaption(page);
  await page.waitForTimeout(800);

  // ── 2. AI 智能搜索 ──
  await showFeatureTag(page, "AI 智能搜索", "#71F7C5");
  await showCaption(
    page,
    "AI 智能搜索 · 语义理解精准匹配",
    "输入自然语言描述，AI 自动理解意图并匹配相关动画"
  );
  await page.waitForTimeout(1200);

  // 逐字输入"圆形"
  const searchInput = page.locator("#searchInput").first();
  await searchInput.click();
  await page.waitForTimeout(300);
  for (const char of "圆形") {
    await page.keyboard.insertText(char);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(500);

  // 点击 AI 搜索按钮
  const aiSearchBtn = page.locator("#aiSearchBtn").first();
  if (await aiSearchBtn.count()) {
    await aiSearchBtn.click();
    // 等待 AI 搜索完成（按钮loading状态消失）
    try {
      await page.waitForFunction(
        () => {
          const btn = document.querySelector("#aiSearchBtn");
          return btn && !btn.classList.contains("is-loading");
        },
        {timeout: 20_000}
      );
    } catch {
      // 超时继续
    }
    await page.waitForTimeout(1500);
  }

  // 清空搜索
  await searchInput.fill("");
  await page.dispatchEvent("#searchInput", "input");
  await page.waitForTimeout(600);

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(600);

  // ── 3. 主题色切换 ──
  await showFeatureTag(page, "主题切换", "#c084fc");
  await showCaption(
    page,
    "11 种主题色 + 自定义颜色",
    "一键切换品牌色，支持输入任意颜色值"
  );
  await page.waitForTimeout(1200);

  await clickAndWait(page, '.theme-btn[data-theme="purple"]', 1200);
  await clickAndWait(page, '.theme-btn[data-theme="orange"]', 1200);
  await clickAndWait(page, '.theme-btn[data-theme="green"]', 1200);
  await clickAndWait(page, '.theme-btn[data-theme="pink"]', 1200);

  // 自定义颜色
  await page.evaluate(() => {
    const input = document.querySelector("#customColor");
    if (!input) return;
    input.value = "#ff6a3d";
    input.dispatchEvent(new Event("input", {bubbles: true}));
    input.dispatchEvent(new Event("change", {bubbles: true}));
  });
  await page.waitForTimeout(1500);

  // 恢复默认青色
  await clickAndWait(page, '.theme-btn[data-theme="cyan"]', 800);
  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(600);

  // ── 4. 亮暗模式 ──
  await showFeatureTag(page, "外观切换", "#FFD68A");
  await showCaption(
    page,
    "深色 / 浅色模式自由切换",
    "一键切换外观主题，适配不同使用场景"
  );
  await page.waitForTimeout(1200);

  await clickAndWait(page, "#colorModeToggle", 2500);
  await clickAndWait(page, "#colorModeToggle", 1500);

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(600);

  // ── 5. 滚动展示更多动画 ──
  await showFeatureTag(page, "动画展示", "#4DD7FF");
  await showCaption(
    page,
    "80+ 精选动画 · 持续扩展",
    "所有动画按需暂停，只有进入视口的卡片才运行动画"
  );
  await page.waitForTimeout(1000);

  await smoothScroll(page, 600, 1500);
  await smoothScroll(page, 1200, 1500);
  await smoothScroll(page, 0, 1200);

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(600);

  // ── 6. 代码实验室：打开"边框流光" ──
  await showFeatureTag(page, "代码实验室", "#FFD68A");
  await showCaption(
    page,
    "代码实验室 · 边看边改，直接试参数",
    "点击卡片打开代码实验室，实时编辑和预览动画效果"
  );
  await page.waitForTimeout(1200);

  // 定位"边框流光"卡片并点击"代码实验室"
  await page.waitForSelector(".snippet-toggle", {timeout: 15_000});
  const borderStreamCard = page.locator('article.card:has(h2:text("边框流光"))');
  const borderStreamToggle = borderStreamCard.locator(".snippet-toggle").first();
  if (await borderStreamToggle.count()) {
    await borderStreamToggle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await borderStreamToggle.click();
    await page.waitForTimeout(2000);
  }

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(400);

  // ── 7. 代码实验室：修改流光颜色代码 ──
  await showFeatureTag(page, "实时编辑代码", "#71F7C5");
  await showCaption(
    page,
    "直接修改 CSS 代码 · 预览实时更新",
    "修改流光颜色，效果立即呈现在预览区域"
  );
  await page.waitForTimeout(1200);

  const cssEditor = page.locator("textarea.css-editor").first();
  if (await cssEditor.count()) {
    await cssEditor.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 1) 用 Playwright 点击 textarea 确保浏览器聚焦
    await cssEditor.click();
    await page.waitForTimeout(300);

    // 2) 找到 conic-gradient 中的颜色值（var(--accent) 已被归一化为实际颜色如 #4DD7FF）
    //    选中它，让观众看到要修改的位置
    const colorInfo = await page.evaluate(() => {
      const textarea = document.querySelector("textarea.css-editor");
      if (!textarea) return null;
      const text = textarea.value;
      // 匹配 conic-gradient(transparent, <color>, transparent 30%)
      const match = text.match(/conic-gradient\(transparent,\s*(#[0-9a-fA-F]{3,8})/);
      if (!match) return null;
      const colorStr = match[1];
      const idx = text.indexOf(colorStr, text.indexOf("conic-gradient"));
      if (idx === -1) return null;
      textarea.setSelectionRange(idx, idx + colorStr.length);
      const linesBefore = text.substring(0, idx).split("\n").length;
      textarea.scrollTop = Math.max(0, (linesBefore - 5) * 18);
      return {idx, len: colorStr.length};
    });
    await page.waitForTimeout(1500);

    // 3) 用 Playwright keyboard 逐字输入 "red" 替换选中内容
    //    这会触发原生 input 事件，自动更新预览
    if (colorInfo) {
      for (const char of "red") {
        await page.keyboard.type(char, {delay: 200});
        await page.waitForTimeout(100);
      }
      await page.waitForTimeout(3000);
    }

    // 点击重置恢复
    const resetBtn = page.locator('.modal-btn:has-text("重置")').first();
    if (await resetBtn.count()) {
      await resetBtn.click();
      await page.waitForTimeout(1500);
    }
  }

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(400);

  // ── 8. 参数调整：拖动流转时长 + 缓动函数 + 意图调参 ──
  await showFeatureTag(page, "参数调整", "#FFD68A");
  await showCaption(
    page,
    "参数调整 · 拖动滑块实时预览",
    "调整流转时长、缓动函数，快速找到最佳效果"
  );
  await page.waitForTimeout(1200);

  // 拖动"流转时长"滑块：最左端 vs 最右端 明显对比
  const rangeSlider = page.locator("input.param-range").first();
  if (await rangeSlider.count()) {
    await rangeSlider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    // 先设到最小值
    await rangeSlider.fill("1");
    await rangeSlider.dispatchEvent("input");
    await page.waitForTimeout(2000);
    // 再设到最大值
    await rangeSlider.fill("8");
    await rangeSlider.dispatchEvent("input");
    await page.waitForTimeout(2000);
  }

  // 把流转时长拉回最小值，动画更快才能看出缓动和意图的区别
  if (await rangeSlider.count()) {
    await rangeSlider.fill("1");
    await rangeSlider.dispatchEvent("input");
    await page.waitForTimeout(800);
  }

  // 选择缓动函数：依次切换几项
  const easingSelect = page.locator("select.param-select").first();
  if (await easingSelect.count()) {
    await easingSelect.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await easingSelect.selectOption("ease-in-out");
    await page.waitForTimeout(1200);
    await easingSelect.selectOption("ease-out");
    await page.waitForTimeout(1200);
    await easingSelect.selectOption("ease");
    await page.waitForTimeout(1200);
  }

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(400);

  // ── 9. 意图调参：更弹性 + 更柔和 ──
  await showFeatureTag(page, "意图调参", "#71F7C5");
  await showCaption(
    page,
    "一键意图调参 · 描述你想要的效果",
    "点击预设意图按钮，AI 自动调整参数"
  );
  await page.waitForTimeout(1000);

  const elasticBtn = page.locator('.ai-intent-btn:has-text("更弹性")').first();
  if (await elasticBtn.count()) {
    await elasticBtn.click();
    await page.waitForTimeout(2000);
  }
  const softBtn = page.locator('.ai-intent-btn:has-text("更柔和")').first();
  if (await softBtn.count()) {
    await softBtn.click();
    await page.waitForTimeout(2000);
  }

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(400);

  // ── 10. AI 改造：输入"把按钮改为红色" ──
  await showFeatureTag(page, "AI 改造", "#5E7BFF");
  await showCaption(
    page,
    "AI 改造 · 自然语言描述改造方向",
    "输入改造需求，AI 自动修改代码并实时预览"
  );
  await page.waitForTimeout(1000);

  const aiInput = page.locator("input.ai-input").first();
  if (await aiInput.count()) {
    await aiInput.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await aiInput.click();
    await page.waitForTimeout(200);
    // 逐字输入
    const aiPrompt = "把按钮改为红色";
    for (const char of aiPrompt) {
      await page.keyboard.insertText(char);
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(500);
    // 点击 AI 改造按钮
    const aiBtn = page.locator('.ai-btn:has-text("AI 改造")').first();
    if (await aiBtn.count()) {
      await aiBtn.click();
      // 等待 AI 改造完成
      try {
        await page.waitForFunction(
          () => {
            const btn = document.querySelector(".ai-btn");
            return btn && !btn.disabled;
          },
          {timeout: 20_000}
        );
      } catch {
        // 超时继续
      }
      await page.waitForTimeout(3000);
    }
  }

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(400);

  // ── 11. AI 解读 ──
  await showFeatureTag(page, "AI 解读", "#5E7BFF");
  await showCaption(
    page,
    "AI 解读 · 一键理解动画原理",
    "AI 自动分析 CSS 代码，解释动画实现逻辑和关键属性"
  );
  await page.waitForTimeout(1200);

  const aiExplainBtn = page.locator(".ai-explain-btn").first();
  if (await aiExplainBtn.count()) {
    // 确保按钮可点击（AI改造可能还未完全结束导致按钮disabled）
    await page.evaluate(() => {
      const btn = document.querySelector(".ai-explain-btn");
      if (btn) btn.disabled = false;
    });
    await page.waitForTimeout(300);
    await aiExplainBtn.click();
    try {
      await page.waitForSelector(".ai-explain-content", {timeout: 5_000});
      // 等待 AI 解读生成完成（内容不再变化）
      let lastLen = 0;
      let stableCount = 0;
      for (let i = 0; i < 40; i++) {
        await page.waitForTimeout(500);
        const curLen = await page.evaluate(() => {
          const el = document.querySelector(".ai-explain-content");
          return el ? el.innerHTML.length : 0;
        });
        // 每次都滚动到底部，让观众看到内容在更新
        await page.evaluate(() => {
          const el = document.querySelector(".ai-explain-content");
          if (el) el.scrollTop = el.scrollHeight;
        });
        if (curLen === lastLen && curLen > 0) {
          stableCount++;
          if (stableCount >= 3) break; // 内容稳定1.5秒，认为生成完成
        } else {
          stableCount = 0;
        }
        lastLen = curLen;
      }
      // 最终滚动到底部展示完整结果
      await page.evaluate(() => {
        const el = document.querySelector(".ai-explain-content");
        if (el) el.scrollTop = el.scrollHeight;
      });
      await page.waitForTimeout(2000);
    } catch {
      await page.waitForTimeout(3000);
    }
    // 关闭 AI 解读面板
    await aiExplainBtn.click();
    await page.waitForTimeout(800);
  }

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(400);

  // ── 12. 导出功能 ──
  await showFeatureTag(page, "框架导出", "#c084fc");
  await showCaption(
    page,
    "一键导出为 React / Vue / Tailwind",
    "自动将 CSS 动画转换为主流框架的代码格式"
  );
  await page.waitForTimeout(1200);

  const exportBtn = page.locator(".ai-export-btn").first();
  if (await exportBtn.count()) {
    await exportBtn.click();
    await page.waitForTimeout(1000);

    const reactItem = page.locator('[data-framework="react"]').first();
    if (await reactItem.count()) {
      await reactItem.click();
      try {
        await page.waitForSelector("textarea.ai-export-code", {timeout: 10_000});
        await page.waitForTimeout(5000);
      } catch {
        await page.waitForTimeout(3000);
      }

      const exportClose = page.locator(".ai-export-overlay .modal-close").first();
      if (await exportClose.count()) {
        await exportClose.click();
        await page.waitForTimeout(800);
      }
    }
  }

  await hideCaption(page);
  await hideFeatureTag(page);
  await page.waitForTimeout(400);

  // 关闭代码实验室弹窗
  const modalClose = page.locator(".code-modal .modal-close").first();
  if (await modalClose.count()) {
    await modalClose.click();
    await page.waitForTimeout(800);
  }

  // ── 13. AI 工坊：对话生成动画 ──
  const aiFab = page.locator(".ai-fab").first();
  if (await aiFab.count()) {
    await showFeatureTag(page, "AI 工坊", "#5E7BFF");
    await showCaption(
      page,
      "AI 对话生成动画 · 描述需求即可创作",
      "输入自然语言描述，AI 自动生成完整的 CSS 动画代码"
    );
    await page.waitForTimeout(1200);

    await aiFab.click();
    await page.waitForTimeout(1500);

    const chatInput = page.locator("input.ai-chat-input").first();
    if (await chatInput.count()) {
      await chatInput.click();
      await page.waitForTimeout(300);
      const prompt = "一个彩色气泡缓慢向上漂浮的动画";
      for (const char of prompt) {
        await page.keyboard.insertText(char);
        await page.waitForTimeout(60);
      }
      await page.waitForTimeout(800);

      const sendBtn = page.locator(".ai-chat-send").first();
      if (await sendBtn.count()) {
        await sendBtn.click();

        // 等待 AI 生成完成（预览按钮出现）
        try {
          await page.waitForSelector(".ai-msg-preview-btn", {timeout: 30_000});
          await page.waitForTimeout(1000);

          await hideCaption(page);
          await showCaption(
            page,
            "AI 生成完成 · 打开预览查看效果",
            "生成的动画可以直接在代码实验室中编辑和使用"
          );
          const previewBtn = page.locator(".ai-msg-preview-btn").first();
          await previewBtn.click();
          // 弹窗打开后短暂展示即结束
          await page.waitForTimeout(1500);
        } catch {
          await page.waitForTimeout(1000);
        }
      }
    }

    await hideCaption(page);
    await hideFeatureTag(page);
  }
}

/* ═══════════════════════════════════════════════
   主函数
   ═══════════════════════════════════════════════ */

async function main() {
  const outDirArg = getArgValue("--out-dir") || DEFAULT_OUT_DIR;
  const outDir = path.resolve(process.cwd(), outDirArg);
  const noServer = hasArg("--no-server");
  const port = Number.parseInt(
    getArgValue("--port") || String(DEFAULT_PORT),
    10
  );
  const explicitUrl = getArgValue("--url");
  const baseUrl = explicitUrl || `http://${DEFAULT_HOST}:${port}/`;

  await mkdir(outDir, {recursive: true});

  let server = null;
  try {
    if (!noServer) {
      console.log(`启动开发服务器: ${baseUrl}`);
      server = await startViteServer(port);
      await waitForHttp(baseUrl);
    } else {
      await waitForHttp(baseUrl, 10_000);
    }

    console.log("启动浏览器录制...");
    const {chromium} = await import("playwright");
    const browser = await chromium.launch({headless: true});

    let context = null;
    let video = null;

    try {
      context = await browser.newContext({
        locale: "zh-CN",
        viewport: VIEWPORT,
        recordVideo: {dir: outDir, size: VIEWPORT},
      });
      const page = await context.newPage();
      video = page.video();

      await page.goto(baseUrl, {waitUntil: "domcontentloaded"});

      // 强制设置暗色模式
      await page.evaluate(() => {
        localStorage.setItem("color-mode", "dark");
        document.documentElement.setAttribute("data-color-mode", "dark");
        const btn = document.querySelector("#colorModeToggle");
        if (btn) btn.textContent = "亮色模式";
      });
      await page.waitForTimeout(500);

      console.log("开始录制...");
      await runShowcase(page);
      console.log("录制完成，正在保存...");
    } finally {
      if (context) await context.close();
      await browser.close();
    }

    if (!video) throw new Error("视频对象初始化失败");
    const rawPath = await video.path();
    const finalWebm = path.join(
      outDir,
      `css-animation-showcase-${getTimestamp()}.webm`
    );
    await rename(rawPath, finalWebm);
    console.log(`宣传视频已生成: ${finalWebm}`);

    const mp4Path = await maybeConvertToMp4(finalWebm);
    if (mp4Path) {
      console.log(`已额外导出 MP4: ${mp4Path}`);
    } else {
      console.log("未检测到 ffmpeg，跳过 MP4 转码（已保留 webm）。");
    }
  } finally {
    if (server) await server.close();
  }
}

main().catch((err) => {
  console.error(`录制失败: ${err.message}`);
  process.exitCode = 1;
});
