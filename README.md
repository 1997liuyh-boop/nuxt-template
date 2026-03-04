# Nuxt 4 + OpenClow + TailwindCSS + i18n

## 技术栈
- Nuxt 4
- OpenClow（通过 runtimeConfig 注入 API endpoint / key）
- TailwindCSS
- @nuxtjs/i18n（JSON + YAML）

## 启动
```bash
npm install
npm run dev
```

## i18n 结构
- `i18n/locales/zh-CN.json`：基础中文文案
- `i18n/locales/en.yaml`：英文文案

## 翻译检查
```bash
npm run lint:i18n
```

CI 在提交时会自动检查翻译键是否完整，并可选地调用 LLM 自动补全缺失翻译并发起 PR。
