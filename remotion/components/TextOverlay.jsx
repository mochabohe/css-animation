import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

/**
 * 文字说明叠加层 — 在视频片段上方显示标题和副标题
 * 从底部滑入，带半透明背景条
 */
export const TextOverlay = ({
  title,
  subtitle,
  position = "bottom", // "bottom" | "top"
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);

  const rise = spring({
    frame: localFrame,
    fps,
    config: {damping: 22, stiffness: 120, mass: 0.8},
  });

  const opacity = interpolate(localFrame, [0, fps * 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = position === "bottom" ? (1 - rise) * 40 : -(1 - rise) * 40;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        ...(position === "bottom" ? {bottom: 0} : {top: 0}),
        opacity,
        transform: `translateY(${translateY}px)`,
        padding: "36px 60px",
        background:
          "linear-gradient(180deg, rgba(7, 11, 20, 0) 0%, rgba(7, 11, 20, 0.85) 40%, rgba(7, 11, 20, 0.95) 100%)",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: "#EAF1FF",
          letterSpacing: "-0.02em",
          marginBottom: subtitle ? 10 : 0,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 26,
            color: "#B8C8EE",
            lineHeight: 1.4,
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

/**
 * 功能标签 — 显示在屏幕角落的功能名称小标签
 */
export const FeatureTag = ({text, color = "#4DD7FF", delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: localFrame,
    fps,
    config: {damping: 18, stiffness: 140, mass: 0.6},
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 28,
        right: 36,
        transform: `scale(${scale})`,
        fontSize: 22,
        fontWeight: 700,
        color,
        padding: "8px 20px",
        borderRadius: 999,
        border: `2px solid ${color}`,
        background: "rgba(7, 11, 20, 0.7)",
        backdropFilter: "blur(8px)",
        letterSpacing: "0.03em",
      }}
    >
      {text}
    </div>
  );
};
