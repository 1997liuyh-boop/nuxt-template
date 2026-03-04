<script setup lang="ts">
const { t, locale, setLocale } = useI18n()

const sections = computed(() => [
  { id: 'home', label: t('nav.home') },
  { id: 'projects', label: t('nav.projects') },
  { id: 'timeline', label: t('nav.timeline') },
  { id: 'contact', label: t('nav.contact') }
])

const projects = computed(() => [
  {
    title: t('projects.items.studio.title'),
    desc: t('projects.items.studio.desc'),
    stack: ['Nuxt 4', 'TailwindCSS', 'i18n']
  },
  {
    title: t('projects.items.ops.title'),
    desc: t('projects.items.ops.desc'),
    stack: ['OpenClow', 'Nitro API', 'Runtime Config']
  },
  {
    title: t('projects.items.ai.title'),
    desc: t('projects.items.ai.desc'),
    stack: ['GitHub Actions', 'LLM', 'CI Automation']
  }
])

const timeline = computed(() => [
  {
    year: '2026',
    title: t('timeline.items.one.title'),
    desc: t('timeline.items.one.desc')
  },
  {
    year: '2025',
    title: t('timeline.items.two.title'),
    desc: t('timeline.items.two.desc')
  },
  {
    year: '2024',
    title: t('timeline.items.three.title'),
    desc: t('timeline.items.three.desc')
  }
])

const switchLocale = async () => {
  await setLocale(locale.value === 'zh-CN' ? 'en' : 'zh-CN')
}

const goTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="relative overflow-hidden bg-slate-950 text-slate-100">
    <div class="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
    <div class="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

    <header class="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button class="text-sm font-semibold tracking-wide text-cyan-300" @click="goTo('home')">
          {{ t('brand') }}
        </button>
        <nav class="hidden items-center gap-6 text-sm md:flex">
          <button v-for="section in sections" :key="section.id" class="text-slate-300 hover:text-white" @click="goTo(section.id)">
            {{ section.label }}
          </button>
        </nav>
        <button class="rounded-md border border-cyan-400/40 px-3 py-1.5 text-xs text-cyan-200" @click="switchLocale">
          {{ t('common.switchLanguage') }}
        </button>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 pb-20">
      <section id="home" class="grid min-h-[70vh] items-center gap-8 py-16 md:grid-cols-2">
        <div>
          <p class="text-xs uppercase tracking-[0.25em] text-cyan-300">{{ t('hero.kicker') }}</p>
          <h1 class="mt-4 text-4xl font-bold leading-tight md:text-6xl">{{ t('hero.title') }}</h1>
          <p class="mt-5 max-w-xl text-slate-300">{{ t('hero.subtitle') }}</p>
          <div class="mt-8 flex gap-3">
            <button class="rounded-lg bg-cyan-500 px-5 py-2.5 font-medium text-slate-950" @click="goTo('projects')">
              {{ t('hero.primaryCta') }}
            </button>
            <button class="rounded-lg border border-slate-700 px-5 py-2.5" @click="goTo('contact')">
              {{ t('hero.secondaryCta') }}
            </button>
          </div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-900/20">
          <h2 class="text-lg font-semibold">{{ t('panel.title') }}</h2>
          <p class="mt-2 text-sm text-slate-300">{{ t('panel.desc') }}</p>
          <ul class="mt-4 space-y-2 text-sm text-slate-200">
            <li>• Nuxt 4</li>
            <li>• OpenClow</li>
            <li>• TailwindCSS</li>
            <li>• GitHub Actions + LLM</li>
          </ul>
        </div>
      </section>

      <section id="projects" class="py-12">
        <h2 class="text-2xl font-semibold">{{ t('projects.title') }}</h2>
        <p class="mt-2 text-slate-300">{{ t('projects.subtitle') }}</p>
        <div class="mt-6 grid gap-4 md:grid-cols-3">
          <article v-for="project in projects" :key="project.title" class="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 class="font-medium">{{ project.title }}</h3>
            <p class="mt-2 text-sm text-slate-300">{{ project.desc }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="tag in project.stack" :key="tag" class="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-cyan-200">{{ tag }}</span>
            </div>
          </article>
        </div>
      </section>

      <section id="timeline" class="py-12">
        <h2 class="text-2xl font-semibold">{{ t('timeline.title') }}</h2>
        <div class="mt-6 space-y-4">
          <article v-for="item in timeline" :key="item.year" class="rounded-xl border border-white/10 bg-white/5 p-5">
            <p class="text-xs text-cyan-300">{{ item.year }}</p>
            <h3 class="mt-1 font-medium">{{ item.title }}</h3>
            <p class="mt-2 text-sm text-slate-300">{{ item.desc }}</p>
          </article>
        </div>
      </section>

      <section id="contact" class="py-12">
        <div class="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-6">
          <h2 class="text-2xl font-semibold">{{ t('contact.title') }}</h2>
          <p class="mt-2 text-slate-300">{{ t('contact.subtitle') }}</p>
          <p class="mt-5 text-sm text-cyan-200">{{ t('contact.email') }}: hello@example.com</p>
        </div>
      </section>
    </main>
  </div>
</template>
