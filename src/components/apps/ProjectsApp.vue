<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import IconGithub from '@/components/icons/IconGithub.vue'

const { t } = useI18n()

const projects = computed(() => [
  {
    id: 1,
    title: t('projects.items.item1.title'),
    description: t('projects.items.item1.description'),
    tech: ['Vue 3', 'PHP', 'MySQL', 'Apache'],
    repoFe: 'https://github.com/Neshke/nexton-ecommerce',
    repoBe: 'https://github.com/Neshke/nexton-shop'
  },
  {
    id: 2,
    title: t('projects.items.item2.title'),
    description: t('projects.items.item2.description'),
    tech: ['JavaScript', 'OpenWeather API', 'Vuetify'],
    repo: 'https://github.com/Neshke/small-weather-app'
  },
  {
    id: 3,
    title: t('projects.items.item3.title'),
    description: t('projects.items.item3.description'),
    tech: ['Vue.js', 'Tailwind CSS'],
    repo: 'https://github.com/Neshke/Voka-Kop',
    link: 'https://vokakop.com'
  },
  {
    id: 4,
    title: t('projects.items.item4.title'),
    description: t('projects.items.item4.description'),
    tech: ['Vue.js', 'PHP', 'MySQL'],
    repo: 'https://github.com/Neshke/deltagraf',
    link: 'https://deltagraf.rs'
  },
  {
    id: 5,
    title: t('projects.items.item5.title'),
    description: t('projects.items.item5.description'),
    tech: ['Kotlin', 'Android SDK', 'Firebase'],
    repo: 'https://gitlab.com/Neshke/mini-health-app'
  }
])
</script>

<template>
  <div class="p-6 text-text-base h-full overflow-y-auto custom-scrollbar">
    <div class="mb-8 border-b border-primary/20 pb-4">
      <h1 class="font-display text-2xl text-primary m-0 mb-2">{{ t('taskbar.projects') }}</h1>
      <p class="text-sm text-text-secondary m-0">{{ t('projects.subtitle') }}</p>
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 pb-6">
      <div v-for="project in projects" :key="project.id"
        class="bg-background-dark/60 border border-primary/20 rounded-lg p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_24px_rgba(0,255,136,0.15)] hover:shadow-primary/15 group">
        
        <div class="flex justify-between items-start mb-4">
          <h3 class="font-display text-lg text-text-base m-0 group-hover:text-primary transition-colors">{{ project.title }}</h3>
          
          <!-- Live Link Icon (if available) -->
          <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer"
             class="text-text-muted hover:text-primary transition-colors" :title="t('projects.viewProject')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>

        <p class="text-sm text-text-muted m-0 mb-6 leading-relaxed grow">{{ project.description }}</p>
        
        <div class="flex flex-wrap gap-2 mb-6">
          <span v-for="tech in project.tech" :key="tech"
            class="text-xs px-2.5 py-1 bg-primary/5 border border-primary/20 rounded text-primary font-mono">
            {{ tech }}
          </span>
        </div>

        <div class="mt-auto pt-4 border-t border-primary/10 flex flex-wrap gap-3">
          <!-- Dual Repo Buttons (Nexton) -->
          <template v-if="project.repoFe && project.repoBe">
            <a :href="project.repoFe" target="_blank" rel="noopener noreferrer"
              class="flex items-center gap-2 text-xs px-3 py-2 bg-background-dark border border-primary/30 rounded hover:bg-primary/10 hover:border-primary transition-all text-text-base no-underline">
              <IconGithub class="w-4 h-4 text-primary" />
              {{ t('projects.viewFe') }}
            </a>
            <a :href="project.repoBe" target="_blank" rel="noopener noreferrer"
              class="flex items-center gap-2 text-xs px-3 py-2 bg-background-dark border border-primary/30 rounded hover:bg-primary/10 hover:border-primary transition-all text-text-base no-underline">
              <IconGithub class="w-4 h-4 text-primary" />
              {{ t('projects.viewBe') }}
            </a>
          </template>

          <!-- Single Repo Button -->
          <a v-else-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-2 text-xs px-3 py-2 bg-background-dark border border-primary/30 rounded hover:bg-primary/10 hover:border-primary transition-all text-text-base no-underline">
            <IconGithub class="w-4 h-4 text-primary" />
            {{ t('projects.viewCode') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
