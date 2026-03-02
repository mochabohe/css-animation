import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {animationSemanticIndex, categoryInsights} from "../src/data.js";
import {MockBrowser} from "./components/MockBrowser.jsx";
import {SceneTransition} from "./components/SceneTransition.jsx";
import {FeatureTag, TextOverlay} from "./components/TextOverlay.jsx";

/* ─── 全局参数 ─── */
export const showcaseFps = 30;
export const showcaseDurationInFrames = showcaseFps * 75; // 75秒

const palette = {
  ink: "#0B1020",
  inkSoft: "#1A2342",
  paper: "#EAF1FF",
  paperSoft: "#B8C8EE",
  cyan: "#4DD7FF",
  blue: "#5E7BFF",
  mint: "#71F7C5",
  warm: "#FFD68A",
  purple: "#c084fc",
  orange: "#FFB86C",
};

const toRgba = (hex, alpha) => {
  const c = hex.replace("#", "");
  const n = c.length === 3 ? c.split("").map((ch) => ch + ch).join("") : c;
  const i = Number.parseInt(n, 16);
  return `rgba(${(i >> 16) & 255}, ${(i >> 8) & 255}, ${i & 255}, ${alpha})`;
};

/* ─── 数据 ─── */
const semanticEntries = Object.entries(animationSemanticIndex);
const categoryEntries = Object.entries(categoryInsights);

const metricCards = [
  {label: "动画条目", value: semanticEntries.length, suffix: "+"},
  {label: "分类维度", value: categoryEntries.length, suffix: ""},
  {
    label: "语义标签",
    value: semanticEntries.reduce((sum, [, tags]) => sum + tags.length, 0),
    suffix: "+",
  },
];

/* ─── 场景时长配置（帧数） ─── */
const S = {
  opening: 120,       // 4s  — 开场标题
  pageLoad: 150,      // 5s  — 首页展示
  category: 270,      // 9s  — 分类筛选
  search: 210,        // 7s  — 搜索功能
  theme: 240,         // 8s  — 主题切换
  darkLight: 150,     // 5s  — 亮暗模式
  codeLab: 270,       // 9s  — 代码实验室
  aiPanel: 210,       // 7s  — AI 工坊
  scroll: 180,        // 6s  — 滚动展示
  reducedMotion: 120, // 4s  — 低动效
  ending: 330,        // 11s — 结尾
};

/* ─── 录制视频文件映射 ─── */
const videoSrc = (name) => staticFile(`recordings/${name}.webm`);

/* ══════════════════════════════════════════
   场景 1: 开场标题
   ══════════════════════════════════════════ */
const OpeningScene = ({isPortrait}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const titleY = interpolate(frame, [0, fps * 1.2], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const subOpacity = interpolate(frame, [fps * 0.6, fps * 1.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chips = ["分类筛选", "主题切换", "代码实验室", "AI 搜索", "低动效模式"];
  const chipColors = [palette.cyan, palette.mint, palette.warm, palette.blue, palette.purple];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isPortrait ? "120px 60px" : "80px 120px",
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontSize: isPortrait ? 64 : 88,
            fontWeight: 900,
            color: palette.paper,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          CSS Animation
        </div>
      </div>
      <div
        style={{
          opacity: subOpacity,
          textAlign: "center",
          marginBottom: 36,
        }}
      >
        <div
          style={{
            fontSize: isPortrait ? 28 : 34,
            color: palette.paperSoft,
            lineHeight: 1.4,
          }}
        >
          一站式动画检索、筛选、调参与展示平台
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 14,
        }}
      >
        {chips.map((chip, index) => {
          const chipScale = spring({
            frame: Math.max(0, frame - fps * 0.8 - index * 4),
            fps,
            config: {damping: 18, stiffness: 140, mass: 0.6},
          });
          return (
            <div
              key={chip}
              style={{
                transform: `scale(${chipScale})`,
                opacity: chipScale,
                fontSize: isPortrait ? 24 : 22,
                padding: "10px 22px",
                borderRadius: 999,
                border: `1.5px solid ${toRgba(chipColors[index], 0.6)}`,
                background: toRgba(chipColors[index], 0.15),
                color: palette.paper,
                fontWeight: 600,
              }}
            >
              {chip}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════
   场景 2: 首页展示（录制视频）
   ══════════════════════════════════════════ */
const PageLoadScene = ({durationInFrames}) => {
  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill style={{padding: 32, background: palette.ink}}>
        <MockBrowser url="localhost:5173">
          <OffthreadVideo
            src={videoSrc("01-homepage")}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </MockBrowser>
      </AbsoluteFill>
      <TextOverlay
        title="80+ CSS 动画效果"
        subtitle="覆盖交互、加载、文字、背景、大数据等多种场景"
        delay={15}
      />
      <FeatureTag text="首页概览" color={palette.cyan} delay={10} />
    </SceneTransition>
  );
};

/* ══════════════════════════════════════════
   场景 3: 分类筛选
   ══════════════════════════════════════════ */
const CategoryScene = ({durationInFrames}) => {
  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill style={{padding: 32, background: palette.ink}}>
        <MockBrowser url="localhost:5173/?filter=interactive">
          <OffthreadVideo
            src={videoSrc("02-category")}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </MockBrowser>
      </AbsoluteFill>
      <TextOverlay
        title="9 大分类 · 按场景快速定位"
        subtitle="交互按钮 / 加载反馈 / 空结果 / 文字特效 / 背景氛围 / 声波条纹 / 运动效果 / 大数据"
        delay={10}
      />
      <FeatureTag text="分类筛选" color={palette.cyan} delay={5} />
    </SceneTransition>
  );
};

/* ══════════════════════════════════════════
   场景 4: 搜索功能
   ══════════════════════════════════════════ */
const SearchScene = ({durationInFrames}) => {
  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill style={{padding: 32, background: palette.ink}}>
        <MockBrowser url="localhost:5173/?q=流光">
          <OffthreadVideo
            src={videoSrc("03-search")}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </MockBrowser>
      </AbsoluteFill>
      <TextOverlay
        title="关键词搜索 · 精确定位"
        subtitle="输入动画名称、标签或关键词，实时筛选匹配结果"
        delay={10}
      />
      <FeatureTag text="搜索" color={palette.mint} delay={5} />
    </SceneTransition>
  );
};

/* ══════════════════════════════════════════
   场景 5: 主题切换
   ══════════════════════════════════════════ */
const ThemeScene = ({durationInFrames}) => {
  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill style={{padding: 32, background: palette.ink}}>
        <MockBrowser url="localhost:5173/?theme=purple">
          <OffthreadVideo
            src={videoSrc("04-theme")}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </MockBrowser>
      </AbsoluteFill>
      <TextOverlay
        title="11 种主题色 + 自定义颜色"
        subtitle="一键切换品牌色，支持输入任意颜色值"
        delay={10}
      />
      <FeatureTag text="主题切换" color={palette.purple} delay={5} />
    </SceneTransition>
  );
};

/* ══════════════════════════════════════════
   场景 6: 亮暗模式
   ══════════════════════════════════════════ */
const DarkLightScene = ({durationInFrames}) => {
  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill style={{padding: 32, background: palette.ink}}>
        <MockBrowser url="localhost:5173">
          <OffthreadVideo
            src={videoSrc("05-darklight")}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </MockBrowser>
      </AbsoluteFill>
      <TextOverlay
        title="深色 / 浅色模式自由切换"
        subtitle="一键切换外观主题，适配不同使用场景"
        delay={10}
      />
      <FeatureTag text="外观切换" color={palette.warm} delay={5} />
    </SceneTransition>
  );
};

/* ══════════════════════════════════════════
   场景 7: 代码实验室
   ══════════════════════════════════════════ */
const CodeLabScene = ({durationInFrames}) => {
  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill style={{padding: 32, background: palette.ink}}>
        <MockBrowser url="localhost:5173/#code-lab">
          <OffthreadVideo
            src={videoSrc("06-codelab")}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </MockBrowser>
      </AbsoluteFill>
      <TextOverlay
        title="代码实验室 · 边看边改"
        subtitle="实时编辑 CSS 代码，直接调参预览效果，支持一键复制"
        delay={10}
      />
      <FeatureTag text="代码实验室" color={palette.warm} delay={5} />
    </SceneTransition>
  );
};

/* ══════════════════════════════════════════
   场景 8: AI 工坊
   ══════════════════════════════════════════ */
const AIPanelScene = ({durationInFrames}) => {
  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill style={{padding: 32, background: palette.ink}}>
        <MockBrowser url="localhost:5173/#ai">
          <OffthreadVideo
            src={videoSrc("07-ai-panel")}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </MockBrowser>
      </AbsoluteFill>
      <TextOverlay
        title="AI 语义搜索 · 输入意图即可命中"
        subtitle="AI 工坊面板提供智能动画推荐和多轮对话"
        delay={10}
      />
      <FeatureTag text="AI 工坊" color={palette.blue} delay={5} />
    </SceneTransition>
  );
};

/* ══════════════════════════════════════════
   场景 9: 滚动展示
   ══════════════════════════════════════════ */
const ScrollScene = ({durationInFrames}) => {
  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill style={{padding: 32, background: palette.ink}}>
        <MockBrowser url="localhost:5173">
          <OffthreadVideo
            src={videoSrc("08-scroll")}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </MockBrowser>
      </AbsoluteFill>
      <TextOverlay
        title="丰富的动画库 · 持续扩展"
        subtitle="所有动画按需暂停，只有进入视口的卡片才运行动画"
        delay={10}
      />
      <FeatureTag text="动画展示" color={palette.cyan} delay={5} />
    </SceneTransition>
  );
};

/* ══════════════════════════════════════════
   场景 10: 低动效模式
   ══════════════════════════════════════════ */
const ReducedMotionScene = ({durationInFrames}) => {
  return (
    <SceneTransition durationInFrames={durationInFrames}>
      <AbsoluteFill style={{padding: 32, background: palette.ink}}>
        <MockBrowser url="localhost:5173">
          <OffthreadVideo
            src={videoSrc("09-reduced-motion")}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        </MockBrowser>
      </AbsoluteFill>
      <TextOverlay
        title="低动效模式 · 无障碍体验"
        subtitle="一键开关动效预览，适配 prefers-reduced-motion 偏好"
        delay={10}
      />
      <FeatureTag text="无障碍" color={palette.mint} delay={5} />
    </SceneTransition>
  );
};

/* ══════════════════════════════════════════
   场景 11: 结尾 CTA
   ══════════════════════════════════════════ */
const EndingScene = ({isPortrait}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 核心口号动画
  const sloganOpacity = interpolate(frame, [0, fps * 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const sloganY = interpolate(frame, [0, fps * 1], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isPortrait ? "80px 60px" : "60px 120px",
      }}
    >
      {/* 核心口号 */}
      <div
        style={{
          opacity: sloganOpacity,
          transform: `translateY(${sloganY}px)`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: isPortrait ? 52 : 76,
            fontWeight: 900,
            color: palette.paper,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          把灵感变成可复用动效
        </div>
        <div
          style={{
            fontSize: isPortrait ? 26 : 30,
            color: palette.paperSoft,
            lineHeight: 1.4,
          }}
        >
          CSS Animation · 快速检索 · 直接应用 · 持续扩展
        </div>
      </div>

      {/* 统计指标卡片 */}
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          display: "grid",
          gap: 20,
          gridTemplateColumns: isPortrait
            ? "1fr"
            : "repeat(3, minmax(0, 1fr))",
          marginBottom: 40,
        }}
      >
        {metricCards.map((metric, index) => {
          const cardRise = spring({
            frame: Math.max(0, frame - fps * 1.2 - index * 6),
            fps,
            config: {damping: 20, stiffness: 120, mass: 0.7},
          });
          const count = Math.floor(
            interpolate(
              Math.max(0, frame - fps * 1.5 - index * 8),
              [0, fps * 2.5],
              [0, metric.value],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            )
          );

          return (
            <div
              key={metric.label}
              style={{
                opacity: cardRise,
                transform: `translateY(${(1 - cardRise) * 20}px)`,
                borderRadius: 20,
                border: `1px solid ${toRgba(palette.paper, 0.18)}`,
                background: toRgba(palette.inkSoft, 0.7),
                padding: "22px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  letterSpacing: "0.04em",
                  color: palette.paperSoft,
                  marginBottom: 8,
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: 52,
                  lineHeight: 1,
                  color: palette.mint,
                  fontWeight: 800,
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                {count}
                {metric.suffix}
              </div>
            </div>
          );
        })}
      </div>

      {/* 功能亮点列表 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          marginBottom: 30,
        }}
      >
        {[
          {text: "分类筛选", color: palette.cyan},
          {text: "主题切换", color: palette.purple},
          {text: "代码实验室", color: palette.warm},
          {text: "AI 搜索", color: palette.blue},
          {text: "亮暗模式", color: palette.orange},
          {text: "低动效", color: palette.mint},
        ].map((item, index) => {
          const tagScale = spring({
            frame: Math.max(0, frame - fps * 3 - index * 3),
            fps,
            config: {damping: 16, stiffness: 150, mass: 0.5},
          });
          return (
            <div
              key={item.text}
              style={{
                transform: `scale(${tagScale})`,
                opacity: tagScale,
                fontSize: 20,
                padding: "8px 18px",
                borderRadius: 999,
                border: `1.5px solid ${toRgba(item.color, 0.5)}`,
                background: toRgba(item.color, 0.12),
                color: palette.paper,
                fontWeight: 600,
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>

      {/* GitHub 标签 */}
      {(() => {
        const ghScale = spring({
          frame: Math.max(0, frame - fps * 4.5),
          fps,
          config: {damping: 20, stiffness: 110, mass: 0.8},
        });
        return (
          <div
            style={{
              transform: `scale(${ghScale})`,
              opacity: ghScale,
              borderRadius: 999,
              border: `1.5px solid ${toRgba(palette.cyan, 0.5)}`,
              background: toRgba(palette.blue, 0.2),
              color: palette.paper,
              padding: "12px 30px",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            岚图 · CSS Animation
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════
   主组件：编排所有场景
   ══════════════════════════════════════════ */
export const CssAnimationShowcase = ({orientation = "landscape"}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isPortrait = orientation === "portrait";

  // 背景光晕
  const bgX = interpolate(frame, [0, showcaseDurationInFrames], [-150, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const bgY = interpolate(frame, [0, showcaseDurationInFrames], [100, -150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const glowPulse = interpolate(
    frame % (fps * 4),
    [0, fps * 2, fps * 4],
    [0.3, 0.7, 0.3],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  // 计算各场景的起始帧
  let offset = 0;
  const starts = {};
  for (const [key, dur] of Object.entries(S)) {
    starts[key] = offset;
    offset += dur;
  }

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, ${palette.ink} 0%, #101C37 54%, #111A30 100%)`,
        fontFamily:
          "Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Segoe UI, sans-serif",
        color: palette.paper,
        overflow: "hidden",
      }}
    >
      {/* 背景光晕装饰 */}
      <div
        style={{
          position: "absolute",
          left: width * 0.08 + bgX,
          top: height * 0.08 + bgY,
          width: isPortrait ? 400 : 520,
          height: isPortrait ? 400 : 520,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${toRgba(palette.blue, glowPulse)} 0%, ${toRgba(palette.blue, 0)} 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: width * 0.06 - bgX * 0.6,
          bottom: height * 0.06 - bgY * 0.5,
          width: isPortrait ? 340 : 440,
          height: isPortrait ? 340 : 440,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${toRgba(palette.cyan, glowPulse * 0.6)} 0%, ${toRgba(palette.cyan, 0)} 72%)`,
          pointerEvents: "none",
        }}
      />

      {/* 场景 1: 开场标题 */}
      <Sequence from={starts.opening} durationInFrames={S.opening}>
        <SceneTransition durationInFrames={S.opening} fadeIn={15} fadeOut={12}>
          <OpeningScene isPortrait={isPortrait} />
        </SceneTransition>
      </Sequence>

      {/* 场景 2: 首页展示 */}
      <Sequence from={starts.pageLoad} durationInFrames={S.pageLoad}>
        <PageLoadScene durationInFrames={S.pageLoad} />
      </Sequence>

      {/* 场景 3: 分类筛选 */}
      <Sequence from={starts.category} durationInFrames={S.category}>
        <CategoryScene durationInFrames={S.category} />
      </Sequence>

      {/* 场景 4: 搜索功能 */}
      <Sequence from={starts.search} durationInFrames={S.search}>
        <SearchScene durationInFrames={S.search} />
      </Sequence>

      {/* 场景 5: 主题切换 */}
      <Sequence from={starts.theme} durationInFrames={S.theme}>
        <ThemeScene durationInFrames={S.theme} />
      </Sequence>

      {/* 场景 6: 亮暗模式 */}
      <Sequence from={starts.darkLight} durationInFrames={S.darkLight}>
        <DarkLightScene durationInFrames={S.darkLight} />
      </Sequence>

      {/* 场景 7: 代码实验室 */}
      <Sequence from={starts.codeLab} durationInFrames={S.codeLab}>
        <CodeLabScene durationInFrames={S.codeLab} />
      </Sequence>

      {/* 场景 8: AI 工坊 */}
      <Sequence from={starts.aiPanel} durationInFrames={S.aiPanel}>
        <AIPanelScene durationInFrames={S.aiPanel} />
      </Sequence>

      {/* 场景 9: 滚动展示 */}
      <Sequence from={starts.scroll} durationInFrames={S.scroll}>
        <ScrollScene durationInFrames={S.scroll} />
      </Sequence>

      {/* 场景 10: 低动效模式 */}
      <Sequence from={starts.reducedMotion} durationInFrames={S.reducedMotion}>
        <ReducedMotionScene durationInFrames={S.reducedMotion} />
      </Sequence>

      {/* 场景 11: 结尾 */}
      <Sequence from={starts.ending} durationInFrames={S.ending}>
        <SceneTransition durationInFrames={S.ending} fadeIn={15} fadeOut={20}>
          <EndingScene isPortrait={isPortrait} />
        </SceneTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
