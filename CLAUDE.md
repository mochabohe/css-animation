# CSS Motion — Claude 工作指引

## 项目概述

CSS Animation 动效组件库，收录 60+ 生产级 CSS 动画效果。提供分类浏览、代码实验室、AI 搜索、多主题等功能。

## Design Context

### Users

前端开发者和 UI/UX 设计师各半。核心任务：**找到动画 → 预览效果 → 复制代码**。两类用户都要求高效率，不喜欢被界面本身打扰。

### Brand Personality

**三个词：克制、精准、有质感**

参考标杆：Vercel / Linear / Raycast — 深色、高密度信息、精准的细节处理。

### Design Principles

1. **动画是主角，界面是舞台** — UI 本身不争抢注意力，一切服务于动画卡片的展示。
2. **克制胜于装饰** — 想加效果时先问"去掉会不会更好"，多数时候答案是肯定的。
3. **密度 × 清晰 = 专业感** — 信息可以密集，但层级必须清晰，3 秒内完成找到→预览→复制。
4. **暗色质感不是暗色氛围** — 用微妙的边框和透明度区分层级，不要一片漆黑。
5. **排版即秩序** — 字号、字重、字色三者配合建立视觉层级，不依赖颜色传递重要性。

### 必须避免

- ❌ 界面动效过多（不能抢动画卡片的戏）
- ❌ Bootstrap 式通用感（圆角过大、配色过于柔和）
- ❌ 过于商务 SaaS 的正式感

## 技术规范

- **Tech Stack：** Vite + 原生 HTML/CSS/JS
- **CSS 变量：** 所有样式通过 `src/css/variables.css` 的 token 系统控制
- **主题：** `data-color-mode` 属性切换暗/亮主题
- **速度控制：** 全局 `--speed-multiplier` 变量

## 常用 Skills

- `/add-animation` — 新增 CSS 动画（同步修改 index.html、animations.css、data.js）
- `/new-category` — 新增动画分类
- `/check` — 运行 ESLint + Vitest 质量检查
