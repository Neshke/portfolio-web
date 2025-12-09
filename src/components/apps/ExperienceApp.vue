<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { experiencesData } from '@/data/experience'
import type { Experience, Project } from '@/models/ExperienceApp/interfaces'

const { t } = useI18n()

const experiences = computed<Experience[]>(() => {
  return experiencesData.map(exp => ({
    id: exp.id,
    role: t(exp.roleKey),
    company: t(exp.companyKey),
    period: t(exp.periodKey),
    description: t(exp.descriptionKey),
    projects: exp.projects?.map(proj => {
      const project: Project = {
        name: proj.name,
        url: proj.url,
        image: proj.image,
        tech: 'tech' in proj ? proj.tech : undefined
      }

      if ('descriptionKey' in proj && proj.descriptionKey) {
        project.description = t(proj.descriptionKey)
      }

      if ('achievementsBaseKey' in proj && 'achievementsCount' in proj && proj.achievementsBaseKey && proj.achievementsCount) {
        project.achievements = Array.from({ length: proj.achievementsCount }, (_, i) => 
          t(`${proj.achievementsBaseKey}[${i}]`)
        )
      }

      return project
    })
  }))
})
</script>

<template>
  <div class="p-6 text-text-base">
    <div class="mb-10 border-b border-primary/20 pb-4">
      <h1 class="font-display text-2xl text-primary m-0 mb-2">{{ t('taskbar.experience') }}</h1>
      <p class="text-sm text-text-secondary m-0">{{ t('experience.subtitle') }}</p>
    </div>

    <div
      class="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-linear-to-b before:from-primary before:to-primary/10">
      <div v-for="exp in experiences" :key="exp.id" class="relative pl-8 mb-10 last:mb-0 group">
        <div
          class="absolute -left-[5px] top-0 w-3 h-3 bg-background-dark border-2 border-primary rounded-full shadow-[0_0_10px_rgba(0,255,136,0.5)] shadow-primary/50 z-10 transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_15px_#00ff88] group-hover:shadow-primary">
        </div>
        <div
          class="bg-primary/3 border border-primary/10 rounded-lg p-5 transition-all duration-300 group-hover:bg-primary/8 group-hover:border-primary/30 group-hover:translate-x-1">
          <div class="flex justify-between items-start mb-1 flex-wrap gap-2">
            <h3 class="font-display text-lg text-text-base m-0">{{ exp.role }}</h3>
            <span class="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">{{
              exp.period }}</span>
          </div>
          <h4 class="text-sm text-text-secondary m-0 mb-3 font-medium">{{ exp.company }}</h4>
          <p class="text-sm leading-relaxed text-text-muted m-0">{{ exp.description }}</p>

          <div v-if="exp.projects" class="mt-6 grid grid-cols-1 gap-6">
            <div v-for="project in exp.projects" :key="project.name"
              class="bg-background-dark/40 border border-primary/10 rounded-lg overflow-hidden hover:border-primary/40 transition-all group/project">
              <a :href="project.url" target="_blank" rel="noopener noreferrer"
                class="block h-48 overflow-hidden relative border-b border-primary/5 no-underline">
                <img :src="project.image" :alt="project.name"
                  class="w-full h-full object-cover opacity-80 group-hover/project:opacity-100 group-hover/project:scale-105 transition-all duration-500">
                <div
                  class="absolute inset-0 bg-black/20 group-hover/project:bg-transparent transition-colors flex items-center justify-center">
                  <div
                    class="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium opacity-0 translate-y-2 group-hover/project:opacity-100 group-hover/project:translate-y-0 transition-all duration-300 flex items-center gap-2">
                    {{ t('projects.viewProject') }}
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>
                </div>
              </a>
              <div class="p-5 bg-primary/5">
                <div class="flex items-center justify-between mb-3">
                  <h5 class="text-base font-display text-text-base m-0">{{ project.name }}</h5>
                </div>

                <p v-if="project.description" class="text-sm text-text-muted mb-4 leading-relaxed">{{
                  project.description }}</p>

                <ul v-if="project.achievements" class="m-0 pl-4 list-disc space-y-1.5 mb-4">
                  <li v-for="(achievement, index) in project.achievements" :key="index"
                    class="text-xs text-text-secondary leading-relaxed pl-1 marker:text-primary/70">
                    {{ achievement }}
                  </li>
                </ul>

                <div v-if="project.tech" class="flex flex-wrap gap-1.5 pt-2 border-t border-primary/10">
                  <span v-for="tech in project.tech" :key="tech"
                    class="text-[10px] px-2 py-0.5 bg-primary/5 border border-primary/20 rounded-full text-primary/80">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
