import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {animationSemanticIndex, categoryInsights} from "../src/data.js";

export const promoFps = 30;
export const promoDurationInFrames = promoFps * 30;

const palette = {
  ink: "#0B1020",
  inkSoft: "#1A2342",
  paper: "#EAF1FF",
  paperSoft: "#B8C8EE",
  cyan: "#4DD7FF",
  blue: "#5E7BFF",
  mint: "#71F7C5",
  warm: "#FFD68A",
};

const sceneDuration = {
  intro: 90,
  value: 150,
  category: 210,
  semantic: 240,
  cta: 210,
};

const features = [
  {
    title: "分类筛选",
    detail: "按场景快速筛到可用动画",
    tone: palette.cyan,
  },
  {
    title: "主题切换",
    detail: "一键切深浅色与品牌色",
    tone: palette.mint,
  },
  {
    title: "代码实验室",
    detail: "边看边改，直接试参数",
    tone: palette.warm,
  },
  {
    title: "AI 语义搜索",
    detail: "输入意图即可命中动画",
    tone: palette.blue,
  },
];

const semanticEntries = Object.entries(animationSemanticIndex);
const semanticKeys = semanticEntries.slice(0, 5).map(([title]) => title);
const categoryEntries = Object.entries(categoryInsights);
const categoryRows = categoryEntries.slice(0, 6).map(([key, value], index) => ({
  key,
  label: key.toUpperCase(),
  scenario: value.scenario[0],
  strength: 58 + index * 6,
}));

const metricCards = [
  {
    label: "动画条目",
    value: semanticEntries.length,
    suffix: "+",
  },
  {
    label: "分类维度",
    value: categoryEntries.length,
    suffix: "",
  },
  {
    label: "语义标签",
    value: semanticEntries.reduce((sum, [, tags]) => sum + tags.length, 0),
    suffix: "+",
  },
];

const toRgba = (hex, alpha) => {
  const compact = hex.replace("#", "");
  const normalized =
    compact.length === 3
      ? compact
          .split("")
          .map((char) => char + char)
          .join("")
      : compact;
  const int = Number.parseInt(normalized, 16);
  const red = (int >> 16) & 255;
  const green = (int >> 8) & 255;
  const blue = int & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const SceneTitle = ({title, subtitle, compact = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = interpolate(frame, [0, fps * 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const translateY = interpolate(frame, [0, fps * 0.9], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        marginBottom: compact ? 26 : 42,
      }}
    >
      <div
        style={{
          fontSize: compact ? 52 : 78,
          lineHeight: 1.05,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: palette.paper,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: compact ? 28 : 36,
          lineHeight: 1.3,
          color: palette.paperSoft,
          maxWidth: compact ? 880 : 980,
          letterSpacing: "0.01em",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

const IntroScene = ({isPortrait}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const badgeScale = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 140,
      mass: 0.9,
    },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: isPortrait ? "140px 84px" : "120px 120px",
      }}
    >
      <SceneTitle
        compact={isPortrait}
        title="CSS Animation Demo"
        subtitle="一个把动画检索、筛选、调参与展示合到一起的前端动画库。"
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          maxWidth: isPortrait ? "100%" : 1200,
        }}
      >
        {["筛选", "主题", "代码实验室", "AI 搜索"].map((chip, index) => {
          const delayedFrame = Math.max(0, frame - index * 5);
          const opacity = interpolate(delayedFrame, [0, fps * 0.4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={chip}
              style={{
                opacity,
                transform: `scale(${0.92 + badgeScale * 0.08})`,
                fontSize: isPortrait ? 30 : 26,
                padding: isPortrait ? "12px 22px" : "10px 20px",
                borderRadius: 999,
                border: `1px solid ${toRgba(palette.cyan, 0.5)}`,
                background: toRgba(palette.blue, 0.18),
                color: palette.paper,
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

const ValueScene = ({isPortrait}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const layoutColumns = isPortrait ? 1 : 2;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: isPortrait ? "120px 84px" : "100px 120px",
      }}
    >
      <SceneTitle
        compact={isPortrait}
        title="把动画体验做成生产力"
        subtitle="不止是看效果，而是让动画可复用、可检索、可快速落地。"
      />
      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns: `repeat(${layoutColumns}, minmax(0, 1fr))`,
        }}
      >
        {features.map((feature, index) => {
          const rise = spring({
            frame: Math.max(0, frame - 8 * index),
            fps,
            config: {
              damping: 20,
              stiffness: 120,
              mass: 0.7,
            },
          });

          return (
            <div
              key={feature.title}
              style={{
                opacity: rise,
                transform: `translateY(${(1 - rise) * 24}px)`,
                border: `1px solid ${toRgba(feature.tone, 0.45)}`,
                borderRadius: 24,
                background: toRgba(palette.inkSoft, 0.84),
                padding: isPortrait ? "24px 24px" : "24px 26px",
              }}
            >
              <div
                style={{
                  fontSize: isPortrait ? 36 : 30,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: feature.tone,
                }}
              >
                {feature.title}
              </div>
              <div
                style={{
                  fontSize: isPortrait ? 24 : 22,
                  lineHeight: 1.4,
                  color: palette.paper,
                }}
              >
                {feature.detail}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const CategoryScene = ({isPortrait}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: isPortrait ? "120px 84px" : "100px 120px",
      }}
    >
      <SceneTitle
        compact={isPortrait}
        title="覆盖完整动效场景"
        subtitle="从交互反馈到大屏可视化，每类都给出可直接套用的语义线索。"
      />
      <div style={{display: "grid", gap: 14}}>
        {categoryRows.map((item, index) => {
          const localFrame = Math.max(0, frame - index * 6);
          const opacity = interpolate(localFrame, [0, fps * 0.35], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const progress = interpolate(
            localFrame,
            [0, fps * 1.6],
            [8, item.strength],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );

          return (
            <div
              key={item.key}
              style={{
                opacity,
                borderRadius: 18,
                border: `1px solid ${toRgba(palette.paper, 0.14)}`,
                background: toRgba(palette.inkSoft, 0.78),
                padding: isPortrait ? "14px 16px" : "14px 18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontSize: isPortrait ? 24 : 20,
                    color: palette.paper,
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: isPortrait ? 20 : 18,
                    color: palette.paperSoft,
                  }}
                >
                  {item.scenario}
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: isPortrait ? 10 : 8,
                  background: toRgba(palette.paper, 0.1),
                  borderRadius: 999,
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${palette.cyan}, ${palette.blue})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SemanticScene = ({isPortrait}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const query = "搜索：高亮的加载动画";
  const charCount = Math.floor(
    interpolate(frame, [0, fps * 1.8], [0, query.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const typedText = query.slice(0, charCount);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: isPortrait ? "120px 84px" : "100px 120px",
      }}
    >
      <SceneTitle
        compact={isPortrait}
        title="AI 语义检索直达动效"
        subtitle="输入需求而不是动画名，系统自动给出最相关候选。"
      />
      <div
        style={{
          borderRadius: 18,
          border: `1px solid ${toRgba(palette.cyan, 0.4)}`,
          background: toRgba(palette.inkSoft, 0.74),
          color: palette.paper,
          padding: isPortrait ? "16px 18px" : "14px 18px",
          marginBottom: 18,
          fontSize: isPortrait ? 28 : 24,
          letterSpacing: "0.02em",
        }}
      >
        {typedText}
        <span style={{opacity: frame % 20 < 10 ? 1 : 0.25}}> |</span>
      </div>
      <div style={{display: "grid", gap: 12}}>
        {semanticKeys.map((name, index) => {
          const rise = spring({
            frame: Math.max(0, frame - 10 * index),
            fps,
            config: {
              damping: 18,
              stiffness: 130,
              mass: 0.8,
            },
          });
          const score = (0.88 - index * 0.03).toFixed(2);

          return (
            <div
              key={name}
              style={{
                opacity: rise,
                transform: `translateX(${(1 - rise) * 24}px)`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 16,
                border: `1px solid ${toRgba(palette.paper, 0.14)}`,
                background: toRgba(palette.inkSoft, 0.78),
                padding: isPortrait ? "14px 16px" : "12px 16px",
              }}
            >
              <div
                style={{
                  fontSize: isPortrait ? 26 : 22,
                  color: palette.paper,
                  fontWeight: 600,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: isPortrait ? 22 : 20,
                  color: palette.mint,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                score {score}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const CtaScene = ({isPortrait}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: isPortrait ? "120px 84px" : "100px 120px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontSize: isPortrait ? 58 : 86,
            lineHeight: 1.05,
            fontWeight: 800,
            color: palette.paper,
            letterSpacing: "-0.02em",
            marginBottom: 14,
          }}
        >
          把灵感变成可复用动效
        </div>
        <div
          style={{
            fontSize: isPortrait ? 30 : 34,
            lineHeight: 1.35,
            color: palette.paperSoft,
          }}
        >
          CSS Animation Demo · 快速检索 · 直接应用 · 持续扩展
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "grid",
          gap: 16,
          gridTemplateColumns: isPortrait ? "1fr" : "repeat(3, minmax(0, 1fr))",
          marginBottom: 34,
        }}
      >
        {metricCards.map((metric, index) => {
          const count = Math.floor(
            interpolate(
              Math.max(0, frame - index * 8),
              [0, fps * 2.4],
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
                borderRadius: 20,
                border: `1px solid ${toRgba(palette.paper, 0.22)}`,
                background: toRgba(palette.inkSoft, 0.74),
                padding: isPortrait ? "18px 16px" : "18px 18px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: isPortrait ? 20 : 18,
                  letterSpacing: "0.04em",
                  color: palette.paperSoft,
                  marginBottom: 6,
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: isPortrait ? 52 : 50,
                  lineHeight: 1,
                  color: palette.mint,
                  fontWeight: 800,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                {count}
                {metric.suffix}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          borderRadius: 999,
          border: `1px solid ${toRgba(palette.cyan, 0.5)}`,
          background: toRgba(palette.blue, 0.22),
          color: palette.paper,
          padding: isPortrait ? "12px 24px" : "12px 28px",
          fontSize: isPortrait ? 26 : 24,
          letterSpacing: "0.02em",
        }}
      >
        GitHub: css-animation
      </div>
    </AbsoluteFill>
  );
};

export const CssAnimationPromo = ({orientation = "landscape"}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const isPortrait = orientation === "portrait";

  const bgX = interpolate(frame, [0, promoDurationInFrames], [-120, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const bgY = interpolate(frame, [0, promoDurationInFrames], [80, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const glowPulse = interpolate(frame % (fps * 3), [0, fps * 1.5, fps * 3], [0.45, 0.8, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const introStart = 0;
  const valueStart = introStart + sceneDuration.intro;
  const categoryStart = valueStart + sceneDuration.value;
  const semanticStart = categoryStart + sceneDuration.category;
  const ctaStart = semanticStart + sceneDuration.semantic;

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
      <div
        style={{
          position: "absolute",
          left: width * 0.1 + bgX,
          top: height * 0.1 + bgY,
          width: isPortrait ? 420 : 520,
          height: isPortrait ? 420 : 520,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${toRgba(palette.blue, glowPulse)} 0%, ${toRgba(
            palette.blue,
            0
          )} 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: width * 0.08 - bgX * 0.7,
          bottom: height * 0.1 - bgY * 0.6,
          width: isPortrait ? 360 : 460,
          height: isPortrait ? 360 : 460,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${toRgba(palette.cyan, glowPulse * 0.7)} 0%, ${toRgba(
            palette.cyan,
            0
          )} 72%)`,
        }}
      />

      <Sequence from={introStart} durationInFrames={sceneDuration.intro} premountFor={fps}>
        <IntroScene isPortrait={isPortrait} />
      </Sequence>

      <Sequence from={valueStart} durationInFrames={sceneDuration.value} premountFor={fps}>
        <ValueScene isPortrait={isPortrait} />
      </Sequence>

      <Sequence from={categoryStart} durationInFrames={sceneDuration.category} premountFor={fps}>
        <CategoryScene isPortrait={isPortrait} />
      </Sequence>

      <Sequence from={semanticStart} durationInFrames={sceneDuration.semantic} premountFor={fps}>
        <SemanticScene isPortrait={isPortrait} />
      </Sequence>

      <Sequence from={ctaStart} durationInFrames={sceneDuration.cta} premountFor={fps}>
        <CtaScene isPortrait={isPortrait} />
      </Sequence>
    </AbsoluteFill>
  );
};
