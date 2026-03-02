# Remotion Promo Video

这个目录是 `css-animation` 项目的宣传视频第一版，实现了两个画幅：

- `CssAnimationPromo16x9` (1920x1080)
- `CssAnimationPromo9x16` (1080x1920)

## 1) 安装依赖

在项目根目录执行：

```bash
npm i -D remotion @remotion/cli react react-dom
```

## 2) 打开预览

```bash
npx remotion studio remotion/index.jsx
```

## 3) 导出视频

16:9：

```bash
npx remotion render remotion/index.jsx CssAnimationPromo16x9 out/css-animation-promo-16x9.mp4
```

9:16：

```bash
npx remotion render remotion/index.jsx CssAnimationPromo9x16 out/css-animation-promo-9x16.mp4
```

## 4) 可改参数

- 在 `remotion/CssAnimationPromo.jsx` 中改时长：
  - `promoDurationInFrames`
  - `sceneDuration`
- 在 `features`、`metricCards` 中改主叙事文案与数据。
- 默认会读取 `src/data.js` 的分类与语义索引，视频会跟随项目数据变化。
