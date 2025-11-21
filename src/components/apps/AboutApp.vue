<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const skills = [
  'Vue.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vite', 'Pinia', 'Git', 'Docker'
]
</script>

<template>
  <div class="p-6 text-text-base h-full overflow-y-auto">
    <div
      class="flex items-center gap-6 mb-8 pb-6 border-b border-primary/20 flex-col text-center sm:flex-row sm:text-left">
      <img src="/src/assets/images/profile-picture.jpg" alt="Profile"
        class="w-[100px] h-[100px] rounded-full border-[3px] border-primary object-cover shadow-[0_0_20px_rgba(0,255,136,0.3)] shadow-primary/30" />
      <div class="flex-1">
        <h1 class="font-display text-2xl text-primary m-0 mb-1">{{ t('hero.title') }}</h1>
        <p class="text-base text-text-secondary m-0 mb-3">{{ t('about.role') }}</p>
        <p class="text-sm leading-relaxed text-text-base m-0">{{ t('hero.description') }}</p>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="font-display text-lg text-primary m-0 mb-4 flex items-center gap-2 justify-center sm:justify-start">
        <span class="hidden sm:block w-1 h-[18px] bg-primary rounded-sm"></span>
        {{ t('startMenu.bio') }}
      </h2>
      <p class="text-sm leading-relaxed text-text-muted m-0">
        {{ t('about.bioText') }}
      </p>
    </div>

    <div class="mb-8">
      <h2 class="font-display text-lg text-primary m-0 mb-4 flex items-center gap-2 justify-center sm:justify-start">
        <span class="hidden sm:block w-1 h-[18px] bg-primary rounded-sm"></span>
        {{ t('startMenu.skills') }}
      </h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in skills" :key="skill"
          class="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-[13px] text-primary transition-all duration-200 hover:bg-primary/20 hover:-translate-y-0.5">
          {{ skill }}
        </span>
      </div>
    </div>

    <div class="mb-8">
      <button
        class="flex items-center gap-2 px-5 py-2.5 bg-primary text-background-dark border-none rounded-md font-semibold cursor-pointer transition-all duration-200 hover:bg-primary-light hover:shadow-glow">
        <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        {{ t('startMenu.resume') }}
      </button>
    </div>
  </div>
</template>
