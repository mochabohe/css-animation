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
  进度条流动: `.progress-bar {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: rgba(var(--accent-rgb), 0.18);
  overflow: hidden;
  position: relative;
}
.progress-bar::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 35%;
  border-radius: inherit;
  background: linear-gradient(90deg, transparent, var(--accent-soft), var(--accent), transparent);
  transform: translateX(-120%);
  animation: progressSlide 1.6s linear infinite;
}`,
  弹跳小球: `.ball {
  animation: bounce 1s cubic-bezier(0.42, 0, 0.58, 1) infinite;
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
  width: 40px;
  height: 40px;
  position: relative;
  transform: rotate(-45deg);
  background: var(--accent);
  filter: drop-shadow(0 4px 10px rgba(var(--accent-rgb), 0.45));
  animation: heartbeat 1.2s ease-in-out infinite;
}
.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent);
}
.heart::before {
  top: -20px;
  left: 0;
}
.heart::after {
  left: 20px;
  top: 0;
}`,
  霓虹流光: `.cta {
  border: none;
  height: 46px;
  padding: 0 36px;
  border-radius: 999px;
  color: #f5f8ff;
  font-weight: 600;
  letter-spacing: 0.2px;
  background: linear-gradient(120deg, var(--accent), var(--accent-deep), var(--accent-soft), var(--accent));
  background-size: 220% 220%;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: gradientShift 5s linear infinite, glowPulse 1.7s ease-in-out infinite;
}
.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(var(--accent-rgb), 0.5);
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
  按钮按压: `.press-btn {
  border: 1px solid rgba(145, 177, 240, 0.35);
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.9), rgba(var(--accent-2-rgb), 0.9));
  color: #f5f8ff;
  height: 44px;
  padding: 0 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(var(--accent-rgb), 0.35);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}
.press-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(var(--accent-rgb), 0.4);
}
.press-btn:active {
  animation: pressPulse 0.35s ease-out;
}`,
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
  background: none;
  border: none;
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.like-btn:hover {
  transform: scale(1.15);
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
  边框流光: `.border-stream-btn {
  position: relative;
  padding: 12px 24px;
  background: rgba(15, 27, 47, 0.85);
  color: #f5f8ff;
  border-radius: 8px;
  overflow: hidden;
  border: none;
  cursor: pointer;
  z-index: 1;
}
.border-stream-btn::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(transparent, var(--accent), transparent 30%);
  animation: borderRotate 3s linear infinite;
  z-index: -2;
}
.border-stream-btn::after {
  content: "";
  position: absolute;
  inset: 2px;
  background: rgba(15, 27, 47, 0.95);
  border-radius: 6px;
  z-index: -1;
  transition: background 0.3s ease;
}
.border-stream-btn:hover::after {
  background: rgba(20, 35, 60, 0.95);
}`,
  摇晃铃铛: `.bell-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.bell-icon {
  position: relative;
  width: 32px;
  height: 32px;
  color: #f5f8ff;
  transform-origin: top center;
  animation: bellShake 2.5s ease-in-out infinite;
}
.bell-icon svg {
  width: 100%;
  height: 100%;
}
.notification-dot {
  position: absolute;
  top: 0;
  right: 2px;
  width: 10px;
  height: 10px;
  background-color: #ff4757;
  border-radius: 50%;
  border: 2px solid #0f1b2f;
}`,
  角标跳动: `.badge-bounce-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bell-icon-wrap {
  position: relative;
  display: flex;
  color: var(--text);
  width: 32px;
  height: 32px;
}
.bell-icon-wrap svg {
  width: 100%;
  height: 100%;
}
.badge-bounce {
  position: absolute;
  top: 0px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #ff4757;
  border-radius: 50%;
  border: 2px solid var(--bg-soft);
  animation: badgeBounce 2s ease-in-out infinite;
}`,
  悬浮输入框: `.input-float-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
.input-float-group {
  position: relative;
  width: 80%;
  margin-top: 15px;
}
.input-float-group input {
  width: 100%;
  padding: 8px 0;
  font-size: 15px;
  color: var(--text);
  border: none;
  background: transparent;
  border-bottom: 2px solid rgba(145, 177, 240, 0.3);
  outline: none;
}
.input-float-group label {
  position: absolute;
  top: 8px;
  left: 0;
  color: var(--muted);
  font-size: 15px;
  pointer-events: none;
  transition: all 0.3s ease;
}
.input-float-group .input-bar {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: all 0.3s ease;
}
.input-float-group input:focus ~ .input-bar,
.input-float-group input:valid ~ .input-bar {
  width: 100%;
  left: 0;
}
.input-float-group input:focus ~ label,
.input-float-group input:valid ~ label {
  top: -16px;
  font-size: 12px;
  color: var(--accent);
}`,
  悬浮光晕卡: `.hover-glow-card {
  position: relative;
  width: 140px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(15, 27, 47, 0.6);
  color: #f5f8ff;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(145, 177, 240, 0.2);
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.hover-glow-card::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--accent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(28px);
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), width 0.6s cubic-bezier(0.23, 1, 0.32, 1), height 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: -1;
}
.hover-glow-card:hover::before {
  width: 150px;
  height: 150px;
  opacity: 0.4;
}
.hover-glow-card:hover {
  border-color: rgba(var(--accent-rgb), 0.5);
  transform: translateY(-2px);
}`,
  详细信息折叠: `.glow-accordion {
  width: 90%;
  border-radius: 8px;
  border: 1px solid rgba(145, 177, 240, 0.2);
  background: rgba(15, 27, 47, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  overflow: hidden;
  color: #d8e7ff;
}
.glow-accordion[open] {
  border-color: rgba(var(--accent-rgb), 0.6);
  background: rgba(15, 27, 47, 0.8);
  box-shadow: 0 8px 24px rgba(var(--accent-rgb), 0.15);
}
.glow-accordion summary {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  list-style: none;
  position: relative;
  transition: color 0.3s ease;
}
.glow-accordion summary::-webkit-details-marker {
  display: none;
}
.glow-accordion summary::after {
  content: "+";
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  transition: transform 0.4s ease, color 0.3s ease;
  color: var(--accent);
}
.glow-accordion[open] summary {
  color: var(--accent);
  border-bottom: 1px solid rgba(var(--accent-rgb), 0.2);
}
.glow-accordion[open] summary::after {
  transform: translateY(-50%) rotate(45deg);
}
.glow-accordion .content {
  padding: 16px;
  font-size: 13px;
  line-height: 1.5;
  color: #aebfdc;
  animation: slideDown 0.4s ease-out forwards;
}`,
  动态复选框: `.draw-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #e6f0ff;
  font-size: 14px;
  user-select: none;
}
.draw-checkbox input {
  display: none;
}
.draw-checkbox .checkbox-box {
  width: 24px;
  height: 24px;
  fill: rgba(15, 27, 47, 0.5);
  stroke: rgba(145, 177, 240, 0.4);
  stroke-width: 1.5px;
  transition: stroke 0.3s ease, fill 0.3s ease;
}
.draw-checkbox .tick {
  stroke: transparent;
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  transition: stroke-dashoffset 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.draw-checkbox input:checked + .checkbox-box {
  stroke: var(--accent);
  fill: rgba(var(--accent-rgb), 0.15);
}
.draw-checkbox input:checked + .checkbox-box .tick {
  stroke: var(--accent);
  stroke-dashoffset: 0;
}`,
  头像波纹: `.avatar-ripple {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-core {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-deep));
  z-index: 2;
  box-shadow: 0 4px 10px rgba(var(--accent-rgb), 0.4);
}
.avatar-ripple::before,
.avatar-ripple::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
  transform: translate(-50%, -50%);
  animation: pulseRipple 2.5s cubic-bezier(0.42, 0, 0.58, 1) infinite;
  z-index: 1;
}
.avatar-ripple::after {
  animation-delay: 1.25s;
}`,
  霓虹闪烁字: `.fx-text {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}
.neon-flicker {
  color: var(--accent-soft);
  text-shadow:
    0 0 6px var(--accent),
    0 0 16px var(--accent),
    0 0 32px var(--accent-soft);
  animation: neonFlicker 3s step-start infinite;
}`,

  \u7c92\u5b50\u6d41\u52a8: `.particle-bg {
  background: #0d1730;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 86px;
  border-radius: 12px;
}
.particle-bg span {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.7;
  animation: particleFloat 6s ease-in-out infinite;
}
.particle-bg span:nth-child(1) { width: 8px; height: 8px; left: 15%; top: 65%; animation-delay: 0s; }
.particle-bg span:nth-child(2) { width: 5px; height: 5px; left: 40%; top: 80%; animation-delay: 1s; }
.particle-bg span:nth-child(3) { width: 10px; height: 10px; left: 65%; top: 70%; animation-delay: 2s; }
.particle-bg span:nth-child(4) { width: 4px; height: 4px; left: 25%; top: 50%; animation-delay: 0.5s; }
.particle-bg span:nth-child(5) { width: 7px; height: 7px; left: 75%; top: 50%; animation-delay: 1.5s; }
.particle-bg span:nth-child(6) { width: 6px; height: 6px; left: 88%; top: 75%; animation-delay: 2.5s; }`,
  \u6d77\u6d6a\u8d77\u4f0f: `.wave-bg {
  background: linear-gradient(180deg, #071020 0%, #0c1a30 55%, #0f2240 100%);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 86px;
  border-radius: 12px;
}
.wave-bg::before,
.wave-bg::after,
.wave-layer3 {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200%;
  background-repeat: repeat-x;
  transform-origin: bottom;
}
.wave-bg::before {
  height: 60%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M 0 60 Q 300 20, 600 60 T 1200 60 V 120 H 0 Z' fill='rgba(44,185,197,0.15)'/%3E%3C/svg%3E");
  background-size: 50% 100%;
  animation: waveMoveLeft 8s linear infinite;
  z-index: 1;
}
.wave-bg::after {
  height: 65%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M 0 60 Q 150 25, 300 60 T 600 60 T 900 60 T 1200 60 V 120 H 0 Z' fill='rgba(123,226,232,0.15)'/%3E%3C/svg%3E");
  background-size: 50% 100%;
  animation: waveMoveRight 6s linear infinite;
  z-index: 2;
  bottom: -2px;
}
.wave-layer3 {
  height: 75%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M 0 60 Q 100 40, 200 60 T 400 60 T 600 60 T 800 60 T 1000 60 T 1200 60 V 120 H 0 Z' fill='rgba(255,255,255,0.06)'/%3E%3C/svg%3E");
  background-size: 50% 100%;
  animation: waveMoveLeft 4s linear infinite;
  z-index: 3;
  bottom: -5px;
}
@keyframes waveMoveLeft {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes waveMoveRight {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}`,
  \u8f68\u9053\u536b\u661f: `.orbit {
  position: relative;
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.orbit-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(var(--accent-rgb), 0.4);
  animation: orbitSpin 3s linear infinite;
}
.orbit-dot {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-soft);
  box-shadow: 0 0 8px var(--accent);
}
.orbit-core {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-deep));
  box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.5);
}`,
  词语轮播: `.word-rotate-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 700;
}
.word-rotate-label {
  color: var(--text);
  white-space: nowrap;
}
.word-rotate-track {
  position: relative;
  height: 1.4em;
  min-width: 3em;
  overflow: hidden;
  display: inline-block;
}
.word-rotate-item {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  white-space: nowrap;
  opacity: 0;
  transform: translateY(60%);
  animation: wordSlideIn 3.6s ease-in-out infinite;
}
.word-rotate-item:nth-child(1) { animation-delay: 0s; }
.word-rotate-item:nth-child(2) { animation-delay: 1.2s; }
.word-rotate-item:nth-child(3) { animation-delay: 2.4s; }`,
  \u83ca\u82b1\u65cb\u8f6c: `.spinner-dots {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    0 -22px 0 rgba(var(--accent-rgb), 1),
    15px -15px 0 rgba(var(--accent-rgb), 0.85),
    22px 0 0 rgba(var(--accent-rgb), 0.7),
    15px 15px 0 rgba(var(--accent-rgb), 0.5),
    0 22px 0 rgba(var(--accent-rgb), 0.35),
    -15px 15px 0 rgba(var(--accent-rgb), 0.2),
    -22px 0 0 rgba(var(--accent-rgb), 0.1),
    -15px -15px 0 rgba(var(--accent-rgb), 0.05);
  animation: spinnerRotate 1s linear infinite;
}`,
  \u6a21\u7cca\u6d6e\u73b0: `.blur-appear {
  animation: blurFadeIn 3s ease-in-out infinite;
  font-size: 18px;
}`,
  \u60ac\u6d6e\u5361\u7247: `.hover-float-card {
  width: 110px;
  height: 66px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.18), rgba(var(--accent-rgb), 0.04));
  border: 1px solid rgba(var(--accent-rgb), 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-soft);
  font-size: 13px;
  font-weight: 500;
  position: relative;
  animation: cardFloat 3s ease-in-out infinite;
  box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.15);
}
.hover-float-card::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 20%;
  right: 20%;
  height: 10px;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.2);
  filter: blur(6px);
  animation: cardShadow 3s ease-in-out infinite;
}`,
  \u58a8\u8ff9\u547c\u5438: `.blob-bg {
  background: #071020;
  position: relative;
  overflow: hidden;
}
.blob-bg::before {
  content: '';
  position: absolute;
  width: 80px;
  height: 80px;
  top: 15%;
  left: 15%;
  background: var(--accent);
  border-radius: 50% 40% 55% 45% / 45% 55% 40% 50%;
  filter: blur(20px);
  opacity: 0.6;
  animation: blobMorph 5s ease-in-out infinite;
}
.blob-bg::after {
  content: '';
  position: absolute;
  width: 65px;
  height: 65px;
  bottom: 15%;
  right: 15%;
  background: var(--accent-deep);
  border-radius: 40% 55% 45% 60% / 55% 45% 60% 40%;
  filter: blur(20px);
  opacity: 0.6;
  animation: blobMorph 5s ease-in-out infinite;
  animation-delay: -2.5s;
}`,
  呼吸光晕: `.breath-orb {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 36%, var(--accent-soft), var(--accent-deep));
  animation: breathGlow var(--fx-duration, 4.5s) var(--fx-easing, ease-in-out) infinite;
}
@keyframes breathGlow {
  0%, 100% {
    transform: scale(1);
    box-shadow:
      0 0 0 0 rgba(var(--accent-rgb), 0.5),
      0 0 16px 4px rgba(var(--accent-rgb), 0.2);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.22);
    box-shadow:
      0 0 0 12px rgba(var(--accent-rgb), 0),
      0 0 36px 14px rgba(var(--accent-rgb), 0.45);
    opacity: 1;
  }
}`,
  文字揭幕: `.text-reveal-wrap {
  text-align: center;
  line-height: 1.6;
}
.reveal-text {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: var(--accent);
  animation: textReveal 3.5s ease-in-out infinite;
  white-space: nowrap;
}
.reveal-text-2 {
  font-size: 13px;
  font-weight: 500;
  color: var(--accent-soft);
  animation-delay: 0.12s;
}
@keyframes textReveal {
  0%, 5%   { clip-path: inset(0 100% 0 0); opacity: 1; }
  32%, 68% { clip-path: inset(0 0% 0 0);   opacity: 1; }
  90%      { clip-path: inset(0 0% 0 0);   opacity: 0; }
  100%     { clip-path: inset(0 100% 0 0); opacity: 0; }
}`,
  高亮扫光: `.highlight-sweep {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 8px;
  color: #f5f8ff;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, rgba(var(--accent-rgb), 0.15), rgba(var(--accent-rgb), 0.55), rgba(var(--accent-rgb), 0.15));
  background-size: 220% 100%;
  animation: highlightSweep 2.8s ease-in-out infinite;
}`,
  数字增长: `@property --count {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}
.count-up-wrap {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
}
.count-number {
  --count: 0;
  counter-reset: count var(--count);
  margin: 0;
  font-size: 44px;
  font-weight: 800;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
  animation: countUp 3s ease-out infinite;
}
.count-number::after {
  content: counter(count);
}
.count-suffix {
  font-size: 22px;
  font-weight: 600;
  color: var(--accent-soft);
}
@keyframes countUp {
  0%, 5%   { --count: 0;  opacity: 0.3; }
  65%, 80% { --count: 87; opacity: 1;   }
  95%      { --count: 87; opacity: 0;   }
  100%     { --count: 0;  opacity: 0;   }
}`,
  弹性入场: `.spring-wrap {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.spring-card {
  width: 80px;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), var(--accent-deep));
  box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.35);
  animation: springIn 2.5s ease-in-out infinite;
}
@keyframes springIn {
  0%, 12% { transform: scale(0) rotate(-12deg); opacity: 0; }
  38%     { transform: scale(1.2) rotate(3deg);  opacity: 1; }
  50%     { transform: scale(0.94) rotate(-1deg); }
  60%     { transform: scale(1.05) rotate(0.5deg); }
  68%, 82% { transform: scale(1) rotate(0deg);   opacity: 1; }
  100%    { transform: scale(0) rotate(12deg);    opacity: 0; }
}`,
  流星雨: `.bg-panel {
  width: 100%;
  height: 86px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(145, 177, 240, 0.3);
}
.meteor-shower {
  background:
    radial-gradient(ellipse at 60% 30%, rgba(var(--accent-rgb), 0.06), transparent 60%),
    #071020;
}
.meteor-shower span {
  position: absolute;
  width: 2px;
  height: 70px;
  background: linear-gradient(to bottom, transparent, var(--accent-soft), transparent);
  border-radius: 999px;
  animation: meteorFall linear infinite;
  opacity: 0;
}
.meteor-shower span:nth-child(1) { left: 15%; animation-duration: 1.4s; animation-delay: 0s;   }
.meteor-shower span:nth-child(2) { left: 38%; animation-duration: 2s;   animation-delay: 0.5s; }
.meteor-shower span:nth-child(3) { left: 62%; animation-duration: 1.6s; animation-delay: 1s;   }
.meteor-shower span:nth-child(4) { left: 82%; animation-duration: 1.9s; animation-delay: 0.3s; }
.meteor-shower span:nth-child(5) { left: 50%; animation-duration: 2.2s; animation-delay: 1.6s; }
@keyframes meteorFall {
  0%   { transform: rotate(18deg) translateY(-100px); opacity: 0; }
  12%  { opacity: 1; }
  80%  { opacity: 0.4; }
  100% { transform: rotate(18deg) translateY(200px);  opacity: 0; }
}`,
  柱状图生长: `.bd-bar-chart {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
}
.bd-bar-chart span {
  flex: 1;
  max-width: 22px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(180deg, var(--accent-soft), var(--accent));
  transform-origin: bottom;
  animation: barGrow 2s ease-in-out infinite;
}
.bd-bar-chart span:nth-child(1) { height: 45%; }
.bd-bar-chart span:nth-child(2) { height: 75%; animation-delay: 0.1s; }
.bd-bar-chart span:nth-child(3) { height: 55%; animation-delay: 0.2s; }
.bd-bar-chart span:nth-child(4) { height: 90%; animation-delay: 0.3s; }
.bd-bar-chart span:nth-child(5) { height: 65%; animation-delay: 0.4s; }
@keyframes barGrow {
  0% { transform: scaleY(0); opacity: 0.3; }
  40% { transform: scaleY(1); opacity: 1; }
  80% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(0); opacity: 0.3; }
}`,
  环形占比: `.bd-donut {
  width: 80px;
  height: 80px;
  position: relative;
  display: grid;
  place-items: center;
}
.donut-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.donut-track {
  fill: none;
  stroke: rgba(var(--accent-rgb), 0.12);
  stroke-width: 7;
}
.donut-fill {
  fill: none;
  stroke: var(--accent);
  stroke-width: 7;
  stroke-linecap: round;
  stroke-dasharray: 201;
  stroke-dashoffset: 201;
  animation: donutGrow 2s ease-in-out infinite;
  filter: drop-shadow(0 0 4px rgba(var(--accent-rgb), 0.4));
}
.donut-label {
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
}
@keyframes donutGrow {
  0% { stroke-dashoffset: 201; opacity: 0.4; }
  50% { stroke-dashoffset: 54; opacity: 1; }
  80% { stroke-dashoffset: 54; opacity: 1; }
  100% { stroke-dashoffset: 54; opacity: 0.4; }
}`,
  数据表骨架: `.bd-table-skeleton {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.skel-row {
  display: flex;
  gap: 8px;
}
.skel-row span {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(100deg, rgba(var(--accent-rgb), 0.1) 30%, rgba(var(--accent-rgb), 0.25) 50%, rgba(var(--accent-rgb), 0.1) 70%);
  background-size: 200% 100%;
  animation: skelShimmer 1.5s linear infinite;
}
.skel-row span:nth-child(1) { flex: 2; }
.skel-row span:nth-child(2) { flex: 3; }
.skel-row span:nth-child(3) { flex: 1.5; }
.skel-header span { height: 10px; }
.skel-row:nth-child(2) span { animation-delay: 0.15s; }
.skel-row:nth-child(3) span { animation-delay: 0.3s; }
.skel-row:nth-child(4) span { animation-delay: 0.45s; }
@keyframes skelShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`,
  指标趋势折线: `.bd-trend-line {
  width: 100%;
  height: 70px;
  padding: 4px 8px;
  box-sizing: border-box;
  background:
    repeating-linear-gradient(90deg, rgba(var(--accent-rgb), 0.06) 0 1px, transparent 1px 25%),
    repeating-linear-gradient(0deg, rgba(var(--accent-rgb), 0.06) 0 1px, transparent 1px 33%);
}
.trend-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.trend-path {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 320;
  stroke-dashoffset: 320;
  animation: trendDraw 2.5s ease-in-out infinite;
}
@keyframes trendDraw {
  0% { stroke-dashoffset: 320; opacity: 0; }
  60% { stroke-dashoffset: 0; opacity: 1; }
  80% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}`,
  弹力圆点: `.elastic-dots {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  height: 36px;
}
.elastic-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-soft), var(--accent));
  animation: elasticDot 1.1s ease-in-out infinite;
}
.elastic-dots span:nth-child(2) { animation-delay: 0.15s; }
.elastic-dots span:nth-child(3) { animation-delay: 0.3s; }
@keyframes elasticDot {
  0%, 100% { transform: translateY(0) scaleX(1) scaleY(1); }
  30%       { transform: translateY(-18px) scaleX(0.85) scaleY(1.15); }
  50%       { transform: translateY(0) scaleX(1.25) scaleY(0.75); }
  65%       { transform: translateY(-6px) scaleX(0.95) scaleY(1.05); }
  80%       { transform: translateY(0) scaleX(1.05) scaleY(0.95); }
}`,
  列表骨架: `.list-skeleton {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.skel-list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 20px;
}
.skel-icon-sq {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  flex-shrink: 0;
  background: linear-gradient(100deg,
    rgba(var(--accent-rgb), 0.1) 30%,
    rgba(var(--accent-rgb), 0.28) 50%,
    rgba(var(--accent-rgb), 0.1) 70%);
  background-size: 200% 100%;
  animation: skelShimmer 1.5s linear infinite;
}
.skel-text-bar {
  flex: 1;
  height: 9px;
  border-radius: 5px;
  background: linear-gradient(100deg,
    rgba(var(--accent-rgb), 0.1) 30%,
    rgba(var(--accent-rgb), 0.28) 50%,
    rgba(var(--accent-rgb), 0.1) 70%);
  background-size: 200% 100%;
  animation: skelShimmer 1.5s linear infinite;
  animation-delay: 0.08s;
}
.skel-list-item:nth-child(2) .skel-icon-sq,
.skel-list-item:nth-child(2) .skel-text-bar { animation-delay: 0.2s; }
.skel-list-item:nth-child(3) .skel-icon-sq,
.skel-list-item:nth-child(3) .skel-text-bar { animation-delay: 0.35s; }
@keyframes skelShimmer {
  from { background-position: 200% center; }
  to   { background-position: -200% center; }
}`,
  标签页指示器: `.tab-indicator-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
.tab-bar {
  position: relative;
  display: flex;
  gap: 0;
  background: rgba(var(--accent-rgb), 0.08);
  border-radius: 8px;
  padding: 4px;
}
.tab-item {
  position: relative;
  z-index: 1;
  padding: 6px 18px;
  font-size: 13px;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.3s ease;
  user-select: none;
}
.tab-item.is-active {
  color: var(--text);
}
.tab-ink {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(33.333% - 2.67px);
  height: calc(100% - 8px);
  background: rgba(var(--accent-rgb), 0.2);
  border-radius: 6px;
  animation: tabSlide 3s ease-in-out infinite;
}
@keyframes tabSlide {
  0%, 20%  { transform: translateX(0); }
  30%, 50% { transform: translateX(100%); }
  60%, 80% { transform: translateX(200%); }
  90%, 100% { transform: translateX(0); }
}`,
  消息气泡弹入: `.bubble-stage {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.chat-bubble {
  max-width: 75%;
  padding: 8px 14px;
  border-radius: 16px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text);
  animation: bubblePop 2.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both infinite;
}
.bubble-left {
  align-self: flex-start;
  background: rgba(var(--accent-rgb), 0.15);
  border-bottom-left-radius: 4px;
  animation-delay: 0s;
}
.bubble-right {
  align-self: flex-end;
  background: rgba(var(--accent-rgb), 0.3);
  border-bottom-right-radius: 4px;
  animation-delay: 0.3s;
}
@keyframes bubblePop {
  0% { opacity: 0; transform: scale(0.3) translateY(20px); }
  12% { opacity: 1; transform: scale(1.05) translateY(-2px); }
  18% { transform: scale(0.97) translateY(1px); }
  24%, 75% { opacity: 1; transform: scale(1) translateY(0); }
  85%, 100% { opacity: 0; transform: scale(0.8) translateY(-10px); }
}`,
  渐入上移: `.fade-up-stage {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.fade-up-item {
  padding: 8px 14px;
  background: rgba(var(--accent-rgb), 0.1);
  border: 1px solid rgba(var(--accent-rgb), 0.15);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text);
  animation: fadeInUp 2.5s ease-out both infinite;
}
.fade-up-item:nth-child(1) { animation-delay: 0s; }
.fade-up-item:nth-child(2) { animation-delay: 0.15s; }
.fade-up-item:nth-child(3) { animation-delay: 0.3s; }
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(24px); }
  15% { opacity: 1; transform: translateY(-2px); }
  25%, 80% { opacity: 1; transform: translateY(0); }
  90%, 100% { opacity: 0; transform: translateY(-10px); }
}`,
  涟漪扩散: `.ripple-bg {
  background: radial-gradient(ellipse at center,
    rgba(var(--accent-rgb), 0.08) 0%,
    transparent 70%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ripple-anchor {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ripple-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1.5px solid rgba(var(--accent-rgb), 0.6);
  animation: rippleOut 2.4s ease-out infinite;
  opacity: 0;
}
.ripple-ring:nth-child(1) { animation-delay: 0s; }
.ripple-ring:nth-child(2) { animation-delay: 0.8s; }
.ripple-ring:nth-child(3) { animation-delay: 1.6s; }
.ripple-core {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px 4px rgba(var(--accent-rgb), 0.4);
  animation: rippleCorePulse 2.4s ease-in-out infinite;
}
@keyframes rippleOut {
  0%   { transform: scale(1);   opacity: 0.7; }
  100% { transform: scale(3.5); opacity: 0; }
}
@keyframes rippleCorePulse {
  0%, 100% { box-shadow: 0 0 10px 3px rgba(var(--accent-rgb), 0.4); }
  50%       { box-shadow: 0 0 20px 8px rgba(var(--accent-rgb), 0.7); }
}`,
  菊花旋转: `.spinner-dots {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: transparent;
  position: relative;
  box-shadow:
    0 -22px 0 rgba(var(--accent-rgb), 1),
    15px -15px 0 rgba(var(--accent-rgb), 0.85),
    22px 0 0 rgba(var(--accent-rgb), 0.7),
    15px 15px 0 rgba(var(--accent-rgb), 0.5),
    0 22px 0 rgba(var(--accent-rgb), 0.35),
    -15px 15px 0 rgba(var(--accent-rgb), 0.2),
    -22px 0 0 rgba(var(--accent-rgb), 0.1),
    -15px -15px 0 rgba(var(--accent-rgb), 0.05);
  animation: spinnerRotate var(--fx-duration, 1s) linear infinite;
}
@keyframes spinnerRotate {
  to { transform: rotate(360deg); }
}`,
  悬浮卡片: `.float-card-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90px;
}
.hover-float-card {
  width: 110px;
  height: 66px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.18), rgba(var(--accent-rgb), 0.04));
  border: 1px solid rgba(var(--accent-rgb), 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-soft);
  font-size: 13px;
  font-weight: 500;
  position: relative;
  animation: cardFloat var(--fx-duration, 3s) ease-in-out infinite;
  box-shadow: 0 4px 16px rgba(var(--accent-rgb), 0.15);
}
.hover-float-card::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 20%;
  right: 20%;
  height: 10px;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.2);
  filter: blur(6px);
  animation: cardShadow var(--fx-duration, 3s) ease-in-out infinite;
}
@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-14px); }
}
@keyframes cardShadow {
  0%, 100% { opacity: 0.5; transform: scaleX(1); }
  50%       { opacity: 0.15; transform: scaleX(0.6); }
}`,
  墨迹呼吸: `.blob-bg {
  background: #071020;
  position: relative;
  overflow: hidden;
}
.blob-bg::before {
  content: '';
  position: absolute;
  width: 80px;
  height: 80px;
  top: 15%;
  left: 15%;
  background: var(--accent);
  border-radius: 50% 40% 55% 45% / 45% 55% 40% 50%;
  filter: blur(20px);
  opacity: 0.6;
  animation: blobMorph var(--fx-duration, 5s) ease-in-out infinite;
}
.blob-bg::after {
  content: '';
  position: absolute;
  width: 65px;
  height: 65px;
  bottom: 15%;
  right: 15%;
  background: var(--accent-deep);
  border-radius: 40% 55% 45% 60% / 55% 45% 60% 40%;
  filter: blur(20px);
  opacity: 0.6;
  animation: blobMorph var(--fx-duration, 5s) ease-in-out infinite;
  animation-delay: -2.5s;
}
@keyframes blobMorph {
  0%, 100% {
    border-radius: 50% 40% 55% 45% / 45% 55% 40% 50%;
    transform: scale(1) rotate(0deg);
  }
  33% {
    border-radius: 60% 40% 45% 55% / 55% 45% 60% 40%;
    transform: scale(1.15) rotate(15deg);
  }
  66% {
    border-radius: 40% 55% 60% 45% / 40% 60% 45% 55%;
    transform: scale(0.9) rotate(-10deg);
  }
}`,
  粒子流动: `.particle-bg {
  background: #0d1730;
  overflow: hidden;
  position: relative;
}
.particle-bg span {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.7;
  animation: particleFloat var(--fx-duration, 6s) ease-in-out infinite;
}
.particle-bg span:nth-child(1) { width: 8px; height: 8px; left: 15%; top: 65%; animation-delay: 0s; }
.particle-bg span:nth-child(2) { width: 5px; height: 5px; left: 40%; top: 80%; animation-delay: 1s; }
.particle-bg span:nth-child(3) { width: 10px; height: 10px; left: 65%; top: 70%; animation-delay: 2s; }
.particle-bg span:nth-child(4) { width: 4px; height: 4px; left: 25%; top: 50%; animation-delay: 0.5s; }
.particle-bg span:nth-child(5) { width: 7px; height: 7px; left: 75%; top: 50%; animation-delay: 1.5s; }
.particle-bg span:nth-child(6) { width: 6px; height: 6px; left: 88%; top: 75%; animation-delay: 2.5s; }
@keyframes particleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
  50% { transform: translateY(-45px) scale(1.1); opacity: 0.3; }
}`,
  海浪起伏: `.wave-bg {
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 55%, var(--bg-soft) 100%);
  position: relative;
  overflow: hidden;
}
.wave-bg::before,
.wave-bg::after,
.wave-bg .wave-layer3 {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200%;
  transform-origin: bottom;
}
.wave-bg::before {
  height: 60%;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M 0 60 Q 300 20, 600 60 T 1200 60 V 120 H 0 Z' fill='white'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M 0 60 Q 300 20, 600 60 T 1200 60 V 120 H 0 Z' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-size: 50% 100%;
  mask-size: 50% 100%;
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
  background-color: rgba(var(--accent-rgb), 0.15);
  animation: waveMoveLeft var(--fx-duration, 8s) linear infinite;
  z-index: 1;
}
.wave-bg::after {
  height: 65%;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M 0 60 Q 150 25, 300 60 T 600 60 T 900 60 T 1200 60 V 120 H 0 Z' fill='white'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M 0 60 Q 150 25, 300 60 T 600 60 T 900 60 T 1200 60 V 120 H 0 Z' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-size: 50% 100%;
  mask-size: 50% 100%;
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
  background-color: rgba(var(--accent-soft-rgb), 0.15);
  animation: waveMoveRight var(--fx-duration, 6s) linear infinite;
  z-index: 2;
  bottom: -2px;
}
.wave-layer3 {
  height: 75%;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M 0 60 Q 100 40, 200 60 T 400 60 T 600 60 T 800 60 T 1000 60 T 1200 60 V 120 H 0 Z' fill='white'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M 0 60 Q 100 40, 200 60 T 400 60 T 600 60 T 800 60 T 1000 60 T 1200 60 V 120 H 0 Z' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-size: 50% 100%;
  mask-size: 50% 100%;
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
  background-color: rgba(255, 255, 255, 0.06);
  animation: waveMoveLeft var(--fx-duration, 4s) linear infinite;
  z-index: 3;
  bottom: -5px;
}
@keyframes waveMoveLeft {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes waveMoveRight {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}`,
  轨道卫星: `.orbit {
  position: relative;
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.orbit-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(var(--accent-rgb), 0.4);
  animation: orbitSpin var(--fx-duration, 3s) linear infinite;
}
.orbit-dot {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-soft);
  box-shadow: 0 0 8px var(--accent);
}
.orbit-core {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-deep));
  box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.5);
}
@keyframes orbitSpin {
  to { transform: rotate(360deg); }
}`,
  搜索无果: `.empty-search {
  width: 90px;
  height: 90px;
  position: relative;
  display: grid;
  place-items: center;
  animation: searchShake 3.6s ease-in-out infinite;
}
.empty-search::before {
  content: "NO DATA";
  position: absolute;
  top: 60px;
  font-size: 20px;
  font-weight: 800;
  color: rgba(var(--accent-rgb), 0.1);
  letter-spacing: 2px;
  z-index: 0;
  white-space: nowrap;
}
.search-lens {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid rgba(var(--accent-rgb), 0.55);
  background: radial-gradient(circle at 30% 30%, rgba(var(--accent-rgb), 0.25), transparent 60%);
  box-shadow: inset 0 0 12px rgba(var(--accent-rgb), 0.2);
}
.search-handle {
  position: absolute;
  width: 28px;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transform: translate(22px, 22px) rotate(45deg);
  box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.35);
}
.search-cross {
  --cross-rotate: 45deg;
  position: absolute;
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: rgba(var(--accent-rgb), 0.7);
  top: 50%;
  left: 50%;
  animation: searchCrossPulse 2s ease-in-out infinite;
}
.search-cross--alt {
  --cross-rotate: -45deg;
}
@keyframes searchShake {
  0%, 100% { transform: rotate(-4deg); }
  50% { transform: rotate(4deg); }
}
@keyframes searchCrossPulse {
  0%, 100% { transform: translate(-50%, -50%) rotate(var(--cross-rotate)) scale(0.9); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) rotate(var(--cross-rotate)) scale(1.1); opacity: 1; }
}`,
  空档案夹: `<!-- HTML -->
<div class="empty-folder">
  <div class="folder-back"></div>
  <div class="folder-paper"></div>
  <div class="folder-front"></div>
</div>

/* CSS */
.empty-folder {
  position: relative;
  width: 60px;
  height: 50px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0 auto;
}
.folder-back {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: rgba(var(--accent-rgb), 0.2);
  border-radius: 4px 4px 2px 2px;
}
.folder-back::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 0;
  width: 20px;
  height: 10px;
  background: rgba(var(--accent-rgb), 0.2);
  border-radius: 4px 4px 0 0;
}
.folder-paper {
  position: absolute;
  bottom: 10px;
  width: 36px;
  height: 28px;
  background: rgba(var(--accent-rgb), 0.1);
  border: 1.5px dashed rgba(var(--accent-rgb), 0.45);
  border-radius: 2px;
  animation: paperFloat var(--fx-duration, 3s) ease-in-out infinite;
}
.folder-front {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.5), rgba(var(--accent-rgb), 0.3));
  border-radius: 2px 2px 4px 4px;
  transform-origin: bottom;
  transform: perspective(200px) rotateX(20deg);
}
@keyframes paperFloat {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-14px); opacity: 1; }
}`,

  "No Data 幽灵": `<!-- HTML -->
<div class="ghost-nodata">
  <div class="ghost-body"><div class="ghost-eyes"></div></div>
  <div class="ghost-shadow"></div>
</div>

/* CSS */
.ghost-nodata {
  position: relative;
  width: 120px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.ghost-nodata::before {
  content: "NO DATA";
  position: absolute;
  top: 45px;
  font-size: 26px;
  font-weight: 800;
  color: rgba(var(--accent-rgb), 0.08);
  letter-spacing: 2px;
  z-index: 0;
  white-space: nowrap;
}
.ghost-body {
  position: relative;
  width: 40px;
  height: 48px;
  background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.45), rgba(var(--accent-rgb), 0.15));
  border: 1.5px solid rgba(var(--accent-rgb), 0.6);
  border-radius: 20px 20px 6px 6px;
  animation: ghostFloat var(--fx-duration, 3s) ease-in-out infinite;
  display: flex;
  justify-content: center;
  padding-top: 14px;
  box-sizing: border-box;
  z-index: 1;
  backdrop-filter: blur(2px);
}
.ghost-eyes {
  display: flex;
  gap: 8px;
}
.ghost-eyes::before, .ghost-eyes::after {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: ghostBlink var(--fx-duration, 3s) infinite;
}
.ghost-shadow {
  margin-top: 10px;
  width: 30px;
  height: 6px;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.15);
  animation: ghostShadow var(--fx-duration, 3s) ease-in-out infinite;
}
@keyframes ghostFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes ghostShadow {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(0.6); opacity: 0.3; }
}
@keyframes ghostBlink {
  0%, 45%, 55%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.1); }
}`,
};
