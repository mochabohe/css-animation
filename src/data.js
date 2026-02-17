export const categoryInsights = {
  loading: { scenario: "异步请求 / 首屏加载", token: "motion.loading" },
  motion: { scenario: "状态变化 / 数据强调", token: "motion.emphasis" },
  interactive: { scenario: "按钮反馈 / 引导操作", token: "motion.interactive" },
  transform: { scenario: "空间过渡 / 卡片转场", token: "motion.transform" },
  text: { scenario: "品牌标题 / 信息强调", token: "motion.typography" },
  background: { scenario: "页面氛围 / 空状态", token: "motion.background" },
  wave: { scenario: "音频可视化 / 声波反馈", token: "motion.wave" },
};

// 动画参数配置（支持实时调整）
export const animationParams = {
  // ========== 加载反馈类 ==========
  加载脉冲: {
    duration: { label: "旋转时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1, unit: "s", target: "spin" },
    pulseDuration: { label: "脉冲时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.4, unit: "s", target: "pulse" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "spin" },
  },
  跳动圆点: {
    duration: { label: "跳动时长", type: "range", min: 0.5, max: 2, step: 0.1, default: 0.9, unit: "s", target: "dotsBounce" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "dotsBounce" },
  },
  频谱条形: {
    duration: { label: "律动时长", type: "range", min: 0.5, max: 2, step: 0.1, default: 1, unit: "s", target: "barsScale" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "barsScale" },
  },
  双环旋转: {
    duration: { label: "外环时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.1, unit: "s", target: "spin" },
    innerDuration: { label: "内环时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 0.9, unit: "s", target: "spinReverse" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "spin" },
  },
  骨架屏闪光: {
    duration: { label: "闪光时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.3, unit: "s", target: "shimmer" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "shimmer" },
  },
  进度滑条: {
    duration: { label: "循环时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.5, unit: "s", target: "progressLoop" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "progressLoop" },
  },

  // ========== 运动效果类 ==========
  弹跳小球: {
    duration: { label: "弹跳时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.2, unit: "s", target: "bounce" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.68, -0.55, 0.27, 1.55)"], default: "cubic-bezier(0.42, 0, 0.58, 1)", target: "bounce" },
  },
  摆动钟锤: {
    duration: { label: "摆动时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.2, unit: "s", target: "pendulum" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "pendulum" },
  },
  漂浮气泡: {
    duration: { label: "漂浮时长", type: "range", min: 1, max: 5, step: 0.1, default: 2.3, unit: "s", target: "floatUp" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "floatUp" },
  },
  波浪位移: {
    duration: { label: "波浪时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.3, unit: "s", target: "waveMove" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "waveMove" },
  },
  心跳脉冲: {
    duration: { label: "心跳时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.2, unit: "s", target: "heartbeat" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "heartbeat" },
  },

  // ========== 交互按钮类 ==========
  渐变流动: {
    duration: { label: "流动时长", type: "range", min: 2, max: 10, step: 0.5, default: 5, unit: "s", target: "gradientShift" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "gradientShift" },
  },
  霓虹发光: {
    gradientDuration: { label: "流动时长", type: "range", min: 2, max: 10, step: 0.5, default: 5, unit: "s", target: "gradientShift" },
    glowDuration: { label: "发光时长", type: "range", min: 1, max: 5, step: 0.1, default: 1.7, unit: "s", target: "glowPulse" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "glowPulse" },
  },
  呼吸图标: {
    duration: { label: "呼吸时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.4, unit: "s", target: "dotBreath" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "dotBreath" },
  },
  波纹点击: {
    duration: { label: "波纹时长", type: "range", min: 0.5, max: 2, step: 0.1, default: 0.9, unit: "s", target: "rippleWave" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-out", target: "rippleWave" },
  },
  点赞心跳: {
    duration: { label: "心跳时长", type: "range", min: 0.3, max: 1.5, step: 0.1, default: 0.6, unit: "s", target: "likeHeart" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "likeHeart" },
  },
  开关切换: {
    duration: { label: "切换时长", type: "range", min: 0.1, max: 0.8, step: 0.05, default: 0.3, unit: "s", target: "transition" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "transition" },
  },
  淡入淡出: {
    duration: { label: "动画时长", type: "range", min: 1, max: 6, step: 0.5, default: 3, unit: "s", target: "fadeInOut" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "fadeInOut" },
  },
  消息滑入: {
    duration: { label: "滑入时长", type: "range", min: 1, max: 6, step: 0.5, default: 3, unit: "s", target: "toastSlide" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "toastSlide" },
  },
  按钮加载中: {
    duration: { label: "旋转时长", type: "range", min: 0.4, max: 2, step: 0.1, default: 0.8, unit: "s", target: "buttonSpinner" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "buttonSpinner" },
  },

  // ========== 3D 变换类 ==========
  翻转卡片: {
    duration: { label: "翻转时长", type: "range", min: 1, max: 6, step: 0.2, default: 3.2, unit: "s", target: "flip" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "flip" },
  },
  旋转立方体: {
    duration: { label: "旋转时长", type: "range", min: 2, max: 8, step: 0.5, default: 4, unit: "s", target: "cubeSpin" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "cubeSpin" },
  },
  倾斜面板: {
    duration: { label: "倾斜时长", type: "range", min: 1, max: 5, step: 0.2, default: 2.8, unit: "s", target: "tiltLoop" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "tiltLoop" },
  },
  折页翻开: {
    duration: { label: "翻开时长", type: "range", min: 1, max: 5, step: 0.2, default: 2.2, unit: "s", target: "foldOpen" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "foldOpen" },
  },

  // ========== 文字特效类 ==========
  故障闪烁: {
    duration: { label: "闪烁时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.4, unit: "s", target: "glitchSkew" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "steps(2, end)", "steps(3, end)", "steps(4, end)"], default: "steps(2, end)", target: "glitchSkew" },
  },
  打字机: {
    typingDuration: { label: "打字时长", type: "range", min: 1, max: 6, step: 0.2, default: 3.2, unit: "s", target: "typing" },
    caretDuration: { label: "光标闪烁", type: "range", min: 0.5, max: 2, step: 0.1, default: 0.9, unit: "s", target: "caret" },
  },
  波浪字符: {
    duration: { label: "波浪时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.1, unit: "s", target: "waveLetter" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "waveLetter" },
  },
  渐变流光字: {
    duration: { label: "流光时长", type: "range", min: 1, max: 6, step: 0.2, default: 2.8, unit: "s", target: "textShine" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "textShine" },
  },

  // ========== 背景氛围类 ==========
  极光流动: {
    duration: { label: "流动时长", type: "range", min: 3, max: 12, step: 0.5, default: 6, unit: "s", target: "auroraFlow" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "auroraFlow" },
  },
  星点闪烁: {
    duration: { label: "闪烁时长", type: "range", min: 1, max: 4, step: 0.2, default: 1.8, unit: "s", target: "twinkle" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "twinkle" },
  },
  雷达扫描: {
    duration: { label: "扫描时长", type: "range", min: 1, max: 5, step: 0.5, default: 2, unit: "s", target: "spin" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "spin" },
  },
  网格扫光: {
    duration: { label: "扫光时长", type: "range", min: 1, max: 6, step: 0.2, default: 2.8, unit: "s", target: "scanLine" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "scanLine" },
  },

  // ========== AI 数据可视化类 ==========
  逐字加载: {
    duration: { label: "动画时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.1, unit: "s", target: "tokenFlow" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "tokenFlow" },
  },
  向量检索命中: {
    radarDuration: { label: "雷达时长", type: "range", min: 1, max: 6, step: 0.2, default: 3.2, unit: "s", target: "radarSpin" },
    pulseDuration: { label: "脉冲时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.6, unit: "s", target: "hitPulse" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "hitPulse" },
  },
  数据管道吞吐: {
    duration: { label: "流动时长", type: "range", min: 0.8, max: 4, step: 0.2, default: 1.8, unit: "s", target: "pipeFlow" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "pipeFlow" },
  },
  模型置信度分布: {
    duration: { label: "上升时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.3, unit: "s", target: "confidenceRise" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "confidenceRise" },
  },
  异常告警脉冲: {
    duration: { label: "脉冲时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.4, unit: "s", target: "anomalyPulse" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "anomalyPulse" },
  },
  集群健康热力: {
    duration: { label: "闪烁时长", type: "range", min: 1, max: 4, step: 0.2, default: 1.8, unit: "s", target: "clusterBlink" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "clusterBlink" },
  },
  三点轨道: {
    duration: { label: "轨道时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.5, unit: "s", target: "dotOrbitStep" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "dotOrbitStep" },
  },
  镜面扫光: {
    duration: { label: "扫光时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1, unit: "s", target: "textShimmer" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "textShimmer" },
  },
  数据流线: {
    duration: { label: "流动时长", type: "range", min: 1, max: 5, step: 0.5, default: 2, unit: "s", target: "dataFlow" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "dataFlow" },
  },
  环形进度: {
    duration: { label: "进度时长", type: "range", min: 1, max: 5, step: 0.5, default: 2, unit: "s", target: "progressGrow" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "progressGrow" },
  },
  信号波纹: {
    duration: { label: "波纹时长", type: "range", min: 1, max: 5, step: 0.5, default: 2, unit: "s", target: "rippleExpand" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-out", target: "rippleExpand" },
  },
  能量脉冲条: {
    duration: { label: "脉冲时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.5, unit: "s", target: "energyPulse" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "energyPulse" },
  },
  数据波形: {
    duration: { label: "波动时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.2, unit: "s", target: "waveformBounce" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "waveformBounce" },
  },
};

export const animationNamesByTitle = {
  加载脉冲: ["spin", "pulse"],
  跳动圆点: ["dotsBounce"],
  频谱条形: ["barsScale"],
  双环旋转: ["spin", "spinReverse"],
  骨架屏闪光: ["shimmer"],
  进度滑条: ["progressLoop"],
  弹跳小球: ["bounce", "shadow"],
  摆动钟锤: ["pendulum"],
  漂浮气泡: ["floatUp"],
  波浪位移: ["waveMove"],
  心跳脉冲: ["heartbeat"],
  渐变流动: ["gradientShift"],
  霓虹发光: ["gradientShift", "glowPulse"],
  下划线滑入: [],
  呼吸图标: ["dotBreath"],
  波纹点击: ["rippleWave"],
  磁吸悬停: [],
  翻转卡片: ["flip"],
  旋转立方体: ["cubeSpin"],
  倾斜面板: ["tiltLoop"],
  折页翻开: ["foldOpen"],
  故障闪烁: ["glitchSkew"],
  打字机: ["typing", "caret"],
  波浪字符: ["waveLetter"],
  渐变流光字: ["textShine"],
  极光流动: ["auroraFlow"],
  星点闪烁: ["twinkle"],
  雷达扫描: ["spin"],
  网格扫光: ["scanLine"],
  逐字加载: ["tokenFlow"],
  向量检索命中: ["radarSpin", "hitPulse"],
  数据管道吞吐: ["pipeFlow"],
  模型置信度分布: ["confidenceRise"],
  异常告警脉冲: ["anomalyPulse"],
  集群健康热力: ["clusterBlink"],
  三点轨道: ["dotOrbitStep"],
  镜面扫光: ["textShimmer"],
  数据流线: ["dataFlow"],
  环形进度: ["progressGrow"],
  信号波纹: ["rippleExpand"],
  能量脉冲条: ["energyPulse"],
  数据波形: ["waveformBounce"],
  点赞心跳: ["likeHeart"],
  开关切换: [],
  淡入淡出: ["fadeInOut"],
  消息滑入: ["toastSlide"],
  按钮加载中: ["buttonSpinner"],
};
