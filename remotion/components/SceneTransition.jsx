import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";

/**
 * 场景过渡 — 淡入淡出效果
 * 包裹子组件，在场景开头淡入、结尾淡出
 */
export const SceneTransition = ({
  children,
  durationInFrames,
  fadeIn = 12,
  fadeOut = 10,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
  );

  return (
    <AbsoluteFill style={{opacity}}>
      {children}
    </AbsoluteFill>
  );
};
