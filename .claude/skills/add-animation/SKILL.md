---
name: add-animation
description: "在 css-animation 项目中新增一个完整的 CSS 动画效果。当用户说「新增动画」、「添加动画」、「加一个动画」时使用。会同步修改 index.html、animations.css、data.js 三个文件。"
---

# 新增 CSS 动画

根据用户描述，在项目中新增一个完整的 CSS 动画效果。需要同步修改三个文件。

## 第一步：确认信息

如果用户没有提供以下信息，先询问：
- **动画名称**（中文，如：旋转光环）
- **所属分类**（从下列选一个）：
  - `loading` — 加载反馈
  - `motion` — 运动效果
  - `interactive` — 交互按钮
  - `transform` — 3D 变换
  - `text` — 文字特效
  - `background` — 背景氛围
  - `wave` — 声波反馈
- **视觉效果描述**（简单说清楚动画长什么样）

## 第二步：读取现有文件，理解规范

按顺序读取以下文件，找同分类的动画作为参考模板：

1. 读取 `css-animation/index.html`，找到同分类的 `<article class="card" data-category="[分类]">` 卡片，了解 HTML 结构模式
2. 读取 `css-animation/src/css/animations.css`，找到同分类动画的 CSS 类和 `@keyframes`，理解命名规范和使用的 CSS 变量
3. 读取 `css-animation/src/data.js`，找到同分类动画在 `animationParams` 和 `animationNamesByTitle` 中的写法

## 第三步：修改 `css-animation/index.html`

在同分类的最后一张卡片后面插入新卡片，格式参考同分类现有卡片：

```html
<article class="card" data-category="[分类英文]">
  <span class="card-tag">[分类中文名]</span>
  <h2>[动画名称]</h2>
  <div class="[新CSS类名]" aria-label="[动画描述]"></div>
</article>
```

注意：
- `data-category` 使用英文分类名
- CSS 类名使用小写连字符格式（如 `orbit-ring`）
- 如果动画需要多个子元素，参考同分类复杂卡片的写法（如 `.dots-loader` 有多个 `<span>`）

## 第四步：修改 `css-animation/src/css/animations.css`

**添加 CSS 类定义**，放在同分类动画的末尾，要求：
- 使用项目已有的 CSS 变量：`var(--accent)`、`var(--accent-soft)`、`var(--accent-deep)`、`var(--accent-rgb)`
- 动画时长使用 CSS 变量（如 `var(--fx-duration)`）而不是硬编码数值
- 动画属性格式：`animation: [keyframe名] var(--fx-duration) var(--fx-easing) infinite;`

**添加 `@keyframes` 定义**，放在文件末尾（`@media (prefers-reduced-motion: reduce)` 之前），keyframe 名使用小驼峰格式（如 `orbitRing`）

## 第五步：修改 `css-animation/src/data.js`

**在 `animationParams` 中添加**，放在同分类注释区域下方，参考现有格式：

```js
动画名称: {
  duration: { label: "时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1, unit: "s", target: "keyframe名" },
  timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "keyframe名" },
},
```

**在 `animationNamesByTitle` 中添加**：

```js
动画名称: ["keyframe名"],
```

## 第六步：完成后告知用户

列出修改了哪三个文件的哪些位置，并提醒运行：

```bash
cd css-animation && npm run dev
```

在浏览器中切换到对应分类，验证动画效果正常显示。
