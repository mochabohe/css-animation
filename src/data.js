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
      "进行中状态 / 通话中提示",
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

export const animationScenarioOverrides = {
  搜索无果: "搜索无结果 / 建议更换关键词",
  空档案夹: "内容为空 / 引导创建文件",
  "No Data 幽灵": "暂无数据 / 状态提示",
  "404 星球": "页面不存在 / 路径错误",
  迷失信号: "网络异常 / 连接失败",
  声波脉动: "进行中状态 / 通话中提示",
};

// 动画语义索引：用于 AI 智能搜索，将动画标题映射到语义标签
export const animationSemanticIndex = {
  // 加载反馈
  原始思维: ["玫瑰曲线", "loading", "等待", "流光", "数学", "拖尾", "旋转", "参数方程", "花瓣", "SVG", "算法艺术", "思考"],
  加载脉冲: ["旋转", "脉冲", "loading", "spinner", "异步请求", "等待反馈", "首屏加载"],
  跳动圆点: ["弹跳", "圆点", "loading", "等待", "数据拉取", "进度提示"],
  频谱条形: ["条形", "律动", "频谱", "loading", "音频", "均衡器"],
  骨架屏闪光: ["骨架屏", "闪光", "占位", "shimmer", "首屏加载", "内容刷新"],
  菊花旋转: ["旋转", "菊花", "loading", "spinner", "系统忙碌"],
  弹力圆点: ["弹跳", "弹性", "圆点", "loading", "等待"],
  列表骨架: ["骨架屏", "列表", "占位", "shimmer", "数据拉取"],
  进度条流动: ["进度条", "loading", "流动", "进度提示", "百分比"],
  沙漏等待: ["沙漏", "等待", "计时", "倒计时", "loading"],
  光锥环形加载: ["光锥", "环形", "loading", "扫描", "旋转", "等待反馈", "异步请求"],
  棱镜旋环加载: ["棱镜", "旋环", "loading", "环形", "流光", "等待反馈"],
  三点轨道: ["三点", "轨道", "loading", "等待", "圆形"],
  三角轮转点: ["三角", "轮转", "圆点", "loading", "等待反馈", "三点", "节奏"],
  // 交互按钮
  边框流光: ["边框", "流光", "按钮", "悬停", "interactive", "发光"],
  霓虹流光: ["霓虹", "发光", "按钮", "渐变", "悬停引导"],
  呼吸图标: ["呼吸", "图标", "脉冲", "按钮反馈"],
  波纹点击: ["波纹", "点击", "ripple", "按钮反馈", "状态响应"],
  按钮按压: ["按压", "按钮", "点击", "交互", "确认"],
  点赞心跳: ["点赞", "心跳", "喜欢", "收藏", "按钮反馈"],
  开关切换: ["开关", "切换", "toggle", "switch", "控件"],
  按钮加载中: ["按钮", "loading", "旋转", "提交", "等待"],
  摇晃铃铛: ["铃铛", "摇晃", "通知", "提醒", "振动"],
  悬浮光晕卡: ["悬浮", "光晕", "卡片", "hover", "悬停"],
  动态复选框: ["复选框", "勾选", "checkbox", "表单", "选中"],
  悬浮输入框: ["输入框", "浮动标签", "input", "表单", "聚焦"],
  详细信息折叠: ["折叠", "展开", "accordion", "详情", "收起"],
  头像波纹: ["头像", "波纹", "在线状态", "用户", "脉冲"],
  下划线滑入: ["下划线", "滑入", "悬停", "导航", "链接"],
  磁吸悬停: ["磁吸", "悬停", "跟随", "鼠标", "interactive"],
  汉堡菜单变形: ["汉堡菜单", "导航", "menu", "形变", "移动端", "交互"],
  液态玻璃卡片: ["玻璃", "毛玻璃", "glassmorphism", "液态", "透明", "折射", "卡片", "apple"],
  "液态玻璃按钮 2.0": ["液态玻璃", "按钮", "glass", "折射", "CTA", "交互"],
  果冻弹性按钮: ["果冻", "弹性", "jelly", "弹簧", "按钮", "Q弹", "形变"],
  全息投影卡片: ["全息", "投影", "holographic", "彩虹", "棱镜", "卡片", "闪光"],
  轨道卫星: ["轨道", "卫星", "旋转", "环绕", "装饰"],
  呼吸光晕: ["呼吸", "光晕", "脉冲", "发光", "提示"],
  霓虹闪烁字: ["霓虹", "闪烁", "文字", "发光", "赛博朋克"],
  // 空结果
  搜索无果: ["搜索", "无结果", "空态", "empty", "放大镜"],
  空档案夹: ["文件夹", "空", "empty", "无内容", "引导创建"],
  "No Data 幽灵": ["幽灵", "无数据", "空态", "empty", "占位"],
  "404 星球": ["404", "页面不存在", "星球", "错误页", "empty"],
  迷失信号: ["信号", "断网", "网络异常", "连接失败", "offline"],
  // 运动效果
  弹跳小球: ["弹跳", "小球", "bounce", "运动", "弹性"],
  漂浮气泡: ["气泡", "漂浮", "上升", "float", "氛围"],
  波浪位移: ["波浪", "位移", "波动", "节奏", "连续"],
  心跳脉冲: ["心跳", "脉冲", "heartbeat", "强调", "提示"],
  悬浮卡片: ["悬浮", "卡片", "float", "上下", "装饰"],
  弹性入场: ["弹性", "入场", "spring", "出现", "过渡"],
  滚动驱动进度轨道: ["滚动", "进度", "轨道", "scroll", "timeline", "流程"],
  // 文字特效
  打字机: ["打字机", "typewriter", "逐字", "文字入场", "终端"],
  故障闪烁: ["故障", "闪烁", "glitch", "错位", "赛博"],
  词语轮播: ["轮播", "词语", "切换", "标语", "文字动画"],
  波浪字符: ["波浪", "字符", "逐字", "文字动画", "节奏"],
  渐变流光字: ["渐变", "流光", "文字", "shine", "标题"],
  文字揭幕: ["揭幕", "文字", "reveal", "入场", "展示"],
  数字增长: ["数字", "增长", "计数", "统计", "数值"],
  高亮扫光: ["高亮", "扫光", "文字", "强调", "标记"],
  遮罩扫描文字: ["遮罩", "扫描", "文字", "mask", "扫光", "标题"],
  // 背景氛围
  极光流动: ["极光", "aurora", "背景", "流动", "渐变", "氛围"],
  "Aurora Mesh 背景幕布": ["aurora", "mesh", "背景", "幕布", "渐变", "氛围"],
  胶片噪点呼吸背景: ["胶片", "噪点", "背景", "呼吸", "质感", "grain"],
  星点闪烁: ["星点", "闪烁", "背景", "星空", "夜空"],
  雷达扫描: ["雷达", "扫描", "背景", "监控", "旋转"],
  网格扫光: ["网格", "扫光", "背景", "科技", "矩阵"],
  墨迹呼吸: ["墨迹", "呼吸", "变形", "blob", "有机"],
  流星雨: ["流星", "下落", "背景", "星空", "装饰"],
  粒子流动: ["粒子", "流动", "背景", "漂浮", "氛围"],
  海浪起伏: ["海浪", "起伏", "波浪", "背景", "水"],
  // 声波条纹
  信号波纹: ["信号", "波纹", "扩散", "声波", "脉冲"],
  能量脉冲条: ["能量", "脉冲", "条形", "声波", "节奏"],
  数据波形: ["数据", "波形", "声波", "频率", "律动"],
  声波脉动: ["声波", "脉动", "进行中", "通话中", "音频可视化", "语音", "录音", "播放中", "直播", "在线状态"],
  节拍跳条: ["节拍", "跳动", "条形", "音频", "进行中", "脉冲", "竖条", "迷你频谱"],
  // 大数据可视化
  逐字加载: ["逐字", "token", "AI", "流式", "打字", "大模型"],
  向量检索命中: ["向量", "检索", "雷达", "搜索", "AI", "命中"],
  数据管道吞吐: ["管道", "数据流", "吞吐", "pipeline", "传输"],
  模型置信度分布: ["置信度", "分布", "柱状图", "模型", "AI"],
  异常告警脉冲: ["告警", "异常", "脉冲", "监控", "警报"],
  集群健康热力: ["集群", "健康", "热力图", "监控", "状态"],
  镜面扫光: ["镜面", "扫光", "文字", "光泽", "反射"],
  数据流线: ["数据", "流线", "传输", "网络", "流动"],
  // 大数据
  柱状图生长: ["柱状图", "图表", "生长", "数据", "统计"],
  环形占比: ["环形图", "占比", "饼图", "数据", "比例"],
  数据表骨架: ["数据表", "骨架屏", "表格", "loading", "占位"],
  指标趋势折线: ["折线图", "趋势", "图表", "数据", "走势"],
  漏斗转化流: ["漏斗", "转化", "漏损", "数据流", "运营分析", "大数据", "可视化"],
  // 新增实用动画
  角标跳动: ["角标", "徽章", "badge", "通知", "数字"],
  标签页指示器: ["标签页", "tab", "指示器", "导航", "切换"],
  消息气泡弹入: ["消息", "气泡", "弹入", "聊天", "通知"],
  渐入上移: ["渐入", "上移", "入场", "fade-in", "出现"],
  涟漪扩散: ["涟漪", "扩散", "波纹", "点击", "中心"],
  错误抖动: ["错误", "抖动", "shake", "表单", "验证", "输入"],
  翻转卡片: ["翻转", "卡片", "flip", "3D", "正反面", "悬停"],
  跑马灯滚动: ["跑马灯", "滚动", "marquee", "公告", "文字滚动"],
  步骤进度: ["步骤", "进度", "step", "流程", "分步", "向导"],
  弹窗缩放: ["弹窗", "缩放", "modal", "对话框", "弹出"],
  工具提示: ["工具提示", "tooltip", "气泡", "悬停", "提示"],
  脉冲按钮: ["脉冲", "按钮", "CTA", "吸引", "点击", "行动号召"],
  弹幕飘过: ["弹幕", "飘过", "滚动", "直播", "评论", "互动"],
  文字描边绘制: ["描边", "绘制", "stroke", "SVG", "文字", "书写"],
  时钟摆动: ["钟摆", "摆动", "pendulum", "节拍", "摇摆"],
  聚光扫描: ["聚光", "扫描", "spotlight", "高亮", "搜索", "灯光"],
  文字拆散重组: ["拆散", "重组", "scatter", "打散", "字符", "文字", "入场", "分裂"],
  液态形变: ["液态", "形变", "blob", "变形", "有机", "流体", "morph"],
};

// 动画提示词描述：用于"复制提示词"功能，AI 生成 + 人工校对
// description 面向 AI 阅读，精确描述视觉效果和技术实现要点
// tags 可选，缺省时 promptBuilder 从 animationSemanticIndex 回退
export const animationPromptDescriptions = {
  加载脉冲: {
    description:
      "圆形 spinner 加载动画。外圈是半透明描边环，顶部有一段高亮色弧段（用 border-top-color 区分）。同时运行旋转（spin）和脉冲缩放（pulse）两个动画，旋转为 linear 匀速，脉冲带 ease-in-out 缓入缓出，营造'正在处理中'的视觉节奏。",
  },
  跳动圆点: {
    description:
      "3 个等距排列的小圆点，依次做纵向弹跳动画（translateY）。通过 animation-delay 逐个错开 0.15s，形成波浪式跳动的加载提示。缓动函数 ease-in-out 制造弹性感，无限循环。",
  },
  弹跳小球: {
    description:
      "一个小球在水平面上做抛物线弹跳，着地时下方有椭圆投影随弹跳同步缩放，模拟真实物理弹性。使用 cubic-bezier 自定义弹性曲线控制反弹节奏。",
  },
  边框流光: {
    description:
      "按钮边框有一道高亮光线沿矩形轮廓持续流转。使用 conic-gradient 配合旋转动画实现光线环绕效果。悬停时光线加速并增强发光强度，适合 CTA 按钮的注意力引导。",
  },
  极光流动: {
    description:
      "全屏背景上多层半透明渐变色块做缓慢位移与形变动画，模拟北极光的飘逸流动感。使用多个 radial-gradient 叠加，配合 animation 做位置偏移，营造沉浸式背景氛围。",
  },
  // 其余动画的描述后续由 AI 批量生成 + 人工校对
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
  汉堡菜单变形: {
    duration: { label: "切换时长", type: "range", min: 1, max: 6, step: 0.2, default: 2.6, unit: "s", target: "(?:burgerMorphTop|burgerMorphMid|burgerMorphBottom|burgerGlow)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.4, 0, 0.2, 1)"], default: "cubic-bezier(0.4, 0, 0.2, 1)", target: "burgerMorphTop" },
  },
  液态玻璃卡片: {
    duration: { label: "呼吸周期", type: "range", min: 1, max: 6, step: 0.5, default: 3, unit: "s", target: "glassBreath" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "glassBreath" },
  },
  "液态玻璃按钮 2.0": {
    duration: { label: "流动周期", type: "range", min: 1, max: 6, step: 0.5, default: 2.8, unit: "s", target: "(?:glassBtnBreath|glassBtnShine|glassBtnRefract)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "glassBtnBreath" },
  },
  果冻弹性按钮: {
    duration: { label: "弹性周期", type: "range", min: 0.8, max: 4, step: 0.2, default: 1.8, unit: "s", target: "jellySquish" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "jellySquish" },
  },
  全息投影卡片: {
    duration: { label: "流光周期", type: "range", min: 1, max: 6, step: 0.5, default: 3, unit: "s", target: "holoShift" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "holoShift" },
  },

  // ========== 加载反馈类 ==========
  原始思维: {
    rotateDuration: { label: "整图旋转周期", type: "range", min: 3, max: 22, step: 0.5, default: 9.1, unit: "s", target: "roseRotate" },
    flowDuration: { label: "流光周期", type: "range", min: 0.8, max: 10, step: 0.2, default: 2.8, unit: "s", target: "roseFlow" },
    timing: {
      label: "缓动函数",
      type: "select",
      options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"],
      default: "linear",
      target: "(?:roseRotate|roseFlow)",
    },
  },
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
  沙漏等待: {
    duration: { label: "流沙时长", type: "range", min: 1, max: 4, step: 0.2, default: 2, unit: "s", target: "(?:sandStream|sandTop|sandBottom|hgFlip)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "(?:sandStream|sandTop|sandBottom|hgFlip)" },
  },
  光锥环形加载: {
    duration: { label: "旋转时长", type: "range", min: 0.8, max: 4, step: 0.1, default: 1.8, unit: "s", target: "(?:coneSweep|coneCorePulse|coneHaloPulse)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "coneSweep" },
  },
  棱镜旋环加载: {
    duration: { label: "旋环时长", type: "range", min: 0.8, max: 4, step: 0.1, default: 1.8, unit: "s", target: "(?:prismRingSpin|prismRingPulse|prismRingSweep)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "prismRingSpin" },
  },
  三角轮转点: {
    duration: { label: "轮转时长", type: "range", min: 0.8, max: 3, step: 0.1, default: 1.1, unit: "s", target: "triangleCycleMotion" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "triangleCycleMotion" },
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
  "404 星球": {
    duration: { label: "漂浮时长", type: "range", min: 1.5, max: 6, step: 0.3, default: 3, unit: "s", target: "planetFloat" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "planetFloat" },
  },
  迷失信号: {
    duration: { label: "消隐时长", type: "range", min: 1, max: 5, step: 0.2, default: 2, unit: "s", target: "signalFade" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "signalFade" },
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
  液态形变: {
    duration: { label: "形变周期", type: "range", min: 2, max: 8, step: 0.5, default: 4, unit: "s", target: "blobMorphShape" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "blobMorphShape" },
  },
  滚动驱动进度轨道: {
    duration: { label: "轨道时长", type: "range", min: 1, max: 6, step: 0.5, default: 3, unit: "s", target: "(?:scrollProgressMock|scrollProgressRail)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "scrollProgressRail" },
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
  遮罩扫描文字: {
    duration: { label: "扫描时长", type: "range", min: 1, max: 6, step: 0.2, default: 3, unit: "s", target: "maskScanSweep" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "linear", target: "maskScanSweep" },
  },
  文字拆散重组: {
    duration: { label: "动画周期", type: "range", min: 1.5, max: 5, step: 0.5, default: 2.5, unit: "s", target: "scatterReform" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.34, 1.56, 0.64, 1)"], default: "cubic-bezier(0.34, 1.56, 0.64, 1)", target: "scatterReform" },
  },
  // ========== 背景氛围类 ==========
  极光流动: {
    duration: { label: "流动时长", type: "range", min: 3, max: 12, step: 0.5, default: 6, unit: "s", target: "auroraFlow" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "auroraFlow" },
  },
  "Aurora Mesh 背景幕布": {
    duration: { label: "幕布时长", type: "range", min: 2, max: 10, step: 0.5, default: 5.4, unit: "s", target: "(?:auroraMeshFlow|auroraMeshDrift)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "auroraMeshFlow" },
  },
  胶片噪点呼吸背景: {
    duration: { label: "呼吸时长", type: "range", min: 1, max: 8, step: 0.5, default: 3.6, unit: "s", target: "(?:filmNoiseBreath|filmNoiseShift)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "steps(6, end)"], default: "ease-in-out", target: "filmNoiseBreath" },
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
  声波脉动: {
    duration: { label: "脉动时长", type: "range", min: 0.3, max: 2, step: 0.1, default: 0.8, unit: "s", target: "soundPulse" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "soundPulse" },
  },
  节拍跳条: {
    duration: { label: "跳动时长", type: "range", min: 0.3, max: 2, step: 0.1, default: 0.8, unit: "s", target: "beatPulse" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "beatPulse" },
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
  漏斗转化流: {
    duration: { label: "流动时长", type: "range", min: 1, max: 6, step: 0.2, default: 2.8, unit: "s", target: "(?:funnelFlow|funnelPulse|funnelGlow)" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "funnelFlow" },
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
  错误抖动: {
    duration: { label: "抖动时长", type: "range", min: 0.3, max: 2, step: 0.1, default: 0.6, unit: "s", target: "shakeError" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "shakeError" },
  },
  翻转卡片: {
    duration: { label: "翻转时长", type: "range", min: 2, max: 8, step: 0.5, default: 4, unit: "s", target: "flipAuto" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "flipAuto" },
  },
  跑马灯滚动: {
    duration: { label: "滚动时长", type: "range", min: 3, max: 15, step: 1, default: 8, unit: "s", target: "marqueeScroll" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease"], default: "linear", target: "marqueeScroll" },
  },
  步骤进度: {
    duration: { label: "流程时长", type: "range", min: 1.5, max: 6, step: 0.5, default: 3, unit: "s", target: "stepFill" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "stepFill" },
  },
  弹窗缩放: {
    duration: { label: "弹出时长", type: "range", min: 1.5, max: 6, step: 0.5, default: 3, unit: "s", target: "modalPop" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-out", target: "modalPop" },
  },
  工具提示: {
    duration: { label: "浮现时长", type: "range", min: 1.5, max: 6, step: 0.5, default: 3, unit: "s", target: "tooltipPop" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-out", target: "tooltipPop" },
  },
  脉冲按钮: {
    duration: { label: "脉冲周期", type: "range", min: 1, max: 5, step: 0.5, default: 2.5, unit: "s", target: "ctaPulseRing" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-out", "ease-in-out"], default: "ease-out", target: "ctaPulseRing" },
  },
  弹幕飘过: {
    duration: { label: "飘过时长", type: "range", min: 3, max: 12, step: 0.5, default: 6, unit: "s", target: "danmakuFly" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out"], default: "linear", target: "danmakuFly" },
  },
  文字描边绘制: {
    duration: { label: "绘制时长", type: "range", min: 1.5, max: 6, step: 0.5, default: 3, unit: "s", target: "strokeDraw" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "strokeDraw" },
  },
  时钟摆动: {
    duration: { label: "摆动周期", type: "range", min: 1, max: 5, step: 0.5, default: 2, unit: "s", target: "pendulumSwing" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "pendulumSwing" },
  },
  聚光扫描: {
    duration: { label: "扫描时长", type: "range", min: 1.5, max: 6, step: 0.5, default: 3, unit: "s", target: "spotlightSweep" },
    timing: { label: "缓动函数", type: "select", options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"], default: "ease-in-out", target: "spotlightSweep" },
  },
};

export const animationNamesByTitle = {
  原始思维: ["roseRotate", "roseFlow"],
  加载脉冲: ["spin", "pulse"],
  跳动圆点: ["dotsBounce"],
  频谱条形: ["barsScale"],
  骨架屏闪光: ["shimmer"],
  进度条流动: ["progressSlide"],
  沙漏等待: ["sandStream", "sandTop", "sandBottom", "hgFlip"],
  光锥环形加载: ["coneSweep", "coneCorePulse", "coneHaloPulse"],
  棱镜旋环加载: ["prismRingSpin", "prismRingPulse", "prismRingSweep"],
  搜索无果: ["searchShake", "searchCrossPulse"],
  空档案夹: ["paperFloat"],
  "No Data 幽灵": ["ghostFloat", "ghostShadow", "ghostBlink"],
  "404 星球": ["planetFloat", "planetSpin", "starTwinkle"],
  迷失信号: ["signalFade"],
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
  汉堡菜单变形: ["burgerMorphTop", "burgerMorphMid", "burgerMorphBottom", "burgerGlow"],
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
  三角轮转点: ["triangleCycleMotion"],
  镜面扫光: ["textShimmer"],
  数据流线: ["dataFlow"],

  信号波纹: ["rippleExpand"],
  能量脉冲条: ["energyPulse"],
  数据波形: ["waveformBounce"],
  声波脉动: ["soundPulse"],
  节拍跳条: ["beatPulse"],
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
  "Aurora Mesh 背景幕布": ["auroraMeshFlow", "auroraMeshDrift"],
  胶片噪点呼吸背景: ["filmNoiseBreath", "filmNoiseShift"],
  轨道卫星: ["orbitSpin"],
  滚动驱动进度轨道: ["scrollProgressMock", "scrollProgressRail"],

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
  遮罩扫描文字: ["maskScanSweep"],
  数字增长: ["countUp"],
  流星雨: ["meteorFall"],
  柱状图生长: ["barGrow"],
  环形占比: ["donutGrow"],
  数据表骨架: ["skelShimmer"],
  指标趋势折线: ["trendDraw"],
  漏斗转化流: ["funnelFlow", "funnelPulse", "funnelGlow"],

  标签页指示器: ["tabSlide"],
  消息气泡弹入: ["bubblePop"],
  渐入上移: ["fadeInUp"],
  涟漪扩散: ["rippleOut", "rippleCorePulse"],
  角标跳动: ["badgeBounce"],
  错误抖动: ["shakeError", "shakeHintFade"],
  翻转卡片: ["flipAuto"],
  跑马灯滚动: ["marqueeScroll"],
  步骤进度: ["stepFill", "stepDot", "stepLine"],
  弹窗缩放: ["modalPop", "backdropFade"],
  工具提示: ["tooltipPop"],
  脉冲按钮: ["ctaPulseRing"],
  弹幕飘过: ["danmakuFly"],
  文字描边绘制: ["strokeDraw"],
  时钟摆动: ["pendulumSwing"],
  聚光扫描: ["spotlightSweep"],
  液态玻璃卡片: ["glassBreath", "glassRefract"],
  "液态玻璃按钮 2.0": ["glassBtnBreath", "glassBtnShine", "glassBtnRefract"],
  果冻弹性按钮: ["jellySquish"],
  全息投影卡片: ["holoShift", "holoFlare"],
  文字拆散重组: ["scatterReform"],
  液态形变: ["blobMorphShape", "blobRotate"],
};

