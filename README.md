# CSS Animation Demo

一个基于 Vite 的 CSS 动画演示项目，支持分类筛选、主题切换、代码实验室与动画参数调节。

## 环境要求

- Node.js 20.x（与 CI 保持一致）
- npm 10+

## 快速开始

在 `css-animation` 目录执行：

```bash
npm ci
npm run dev
```

默认本地地址：`http://localhost:5173`

## 可用脚本

- `npm run dev`：启动开发服务器
- `npm run build`：构建生产包到 `dist/`
- `npm run preview`：预览构建产物
- `npm run lint`：运行 ESLint
- `npm run test`：运行 Vitest（`run` 模式）

## 常见问题

### 1) `eslint` / `vitest` 提示 not recognized

通常是依赖未完整安装或当前目录不对：

```bash
# 先确认你在 css-animation 目录
npm ci
npm run lint
npm run test
```

如仍失败，建议删除 `node_modules` 后重新安装。

### 2) 端口被占用

Vite 会自动提示并尝试切换端口，也可以手动指定：

```bash
npm run dev -- --port 5174
```

## CI 对齐

GitHub Actions 会在 Node 20 下执行：安装依赖、Lint、Test、Build。
本地开发建议同样使用 Node 20，以减少环境差异。
