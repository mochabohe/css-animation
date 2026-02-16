import "./styles.css";

const filterButtons = document.querySelectorAll(".filter-btn");
const animationCards = document.querySelectorAll(".card[data-category]");
const searchInput = document.querySelector("#searchInput");
const motionToggle = document.querySelector("#motionToggle");
const metaToggle = document.querySelector("#metaToggle");

const viewState = {
  filter: "all",
  keyword: "",
};

// ========== 使用统计工具 ==========
const AnimationStats = {
  STORAGE_KEY: 'animation-usage-stats',

  // 初始化统计数据
  init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({}));
    }
  },

  // 记录一次复制
  record(animationName) {
    const stats = this.getAll();
    const now = new Date();

    if (!stats[animationName]) {
      stats[animationName] = {
        count: 0,
        firstUsed: now.toISOString(),
        lastUsed: now.toISOString(),
      };
    }

    stats[animationName].count++;
    stats[animationName].lastUsed = now.toISOString();

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));

    console.log(`📊 统计: "${animationName}" 已被复制 ${stats[animationName].count} 次`);

    // 发送到百度统计
    if (typeof _hmt !== 'undefined') {
      _hmt.push(['_trackEvent', '动画复制', 'copy', animationName]);
      console.log(`📤 已发送到百度统计: ${animationName}`);
    }
  },

  // 获取所有统计
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  },

  // 获取排行榜
  getTopUsed(limit = 10) {
    const stats = this.getAll();
    return Object.entries(stats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, limit)
      .map(([name, data]) => ({ name, ...data }));
  },

  // 清空统计
  clear() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({}));
    console.log('📊 统计数据已清空');
  },

  // 导出统计报告
  exportReport() {
    const stats = this.getAll();
    const total = Object.values(stats).reduce((sum, s) => sum + s.count, 0);

    let report = `# 动画使用统计报告\n\n`;
    report += `生成时间: ${new Date().toLocaleString('zh-CN')}\n`;
    report += `总复制次数: ${total}\n`;
    report += `使用动画数: ${Object.keys(stats).length}\n\n`;
    report += `## 使用排行榜\n\n`;

    const topList = this.getTopUsed(20);
    topList.forEach((item, index) => {
      const lastUsed = new Date(item.lastUsed).toLocaleDateString('zh-CN');
      report += `${index + 1}. **${item.name}** - ${item.count}次 (最近: ${lastUsed})\n`;
    });

    return report;
  }
};

// 初始化统计
AnimationStats.init();

const cssVarFallback = {
  "--accent": "#2cb9c5",
  "--accent-2": "#1f8f98",
  "--accent-soft": "#7be2e8",
  "--accent-deep": "#15747c",
  "--accent-rgb": "44, 185, 197",
  "--accent-2-rgb": "31, 143, 152",
  "--accent-soft-rgb": "123, 226, 232",
  "--accent-deep-rgb": "21, 116, 124",
  "--motion-linear": "linear",
  "--motion-ease-standard": "ease-in-out",
  "--motion-ease-snappy": "cubic-bezier(0.42, 0, 0.58, 1)",
  "--motion-ease-out": "ease-out",
  "--motion-duration-xs": "0.9s",
  "--motion-duration-sm": "1.1s",
  "--motion-duration-md": "1.4s",
  "--motion-duration-lg": "2.2s",
  "--motion-duration-xl": "3.2s",
  "--motion-duration-xxl": "5s",
  "--fx-duration": "1.4s",
  "--fx-easing": "ease-in-out",
  "--fx-duration-slow": "2.2s",
  "--fx-duration-fast": "1.1s",
};

function normalizeCssVariables(cssText) {
  // 先替换 var(--name) 格式
  let result = cssText.replace(/var\((--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\)/gi, (_, name, fallback) => {
    if (cssVarFallback[name]) return cssVarFallback[name];
    if (fallback) return fallback.trim();
    return name;
  });

  // 再替换裸露的 --name 格式（例如在 rgba() 中直接使用的）
  result = result.replace(/(--[a-z0-9-]+)/gi, (match) => {
    if (cssVarFallback[match]) return cssVarFallback[match];
    return match;
  });

  return result;
}

const categoryInsights = {
  loading: { scenario: "异步请求 / 首屏加载", token: "motion.loading" },
  motion: { scenario: "状态变化 / 数据强调", token: "motion.emphasis" },
  interactive: { scenario: "按钮反馈 / 引导操作", token: "motion.interactive" },
  transform: { scenario: "空间过渡 / 卡片转场", token: "motion.transform" },
  text: { scenario: "品牌标题 / 信息强调", token: "motion.typography" },
  background: { scenario: "页面氛围 / 空状态", token: "motion.background" },
  wave: { scenario: "音频可视化 / 声波反馈", token: "motion.wave" },
};

// 动画参数配置（支持实时调整）
const animationParams = {
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

const snippetsByTitle = {
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

const animationNamesByTitle = {
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
  点赞心跳: ["likeHeart"],
  开关切换: [],
  淡入淡出: ["fadeInOut"],
  消息滑入: ["toastSlide"],
  按钮加载中: ["buttonSpinner"],
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
};

function extractKeyframesMap() {
  const keyframesMap = new Map();

  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }

    if (!rules) {
      continue;
    }

    for (const rule of rules) {
      if (rule.type === CSSRule.KEYFRAMES_RULE) {
        keyframesMap.set(rule.name, rule.cssText);
      }
    }
  }

  return keyframesMap;
}

function renderCards() {
  const normalizedKeyword = viewState.keyword.trim().toLowerCase();

  const categoryNames = {
    loading: "加载反馈",
    motion: "运动效果",
    interactive: "交互按钮",
    transform: "3D 变换",
    text: "文字特效",
    background: "背景氛围",
    wave: "声波条纹"
  };

  animationCards.forEach((card) => {
    const category = card.dataset.category;
    const h2Element = card.querySelector("h2");
    const title = h2Element?.textContent?.toLowerCase() || "";
    const tagElement = card.querySelector(".card-tag");
    const tag = tagElement?.textContent?.toLowerCase() || "";
    const categoryName = categoryNames[category]?.toLowerCase() || "";

    const matchFilter = viewState.filter === "all" || category === viewState.filter;
    const matchKeyword = !normalizedKeyword ||
                        title.includes(normalizedKeyword) ||
                        tag.includes(normalizedKeyword) ||
                        categoryName.includes(normalizedKeyword);
    const visible = matchFilter && matchKeyword;

    card.hidden = !visible;
    card.setAttribute("aria-hidden", String(!visible));
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === viewState.filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  return Promise.resolve();
}

function collectDemoHtml(elementNodes) {
  const demoElements = elementNodes.filter((node) => {
    if (!(node instanceof HTMLElement)) {
      return false;
    }

    if (node.matches(".card-tag") || node.matches("h2")) {
      return false;
    }

    return true;
  });

  if (demoElements.length === 0) {
    return "";
  }

  return demoElements.map((node) => node.outerHTML).join("\n");
}

function attachSnippetPanels() {
  const keyframesMap = extractKeyframesMap();

  animationCards.forEach((card) => {
    if (card.querySelector(".card-inner")) {
      return;
    }

    const title = card.querySelector("h2")?.textContent?.trim();
    if (!title || !snippetsByTitle[title]) {
      return;
    }

    const originalNodes = [...card.childNodes];
    const liteSnippet = snippetsByTitle[title];
    const keyframeNames = animationNamesByTitle[title] || [];
    const keyframesCss = keyframeNames
      .map((name) => keyframesMap.get(name))
      .filter(Boolean)
      .join("\n\n");
    const demoHtml = collectDemoHtml(originalNodes);
    const fullCss = keyframesCss
      ? `${liteSnippet}\n\n${keyframesCss}`
      : `${liteSnippet}\n\n/* 此效果主要依赖 transition/transform，无额外 keyframes */`;

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-face card-front";

    originalNodes.forEach((node) => {
      front.append(node);
    });

    const category = card.dataset.category || "loading";
    const insight = categoryInsights[category] || categoryInsights.loading;

    const metaRow = document.createElement("div");
    metaRow.className = "meta-row";

    const sceneBadge = document.createElement("span");
    sceneBadge.className = "meta-badge";
    sceneBadge.textContent = `场景: ${insight.scenario}`;

    metaRow.append(sceneBadge);

    const openBtn = document.createElement("button");
    openBtn.className = "snippet-toggle";
    openBtn.type = "button";
    openBtn.textContent = "代码实验室";

    // 创建弹窗元素
    const createModal = (previousActiveElement) => {
      const modal = document.createElement("div");
      modal.className = "code-modal";
      // 无障碍属性
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");

      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";

      const modalHeader = document.createElement("div");
      modalHeader.className = "modal-header";

      const modalTitle = document.createElement("h3");
      modalTitle.className = "modal-title";
      modalTitle.id = `modal-title-${Date.now()}`;
      modalTitle.textContent = `${title} - 代码实验室`;

      // 关联标题与对话框
      modal.setAttribute("aria-labelledby", modalTitle.id);

      const modalActions = document.createElement("div");
      modalActions.className = "modal-actions";

      const copyBtn = document.createElement("button");
      copyBtn.className = "modal-btn";
      copyBtn.type = "button";
      copyBtn.textContent = "复制全部";

      const resetBtn = document.createElement("button");
      resetBtn.className = "modal-btn";
      resetBtn.type = "button";
      resetBtn.textContent = "重置";

      const closeModalBtn = document.createElement("button");
      closeModalBtn.className = "modal-btn modal-close";
      closeModalBtn.type = "button";
      closeModalBtn.textContent = "✕ 关闭";

      modalActions.append(copyBtn, resetBtn, closeModalBtn);
      modalHeader.append(modalTitle, modalActions);

      // 编辑器容器 - 改为上下布局
      const editorContainer = document.createElement("div");
      editorContainer.className = "modal-editor-container";

      // 上方：HTML代码区
      const htmlPanel = document.createElement("div");
      htmlPanel.className = "modal-code-panel";

      const htmlLabel = document.createElement("div");
      htmlLabel.className = "modal-editor-label";
      htmlLabel.textContent = "📄 HTML 结构";

      const htmlTextarea = document.createElement("textarea");
      htmlTextarea.className = "modal-code-editor html-editor";
      htmlTextarea.value = demoHtml;
      htmlTextarea.spellcheck = false;

      htmlPanel.append(htmlLabel, htmlTextarea);

      // 中间：CSS代码编辑区
      const cssPanel = document.createElement("div");
      cssPanel.className = "modal-code-panel css-panel";

      const cssLabel = document.createElement("div");
      cssLabel.className = "modal-editor-label";
      cssLabel.textContent = "🎨 CSS 样式";

      const cssTextarea = document.createElement("textarea");
      cssTextarea.className = "modal-code-editor css-editor";
      cssTextarea.value = normalizeCssVariables(fullCss);
      cssTextarea.spellcheck = false;

      cssPanel.append(cssLabel, cssTextarea);

      // 下方：实时预览
      const previewPanel = document.createElement("div");
      previewPanel.className = "modal-preview-panel";

      const previewLabel = document.createElement("div");
      previewLabel.className = "modal-editor-label";
      previewLabel.textContent = "👁️ 实时预览";

      // 使用 Shadow DOM 隔离预览样式，避免污染全局
      const previewBox = document.createElement("div");
      previewBox.className = "modal-preview-box";

      const shadowRoot = previewBox.attachShadow({ mode: "open" });

      // 在 Shadow DOM 中创建容器
      const shadowContainer = document.createElement("div");
      shadowContainer.innerHTML = demoHtml;
      shadowContainer.style.cssText = "display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;";

      const styleTag = document.createElement("style");
      styleTag.textContent = cssTextarea.value;

      shadowRoot.appendChild(styleTag);
      shadowRoot.appendChild(shadowContainer);

      previewPanel.append(previewLabel, previewBox);

      // 参数调整面板（如果该动画支持参数配置）
      let paramsPanel = null;
      const currentParams = animationParams[title];
      const paramValues = {}; // 存储当前参数值

      if (currentParams) {
        paramsPanel = document.createElement("div");
        paramsPanel.className = "modal-params-panel";

        const paramsLabel = document.createElement("div");
        paramsLabel.className = "modal-editor-label";
        paramsLabel.textContent = "⚙️ 参数调整";

        const paramsContainer = document.createElement("div");
        paramsContainer.className = "params-container";

        // 为每个参数创建控件
        Object.entries(currentParams).forEach(([key, config]) => {
          const paramRow = document.createElement("div");
          paramRow.className = "param-row";

          const paramLabel = document.createElement("label");
          paramLabel.className = "param-label";
          paramLabel.textContent = config.label;

          let paramControl;
          paramValues[key] = config.default;

          if (config.type === "range") {
            const rangeWrapper = document.createElement("div");
            rangeWrapper.className = "param-range-wrapper";

            paramControl = document.createElement("input");
            paramControl.type = "range";
            paramControl.className = "param-range";
            paramControl.min = config.min;
            paramControl.max = config.max;
            paramControl.step = config.step;
            paramControl.value = config.default;

            const valueDisplay = document.createElement("span");
            valueDisplay.className = "param-value";
            valueDisplay.textContent = `${config.default}${config.unit}`;

            paramControl.addEventListener("input", (e) => {
              const value = parseFloat(e.target.value);
              paramValues[key] = value;
              valueDisplay.textContent = `${value}${config.unit}`;
              updatePreviewWithParams();
            });

            rangeWrapper.append(paramControl, valueDisplay);
            paramRow.append(paramLabel, rangeWrapper);
          } else if (config.type === "select") {
            paramControl = document.createElement("select");
            paramControl.className = "param-select";

            config.options.forEach(option => {
              const optionEl = document.createElement("option");
              optionEl.value = option;
              optionEl.textContent = option === "cubic-bezier(0.68, -0.55, 0.27, 1.55)" ? "bounce" : option;
              if (option === config.default) optionEl.selected = true;
              paramControl.appendChild(optionEl);
            });

            paramControl.addEventListener("change", (e) => {
              paramValues[key] = e.target.value;
              updatePreviewWithParams();
            });

            paramRow.append(paramLabel, paramControl);
          }

          paramsContainer.appendChild(paramRow);
        });

        paramsPanel.append(paramsLabel, paramsContainer);
      }

      // 创建左侧列，包含预览、参数面板和HTML（上下排列）
      const leftColumn = document.createElement("div");
      leftColumn.className = "modal-left-column";
      if (paramsPanel) {
        leftColumn.append(previewPanel, paramsPanel, htmlPanel);
      } else {
        leftColumn.append(previewPanel, htmlPanel);
      }

      editorContainer.append(leftColumn, cssPanel);

      modalContent.append(modalHeader, editorContainer);
      modal.appendChild(modalContent);

      const markCopied = (button, text, originalText) => {
        button.textContent = text;
        button.classList.add("is-copied");
        setTimeout(() => {
          button.classList.remove("is-copied");
          button.textContent = originalText;
        }, 1200);
      };

      // 根据参数值更新 CSS 代码
      const updatePreviewWithParams = () => {
        if (!currentParams) return;

        let updatedCss = normalizeCssVariables(fullCss);

        // 遍历所有参数，替换 CSS 中的值
        Object.entries(currentParams).forEach(([key, config]) => {
          const value = paramValues[key];
          const target = config.target; // 动画名称，如 "spin", "pulse"

          if (config.type === "range") {
            // 替换时长：精确匹配 "动画名 时长"
            // 例如：spin 1s -> spin 2s
            const durationRegex = new RegExp(
              `(${target}\\s+)(\\d+\\.?\\d*)(s)`,
              'g'
            );

            updatedCss = updatedCss.replace(durationRegex, (match, prefix, oldDuration, unit) => {
              return `${prefix}${value}${unit}`;
            });
          } else if (config.type === "select" && key === "timing") {
            // 替换缓动函数：精确匹配 "动画名 时长 缓动函数"
            // 例如：spin 1s linear -> spin 1s ease-in-out
            const timingRegex = new RegExp(
              `(${target}\\s+\\d+\\.?\\d*s\\s+)(linear|ease(?:-in)?(?:-out)?|ease-in-out|cubic-bezier\\([^)]+\\))`,
              'g'
            );

            updatedCss = updatedCss.replace(timingRegex, (match, prefix, oldTiming) => {
              return `${prefix}${value}`;
            });
          }
        });

        cssTextarea.value = updatedCss;
        styleTag.textContent = updatedCss;
      };

      // 实时更新预览（在 Shadow DOM 中）
      const updatePreview = () => {
        shadowContainer.innerHTML = htmlTextarea.value;
        styleTag.textContent = cssTextarea.value;
      };

      htmlTextarea.addEventListener("input", updatePreview);

      cssTextarea.addEventListener("input", () => {
        styleTag.textContent = cssTextarea.value;
      });

      copyBtn.addEventListener("click", async () => {
        try {
          // 记录使用统计
          AnimationStats.record(title);

          // 生成可直接运行的完整 HTML 模板
          const fullTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - CSS Animation</title>
  <style>
${cssTextarea.value.split('\n').map(line => '    ' + line).join('\n')}
  </style>
</head>
<body>
${htmlTextarea.value.split('\n').map(line => '  ' + line).join('\n')}
</body>
</html>`;
          await copyToClipboard(fullTemplate);
          markCopied(copyBtn, "✓ 已复制", "复制全部");
        } catch {
          copyBtn.textContent = "复制失败";
        }
      });

      resetBtn.addEventListener("click", () => {
        htmlTextarea.value = demoHtml;
        cssTextarea.value = normalizeCssVariables(fullCss);

        // 重置所有参数控件到默认值
        if (currentParams && paramsPanel) {
          Object.entries(currentParams).forEach(([key, config]) => {
            paramValues[key] = config.default;

            // 查找并更新对应的控件
            const controls = paramsPanel.querySelectorAll('input, select');
            controls.forEach(control => {
              if (control.type === 'range') {
                // 检查这个滑块是否属于当前参数
                const paramRow = control.closest('.param-row');
                const label = paramRow?.querySelector('.param-label')?.textContent;
                if (label === config.label) {
                  control.value = config.default;
                  // 更新数值显示
                  const valueDisplay = paramRow.querySelector('.param-value');
                  if (valueDisplay) {
                    valueDisplay.textContent = `${config.default}${config.unit}`;
                  }
                }
              } else if (control.tagName === 'SELECT') {
                const paramRow = control.closest('.param-row');
                const label = paramRow?.querySelector('.param-label')?.textContent;
                if (label === config.label) {
                  control.value = config.default;
                }
              }
            });
          });
        }

        updatePreview();
        markCopied(resetBtn, "✓ 已重置", "重置");
      });

      // 获取所有可聚焦元素用于焦点陷阱
      const getFocusableElements = () => {
        return modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
      };

      // 焦点陷阱：Tab 键循环聚焦
      const handleTab = (e) => {
        if (e.key !== "Tab") return;

        const focusableElements = getFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      };

      // Escape 键处理函数（需要是具名函数以便移除监听器）
      const handleEscape = (e) => {
        if (e.key === "Escape") closeModal();
      };

      const closeModal = () => {
        modal.classList.remove("is-open");
        // 移除事件监听器，避免事件泄漏
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleTab);
        setTimeout(() => {
          modal.remove();
          // 焦点归还
          if (previousActiveElement) {
            previousActiveElement.focus();
          }
        }, 300);
      };

      closeModalBtn.addEventListener("click", closeModal);

      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });

      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTab);

      return modal;
    };

    openBtn.addEventListener("click", () => {
      // 保存当前焦点
      const previousActiveElement = document.activeElement;
      const modal = createModal(previousActiveElement);

      document.body.appendChild(modal);
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
        // 设置初始焦点到第一个按钮（通常是复制按钮）
        const firstFocusable = modal.querySelector("button");
        if (firstFocusable) {
          firstFocusable.focus();
        }
      });
    });

    front.append(metaRow, openBtn);

    card.replaceChildren(inner);
    inner.append(front);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    viewState.filter = button.dataset.filter || "all";
    renderCards();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    viewState.keyword = event.target.value || "";
    renderCards();
  });
}

if (motionToggle) {
  motionToggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("reduced-preview");
    motionToggle.setAttribute("aria-pressed", String(enabled));
    motionToggle.textContent = enabled ? "开启" : "关闭";
  });
}

if (metaToggle) {
  metaToggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("show-meta");
    metaToggle.setAttribute("aria-pressed", String(enabled));
    metaToggle.textContent = enabled ? "开启" : "关闭";
  });
}

const themeButtons = document.querySelectorAll(".theme-btn");
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.theme;
    document.documentElement.setAttribute("data-theme", theme);

    // 清除自定义颜色设置的内联样式
    document.documentElement.style.removeProperty("--accent");
    document.documentElement.style.removeProperty("--accent-rgb");
    document.documentElement.style.removeProperty("--accent-2");
    document.documentElement.style.removeProperty("--accent-2-rgb");
    document.documentElement.style.removeProperty("--accent-soft");
    document.documentElement.style.removeProperty("--accent-soft-rgb");
    document.documentElement.style.removeProperty("--accent-deep");
    document.documentElement.style.removeProperty("--accent-deep-rgb");

    themeButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn === button);
    });

    document.querySelector(".custom-color-wrapper")?.classList.remove("is-active");

    // 清空文本输入框
    const colorTextInput = document.querySelector("#colorTextInput");
    if (colorTextInput) {
      colorTextInput.value = "";
      colorTextInput.classList.remove("error");
    }
  });
});

function hexToRgb(hex) {
  // 移除可能的 # 前缀
  hex = hex.replace(/^#/, '');

  // 支持三位十六进制格式 (#fff -> #ffffff)
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function parseColor(color) {
  if (!color) return null;

  color = color.trim();

  // 支持 rgb(r, g, b) 格式
  const rgbMatch = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(color);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  // 支持 rgba(r, g, b, a) 格式（忽略 alpha 通道）
  const rgbaMatch = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)$/i.exec(color);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
    };
  }

  // 支持 # 格式（六位和三位）
  if (color.startsWith('#') || /^[a-f\d]{3}$/i.test(color) || /^[a-f\d]{6}$/i.test(color)) {
    return hexToRgb(color);
  }

  // 支持颜色名称（如 white, red, blue 等）
  // 使用 canvas 来解析颜色名称
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;

  // 检查颜色是否有效
  if (ctx.fillStyle === color.toLowerCase() || /^#[0-9a-f]{6}$/i.test(ctx.fillStyle)) {
    // fillStyle 会被规范化为 #rrggbb 格式
    return hexToRgb(ctx.fillStyle);
  }

  return null;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function generateColorVariants(baseColor) {
  const rgb = parseColor(baseColor);
  if (!rgb) return null;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const accent2 = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 15, 10));
  const accentSoft = hslToRgb(hsl.h, Math.max(hsl.s - 10, 30), Math.min(hsl.l + 20, 85));
  const accentDeep = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 25, 5));

  return {
    accent: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    accent2: `${accent2.r}, ${accent2.g}, ${accent2.b}`,
    accentSoft: `${accentSoft.r}, ${accentSoft.g}, ${accentSoft.b}`,
    accentDeep: `${accentDeep.r}, ${accentDeep.g}, ${accentDeep.b}`,
    hexColor: `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`,
  };
}

function applyCustomColor(color) {
  const variants = generateColorVariants(color);

  if (variants) {
    document.documentElement.removeAttribute("data-theme");

    document.documentElement.style.setProperty("--accent", variants.hexColor);
    document.documentElement.style.setProperty("--accent-rgb", variants.accent);
    document.documentElement.style.setProperty("--accent-2-rgb", variants.accent2);
    document.documentElement.style.setProperty("--accent-soft-rgb", variants.accentSoft);
    document.documentElement.style.setProperty("--accent-deep-rgb", variants.accentDeep);

    const hsl = rgbToHsl(...variants.accent.split(", ").map(Number));
    const accent2Hsl = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 15, 10));
    const accentSoftHsl = hslToRgb(hsl.h, Math.max(hsl.s - 10, 30), Math.min(hsl.l + 20, 85));
    const accentDeepHsl = hslToRgb(hsl.h, hsl.s, Math.max(hsl.l - 25, 5));

    document.documentElement.style.setProperty(
      "--accent-2",
      `rgb(${accent2Hsl.r}, ${accent2Hsl.g}, ${accent2Hsl.b})`
    );
    document.documentElement.style.setProperty(
      "--accent-soft",
      `rgb(${accentSoftHsl.r}, ${accentSoftHsl.g}, ${accentSoftHsl.b})`
    );
    document.documentElement.style.setProperty(
      "--accent-deep",
      `rgb(${accentDeepHsl.r}, ${accentDeepHsl.g}, ${accentDeepHsl.b})`
    );

    themeButtons.forEach((btn) => {
      btn.classList.remove("is-active");
    });
    customColorWrapper?.classList.add("is-active");

    return variants.hexColor;
  }
  return null;
}

const customColorInput = document.querySelector("#customColor");
const customColorWrapper = document.querySelector(".custom-color-wrapper");
const colorTextInput = document.querySelector("#colorTextInput");

if (customColorInput) {
  customColorInput.addEventListener("input", (event) => {
    const hexColor = applyCustomColor(event.target.value);
    if (hexColor && colorTextInput) {
      colorTextInput.value = hexColor;
      colorTextInput.classList.remove("error");
    }
  });
}

if (colorTextInput) {
  colorTextInput.addEventListener("input", (event) => {
    const color = event.target.value.trim();
    if (!color) return;

    const hexColor = applyCustomColor(color);
    if (hexColor) {
      colorTextInput.classList.remove("error");
      if (customColorInput) {
        customColorInput.value = hexColor;
      }
    } else {
      colorTextInput.classList.add("error");
    }
  });

  // 支持回车键提交
  colorTextInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  });
}

attachSnippetPanels();
renderCards();

// 默认开启工程信息
document.body.classList.add("show-meta");

// 点赞按钮点击动画 - 支持状态切换
const likeButtons = document.querySelectorAll(".like-btn");
likeButtons.forEach((btn) => {
  let isLiked = false;

  btn.addEventListener("click", () => {
    isLiked = !isLiked;

    if (isLiked) {
      // 点赞：添加动画类
      btn.classList.add("liked", "animating");

      // 动画结束后移除动画类，但保留 liked 状态
      setTimeout(() => {
        btn.classList.remove("animating");
      }, 600);
    } else {
      // 取消点赞：添加缩小动画
      btn.classList.add("unliking");

      setTimeout(() => {
        btn.classList.remove("liked", "unliking");
      }, 300);
    }
  });
});

// ========== 使用统计弹窗 ==========
const statsToggle = document.querySelector("#statsToggle");

if (statsToggle) {
  statsToggle.addEventListener("click", () => {
    showStatsModal();
  });
}

function showStatsModal() {
  const stats = AnimationStats.getAll();
  const topList = AnimationStats.getTopUsed(20);
  const total = Object.values(stats).reduce((sum, s) => sum + s.count, 0);

  // 创建弹窗
  const modal = document.createElement("div");
  modal.className = "code-modal is-open";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "stats-modal-title");

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // 头部
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("h3");
  modalTitle.className = "modal-title";
  modalTitle.id = "stats-modal-title";
  modalTitle.textContent = "📊 使用统计报告";

  const modalActions = document.createElement("div");
  modalActions.className = "modal-actions";

  const exportBtn = document.createElement("button");
  exportBtn.className = "modal-btn";
  exportBtn.type = "button";
  exportBtn.textContent = "导出报告";

  const clearBtn = document.createElement("button");
  clearBtn.className = "modal-btn";
  clearBtn.type = "button";
  clearBtn.textContent = "清空统计";

  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-btn modal-close";
  closeBtn.type = "button";
  closeBtn.textContent = "✕ 关闭";

  modalActions.append(exportBtn, clearBtn, closeBtn);
  modalHeader.append(modalTitle, modalActions);

  // 内容区
  const statsContainer = document.createElement("div");
  statsContainer.className = "modal-editor-container";
  statsContainer.style.cssText = "flex-direction: column; padding: 30px; overflow-y: auto;";

  // 概览
  const overview = document.createElement("div");
  overview.style.cssText = "margin-bottom: 30px;";
  overview.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
      <div style="background: rgba(var(--accent-rgb), 0.1); border: 1px solid rgba(var(--accent-rgb), 0.3); border-radius: 12px; padding: 20px; text-align: center;">
        <div style="font-size: 32px; font-weight: 700; color: var(--accent);">${total}</div>
        <div style="font-size: 13px; color: var(--muted); margin-top: 4px;">总复制次数</div>
      </div>
      <div style="background: rgba(var(--accent-rgb), 0.1); border: 1px solid rgba(var(--accent-rgb), 0.3); border-radius: 12px; padding: 20px; text-align: center;">
        <div style="font-size: 32px; font-weight: 700; color: var(--accent);">${Object.keys(stats).length}</div>
        <div style="font-size: 13px; color: var(--muted); margin-top: 4px;">使用动画数</div>
      </div>
      <div style="background: rgba(var(--accent-rgb), 0.1); border: 1px solid rgba(var(--accent-rgb), 0.3); border-radius: 12px; padding: 20px; text-align: center;">
        <div style="font-size: 32px; font-weight: 700; color: var(--accent);">${topList.length > 0 ? topList[0].name : '-'}</div>
        <div style="font-size: 13px; color: var(--muted); margin-top: 4px;">最常用动画</div>
      </div>
    </div>
  `;

  // 排行榜
  const ranking = document.createElement("div");
  ranking.innerHTML = `<h4 style="margin: 0 0 16px 0; font-size: 18px; color: var(--text);">📈 使用排行榜</h4>`;

  if (topList.length === 0) {
    ranking.innerHTML += `<div style="text-align: center; padding: 40px; color: var(--muted);">暂无使用数据</div>`;
  } else {
    const list = document.createElement("div");
    list.style.cssText = "display: flex; flex-direction: column; gap: 12px;";

    topList.forEach((item, index) => {
      const lastUsed = new Date(item.lastUsed).toLocaleString('zh-CN');
      const firstUsed = new Date(item.firstUsed).toLocaleString('zh-CN');

      const rankItem = document.createElement("div");
      rankItem.style.cssText = "background: rgba(var(--accent-rgb), 0.05); border: 1px solid rgba(145, 177, 240, 0.2); border-radius: 10px; padding: 16px; display: flex; align-items: center; gap: 16px;";

      const medal = index < 3 ? ['🥇', '🥈', '🥉'][index] : `${index + 1}.`;

      rankItem.innerHTML = `
        <div style="font-size: 24px; min-width: 40px; text-align: center;">${medal}</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 4px;">${item.name}</div>
          <div style="font-size: 12px; color: var(--muted);">
            首次使用: ${firstUsed} | 最近使用: ${lastUsed}
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 24px; font-weight: 700; color: var(--accent);">${item.count}</div>
          <div style="font-size: 11px; color: var(--muted);">次</div>
        </div>
      `;

      list.appendChild(rankItem);
    });

    ranking.appendChild(list);
  }

  statsContainer.append(overview, ranking);
  modalContent.append(modalHeader, statsContainer);
  modal.appendChild(modalContent);

  // 关闭弹窗
  const closeModal = () => {
    modal.classList.remove("is-open");
    setTimeout(() => modal.remove(), 300);
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // 导出报告
  exportBtn.addEventListener("click", async () => {
    const report = AnimationStats.exportReport();
    try {
      await copyToClipboard(report);
      markCopied(exportBtn, "✓ 已复制", "导出报告");
    } catch {
      exportBtn.textContent = "导出失败";
    }
  });

  // 清空统计
  clearBtn.addEventListener("click", () => {
    if (confirm("确定要清空所有使用统计数据吗？此操作不可恢复。")) {
      AnimationStats.clear();
      closeModal();
      alert("统计数据已清空");
    }
  });

  document.body.appendChild(modal);
  // 聚焦到关闭按钮
  setTimeout(() => closeBtn.focus(), 100);
}
