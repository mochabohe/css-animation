(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const _={loading:{scenario:"异步请求 / 首屏加载",token:"motion.loading"},motion:{scenario:"状态变化 / 数据强调",token:"motion.emphasis"},interactive:{scenario:"按钮反馈 / 引导操作",token:"motion.interactive"},transform:{scenario:"空间过渡 / 卡片转场",token:"motion.transform"},text:{scenario:"品牌标题 / 信息强调",token:"motion.typography"},background:{scenario:"页面氛围 / 空状态",token:"motion.background"},wave:{scenario:"音频可视化 / 声波反馈",token:"motion.wave"}},ae={加载脉冲:{duration:{label:"旋转时长",type:"range",min:.5,max:3,step:.1,default:1,unit:"s",target:"spin"},pulseDuration:{label:"脉冲时长",type:"range",min:.8,max:3,step:.1,default:1.4,unit:"s",target:"pulse"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"spin"}},跳动圆点:{duration:{label:"跳动时长",type:"range",min:.5,max:2,step:.1,default:.9,unit:"s",target:"dotsBounce"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"dotsBounce"}},频谱条形:{duration:{label:"律动时长",type:"range",min:.5,max:2,step:.1,default:1,unit:"s",target:"barsScale"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"barsScale"}},双环旋转:{duration:{label:"外环时长",type:"range",min:.5,max:3,step:.1,default:1.1,unit:"s",target:"spin"},innerDuration:{label:"内环时长",type:"range",min:.5,max:3,step:.1,default:.9,unit:"s",target:"spinReverse"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"spin"}},骨架屏闪光:{duration:{label:"闪光时长",type:"range",min:.8,max:3,step:.1,default:1.3,unit:"s",target:"shimmer"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"shimmer"}},进度滑条:{duration:{label:"循环时长",type:"range",min:.8,max:3,step:.1,default:1.5,unit:"s",target:"progressLoop"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"progressLoop"}},弹跳小球:{duration:{label:"弹跳时长",type:"range",min:.5,max:3,step:.1,default:1.2,unit:"s",target:"bounce"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out","cubic-bezier(0.68, -0.55, 0.27, 1.55)"],default:"cubic-bezier(0.42, 0, 0.58, 1)",target:"bounce"}},摆动钟锤:{duration:{label:"摆动时长",type:"range",min:.5,max:3,step:.1,default:1.2,unit:"s",target:"pendulum"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"pendulum"}},漂浮气泡:{duration:{label:"漂浮时长",type:"range",min:1,max:5,step:.1,default:2.3,unit:"s",target:"floatUp"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"floatUp"}},波浪位移:{duration:{label:"波浪时长",type:"range",min:.5,max:3,step:.1,default:1.3,unit:"s",target:"waveMove"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"waveMove"}},心跳脉冲:{duration:{label:"心跳时长",type:"range",min:.5,max:3,step:.1,default:1.2,unit:"s",target:"heartbeat"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"heartbeat"}},渐变流动:{duration:{label:"流动时长",type:"range",min:2,max:10,step:.5,default:5,unit:"s",target:"gradientShift"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"gradientShift"}},霓虹发光:{gradientDuration:{label:"流动时长",type:"range",min:2,max:10,step:.5,default:5,unit:"s",target:"gradientShift"},glowDuration:{label:"发光时长",type:"range",min:1,max:5,step:.1,default:1.7,unit:"s",target:"glowPulse"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"glowPulse"}},呼吸图标:{duration:{label:"呼吸时长",type:"range",min:.8,max:3,step:.1,default:1.4,unit:"s",target:"dotBreath"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"dotBreath"}},波纹点击:{duration:{label:"波纹时长",type:"range",min:.5,max:2,step:.1,default:.9,unit:"s",target:"rippleWave"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-out",target:"rippleWave"}},点赞心跳:{duration:{label:"心跳时长",type:"range",min:.3,max:1.5,step:.1,default:.6,unit:"s",target:"likeHeart"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"likeHeart"}},开关切换:{duration:{label:"切换时长",type:"range",min:.1,max:.8,step:.05,default:.3,unit:"s",target:"transition"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"transition"}},淡入淡出:{duration:{label:"动画时长",type:"range",min:1,max:6,step:.5,default:3,unit:"s",target:"fadeInOut"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"fadeInOut"}},消息滑入:{duration:{label:"滑入时长",type:"range",min:1,max:6,step:.5,default:3,unit:"s",target:"toastSlide"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"toastSlide"}},按钮加载中:{duration:{label:"旋转时长",type:"range",min:.4,max:2,step:.1,default:.8,unit:"s",target:"buttonSpinner"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"buttonSpinner"}},翻转卡片:{duration:{label:"翻转时长",type:"range",min:1,max:6,step:.2,default:3.2,unit:"s",target:"flip"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"flip"}},旋转立方体:{duration:{label:"旋转时长",type:"range",min:2,max:8,step:.5,default:4,unit:"s",target:"cubeSpin"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"cubeSpin"}},倾斜面板:{duration:{label:"倾斜时长",type:"range",min:1,max:5,step:.2,default:2.8,unit:"s",target:"tiltLoop"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"tiltLoop"}},折页翻开:{duration:{label:"翻开时长",type:"range",min:1,max:5,step:.2,default:2.2,unit:"s",target:"foldOpen"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"foldOpen"}},故障闪烁:{duration:{label:"闪烁时长",type:"range",min:.5,max:3,step:.1,default:1.4,unit:"s",target:"glitchSkew"},timing:{label:"缓动函数",type:"select",options:["linear","steps(2, end)","steps(3, end)","steps(4, end)"],default:"steps(2, end)",target:"glitchSkew"}},打字机:{typingDuration:{label:"打字时长",type:"range",min:1,max:6,step:.2,default:3.2,unit:"s",target:"typing"},caretDuration:{label:"光标闪烁",type:"range",min:.5,max:2,step:.1,default:.9,unit:"s",target:"caret"}},波浪字符:{duration:{label:"波浪时长",type:"range",min:.5,max:3,step:.1,default:1.1,unit:"s",target:"waveLetter"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"waveLetter"}},渐变流光字:{duration:{label:"流光时长",type:"range",min:1,max:6,step:.2,default:2.8,unit:"s",target:"textShine"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"textShine"}},极光流动:{duration:{label:"流动时长",type:"range",min:3,max:12,step:.5,default:6,unit:"s",target:"auroraFlow"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"auroraFlow"}},星点闪烁:{duration:{label:"闪烁时长",type:"range",min:1,max:4,step:.2,default:1.8,unit:"s",target:"twinkle"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"twinkle"}},雷达扫描:{duration:{label:"扫描时长",type:"range",min:1,max:5,step:.5,default:2,unit:"s",target:"spin"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"spin"}},网格扫光:{duration:{label:"扫光时长",type:"range",min:1,max:6,step:.2,default:2.8,unit:"s",target:"scanLine"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"scanLine"}},逐字加载:{duration:{label:"动画时长",type:"range",min:.5,max:3,step:.1,default:1.1,unit:"s",target:"tokenFlow"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"tokenFlow"}},向量检索命中:{radarDuration:{label:"雷达时长",type:"range",min:1,max:6,step:.2,default:3.2,unit:"s",target:"radarSpin"},pulseDuration:{label:"脉冲时长",type:"range",min:.8,max:3,step:.1,default:1.6,unit:"s",target:"hitPulse"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"hitPulse"}},数据管道吞吐:{duration:{label:"流动时长",type:"range",min:.8,max:4,step:.2,default:1.8,unit:"s",target:"pipeFlow"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"pipeFlow"}},模型置信度分布:{duration:{label:"上升时长",type:"range",min:.5,max:3,step:.1,default:1.3,unit:"s",target:"confidenceRise"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"confidenceRise"}},异常告警脉冲:{duration:{label:"脉冲时长",type:"range",min:.8,max:3,step:.1,default:1.4,unit:"s",target:"anomalyPulse"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"anomalyPulse"}},集群健康热力:{duration:{label:"闪烁时长",type:"range",min:1,max:4,step:.2,default:1.8,unit:"s",target:"clusterBlink"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"clusterBlink"}},三点轨道:{duration:{label:"轨道时长",type:"range",min:.8,max:3,step:.1,default:1.5,unit:"s",target:"dotOrbitStep"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"dotOrbitStep"}},镜面扫光:{duration:{label:"扫光时长",type:"range",min:.5,max:3,step:.1,default:1,unit:"s",target:"textShimmer"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"linear",target:"textShimmer"}},数据流线:{duration:{label:"流动时长",type:"range",min:1,max:5,step:.5,default:2,unit:"s",target:"dataFlow"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"dataFlow"}},环形进度:{duration:{label:"进度时长",type:"range",min:1,max:5,step:.5,default:2,unit:"s",target:"progressGrow"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"progressGrow"}},信号波纹:{duration:{label:"波纹时长",type:"range",min:1,max:5,step:.5,default:2,unit:"s",target:"rippleExpand"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-out",target:"rippleExpand"}},能量脉冲条:{duration:{label:"脉冲时长",type:"range",min:.8,max:3,step:.1,default:1.5,unit:"s",target:"energyPulse"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"energyPulse"}},数据波形:{duration:{label:"波动时长",type:"range",min:.5,max:3,step:.1,default:1.2,unit:"s",target:"waveformBounce"},timing:{label:"缓动函数",type:"select",options:["linear","ease","ease-in","ease-out","ease-in-out"],default:"ease-in-out",target:"waveformBounce"}}},ne={加载脉冲:["spin","pulse"],跳动圆点:["dotsBounce"],频谱条形:["barsScale"],双环旋转:["spin","spinReverse"],骨架屏闪光:["shimmer"],进度滑条:["progressLoop"],弹跳小球:["bounce","shadow"],摆动钟锤:["pendulum"],漂浮气泡:["floatUp"],波浪位移:["waveMove"],心跳脉冲:["heartbeat"],渐变流动:["gradientShift"],霓虹发光:["gradientShift","glowPulse"],下划线滑入:[],呼吸图标:["dotBreath"],波纹点击:["rippleWave"],磁吸悬停:[],翻转卡片:["flip"],旋转立方体:["cubeSpin"],倾斜面板:["tiltLoop"],折页翻开:["foldOpen"],故障闪烁:["glitchSkew"],打字机:["typing","caret"],波浪字符:["waveLetter"],渐变流光字:["textShine"],极光流动:["auroraFlow"],星点闪烁:["twinkle"],雷达扫描:["spin"],网格扫光:["scanLine"],逐字加载:["tokenFlow"],向量检索命中:["radarSpin","hitPulse"],数据管道吞吐:["pipeFlow"],模型置信度分布:["confidenceRise"],异常告警脉冲:["anomalyPulse"],集群健康热力:["clusterBlink"],三点轨道:["dotOrbitStep"],镜面扫光:["textShimmer"],数据流线:["dataFlow"],环形进度:["progressGrow"],信号波纹:["rippleExpand"],能量脉冲条:["energyPulse"],数据波形:["waveformBounce"],点赞心跳:["likeHeart"],开关切换:[],淡入淡出:["fadeInOut"],消息滑入:["toastSlide"],按钮加载中:["buttonSpinner"]},V={加载脉冲:`.loader {
  width: 54px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid rgba(var(--accent-rgb), 0.25);
  border-top-color: var(--accent);
  animation: spin 1s linear infinite, pulse 1.4s ease-in-out infinite;
}`,跳动圆点:`.dots-loader {
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
.dots-loader span:nth-child(3) { animation-delay: 0.3s; }`,频谱条形:`.bars-loader {
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
.bars-loader span:nth-child(4) { animation-delay: 0.36s; }`,双环旋转:`.ring-loader {
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
}`,骨架屏闪光:`.skeleton {
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
}`,进度滑条:`.progress-loop {
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
}`,弹跳小球:`.ball {
  animation: bounce 1s cubic-bezier(0.42, 0, 0.58, 1) infinite;
}`,摆动钟锤:`.pendulum-line,
.pendulum-bob {
  transform-origin: top center;
  animation: pendulum 1.2s ease-in-out infinite;
}`,漂浮气泡:`.float-orb {
  animation: floatUp 2.3s ease-in-out infinite;
}`,波浪位移:`.wave-track {
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
}`,心跳脉冲:`.heart {
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
}`,渐变流动:`.cta {
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
}`,霓虹发光:`.cta-glow {
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
}`,下划线滑入:`.link-btn {
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
.link-btn:hover::after { transform: scaleX(1); }`,呼吸图标:`.icon-btn {
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
}`,波纹点击:`.ripple-btn {
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
.ripple-btn:hover::after { animation: rippleWave 0.9s ease-out; }`,磁吸悬停:`.magnet-btn {
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
}`,点赞心跳:`.like-btn {
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
}`,开关切换:`.toggle-switch {
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
}`,淡入淡出:`.fade-demo {
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
}`,消息滑入:`.toast-demo {
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
}`,按钮加载中:`.loading-btn {
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
}`,翻转卡片:`.flip-wrap {
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
}`,旋转立方体:`.cube-wrap {
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
}`,倾斜面板:`.tilt-panel {
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
}`,折页翻开:`.fold-wrap {
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
}`,故障闪烁:`.fx-text {
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
}`,打字机:`.fx-text {
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
}`,波浪字符:`.fx-text {
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
}`,渐变流光字:`.fx-text {
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
}`,极光流动:`.bg-panel {
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
}`,星点闪烁:`.bg-panel {
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
}`,雷达扫描:`.bg-panel {
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
}`,网格扫光:`.bg-panel {
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
}`,逐字加载:`.ai-token-stream {
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
.ai-token-stream span:nth-child(5) { animation-delay: 0.4s; }`,向量检索命中:`.ai-vector-hit {
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
.ai-vector-hit span:nth-child(3) { bottom: 18px; left: 20px; animation-delay: 0.6s; }`,数据管道吞吐:`.ai-pipeline {
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
.ai-pipeline span:nth-child(3) { animation-delay: 0.9s; }`,模型置信度分布:`.ai-confidence {
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
.ai-confidence span:nth-child(5) { height: 18px; animation-delay: 0.48s; }`,异常告警脉冲:`.ai-anomaly {
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
}`,集群健康热力:`.ai-cluster {
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
.ai-cluster span:nth-child(9) { animation-delay: 0.8s; }`,三点轨道:`.ai-loading-dots {
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
.ai-dot:nth-child(3) { animation-delay: -1s; }`,镜面扫光:`.thinking-shimmer {
  background: linear-gradient(90deg, var(--accent-deep) 0%, var(--accent) 25%, var(--accent-soft) 50%, var(--accent) 75%, var(--accent-deep) 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: textShimmer 1s linear infinite;
}`,数据流线:`.data-stream {
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
.data-stream span:nth-child(4) { animation-delay: 0.6s; }`,环形进度:`.circle-progress {
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
}`,信号波纹:`.signal-ripple {
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
.signal-ripple span:nth-child(3) { animation-delay: 1.2s; }`,能量脉冲条:`.energy-bars {
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
.energy-bars span:nth-child(6) { height: 25%; animation-delay: 0.5s; }`,数据波形:`.data-waveform {
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
.data-waveform span:nth-child(10) { height: 22px; animation-delay: 0.9s; }`},ie={"--accent":"#2cb9c5","--accent-2":"#1f8f98","--accent-soft":"#7be2e8","--accent-deep":"#15747c","--accent-rgb":"44, 185, 197","--accent-2-rgb":"31, 143, 152","--accent-soft-rgb":"123, 226, 232","--accent-deep-rgb":"21, 116, 124","--motion-linear":"linear","--motion-ease-standard":"ease-in-out","--motion-ease-snappy":"cubic-bezier(0.42, 0, 0.58, 1)","--motion-ease-out":"ease-out","--motion-duration-xs":"0.9s","--motion-duration-sm":"1.1s","--motion-duration-md":"1.4s","--motion-duration-lg":"2.2s","--motion-duration-xl":"3.2s","--motion-duration-xxl":"5s","--fx-duration":"1.4s","--fx-easing":"ease-in-out","--fx-duration-slow":"2.2s","--fx-duration-fast":"1.1s"};function q(a){const t=getComputedStyle(document.documentElement),e={};for(const[i,r]of Object.entries(ie)){const s=t.getPropertyValue(i).trim();e[i]=s||r}let n=a.replace(/var\((--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\)/gi,(i,r,s)=>e[r]?e[r]:s?s.trim():r);return n=n.replace(/(--[a-z0-9-]+)/gi,i=>e[i]?e[i]:i),n}function re(){const a=new Map;for(const t of document.styleSheets){let e;try{e=t.cssRules}catch{continue}if(e)for(const n of e)n.type===CSSRule.KEYFRAMES_RULE&&a.set(n.name,n.cssText)}return a}function se(a){var e;if((e=navigator.clipboard)!=null&&e.writeText)return navigator.clipboard.writeText(a);const t=document.createElement("textarea");return t.value=a,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.append(t),t.select(),document.execCommand("copy"),t.remove(),Promise.resolve()}function oe(a){const t=a.filter(e=>!(!(e instanceof HTMLElement)||e.matches(".card-tag")||e.matches("h2")));return t.length===0?"":t.map(e=>e.outerHTML).join(`
`)}function I(a){a=a.replace(/^#/,""),a.length===3&&(a=a.split("").map(e=>e+e).join(""));const t=/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function le(a){if(!a)return null;a=a.trim();const t=/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(a);if(t)return{r:parseInt(t[1],10),g:parseInt(t[2],10),b:parseInt(t[3],10)};const e=/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)$/i.exec(a);if(e)return{r:parseInt(e[1],10),g:parseInt(e[2],10),b:parseInt(e[3],10)};if(a.startsWith("#")||/^[a-f\d]{3}$/i.test(a)||/^[a-f\d]{6}$/i.test(a))return I(a);const n=document.createElement("canvas");n.width=n.height=1;const i=n.getContext("2d");return i.fillStyle=a,i.fillStyle===a.toLowerCase()||/^#[0-9a-f]{6}$/i.test(i.fillStyle)?I(i.fillStyle):null}function G(a,t,e){a/=255,t/=255,e/=255;const n=Math.max(a,t,e),i=Math.min(a,t,e);let r,s,o=(n+i)/2;if(n===i)r=s=0;else{const c=n-i;switch(s=o>.5?c/(2-n-i):c/(n+i),n){case a:r=((t-e)/c+(t<e?6:0))/6;break;case t:r=((e-a)/c+2)/6;break;case e:r=((a-t)/c+4)/6;break}}return{h:r*360,s:s*100,l:o*100}}function $(a,t,e){a/=360,t/=100,e/=100;let n,i,r;if(t===0)n=i=r=e;else{const s=(p,u,l)=>(l<0&&(l+=1),l>1&&(l-=1),l<.16666666666666666?p+(u-p)*6*l:l<.5?u:l<.6666666666666666?p+(u-p)*(.6666666666666666-l)*6:p),o=e<.5?e*(1+t):e+t-e*t,c=2*e-o;n=s(c,o,a+1/3),i=s(c,o,a),r=s(c,o,a-1/3)}return{r:Math.round(n*255),g:Math.round(i*255),b:Math.round(r*255)}}function ce(a){const t=le(a);if(!t)return null;const e=G(t.r,t.g,t.b),n=$(e.h,e.s,Math.max(e.l-15,10)),i=$(e.h,Math.max(e.s-10,30),Math.min(e.l+20,85)),r=$(e.h,e.s,Math.max(e.l-25,5));return{accent:`${t.r}, ${t.g}, ${t.b}`,accent2:`${n.r}, ${n.g}, ${n.b}`,accentSoft:`${i.r}, ${i.g}, ${i.b}`,accentDeep:`${r.r}, ${r.g}, ${r.b}`,hexColor:`#${t.r.toString(16).padStart(2,"0")}${t.g.toString(16).padStart(2,"0")}${t.b.toString(16).padStart(2,"0")}`}}function K(a,t,e){a.textContent=t,a.classList.add("is-copied"),setTimeout(()=>{a.classList.remove("is-copied"),a.textContent=e},1200)}function de(a,t,e){if(!a)return null;const n=document.createElement("div");n.className="modal-params-panel";const i=document.createElement("div");i.className="modal-editor-label",i.textContent="⚙️ 参数调整";const r=document.createElement("div");return r.className="params-container",Object.entries(a).forEach(([s,o])=>{const c=document.createElement("div");c.className="param-row";const p=document.createElement("label");if(p.className="param-label",p.textContent=o.label,t[s]=o.default,o.type==="range"){const u=document.createElement("div");u.className="param-range-wrapper";const l=document.createElement("input");l.type="range",l.className="param-range",l.min=o.min,l.max=o.max,l.step=o.step,l.value=o.default;const d=document.createElement("span");d.className="param-value",d.textContent=`${o.default}${o.unit}`,l.addEventListener("input",m=>{const x=Number.parseFloat(m.target.value);t[s]=x,d.textContent=`${x}${o.unit}`,e()}),u.append(l,d),c.append(p,u)}if(o.type==="select"){const u=document.createElement("select");u.className="param-select",o.options.forEach(l=>{const d=document.createElement("option");d.value=l,d.textContent=l==="cubic-bezier(0.68, -0.55, 0.27, 1.55)"?"bounce":l,l===o.default&&(d.selected=!0),u.append(d)}),u.addEventListener("change",l=>{t[s]=l.target.value,e()}),c.append(p,u)}r.append(c)}),n.append(i,r),n}function pe({title:a,demoHtml:t,fullCss:e,currentParams:n,previousActiveElement:i,onTrackCopy:r}){const s=document.createElement("div");s.className="code-modal",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true");const o=document.createElement("div");o.className="modal-content";const c=document.createElement("div");c.className="modal-header";const p=document.createElement("h3");p.className="modal-title",p.id=`modal-title-${Date.now()}`,p.textContent=`${a} - 代码实验室`,s.setAttribute("aria-labelledby",p.id);const u=document.createElement("div");u.className="modal-actions";const l=document.createElement("button");l.className="modal-btn",l.type="button",l.textContent="复制全部";const d=document.createElement("button");d.className="modal-btn",d.type="button",d.textContent="重置";const m=document.createElement("button");m.className="modal-btn modal-close",m.type="button",m.textContent="✕ 关闭",u.append(l,d,m),c.append(p,u);const x=document.createElement("div");x.className="modal-editor-container";const v=document.createElement("div");v.className="modal-code-panel";const w=document.createElement("div");w.className="modal-editor-label",w.textContent="📄 HTML 结构";const h=document.createElement("textarea");h.className="modal-code-editor html-editor",h.value=t,h.spellcheck=!1,v.append(w,h);const k=document.createElement("div");k.className="modal-code-panel css-panel";const F=document.createElement("div");F.className="modal-editor-label",F.textContent="🎨 CSS 样式";const y=document.createElement("textarea");y.className="modal-code-editor css-editor",y.value=q(e),y.spellcheck=!1,k.append(F,y);const P=document.createElement("div");P.className="modal-preview-panel";const O=document.createElement("div");O.className="modal-editor-label",O.textContent="👁️ 实时预览";const A=document.createElement("div");A.className="modal-preview-box";const Q=A.attachShadow({mode:"open"}),N=document.createElement("style");N.textContent=y.value;const M=document.createElement("div");M.innerHTML=t,M.style.cssText="display:flex;align-items:center;justify-content:center;width:100%;height:100%;",Q.append(N,M),P.append(O,A);const T={},R=()=>{M.innerHTML=h.value,N.textContent=y.value},z=de(n,T,()=>{if(!n)return;let g=q(e);Object.entries(n).forEach(([f,b])=>{const E=T[f],S=b.target;if(b.type==="range"){const L=new RegExp(`(${S}\\s+)(\\d+\\.?\\d*)(s)`,"g");g=g.replace(L,(C,D,Ce,te)=>`${D}${E}${te}`)}if(b.type==="select"&&f==="timing"){const L=new RegExp(`(${S}\\s+\\d+\\.?\\d*s\\s+)(linear|ease(?:-in)?(?:-out)?|ease-in-out|cubic-bezier\\([^)]+\\))`,"g");g=g.replace(L,(C,D)=>`${D}${E}`)}}),y.value=g,N.textContent=g}),B=document.createElement("div");B.className="modal-left-column",z?B.append(P,z,v):B.append(P,v),x.append(B,k),o.append(c,x),s.append(o);const j=()=>{s.classList.remove("is-open"),document.removeEventListener("keydown",H),document.removeEventListener("keydown",Y),setTimeout(()=>{s.remove(),i&&i.focus()},300)},H=g=>{g.key==="Escape"&&j()},ee=()=>s.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),Y=g=>{if(g.key!=="Tab")return;const f=ee(),b=f[0],E=f[f.length-1];g.shiftKey&&document.activeElement===b?(g.preventDefault(),E.focus()):!g.shiftKey&&document.activeElement===E&&(g.preventDefault(),b.focus())};return h.addEventListener("input",R),y.addEventListener("input",()=>{N.textContent=y.value}),l.addEventListener("click",async()=>{try{typeof r=="function"&&r(a);const g=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${a} - CSS Animation</title>
  <style>
${y.value.split(`
`).map(f=>`    ${f}`).join(`
`)}
  </style>
</head>
<body>
${h.value.split(`
`).map(f=>`  ${f}`).join(`
`)}
</body>
</html>`;await se(g),K(l,"✓ 已复制","复制全部")}catch{l.textContent="复制失败"}}),d.addEventListener("click",()=>{h.value=t,y.value=q(e),n&&z&&(Object.entries(n).forEach(([f,b])=>{T[f]=b.default}),z.querySelectorAll("input, select").forEach(f=>{var L;const b=f.closest(".param-row"),E=(L=b==null?void 0:b.querySelector(".param-label"))==null?void 0:L.textContent,S=Object.values(n).find(C=>C.label===E);if(S&&(f.value=S.default,f.type==="range")){const C=b.querySelector(".param-value");C&&(C.textContent=`${S.default}${S.unit}`)}})),R(),K(d,"✓ 已重置","重置")}),m.addEventListener("click",j),s.addEventListener("click",g=>{g.target===s&&j()}),document.addEventListener("keydown",H),document.addEventListener("keydown",Y),s}function ue(a,t){const e=V[a],i=(ne[a]||[]).map(r=>t.get(r)).filter(Boolean).join(`

`);return i?`${e}

${i}`:`${e}

/* 此效果主要依赖 transition/transform，无额外 keyframes */`}function ge(a){const t=re();a.forEach(e=>{var x,v;if(e.querySelector(".card-inner"))return;const n=(v=(x=e.querySelector("h2"))==null?void 0:x.textContent)==null?void 0:v.trim();if(!n||!V[n])return;const i=[...e.childNodes],r=oe(i),s=ue(n,t),o=document.createElement("div");o.className="card-inner";const c=document.createElement("div");c.className="card-face card-front",i.forEach(w=>{c.append(w)});const p=e.dataset.category||"loading",u=_[p]||_.loading,l=document.createElement("div");l.className="meta-row";const d=document.createElement("span");d.className="meta-badge",d.textContent=`场景: ${u.scenario}`,l.append(d);const m=document.createElement("button");m.className="snippet-toggle",m.type="button",m.textContent="代码实验室",m.addEventListener("click",()=>{const w=document.activeElement,h=pe({title:n,demoHtml:r,fullCss:s,currentParams:ae[n],previousActiveElement:w,onTrackCopy:k=>{typeof _hmt<"u"&&_hmt.push(["_trackEvent","动画复制","copy",k])}});document.body.append(h),requestAnimationFrame(()=>{h.classList.add("is-open");const k=h.querySelector("button");k&&k.focus()})}),c.append(l,m),e.replaceChildren(o),o.append(c)})}const me={loading:"加载反馈",motion:"运动效果",interactive:"交互按钮",transform:"3D 变换",text:"文字特效",background:"背景氛围",wave:"声波条纹"};function fe(a,t,e){return function(){const i=e.keyword.trim().toLowerCase();a.forEach(r=>{var m,x,v,w,h;const s=r.dataset.category,o=((x=(m=r.querySelector("h2"))==null?void 0:m.textContent)==null?void 0:x.toLowerCase())||"",c=((w=(v=r.querySelector(".card-tag"))==null?void 0:v.textContent)==null?void 0:w.toLowerCase())||"",p=((h=me[s])==null?void 0:h.toLowerCase())||"",u=e.filter==="all"||s===e.filter,l=!i||o.includes(i)||c.includes(i)||p.includes(i),d=u&&l;r.hidden=!d,r.setAttribute("aria-hidden",String(!d))}),t.forEach(r=>{const s=r.dataset.filter===e.filter;r.classList.toggle("is-active",s),r.setAttribute("aria-pressed",String(s))})}}function he({filterButtons:a,searchInput:t,viewState:e,renderCards:n}){a.forEach(i=>{i.addEventListener("click",()=>{e.filter=i.dataset.filter||"all",n()})}),t&&t.addEventListener("input",i=>{e.keyword=i.target.value||"",n()})}function be({motionToggle:a,metaToggle:t}){a&&a.addEventListener("click",()=>{const e=document.body.classList.toggle("reduced-preview");a.setAttribute("aria-pressed",String(e)),a.textContent=e?"开启":"关闭"}),t&&t.addEventListener("click",()=>{const e=document.body.classList.toggle("show-meta");t.setAttribute("aria-pressed",String(e)),t.textContent=e?"开启":"关闭"})}function U(a,t){var o;const e=ce(a);if(!e)return null;document.documentElement.removeAttribute("data-theme"),document.documentElement.style.setProperty("--accent",e.hexColor),document.documentElement.style.setProperty("--accent-rgb",e.accent),document.documentElement.style.setProperty("--accent-2-rgb",e.accent2),document.documentElement.style.setProperty("--accent-soft-rgb",e.accentSoft),document.documentElement.style.setProperty("--accent-deep-rgb",e.accentDeep);const n=G(...e.accent.split(", ").map(Number)),i=$(n.h,n.s,Math.max(n.l-15,10)),r=$(n.h,Math.max(n.s-10,30),Math.min(n.l+20,85)),s=$(n.h,n.s,Math.max(n.l-25,5));return document.documentElement.style.setProperty("--accent-2",`rgb(${i.r}, ${i.g}, ${i.b})`),document.documentElement.style.setProperty("--accent-soft",`rgb(${r.r}, ${r.g}, ${r.b})`),document.documentElement.style.setProperty("--accent-deep",`rgb(${s.r}, ${s.g}, ${s.b})`),t.themeButtons.forEach(c=>{c.classList.remove("is-active")}),(o=t.customColorWrapper)==null||o.classList.add("is-active"),e.hexColor}function xe({themeButtons:a,customColorInput:t,customColorWrapper:e,colorTextInput:n}){const i=()=>{["--accent","--accent-rgb","--accent-2","--accent-2-rgb","--accent-soft","--accent-soft-rgb","--accent-deep","--accent-deep-rgb"].forEach(s=>{document.documentElement.style.removeProperty(s)})};a.forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.theme;document.documentElement.setAttribute("data-theme",s),i(),a.forEach(o=>{o.classList.toggle("is-active",o===r)}),e==null||e.classList.remove("is-active"),n&&(n.value="",n.classList.remove("error"))})}),t&&t.addEventListener("input",r=>{const s=U(r.target.value,{themeButtons:a,customColorWrapper:e});s&&n&&(n.value=s,n.classList.remove("error"))}),n&&(n.addEventListener("input",r=>{const s=r.target.value.trim();if(!s)return;const o=U(s,{themeButtons:a,customColorWrapper:e});o?(n.classList.remove("error"),t&&(t.value=o)):n.classList.add("error")}),n.addEventListener("keypress",r=>{r.key==="Enter"&&r.target.blur()}))}function ye(a){a.forEach(t=>{let e=!1;t.addEventListener("click",()=>{e=!e,e?(t.classList.add("liked","animating"),setTimeout(()=>{t.classList.remove("animating")},600)):(t.classList.add("unliking"),setTimeout(()=>{t.classList.remove("liked","unliking")},300))})})}const W=document.querySelectorAll(".filter-btn"),Z=document.querySelectorAll(".card[data-category]"),ve=document.querySelector("#searchInput"),we=document.querySelector("#motionToggle"),ke=document.querySelector("#metaToggle"),Ee=document.querySelectorAll(".theme-btn"),Se=document.querySelectorAll(".like-btn"),X={filter:"all",keyword:""},J=fe(Z,W,X);he({filterButtons:W,searchInput:ve,viewState:X,renderCards:J});be({motionToggle:we,metaToggle:ke});xe({themeButtons:Ee,customColorInput:document.querySelector("#customColor"),customColorWrapper:document.querySelector(".custom-color-wrapper"),colorTextInput:document.querySelector("#colorTextInput")});ye(Se);ge(Z);J();document.body.classList.add("show-meta");
