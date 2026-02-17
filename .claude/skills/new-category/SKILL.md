---
name: new-category
description: "在 css-animation 项目中新增一个动画分类。当用户说「新增分类」、「添加分类」、「加一个分类」时使用。会同步修改 index.html 筛选按钮和 data.js 的 categoryInsights。"
---

# 新增动画分类

在项目中新增一个完整的动画分类，需要同步修改两个文件。

## 第一步：确认信息

如果用户没有提供以下信息，先询问：
- **分类英文 key**（如：`particle`，用于 `data-category` 和 `data-filter`）
- **分类中文名**（如：粒子效果，显示在筛选按钮和卡片标签上）
- **使用场景描述**（如：粒子动效 / 视觉装饰）
- **Design Token 名**（如：`motion.particle`，参考现有格式 `motion.loading`）

## 第二步：读取现有文件确认格式

读取以下文件，理解现有分类的完整写法：
1. 读取 `css-animation/index.html`，找到 `.filter-bar` 区域和任意一个完整分类的卡片区域
2. 读取 `css-animation/src/data.js`，查看 `categoryInsights` 的格式

## 第三步：修改 `css-animation/index.html`

**添加筛选按钮**，在 `.filter-bar` 内的最后一个按钮后面插入：

```html
<button class="filter-btn" type="button" data-filter="[英文key]" aria-pressed="false">[中文名]</button>
```

**添加卡片区域**，在 HTML 卡片列表末尾（最后一个 `</article>` 后面）添加新分类的第一张占位卡片：

```html
<article class="card" data-category="[英文key]">
  <span class="card-tag">[中文名]</span>
  <h2>[第一个动画名称]</h2>
  <div class="[CSS类名]" aria-label="[描述]"></div>
</article>
```

注意：至少需要添加一张卡片，否则该分类筛选后显示空白。

## 第四步：修改 `css-animation/src/data.js`

在 `categoryInsights` 对象中添加新分类：

```js
[英文key]: { scenario: "[使用场景描述]", token: "[Design Token]" },
```

## 第五步：完成后告知用户

列出修改的位置，并提醒：
1. 新分类已可在筛选栏中使用
2. 如需添加更多该分类的动画，使用 `/add-animation` 并选择新分类
3. 运行 `cd css-animation && npm run dev` 在浏览器中验证筛选功能正常
