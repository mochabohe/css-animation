---
name: check
description: "在 css-animation 项目中运行完整质量检查（参数替换守卫 + ESLint + Vitest）。当用户说「跑一下检查」、「lint 一下」、「跑测试」、「检查一下代码」时使用。有报错会自动修复直到全部通过。"
---

# 运行检查（Lint + 测试）

在 `css-animation` 目录下依次运行参数替换守卫、lint 和测试，所有检查必须通过。

## 执行步骤

### 1. 运行参数替换守卫

```bash
cd css-animation && node scripts/check-param-replacement.mjs
```

如果有报错：
- 根据报错定位动画标题与 target
- 检查 `src/modal.js` 中 `DURATION_RE` 是否支持嵌套 `calc(...)`
- 检查 `src/data.js` 的 target 与 `src/snippets.js` 的 animation 名是否一致
- 修复后重新运行守卫脚本，直到通过

### 2. 运行 Lint

```bash
cd css-animation && npm run lint
```

如果有报错：
- 逐条阅读错误信息，定位到具体文件和行号
- 修复所有 lint 错误
- 重新运行 lint，直到无报错

### 3. 运行测试

```bash
cd css-animation && npm run test
```

如果有测试失败：
- 阅读失败的测试用例和错误堆栈
- 读取对应的源文件，理解测试期望的行为
- 修复源码（不要修改测试文件，除非测试本身有明显的错误）
- 重新运行测试，直到全部通过

### 4. 全部通过后

告知用户：
- 参数替换守卫是否通过
- lint 通过的文件数量（或"无问题"）
- 测试通过的用例数量
- 如果有修复，列出修改了哪些文件
