export const snippetsByTitle = {
  加载脉冲: `.loader {
  width: 54px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid rgba(var(--accent-rgb), 0.25);
  border-top-color: var(--accent);
  animation: spin 1s linear infinite, pulse 1.4s ease-in-out infinite;
}`,
  跳动圆点: `.dots-loader {
  display: flex;
  gap: 8px;
  align-items: center;
}
.dots-loader span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(130deg, var(--accent-soft), var(--accent));
  animation: dotsBounce 0.9s ease-in-out infinite;
}
.dots-loader span:nth-child(2) { animation-delay: 0.15s; }
.dots-loader span:nth-child(3) { animation-delay: 0.3s; }`,
  频谱条形: `.bars-loader {
  display: flex;
  align-items: flex-end;
  gap: 7px;
  height: 36px;
}
.bars-loader span {
  width: 8px;
  border-radius: 99px;
  background: linear-gradient(180deg, var(--accent-soft), var(--accent));
  animation: barsScale 1s ease-in-out infinite;
}
.bars-loader span:nth-child(1) { animation-delay: 0s; }
.bars-loader span:nth-child(2) { animation-delay: 0.12s; }
.bars-loader span:nth-child(3) { animation-delay: 0.24s; }
.bars-loader span:nth-child(4) { animation-delay: 0.36s; }`,
  双环旋转: `.ring-loader {
  width: 54px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid rgba(var(--accent-rgb), 0.25);
  border-top-color: var(--accent);
  position: relative;
  animation: spin 1.1s linear infinite;
}
.ring-loader::after {
  content: "";
  position: absolute;
  inset: 7px;
  border-radius: 50%;
  border: 4px solid rgba(var(--accent-rgb), 0.2);
  border-bottom-color: var(--accent-soft);
  animation: spinReverse 0.9s linear infinite;
}`,
  骨架屏闪光: `.skeleton {
  width: 100%;
  display: grid;
  gap: 8px;
}
.skeleton span {
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(100deg, rgba(77, 95, 133, 0.35) 20%, rgba(143, 176, 235, 0.6) 38%, rgba(77, 95, 133, 0.35) 55%);
  background-size: 180% 100%;
  animation: shimmer 1.3s linear infinite;
}
.skeleton span:nth-child(2) {
  width: 86%;
}
.skeleton span:nth-child(3) {
  width: 62%;
}`,
  进度滑条: `.progress-loop {
  width: 100%;
  height: 10px;
  border-radius: 99px;
  background: rgba(95, 120, 170, 0.28);
  overflow: hidden;
}
.progress-fill {
  width: 36%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent-soft));
  animation: progressLoop 1.5s ease-in-out infinite;
}`,
  弹跳小球: `.ball {
  animation: bounce 1s cubic-bezier(0.42, 0, 0.58, 1) infinite;
}`,
  摆动钟锤: `.pendulum-line,
.pendulum-bob {
  transform-origin: top center;
  animation: pendulum 1.2s ease-in-out infinite;
}`,
  漂浮气泡: `.float-orb {
  animation: floatUp 2.3s ease-in-out infinite;
}`,
  波浪位移: `.wave-track {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.wave-track span {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(130deg, var(--accent-soft), var(--accent));
  animation: waveMove 1.3s ease-in-out infinite;
}
.wave-track span:nth-child(2) {
  animation-delay: 0.18s;
}
.wave-track span:nth-child(3) {
  animation-delay: 0.36s;
}`,
  心跳脉冲: `.heart {
  width: 44px;
  height: 44px;
  position: relative;
  transform: rotate(-45deg);
  background: linear-gradient(145deg, var(--accent), var(--accent-deep));
  animation: heartbeat 1.2s ease-in-out infinite;
}
.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: inherit;
}
.heart::before {
  top: -22px;
  left: 0;
}
.heart::after {
  left: 22px;
  top: 0;
}`,
  渐变流动: `.cta {
  border: none;
  height: 46px;
  border-radius: 999px;
  color: #f5f8ff;
  font-weight: 600;
  letter-spacing: 0.2px;
  background: linear-gradient(120deg, var(--accent), var(--accent-deep), var(--accent-soft), var(--accent));
  background-size: 220% 220%;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: gradientShift 5s linear infinite;
}
.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(var(--accent-rgb), 0.4);
}`,
  霓虹发光: `.cta-glow {
  border: none;
  height: 46px;
  border-radius: 999px;
  color: #f5f8ff;
  font-weight: 600;
  letter-spacing: 0.2px;
  background: linear-gradient(120deg, var(--accent), var(--accent-deep), var(--accent-soft), var(--accent));
  background-size: 220% 220%;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: gradientShift 5s linear infinite, glowPulse 1.7s ease-in-out infinite;
}`,
  下划线滑入: `.link-btn {
  position: relative;
  width: fit-content;
  border: none;
  background: transparent;
  color: #d8e7ff;
  font-size: 15px;
  padding: 2px 0;
  cursor: pointer;
}
.link-btn::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  background: linear-gradient(90deg, var(--accent), var(--accent-soft));
  transition: transform 0.25s ease;
}
.link-btn:hover::after { transform: scaleX(1); }`,
  呼吸图标: `.icon-btn {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(145, 177, 240, 0.35);
  border-radius: 999px;
  background: rgba(15, 27, 47, 0.85);
  color: #e6f0ff;
  padding: 10px 16px;
  cursor: pointer;
}
.icon-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-soft);
  box-shadow: 0 0 0 0 rgba(var(--accent-rgb), 0.55);
  animation: dotBreath 1.4s ease-in-out infinite;
}`,
  波纹点击: `.ripple-btn {
  position: relative;
  border: 1px solid rgba(145, 177, 240, 0.4);
  border-radius: 999px;
  background: rgba(19, 30, 52, 0.9);
  color: #e4efff;
  height: 44px;
  padding: 0 18px;
  cursor: pointer;
  overflow: hidden;
}
.ripple-btn::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
}
.ripple-btn:hover::after { animation: rippleWave 0.9s ease-out; }`,
  磁吸悬停: `.magnet-btn {
  border: 1px solid rgba(145, 177, 240, 0.4);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(var(--accent-2-rgb), 0.95), rgba(var(--accent-rgb), 0.95));
  color: #f5fbff;
  height: 44px;
  padding: 0 18px;
  cursor: pointer;
  transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
}
.magnet-btn:hover {
  transform: translateY(-3px) scale(1.03) rotate(-1deg);
  box-shadow: 0 10px 22px rgba(var(--accent-rgb), 0.35);
}`,
  点赞心跳: `.like-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid rgba(145, 177, 240, 0.35);
  background: rgba(15, 27, 47, 0.85);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.like-btn:hover {
  border-color: var(--accent);
  background: rgba(var(--accent-rgb), 0.15);
}
.like-btn:active .heart-icon {
  animation: likeHeart 0.6s ease-in-out;
}
.heart-icon {
  width: 28px;
  height: 28px;
  stroke-width: 2;
  transition: all 0.3s ease;
}
.like-btn:active .heart-icon {
  fill: var(--accent);
  stroke: var(--accent);
}`,
  开关切换: `.toggle-switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 32px;
  cursor: pointer;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-slider {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: rgba(145, 177, 240, 0.2);
  border: 2px solid rgba(145, 177, 240, 0.35);
  transition: all 0.3s ease-in-out;
}
.toggle-slider::before {
  content: "";
  position: absolute;
  height: 22px;
  width: 22px;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}
.toggle-switch input:checked + .toggle-slider {
  background: var(--accent);
  border-color: var(--accent);
}
.toggle-switch input:checked + .toggle-slider::before {
  transform: translate(24px, -50%);
  background: rgba(255, 255, 255, 1);
}`,
  淡入淡出: `.fade-demo {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fade-content {
  padding: 14px 24px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(var(--accent-2-rgb), 0.2), rgba(var(--accent-rgb), 0.2));
  border: 1px solid rgba(145, 177, 240, 0.35);
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  animation: fadeInOut 3s ease-in-out infinite;
}`,
  消息滑入: `.toast-demo {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.toast {
  padding: 12px 18px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.4);
  animation: toastSlide 3s ease-in-out infinite;
}`,
  按钮加载中: `.loading-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 44px;
  padding: 0 24px;
  border-radius: 8px;
  border: 1px solid rgba(145, 177, 240, 0.35);
  background: linear-gradient(135deg, rgba(var(--accent-2-rgb), 0.85), rgba(var(--accent-rgb), 0.85));
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: not-allowed;
  opacity: 0.9;
}
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: buttonSpinner 0.8s linear infinite;
}`,
  翻转卡片: `.flip-wrap {
  perspective: 800px;
  width: 110px;
  height: 78px;
}
.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: flip 3.2s ease-in-out infinite;
}
.face {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 20px;
  font-weight: 700;
  backface-visibility: hidden;
}
.front {
  background: linear-gradient(130deg, var(--accent-deep), var(--accent));
}
.back {
  background: linear-gradient(130deg, var(--accent), var(--accent-soft));
  transform: rotateY(180deg);
}`,
  旋转立方体: `.cube-wrap {
  width: 88px;
  height: 88px;
  perspective: 650px;
}
.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: cubeSpin 4s linear infinite;
}
.cube-face {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #eaf2ff;
  border: 1px solid rgba(221, 233, 255, 0.28);
  background: linear-gradient(130deg, rgba(var(--accent-2-rgb), 0.82), rgba(var(--accent-rgb), 0.82));
}
.cube-front {
  transform: translateZ(26px);
}
.cube-back {
  transform: rotateY(180deg) translateZ(26px);
}
.cube-left {
  transform: rotateY(-90deg) translateZ(26px);
}
.cube-right {
  transform: rotateY(90deg) translateZ(26px);
}`,
  倾斜面板: `.tilt-panel {
  width: 120px;
  height: 72px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 13px;
  letter-spacing: 1px;
  color: #f4f8ff;
  background: linear-gradient(135deg, var(--accent-deep), var(--accent));
  transform-style: preserve-3d;
  animation: tiltLoop 2.8s ease-in-out infinite;
}`,
  折页翻开: `.fold-wrap {
  width: 120px;
  height: 78px;
  perspective: 850px;
}
.fold-page {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(120deg, var(--accent-deep), var(--accent-soft));
  transform-origin: left center;
  animation: foldOpen 2.2s ease-in-out infinite;
}`,
  故障闪烁: `.fx-text {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}
.glitch {
  position: relative;
  color: var(--accent-soft);
  animation: glitchSkew 1.4s steps(2, end) infinite;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}
.glitch::before {
  color: var(--accent-soft);
  transform: translate(-2px, 0);
  clip-path: polygon(0 0, 100% 0, 100% 43%, 0 43%);
}
.glitch::after {
  color: var(--accent-deep);
  transform: translate(2px, 0);
  clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
}`,
  打字机: `.fx-text {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}
.typing {
  width: 18ch;
  white-space: nowrap;
  overflow: hidden;
  color: var(--accent);
  border-right: 2px solid var(--accent-soft);
  animation: typing 3.2s steps(18) infinite, caret 0.9s step-end infinite;
}`,
  波浪字符: `.fx-text {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}
.wave-text {
  color: var(--accent);
}
.wave-text span {
  display: inline-block;
  animation: waveLetter 1.1s ease-in-out infinite;
}
.wave-text span:nth-child(2) {
  animation-delay: 0.1s;
}
.wave-text span:nth-child(3) {
  animation-delay: 0.2s;
}
.wave-text span:nth-child(4) {
  animation-delay: 0.3s;
}`,
  渐变流光字: `.fx-text {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}
.gradient-text {
  background: linear-gradient(90deg, var(--accent), var(--accent-soft), var(--accent-deep));
  background-size: 220% 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: textShine 2.8s linear infinite;
}`,
  极光流动: `.bg-panel {
  width: 100%;
  height: 86px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(145, 177, 240, 0.3);
}
.aurora {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 25% 20%, rgba(var(--accent-rgb), 0.55), transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(var(--accent-2-rgb), 0.55), transparent 45%),
    #0f1930;
  animation: auroraFlow 6s ease-in-out infinite;
}`,
  星点闪烁: `.bg-panel {
  width: 100%;
  height: 86px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(145, 177, 240, 0.3);
}
.stars {
  background: #0d1730;
}
.stars span {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-soft);
  animation: twinkle 1.8s ease-in-out infinite;
}
.stars span:nth-child(1) {
  top: 18%;
  left: 12%;
}
.stars span:nth-child(2) {
  top: 34%;
  left: 38%;
  animation-delay: 0.2s;
}
.stars span:nth-child(3) {
  top: 58%;
  left: 22%;
  animation-delay: 0.45s;
}
.stars span:nth-child(4) {
  top: 40%;
  left: 76%;
  animation-delay: 0.65s;
}
.stars span:nth-child(5) {
  top: 66%;
  left: 60%;
  animation-delay: 0.85s;
}`,
  雷达扫描: `.bg-panel {
  width: 100%;
  height: 86px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(145, 177, 240, 0.3);
}
.radar {
  border-radius: 50%;
  width: 86px;
  height: 86px;
  place-self: center;
  background: radial-gradient(circle, rgba(var(--accent-soft-rgb), 0.2), rgba(10, 30, 52, 0.85) 64%);
  overflow: hidden;
}
.radar::after {
  content: "";
  position: absolute;
  inset: -20%;
  background: conic-gradient(from 20deg, rgba(var(--accent-soft-rgb), 0.45), rgba(var(--accent-soft-rgb), 0));
  animation: spin 2s linear infinite;
}`,
  网格扫光: `.bg-panel {
  width: 100%;
  height: 86px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(145, 177, 240, 0.3);
}
.grid-scan {
  background: linear-gradient(transparent 94%, rgba(var(--accent-rgb), 0.22) 94%),
    linear-gradient(90deg, transparent 94%, rgba(var(--accent-rgb), 0.22) 94%),
    #0d1730;
  background-size: 14px 14px, 14px 14px, auto;
}
.grid-scan::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(var(--accent-soft-rgb), 0) 0%, rgba(var(--accent-soft-rgb), 0.36) 50%, rgba(var(--accent-soft-rgb), 0) 100%);
  transform: translateY(-100%);
  animation: scanLine 2.8s ease-in-out infinite;
}`,
  逐字加载: `.ai-token-stream {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ai-token-stream span {
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(145deg, var(--accent-soft), var(--accent));
  animation: tokenFlow 1.1s ease-in-out infinite;
}
.ai-token-stream span:nth-child(2) { animation-delay: 0.1s; }
.ai-token-stream span:nth-child(3) { animation-delay: 0.2s; }
.ai-token-stream span:nth-child(4) { animation-delay: 0.3s; }
.ai-token-stream span:nth-child(5) { animation-delay: 0.4s; }`,
  向量检索命中: `.ai-vector-hit {
  width: 94px;
  height: 94px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-rgb), 0.45);
  position: relative;
  animation: radarSpin 3.2s linear infinite;
}
.ai-vector-hit span {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-soft);
  animation: hitPulse 1.6s ease-in-out infinite;
}
.ai-vector-hit span:nth-child(1) { top: 8px; left: 18px; }
.ai-vector-hit span:nth-child(2) { top: 30px; right: 10px; animation-delay: 0.3s; }
.ai-vector-hit span:nth-child(3) { bottom: 18px; left: 20px; animation-delay: 0.6s; }`,
  数据管道吞吐: `.ai-pipeline {
  width: 100%;
  height: 14px;
  border-radius: 999px;
  background: rgba(var(--accent-rgb), 0.14);
  position: relative;
  overflow: hidden;
}
.ai-pipeline span {
  position: absolute;
  top: 2px;
  width: 22px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--accent-soft));
  animation: pipeFlow 1.8s linear infinite;
}
.ai-pipeline span:nth-child(2) { animation-delay: 0.45s; }
.ai-pipeline span:nth-child(3) { animation-delay: 0.9s; }`,
  模型置信度分布: `.ai-confidence {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
}
.ai-confidence span {
  width: 10px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--accent-soft), var(--accent-deep));
  animation: confidenceRise 1.3s ease-in-out infinite;
}
.ai-confidence span:nth-child(1) { height: 24px; }
.ai-confidence span:nth-child(2) { height: 36px; animation-delay: 0.12s; }
.ai-confidence span:nth-child(3) { height: 42px; animation-delay: 0.24s; }
.ai-confidence span:nth-child(4) { height: 30px; animation-delay: 0.36s; }
.ai-confidence span:nth-child(5) { height: 18px; animation-delay: 0.48s; }`,
  异常告警脉冲: `.ai-anomaly {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 1px solid rgba(var(--accent-rgb), 0.35);
  position: relative;
  display: grid;
  place-items: center;
}
.ai-anomaly span {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 rgba(var(--accent-rgb), 0.45);
  animation: anomalyPulse 1.4s ease-in-out infinite;
}`,
  集群健康热力: `.ai-cluster {
  width: 98px;
  height: 98px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.ai-cluster span {
  border-radius: 6px;
  background: rgba(var(--accent-rgb), 0.22);
  animation: clusterBlink 1.8s ease-in-out infinite;
}
.ai-cluster span:nth-child(2) { animation-delay: 0.1s; }
.ai-cluster span:nth-child(3) { animation-delay: 0.2s; }
.ai-cluster span:nth-child(4) { animation-delay: 0.3s; }
.ai-cluster span:nth-child(5) { animation-delay: 0.4s; }
.ai-cluster span:nth-child(6) { animation-delay: 0.5s; }
.ai-cluster span:nth-child(7) { animation-delay: 0.6s; }
.ai-cluster span:nth-child(8) { animation-delay: 0.7s; }
.ai-cluster span:nth-child(9) { animation-delay: 0.8s; }`,
  三点轨道: `.ai-loading-dots {
  position: relative;
  width: 120px;
  height: 60px;
  margin: 0 auto;
}
.ai-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--accent);
  animation: dotOrbitStep 1.5s infinite ease-in-out;
}
.ai-dot:nth-child(2) { animation-delay: -0.5s; }
.ai-dot:nth-child(3) { animation-delay: -1s; }`,
  镜面扫光: `.thinking-shimmer {
  background: linear-gradient(90deg, var(--accent-deep) 0%, var(--accent) 25%, var(--accent-soft) 50%, var(--accent) 75%, var(--accent-deep) 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: textShimmer 1s linear infinite;
}`,
  数据流线: `.data-stream {
  width: 100%;
  height: 60px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  position: relative;
}
.data-stream span {
  width: 4px;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(180deg, transparent, var(--accent), var(--accent-soft), transparent);
  animation: dataFlow 2s ease-in-out infinite;
}
.data-stream span:nth-child(1) { animation-delay: 0s; }
.data-stream span:nth-child(2) { animation-delay: 0.2s; }
.data-stream span:nth-child(3) { animation-delay: 0.4s; }
.data-stream span:nth-child(4) { animation-delay: 0.6s; }`,
  环形进度: `.circle-progress {
  width: 90px;
  height: 90px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle-progress svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.circle-progress .progress-bg {
  fill: none;
  stroke: rgba(var(--accent-rgb), 0.2);
  stroke-width: 8;
}
.circle-progress .progress-bar {
  fill: none;
  stroke: var(--accent);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 251.2;
  stroke-dashoffset: 62.8;
  animation: progressGrow 2s ease-in-out infinite;
}
.progress-text {
  position: absolute;
  font-size: 18px;
  font-weight: 600;
  color: var(--accent-soft);
}`,
  信号波纹: `.signal-ripple {
  width: 80px;
  height: 80px;
  position: relative;
  display: grid;
  place-items: center;
}
.signal-ripple span {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--accent);
  animation: rippleExpand 2s ease-out infinite;
}
.signal-ripple span:nth-child(1) { animation-delay: 0s; }
.signal-ripple span:nth-child(2) { animation-delay: 0.6s; }
.signal-ripple span:nth-child(3) { animation-delay: 1.2s; }`,
  能量脉冲条: `.energy-bars {
  width: 100%;
  height: 50px;
  display: flex;
  gap: 8px;
  align-items: flex-end;
  justify-content: center;
}
.energy-bars span {
  width: 10px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, var(--accent-soft), var(--accent), var(--accent-deep));
  animation: energyPulse 1.5s ease-in-out infinite;
}
.energy-bars span:nth-child(1) { height: 30%; animation-delay: 0s; }
.energy-bars span:nth-child(2) { height: 50%; animation-delay: 0.1s; }
.energy-bars span:nth-child(3) { height: 80%; animation-delay: 0.2s; }
.energy-bars span:nth-child(4) { height: 60%; animation-delay: 0.3s; }
.energy-bars span:nth-child(5) { height: 40%; animation-delay: 0.4s; }
.energy-bars span:nth-child(6) { height: 25%; animation-delay: 0.5s; }`,
  数据波形: `.data-waveform {
  width: 100%;
  height: 50px;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}
.data-waveform span {
  width: 6px;
  border-radius: 999px;
  background: var(--accent);
  animation: waveformBounce 1.2s ease-in-out infinite;
}
.data-waveform span:nth-child(1) { height: 20px; animation-delay: 0s; }
.data-waveform span:nth-child(2) { height: 35px; animation-delay: 0.1s; }
.data-waveform span:nth-child(3) { height: 45px; animation-delay: 0.2s; }
.data-waveform span:nth-child(4) { height: 30px; animation-delay: 0.3s; }
.data-waveform span:nth-child(5) { height: 25px; animation-delay: 0.4s; }
.data-waveform span:nth-child(6) { height: 40px; animation-delay: 0.5s; }
.data-waveform span:nth-child(7) { height: 35px; animation-delay: 0.6s; }
.data-waveform span:nth-child(8) { height: 28px; animation-delay: 0.7s; }
.data-waveform span:nth-child(9) { height: 38px; animation-delay: 0.8s; }
.data-waveform span:nth-child(10) { height: 22px; animation-delay: 0.9s; }`,
};

