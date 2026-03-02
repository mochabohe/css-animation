/**
 * 使用 Playwright 分段录制页面各功能演示视频
 * 每个功能录制为独立的视频片段，供 Remotion 合成使用
 *
 * 用法:
 *   npm run demo:screenshots
 *   node scripts/capture-screenshots.mjs --no-server --url http://localhost:5173/
 */
import {mkdir, rename} from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_PORT = 4173;
const DEFAULT_HOST = "localhost";
const VIEWPORT = {width: 1920, height: 1080};
const OUT_DIR = path.resolve(process.cwd(), "public/recordings");

function getArgValue(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}
function hasArg(name) {
  return process.argv.includes(name);
}

async function waitForHttp(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, {method: "GET"});
      if (res.ok || res.status === 304) return;
    } catch {
      /* 继续重试 */
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

async function clickAndWait(page, selector, pause = 800) {
  const locator = page.locator(selector).first();
  await locator.waitFor({state: "visible", timeout: 15_000});
  await locator.click();
  await page.waitForTimeout(pause);
}

/**
 * 录制一个片段：创建新 context → 执行操作 → 关闭并保存视频
 */
async function recordSegment(browser, baseUrl, name, actionFn, setupFn) {
  const context = await browser.newContext({
    locale: "zh-CN",
    viewport: VIEWPORT,
    recordVideo: {dir: OUT_DIR, size: VIEWPORT},
  });
  const page = await context.newPage();
  const video = page.video();

  await page.goto(baseUrl, {waitUntil: "domcontentloaded"});
  await page.waitForTimeout(1200);

  // 如果有前置操作（如切换到特定状态），先执行
  if (setupFn) await setupFn(page);

  // 执行录制操作
  await actionFn(page);

  await context.close();

  // 重命名视频文件
  if (video) {
    const rawPath = await video.path();
    const finalPath = path.join(OUT_DIR, `${name}.webm`);
    await rename(rawPath, finalPath);
    console.log(`  ✓ ${name}.webm`);
  }
}

async function main() {
  await mkdir(OUT_DIR, {recursive: true});

  const noServer = hasArg("--no-server");
  const port = Number.parseInt(
    getArgValue("--port") || String(DEFAULT_PORT),
    10
  );
  const explicitUrl = getArgValue("--url");
  const baseUrl = explicitUrl || `http://${DEFAULT_HOST}:${port}/`;

  let server = null;
  try {
    if (!noServer) {
      console.log(`启动开发服务器: ${baseUrl}`);
      server = await startViteServer(port);
      await waitForHttp(baseUrl);
    } else {
      await waitForHttp(baseUrl, 10_000);
    }

    const {chromium} = await import("playwright");
    const browser = await chromium.launch({headless: true});

    console.log("开始分段录制...\n");

    // 片段 1: 首页加载（3秒静态展示）
    await recordSegment(browser, baseUrl, "01-homepage", async (page) => {
      await page.waitForTimeout(3000);
    });

    // 片段 2: 分类筛选切换
    await recordSegment(browser, baseUrl, "02-category", async (page) => {
      await clickAndWait(page, '.filter-btn[data-filter="interactive"]', 1200);
      await clickAndWait(page, '.filter-btn[data-filter="loading"]', 1200);
      await clickAndWait(page, '.filter-btn[data-filter="text"]', 1200);
      await clickAndWait(page, '.filter-btn[data-filter="bigdata"]', 1200);
      await clickAndWait(page, '.filter-btn[data-filter="all"]', 1000);
    });

    // 片段 3: 搜索功能
    await recordSegment(browser, baseUrl, "03-search", async (page) => {
      await page.fill("#searchInput", "流光");
      await page.waitForTimeout(1500);
      await page.fill("#searchInput", "骨架");
      await page.waitForTimeout(1500);
      await page.fill("#searchInput", "");
      await page.waitForTimeout(800);
    });

    // 片段 4: 主题色切换
    await recordSegment(browser, baseUrl, "04-theme", async (page) => {
      await clickAndWait(page, '.theme-btn[data-theme="purple"]', 1200);
      await clickAndWait(page, '.theme-btn[data-theme="orange"]', 1200);
      await clickAndWait(page, '.theme-btn[data-theme="green"]', 1200);
      await clickAndWait(page, '.theme-btn[data-theme="pink"]', 1200);
      await clickAndWait(page, '.theme-btn[data-theme="cyan"]', 1000);
    });

    // 片段 5: 亮暗模式切换
    await recordSegment(browser, baseUrl, "05-darklight", async (page) => {
      await page.waitForTimeout(500);
      await clickAndWait(page, "#colorModeToggle", 2000);
      await clickAndWait(page, "#colorModeToggle", 1500);
    });

    // 片段 6: 代码实验室
    await recordSegment(browser, baseUrl, "06-codelab", async (page) => {
      await page.waitForSelector(".snippet-toggle", {timeout: 15_000});
      await clickAndWait(
        page,
        '.card[data-category="interactive"] .snippet-toggle',
        2000
      );
      // 尝试点击快速调参
      const quickTuneBtn = page
        .locator('.ai-intent-btn:has-text("更快")')
        .first();
      if (await quickTuneBtn.count()) {
        await quickTuneBtn.click();
        await page.waitForTimeout(1500);
      }
      await page.waitForTimeout(1500);
      await clickAndWait(page, ".modal-close", 800);
    });

    // 片段 7: AI 工坊面板
    await recordSegment(browser, baseUrl, "07-ai-panel", async (page) => {
      const aiFab = page.locator(".ai-fab").first();
      if (await aiFab.count()) {
        await aiFab.click();
        await page.waitForTimeout(2500);
        await clickAndWait(page, ".ai-panel-close", 1000);
      } else {
        await page.waitForTimeout(3000);
      }
    });

    // 片段 8: 页面滚动展示更多卡片
    await recordSegment(browser, baseUrl, "08-scroll", async (page) => {
      await page.evaluate(() =>
        window.scrollTo({top: 600, behavior: "smooth"})
      );
      await page.waitForTimeout(1500);
      await page.evaluate(() =>
        window.scrollTo({top: 1200, behavior: "smooth"})
      );
      await page.waitForTimeout(1500);
      await page.evaluate(() =>
        window.scrollTo({top: 0, behavior: "smooth"})
      );
      await page.waitForTimeout(1500);
    });

    // 片段 9: 低动效模式开关
    await recordSegment(browser, baseUrl, "09-reduced-motion", async (page) => {
      await clickAndWait(page, "#motionToggle", 2000);
      await clickAndWait(page, "#motionToggle", 1500);
    });

    await browser.close();
    console.log(`\n全部录制完成！视频保存在: ${OUT_DIR}`);
  } finally {
    if (server) await server.close();
  }
}

main().catch((err) => {
  console.error(`录制失败: ${err.message}`);
  process.exitCode = 1;
});
