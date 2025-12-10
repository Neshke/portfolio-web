<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import { projectsData } from '@/data/projects'
import type { Project } from '@/models/ProjectsApp/interfaces'

const { t } = useI18n()

const projects = computed<Project[]>(() => {
  return projectsData.map(project => ({
    ...project,
    title: t(project.title),
    description: t(project.description)
  }))
})
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
          <h3 class="font-display text-lg text-text-base m-0 group-hover:text-primary transition-colors">{{
            project.title }}</h3>

          <!-- Live Link Icon (if available) -->
          <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer"
            class="text-text-muted hover:text-primary transition-colors" :title="t('projects.viewProject')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
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

          <!-- Patent Badge and Links -->
          <template v-else-if="project.isPatent">
            <span
              class="flex items-center gap-2 text-xs px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
              </svg>
              {{ t('projects.patent') }}: {{ project.patentNumber }}
            </span>
            <a v-if="project.patentPdf" :href="project.patentPdf" target="_blank" rel="noopener noreferrer"
              class="flex items-center gap-2 text-xs px-3 py-2 bg-background-dark border border-primary/30 rounded hover:bg-primary/10 hover:border-primary transition-all text-text-base no-underline">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {{ t('projects.viewGazette') }}
            </a>
            <a v-if="project.patentRegistry" :href="project.patentRegistry" target="_blank" rel="noopener noreferrer"
              class="flex items-center gap-2 text-xs px-3 py-2 bg-background-dark border border-primary/30 rounded hover:bg-primary/10 hover:border-primary transition-all text-text-base no-underline">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              {{ t('projects.searchRegistry') }}
            </a>
            <a v-if="project.patentDocument" :href="project.patentDocument" download
              class="flex items-center gap-2 text-xs px-3 py-2 bg-background-dark border border-primary/30 rounded hover:bg-primary/10 hover:border-primary transition-all text-text-base no-underline">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              {{ t('projects.downloadPatent') }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
