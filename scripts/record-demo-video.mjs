import {spawn} from "node:child_process";
import {access, mkdir, rename} from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_PORT = 4173;
const DEFAULT_HOST = "localhost";
const DEFAULT_OUT_DIR = "out";
const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_VIEWPORT = {width: 1920, height: 1080};

function getArgValue(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function hasArg(name) {
  return process.argv.includes(name);
}

function getTimestamp() {
  const now = new Date();
  const two = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}${two(now.getMonth() + 1)}${two(now.getDate())}-${two(now.getHours())}${two(
    now.getMinutes()
  )}${two(now.getSeconds())}`;
}

async function waitForHttp(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, {method: "GET"});
      if (res.ok || res.status === 304) return;
    } catch {
      // Ignore polling errors.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`等待服务超时：${url}`);
}

async function startViteServer(port) {
  let createServer;
  try {
    ({createServer} = await import("vite"));
  } catch {
    throw new Error('缺少依赖 "vite"，请先执行: npm i');
  }

  const server = await createServer({
    server: {
      host: DEFAULT_HOST,
      port,
      strictPort: true,
    },
    clearScreen: false,
    logLevel: "info",
  });

  await server.listen();
  return server;
}

async function stopViteServer(server) {
  if (!server) return;
  await server.close();
}

async function maybeConvertToMp4(webmPath) {
  const mp4Path = webmPath.replace(/\.webm$/i, ".mp4");

  try {
    const ffmpegCheck = spawn("ffmpeg", ["-version"], {stdio: "ignore"});
    const hasFfmpeg = await new Promise((resolve) => {
      ffmpegCheck.on("error", () => resolve(false));
      ffmpegCheck.on("close", (code) => resolve(code === 0));
    });
    if (!hasFfmpeg) return null;

    await new Promise((resolve, reject) => {
      const convert = spawn(
        "ffmpeg",
        ["-y", "-i", webmPath, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4Path],
        {stdio: "ignore"}
      );
      convert.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`ffmpeg 转码失败，退出码 ${code}`));
      });
      convert.on("error", reject);
    });

    await access(mp4Path);
    return mp4Path;
  } catch {
    return null;
  }
}

async function clickAndPause(page, selector, pause = 900) {
  const locator = page.locator(selector).first();
  await locator.waitFor({state: "visible", timeout: 15_000});
  await locator.click();
  await page.waitForTimeout(pause);
}

async function smoothScroll(page, y, pause = 900) {
  await page.evaluate((targetY) => {
    window.scrollTo({top: targetY, behavior: "smooth"});
  }, y);
  await page.waitForTimeout(pause);
}

async function runDemo(page) {
  await page.waitForTimeout(1600);

  await clickAndPause(page, '.filter-btn[data-filter="interactive"]');
  await clickAndPause(page, '.filter-btn[data-filter="loading"]');
  await clickAndPause(page, '.filter-btn[data-filter="bigdata"]');
  await clickAndPause(page, '.filter-btn[data-filter="all"]', 1200);

  await page.fill("#searchInput", "流光");
  await page.waitForTimeout(1400);
  await page.fill("#searchInput", "骨架");
  await page.waitForTimeout(1200);
  await page.fill("#searchInput", "");
  await page.waitForTimeout(800);

  await clickAndPause(page, '.theme-btn[data-theme="purple"]');
  await clickAndPause(page, '.theme-btn[data-theme="orange"]');
  await clickAndPause(page, '.theme-btn[data-theme="teal"]');
  await page.evaluate(() => {
    const input = document.querySelector("#customColor");
    if (!input) return;
    input.value = "#ff6a3d";
    input.dispatchEvent(new Event("input", {bubbles: true}));
    input.dispatchEvent(new Event("change", {bubbles: true}));
  });
  await page.waitForTimeout(1200);

  await clickAndPause(page, "#colorModeToggle", 1100);
  await clickAndPause(page, "#motionToggle");
  await clickAndPause(page, "#motionToggle");
  await clickAndPause(page, "#colorModeToggle", 1000);

  await smoothScroll(page, 860, 1000);
  await clickAndPause(page, '.card[data-category="interactive"] .like-btn');

  await page.waitForSelector(".snippet-toggle", {timeout: 15_000});
  await clickAndPause(page, '.card[data-category="interactive"] .snippet-toggle', 1300);

  const quickTuneBtn = page.locator('.ai-intent-btn:has-text("更快")').first();
  if (await quickTuneBtn.count()) {
    await quickTuneBtn.click();
    await page.waitForTimeout(1000);
  }
  await clickAndPause(page, ".modal-close", 1200);

  const aiFab = page.locator(".ai-fab").first();
  if (await aiFab.count()) {
    await aiFab.click();
    await page.waitForTimeout(1200);
    await clickAndPause(page, ".ai-panel-close", 900);
  }

  await smoothScroll(page, 0, 1200);
}

async function main() {
  const outDirArg = getArgValue("--out-dir") || DEFAULT_OUT_DIR;
  const outDir = path.resolve(process.cwd(), outDirArg);
  const noServer = hasArg("--no-server");
  const port = Number.parseInt(getArgValue("--port") || String(DEFAULT_PORT), 10);
  const explicitUrl = getArgValue("--url");
  const baseUrl = explicitUrl || `http://${DEFAULT_HOST}:${port}/`;

  await mkdir(outDir, {recursive: true});

  let server = null;
  try {
    if (!noServer) {
      console.log(`启动开发服务器: ${baseUrl}`);
      server = await startViteServer(port);
      await waitForHttp(baseUrl, DEFAULT_TIMEOUT_MS);
    } else {
      await waitForHttp(baseUrl, 10_000);
    }

    let playwrightModule;
    try {
      playwrightModule = await import("playwright");
    } catch {
      throw new Error('缺少依赖 "playwright"。请先执行: npm i -D playwright');
    }

    const {chromium} = playwrightModule;
    const browser = await chromium.launch({headless: true});
    let context = null;
    let video = null;

    try {
      context = await browser.newContext({
        locale: "zh-CN",
        viewport: DEFAULT_VIEWPORT,
        recordVideo: {
          dir: outDir,
          size: DEFAULT_VIEWPORT,
        },
      });
      const page = await context.newPage();
      video = page.video();

      await page.goto(baseUrl, {waitUntil: "domcontentloaded"});
      await runDemo(page);
    } finally {
      if (context) await context.close();
      await browser.close();
    }

    if (!video) throw new Error("视频对象初始化失败");
    const rawVideoPath = await video.path();
    const finalWebmPath = path.join(outDir, `css-animation-demo-${getTimestamp()}.webm`);
    await rename(rawVideoPath, finalWebmPath);

    console.log(`演示视频已生成: ${finalWebmPath}`);
    const mp4Path = await maybeConvertToMp4(finalWebmPath);
    if (mp4Path) {
      console.log(`已额外导出 MP4: ${mp4Path}`);
    } else {
      console.log("未检测到 ffmpeg，跳过 MP4 转码（已保留 webm）。");
    }
  } finally {
    await stopViteServer(server);
  }
}

main().catch(async (error) => {
  console.error(`录制失败: ${error.message}`);
  process.exitCode = 1;
});
