import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

/**
 * 模拟浏览器窗口外框
 * 包含标题栏（三个圆点 + 地址栏），内部放视频内容
 */
export const MockBrowser = ({
  children,
  url = "css-animation.demo",
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: localFrame,
    fps,
    config: {damping: 24, stiffness: 100, mass: 0.9},
  });

  const opacity = interpolate(localFrame, [0, fps * 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dots = ["#FF5F57", "#FFBD2E", "#28CA41"];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${0.92 + scale * 0.08})`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 20px 80px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.1)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* 标题栏 */}
      <div
        style={{
          height: 44,
          background: "linear-gradient(180deg, #2A2A30 0%, #1E1E24 100%)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
          flexShrink: 0,
        }}
      >
        {dots.map((color) => (
          <div
            key={color}
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: color,
            }}
          />
        ))}
        <div
          style={{
            flex: 1,
            marginLeft: 12,
            height: 28,
            borderRadius: 6,
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {url}
        </div>
      </div>
      {/* 内容区 */}
      <div style={{flex: 1, overflow: "hidden", position: "relative"}}>
        {children}
      </div>
    </div>
  );
};
