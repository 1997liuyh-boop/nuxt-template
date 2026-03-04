export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  return {
    provider: 'openclow',
    endpoint: config.public.openclowApiBase,
    configured: Boolean(config.openclowApiKey),
    timestamp: new Date().toISOString()
  }
})
