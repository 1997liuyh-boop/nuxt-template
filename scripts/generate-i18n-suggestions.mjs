import { readFile, appendFile } from 'node:fs/promises'
import process from 'node:process'

const zhPath = new URL('../i18n/locales/zh-CN.json', import.meta.url)
const enPath = new URL('../i18n/locales/en.yaml', import.meta.url)

const flattenJson = (obj, prefix = '') => {
  return Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    return v && typeof v === 'object' && !Array.isArray(v) ? flattenJson(v, key) : [key]
  })
}

const flattenYaml = (content) => {
  const stack = []
  const result = []

  for (const raw of content.split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue
    const indent = raw.match(/^\s*/)?.[0]?.length ?? 0
    const depth = Math.floor(indent / 2)
    const line = raw.trim()
    const idx = line.indexOf(':')
    if (idx === -1) continue

    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()

    stack[depth] = key
    stack.length = depth + 1

    if (value) result.push(stack.join('.'))
  }

  return result
}

const zhObj = JSON.parse(await readFile(zhPath, 'utf-8'))
const enRaw = await readFile(enPath, 'utf-8')

const zhKeys = flattenJson(zhObj)
const enKeys = flattenYaml(enRaw)
const missing = zhKeys.filter((k) => !enKeys.includes(k))

if (!missing.length) {
  console.log('No missing keys. Skip AI generation.')
  process.exit(0)
}

if (!process.env.OPENAI_API_KEY) {
  console.log('OPENAI_API_KEY not set. Skip AI generation.')
  process.exit(0)
}

const response = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-4.1-mini',
    input: `You are an i18n assistant. Translate these keys into English YAML nodes only: ${JSON.stringify(missing)}`
  })
})

if (!response.ok) {
  console.error(`OpenAI request failed: ${response.status}`)
  process.exit(1)
}

const data = await response.json()
const text = (data.output_text || '').trim()

if (!text) {
  console.log('No AI output returned. Skip file update.')
  process.exit(0)
}

await appendFile(enPath, `\n\n# AI suggestions\n${text}\n`, 'utf-8')
console.log(`Appended AI suggestions for ${missing.length} missing key(s).`)
