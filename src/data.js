export const categoryInsights = {
  interactive: {
    scenario: [
      "按钮反馈 / 主行动作",
      "悬停引导 / 操作提示",
      "点击确认 / 状态响应",
      "控件聚焦 / 交互强调",
      "轻量动效 / 降低操作阻力",
    ],
    token: "motion.interactive",
  },
  loading: {
    scenario: [
      "异步请求 / 等待反馈",
      "首屏加载 / 空态占位",
      "数据拉取 / 进度提示",
      "内容刷新 / 更新状态",
      "流程处理中 / 系统忙碌",
    ],
    token: "motion.loading",
  },
  empty: {
    scenario: [
      "搜索无结果 / 结果为空",
      "筛选过严 / 建议调整",
      "内容缺省 / 引导操作",
      "初次进入 / 说明路径",
      "权限不足 / 解释原因",
    ],
    token: "motion.empty",
  },
  motion: {
    scenario: [
      "状态变化 / 关键强调",
      "数据高亮 / 注意力引导",
      "结果反馈 / 成功提示",
      "页面转折 / 信息强调",
      "节奏变化 / 动态吸睛",
    ],
    token: "motion.emphasis",
  },
  text: {
    scenario: [
      "品牌标题 / 视觉记忆",
      "信息强调 / 关键词突出",
      "文案轮播 / 重点呈现",
      "标题入场 / 阅读引导",
      "数据文案 / 数值强调",
    ],
    token: "motion.typography",
  },
  background: {
    scenario: [
      "页面氛围 / 空状态",
      "背景动态 / 情绪营造",
      "大块区域 / 视觉呼吸",
      "封面展示 / 品牌感",
      "轻动背景 / 不抢焦点",
    ],
    token: "motion.background",
  },
  wave: {
    scenario: [
      "音频可视化 / 声波反馈",
      "节奏律动 / 音乐氛围",
      "波形提示 / 语音状态",
      "均衡器效果 / 频段表现",
      "节拍反馈 / 动态装饰",
    ],
    token: "motion.wave",
  },
  bigdata: {
    scenario: [
      "数据大屏 / 实时监控",
      "指标看板 / 走势展示",
      "运行态势 / 稳定提示",
      "异常告警 / 风险提示",
      "数据流转 / 系统脉搏",
    ],
    token: "motion.bigdata",
  },
};


// 动画参数配置（支持实时调整）
export const animationParams = {
  // ========== 交互按钮类 ==========
  边框流光: {
    duration: { label: "流转时长", type: "range", min: 1, max: 8, step: 0.5, default: 3, unit: "s", target: "borderRotate" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "borderRotate" },
  },
  霓虹流光: {
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
  按钮按压: {
    duration: { label: "按压时长", type: "range", min: 0.15, max: 0.8, step: 0.05, default: 0.35, unit: "s", target: "pressPulse" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-out", target: "pressPulse" },
  },
  点赞心跳: {
    duration: { label: "心跳时长", type: "range", min: 0.3, max: 1.5, step: 0.1, default: 0.6, unit: "s", target: "likeHeart" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "likeHeart" },
  },
  开关切换: {
    duration: { label: "切换时长", type: "range", min: 0.1, max: 0.8, step: 0.05, default: 0.3, unit: "s", target: "all" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "all" },
  },

  按钮加载中: {
    duration: { label: "旋转时长", type: "range", min: 0.4, max: 2, step: 0.1, default: 0.8, unit: "s", target: "buttonSpinner" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "buttonSpinner" },
  },

  摇晃铃铛: {
    duration: { label: "摇晃时长", type: "range", min: 1, max: 5, step: 0.5, default: 2.5, unit: "s", target: "bellShake" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "bellShake" },
  },
  悬浮光晕卡: {
    duration: { label: "卡片过渡时长", type: "range", min: 0.1, max: 1, step: 0.05, default: 0.3, unit: "s", target: "transform" },
    glowDuration: { label: "光晕过渡时长", type: "range", min: 0.2, max: 1.5, step: 0.05, default: 0.6, unit: "s", target: "opacity" },
  },
  动态复选框: {
    duration: { label: "勾绘制时长", type: "range", min: 0.1, max: 1, step: 0.05, default: 0.4, unit: "s", target: "stroke-dashoffset" },
    colorDuration: { label: "颜色变化时长", type: "range", min: 0.1, max: 1, step: 0.05, default: 0.3, unit: "s", target: "fill" },
  },
  悬浮输入框: {
    duration: { label: "浮动时长", type: "range", min: 0.1, max: 1, step: 0.05, default: 0.3, unit: "s", target: "all" },
  },
  详细信息折叠: {
    duration: { label: "展开时长", type: "range", min: 0.1, max: 2, step: 0.1, default: 0.4, unit: "s", target: "slideDown" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-out", target: "slideDown" },
  },
  头像波纹: {
    duration: { label: "波纹周期", type: "range", min: 1, max: 5, step: 0.5, default: 2.5, unit: "s", target: "pulseRipple" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.42, 0, 0.58, 1)"], default: "cubic-bezier(0.42, 0, 0.58, 1)", target: "pulseRipple" },
  },
  霓虹闪烁字: {
    duration: { label: "闪烁周期", type: "range", min: 1, max: 8, step: 0.5, default: 3, unit: "s", target: "neonFlicker" },
    timing: { label: "缓动方式", type: "select", options: ["step-start", "step-end", "linear"], default: "step-start", target: "neonFlicker" },
  },
  呼吸光晕: {
    duration: { label: "呼吸周期", type: "range", min: 1, max: 6, step: 0.5, default: 4.5, unit: "s", target: "breathGlow" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "breathGlow" },
  },


  下划线滑入: {
    duration: { label: "滑入时长", type: "range", min: 0.1, max: 1, step: 0.05, default: 0.25, unit: "s", target: "transform" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease", target: "transform" },
  },
  磁吸悬停: {
    duration: { label: "悬浮时长", type: "range", min: 0.1, max: 1, step: 0.05, default: 0.25, unit: "s", target: "transform" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "transform" },
  },
  轨道卫星: {
    duration: { label: "公转周期", type: "range", min: 1, max: 8, step: 0.5, default: 3, unit: "s", target: "orbitSpin" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease-in", "ease-out"], default: "linear", target: "orbitSpin" },
  },

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
  骨架屏闪光: {
    duration: { label: "闪光时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.3, unit: "s", target: "shimmer" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "shimmer" },
  },
  菊花旋转: {
    duration: { label: "旋转时长", type: "range", min: 0.4, max: 2, step: 0.1, default: 1, unit: "s", target: "spinnerRotate" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "spinnerRotate" },
  },
  弹力圆点: {
    duration: { label: "弹跳时长", type: "range", min: 0.5, max: 2, step: 0.1, default: 1.1, unit: "s", target: "elasticDot" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "elasticDot" },
  },
  列表骨架: {
    duration: { label: "扫光时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.5, unit: "s", target: "skelShimmer" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "skelShimmer" },
  },
  进度条流动: {
    duration: { label: "流动时长", type: "range", min: 0.8, max: 4, step: 0.1, default: 1.6, unit: "s", target: "progressSlide" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "progressSlide" },
  },

  // ========== 空结果类 ==========
  搜索无果: {
    duration: { label: "摇摆时长", type: "range", min: 1.5, max: 6, step: 0.3, default: 3.6, unit: "s", target: "searchShake" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "searchShake" },
  },
  空档案夹: {
    duration: { label: "漂浮时长", type: "range", min: 1.5, max: 6, step: 0.3, default: 3, unit: "s", target: "paperFloat" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "paperFloat" },
  },
  "No Data 幽灵": {
    duration: { label: "漂浮时长", type: "range", min: 1.5, max: 6, step: 0.3, default: 3, unit: "s", target: "ghostFloat" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "ghostFloat" },
  },

  // ========== 运动效果类 ==========
  弹跳小球: {
    duration: { label: "弹跳时长", type: "range", min: 0.5, max: 3, step: 0.1, default: 1.2, unit: "s", target: "bounce" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.68, -0.55, 0.27, 1.55)"], default: "cubic-bezier(0.42, 0, 0.58, 1)", target: "bounce" },
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
  悬浮卡片: {
    duration: { label: "漂浮时长", type: "range", min: 1, max: 6, step: 0.2, default: 3, unit: "s", target: "cardFloat" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "cardFloat" },
  },
  弹性入场: {
    duration: { label: "弹入时长", type: "range", min: 1, max: 5, step: 0.2, default: 2.5, unit: "s", target: "springIn" },
  },

  // ========== 文字特效类 ==========
  词语轮播: {
    duration: { label: "轮播时长", type: "range", min: 1.5, max: 6, step: 0.3, default: 3.6, unit: "s", target: "wordSlideIn" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "wordSlideIn" },
  },
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
  文字揭幕: {
    duration: { label: "揭幕时长", type: "range", min: 1.5, max: 6, step: 0.2, default: 3.5, unit: "s", target: "textReveal" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "textReveal" },
  },
  数字增长: {
    duration: { label: "计数时长", type: "range", min: 1, max: 6, step: 0.2, default: 3, unit: "s", target: "countUp" },
  },
  高亮扫光: {
    duration: { label: "扫光时长", type: "range", min: 1, max: 6, step: 0.2, default: 2.8, unit: "s", target: "highlightSweep" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "highlightSweep" },
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
  墨迹呼吸: {
    duration: { label: "变形时长", type: "range", min: 2, max: 10, step: 0.5, default: 5, unit: "s", target: "blobMorph" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "blobMorph" },
  },
  流星雨: {
    duration: { label: "下落时长", type: "range", min: 0.8, max: 4, step: 0.2, default: 1.8, unit: "s", target: "meteorFall" },
  },
  粒子流动: {
    duration: { label: "漂浮时长", type: "range", min: 2, max: 12, step: 0.5, default: 6, unit: "s", target: "particleFloat" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "particleFloat" },
  },
  海浪起伏: {
    duration: { label: "波浪时长", type: "range", min: 1, max: 8, step: 0.5, default: 4, unit: "s", target: "waveMove(?:Left|Right)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "waveMove(?:Left|Right)" },
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

  // ========== 大数据类 ==========
  柱状图生长: {
    duration: { label: "生长时长", type: "range", min: 1, max: 5, step: 0.2, default: 2, unit: "s", target: "barGrow" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "barGrow" },
  },
  环形占比: {
    duration: { label: "填充时长", type: "range", min: 1, max: 5, step: 0.2, default: 2, unit: "s", target: "donutGrow" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "donutGrow" },
  },
  数据表骨架: {
    duration: { label: "扫光时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.5, unit: "s", target: "skelShimmer" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "skelShimmer" },
  },
  指标趋势折线: {
    duration: { label: "绘制时长", type: "range", min: 1, max: 5, step: 0.2, default: 2.5, unit: "s", target: "trendDraw" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "trendDraw" },
  },

  // ========== 新增实用动画 ==========
  角标跳动: {
    duration: { label: "弹跳时长", type: "range", min: 0.5, max: 4, step: 0.1, default: 2, unit: "s", target: "badgeBounce" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "badgeBounce" },
  },
  标签页指示器: {
    duration: { label: "滑动时长", type: "range", min: 1, max: 6, step: 0.5, default: 3, unit: "s", target: "tabSlide" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "tabSlide" },
  },
  消息气泡弹入: {
    duration: { label: "弹入时长", type: "range", min: 1, max: 5, step: 0.5, default: 2.5, unit: "s", target: "bubblePop" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.175, 0.885, 0.32, 1.275)"], default: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", target: "bubblePop" },
  },
  渐入上移: {
    duration: { label: "入场时长", type: "range", min: 1, max: 5, step: 0.5, default: 2.5, unit: "s", target: "fadeInUp" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-out", target: "fadeInUp" },
  },
  涟漪扩散: {
    duration: { label: "扩散时长", type: "range", min: 1, max: 5, step: 0.2, default: 2.4, unit: "s", target: "rippleOut" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-out", target: "rippleOut" },
  },
};

export const animationNamesByTitle = {
  加载脉冲: ["spin", "pulse"],
  跳动圆点: ["dotsBounce"],
  频谱条形: ["barsScale"],
  骨架屏闪光: ["shimmer"],
  进度条流动: ["progressSlide"],
  搜索无果: ["searchShake", "searchCrossPulse"],
  空档案夹: ["paperFloat"],
  "No Data 幽灵": ["ghostFloat", "ghostShadow", "ghostBlink"],
  弹跳小球: ["bounce", "shadow"],

  漂浮气泡: ["floatUp"],
  波浪位移: ["waveMove"],
  心跳脉冲: ["heartbeat"],
  边框流光: ["borderRotate"],
  霓虹流光: ["gradientShift", "glowPulse"],
  下划线滑入: [],
  呼吸图标: ["dotBreath"],
  波纹点击: ["rippleWave"],
  按钮按压: ["pressPulse"],
  磁吸悬停: [],
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

  信号波纹: ["rippleExpand"],
  能量脉冲条: ["energyPulse"],
  数据波形: ["waveformBounce"],
  点赞心跳: ["likeHeart"],
  开关切换: [],

  按钮加载中: ["buttonSpinner"],

  摇晃铃铛: ["bellShake"],
  悬浮光晕卡: [],
  动态复选框: [],
  悬浮输入框: [],
  详细信息折叠: ["slideDown"],
  头像波纹: ["pulseRipple"],
  霓虹闪烁字: ["neonFlicker"],

  粒子流动: ["particleFloat"],
  海浪起伏: ["waveMoveLeft", "waveMoveRight"],
  轨道卫星: ["orbitSpin"],

  词语轮播: ["wordSlideIn"],
  菊花旋转: ["spinnerRotate"],
  弹力圆点: ["elasticDot"],
  列表骨架: ["skelShimmer"],
  悬浮卡片: ["cardFloat", "cardShadow"],
  墨迹呼吸: ["blobMorph"],
  呼吸光晕: ["breathGlow"],
  弹性入场: ["springIn"],
  文字揭幕: ["textReveal"],
  高亮扫光: ["highlightSweep"],
  数字增长: ["countUp"],
  流星雨: ["meteorFall"],
  柱状图生长: ["barGrow"],
  环形占比: ["donutGrow"],
  数据表骨架: ["skelShimmer"],
  指标趋势折线: ["trendDraw"],

  标签页指示器: ["tabSlide"],
  消息气泡弹入: ["bubblePop"],
  渐入上移: ["fadeInUp"],
  涟漪扩散: ["rippleOut", "rippleCorePulse"],
  角标跳动: ["badgeBounce"],
};
