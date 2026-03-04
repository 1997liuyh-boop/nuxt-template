# Nuxt 4 + OpenClow + TailwindCSS + i18n

## 技术栈
- Nuxt 4
- OpenClow（通过 runtimeConfig 注入 API endpoint / key）
- TailwindCSS
- `@nuxtjs/i18n`（JSON + YAML）

## 页面效果
- 单页个人站风格：渐变背景、吸顶导航、锚点滚动
- Hero + 项目卡片 + 时间线 + 联系区块
- 中英双语一键切换

## 启动
```bash
npm install
npm run dev
```

## i18n 结构
- `i18n/locales/zh-CN.json`：中文基准文案
- `i18n/locales/en.yaml`：英文文案

## 翻译自动化
```bash
npm run lint:i18n
npm run i18n:ai
```

- `lint:i18n`：检查英文是否覆盖中文键
- `i18n:ai`：在存在缺失键时调用 LLM 生成建议并追加到 `en.yaml`
