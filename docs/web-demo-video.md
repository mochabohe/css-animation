# 网页功能操作演示视频（自动录制）

这个方案不是合成动画，而是“真实打开网页 + 自动执行功能操作 + 导出视频”。

## 1) 安装 Playwright

```bash
npm i -D playwright
npx playwright install chromium
```

## 2) 一键录制（自动启动项目）

```bash
npm run demo:video
```

默认行为：
- 自动启动 `vite`（端口 `4173`）
- 自动执行操作：分类筛选、搜索、主题切换、亮暗模式、低动效开关、点赞、代码实验室、AI 工坊开关
- 输出到 `out/` 目录

## 3) 录制现有已启动页面

如果你已经在 `5173` 启动了页面：

```bash
npm run demo:video:existing
```

## 4) 查看输出文件

脚本会生成：
- `out/css-animation-demo-时间戳.webm`
- 若本机安装了 `ffmpeg`，会额外生成同名 `.mp4`

## 5) 常用参数

```bash
node scripts/record-demo-video.mjs --port 4200 --out-dir out/demo
node scripts/record-demo-video.mjs --no-server --url http://localhost:5173/ --out-dir out/demo
```
