<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const projects = computed(() => [
  {
    id: 1,
    title: t('projects.items.item1.title'),
    description: t('projects.items.item1.description'),
    tech: ['Vue 3', 'Node.js', 'MongoDB'],
    image: 'https://placehold.co/600x400/002010/00ff88?text=E-Commerce',
    link: '#'
  },
  {
    id: 2,
    title: t('projects.items.item2.title'),
    description: t('projects.items.item2.description'),
    tech: ['React', 'Firebase', 'Tailwind'],
    image: 'https://placehold.co/600x400/002010/00ff88?text=Task+App',
    link: '#'
  },
  {
    id: 3,
    title: t('projects.items.item3.title'),
    description: t('projects.items.item3.description'),
    tech: ['TypeScript', 'OpenWeather API', 'Chart.js'],
    image: 'https://placehold.co/600x400/002010/00ff88?text=Weather',
    link: '#'
  },
  {
    id: 4,
    title: t('projects.items.item4.title'),
    description: t('projects.items.item4.description'),
    tech: ['Vue 3', 'TypeScript', 'Tailwind v4'],
    image: 'https://placehold.co/600x400/002010/00ff88?text=Portfolio',
    link: '#'
  }
])
</script>

<template>
  <div class="p-6 text-text-base">
    <div class="mb-8 border-b border-primary/20 pb-4">
      <h1 class="font-display text-2xl text-primary m-0 mb-2">{{ t('taskbar.projects') }}</h1>
      <p class="text-sm text-text-secondary m-0">{{ t('projects.subtitle') }}</p>
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
      <div v-for="project in projects" :key="project.id"
        class="bg-background-dark/60 border border-primary/20 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_24px_rgba(0,255,136,0.15)] hover:shadow-primary/15 group">
        <div class="relative h-40 overflow-hidden">
          <img :src="project.image" :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div
            class="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <a :href="project.link"
              class="px-4 py-2 bg-primary text-background-dark no-underline font-semibold rounded text-sm translate-y-2.5 transition-transform duration-300 group-hover:translate-y-0">{{
                t('projects.viewProject') }}</a>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-display text-base text-text-base m-0 mb-2">{{ project.title }}</h3>
          <p class="text-[13px] text-text-muted m-0 mb-4 leading-relaxed">{{ project.description }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tech in project.tech" :key="tech"
              class="text-[11px] px-2 py-0.5 bg-primary/5 border border-primary/20 rounded-full text-primary">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
