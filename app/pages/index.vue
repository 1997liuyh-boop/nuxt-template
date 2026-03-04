<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const { data, pending } = await useFetch('/api/openclow-status')

const switchLocale = async () => {
  const next = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
  await setLocale(next)
}
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
    <header class="rounded-2xl border border-slate-700 bg-slate-900/80 p-6">
      <p class="text-sm uppercase tracking-[0.2em] text-cyan-300">Nuxt 4 + OpenClow + TailwindCSS</p>
      <h1 class="mt-2 text-3xl font-semibold">{{ t('home.title') }}</h1>
      <p class="mt-2 text-slate-300">{{ t('home.subtitle') }}</p>

      <div class="mt-5 flex items-center gap-3">
        <button
          class="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400"
          @click="switchLocale"
        >
          {{ t('home.switchLanguage') }}
        </button>
        <span class="text-xs text-slate-400">
          {{ t('home.currentLanguage') }}: {{ locale }}
          ({{ locales.find((item) => item.code === locale)?.name }})
        </span>
      </div>
    </header>

    <section class="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
      <h2 class="text-xl font-medium">{{ t('home.openclowStatus') }}</h2>
      <p class="mt-2 text-slate-300" v-if="pending">{{ t('home.loading') }}</p>
      <pre v-else class="mt-3 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-cyan-200">{{ data }}</pre>
    </section>
  </main>
</template>
