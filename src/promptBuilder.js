import { animationPromptDescriptions, animationSemanticIndex } from "./data.js";

const TASK_INSTRUCTION = `请在我的项目中实现以下 CSS 动画效果。

要求：
- 仅使用 HTML + CSS 实现（无需 JavaScript），可直接粘贴到任何项目
- 保持动画的视觉效果与参考代码一致
- CSS 类名、变量名等可根据项目命名规范适当调整
- 如果项目使用 React/Vue/Svelte/Tailwind，请自行适配对应语法`;

const USAGE_GUIDE = `## 使用要求
- 请根据我的项目技术栈适配代码结构
- 保持动画视觉效果与参考代码一致
- CSS 类名可根据项目命名规范调整
- 如使用 CSS-in-JS、Tailwind 或 CSS Modules，请做相应转换
- 如需调整大小，优先对外层容器使用 transform: scale(...)，不建议修改内部元素尺寸
- 颜色值可替换为项目的设计 token / CSS 变量
- 确保动画性能良好，优先使用 transform 和 opacity`;

/**
 * 获取动画的效果描述。
 * 优先从 animationPromptDescriptions 取精写描述，
 * 降级到 animationSemanticIndex 标签拼接。
 */
function getDescription(title) {
  const prompt = animationPromptDescriptions[title];
  if (prompt?.description) {
    const tags = prompt.tags || animationSemanticIndex[title] || [];
    const tagLine = tags.length > 0 ? `\n技术要点：${tags.join("、")}` : "";
    return `【${title}】— ${prompt.description}${tagLine}`;
  }

  // 降级：从语义索引标签生成描述
  const semanticTags = animationSemanticIndex[title];
  if (semanticTags && semanticTags.length > 0) {
    return `【${title}】— 一个包含 ${semanticTags.join("、")} 等特征的 CSS 动画效果。`;
  }

  return `【${title}】`;
}

/**
 * 构建完整的 AI 提示词
 * @param {string} title - 动画标题
 * @param {string} demoHtml - 当前 HTML 代码（实时）
 * @param {string} fullCss - 当前 CSS 代码（实时，应已清理预览缩放块）
 * @returns {string} 完整提示词
 */
export function buildAnimationPrompt(title, demoHtml, fullCss) {
  const description = getDescription(title);

  return `${TASK_INSTRUCTION}

## 效果描述
${description}

## 参考实现

### HTML
\`\`\`html
${demoHtml.trim()}
\`\`\`

### CSS
\`\`\`css
${fullCss.trim()}
\`\`\`

${USAGE_GUIDE}`;
}
