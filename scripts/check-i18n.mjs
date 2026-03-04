import { readFile } from 'node:fs/promises'
import process from 'node:process'

const baseLocalePath = new URL('../i18n/locales/zh-CN.json', import.meta.url)
const compareLocalePath = new URL('../i18n/locales/en.yaml', import.meta.url)

const flattenJsonKeys = (obj, prefix = '') => {
  return Object.entries(obj).flatMap(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) return flattenJsonKeys(value, next)
    return [next]
  })
}

const flattenYamlKeys = (content) => {
  const stack = []
  const keys = []

  for (const rawLine of content.split('\n')) {
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) continue

    const indent = rawLine.match(/^\s*/)[0].length
    const depth = Math.floor(indent / 2)
    const line = rawLine.trim()
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    stack[depth] = key
    stack.length = depth + 1

    if (value) {
      keys.push(stack.join('.'))
    }
  }

  return keys
}

const zhRaw = await readFile(baseLocalePath, 'utf-8')
const enRaw = await readFile(compareLocalePath, 'utf-8')

const zhKeys = flattenJsonKeys(JSON.parse(zhRaw))
const enKeys = flattenYamlKeys(enRaw)

const missingInEn = zhKeys.filter((k) => !enKeys.includes(k))

if (missingInEn.length === 0) {
  console.log('✅ i18n check passed: en.yaml has all keys from zh-CN.json')
  process.exit(0)
}

console.error('❌ Missing translation keys in en.yaml:')
for (const key of missingInEn) console.error(`- ${key}`)
process.exit(1)
