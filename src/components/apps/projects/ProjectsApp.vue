<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import ProjectCard from './ProjectCard.vue'
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
  <div class="projects-container">
    <div class="page-header">
      <h1 class="page-title">{{ t('taskbar.projects') }}</h1>
      <p class="page-subtitle">{{ t('projects.subtitle') }}</p>
    </div>

    <div class="projects-grid">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.projects-container {
  @apply p-6 text-text-base h-full overflow-y-auto;
}

.page-header {
  @apply mb-8 border-b border-primary/20 pb-4;
}

.page-title {
  @apply font-display text-2xl text-primary m-0 mb-2;
}

.page-subtitle {
  @apply text-sm text-text-secondary m-0;
}

/* Projects Grid */
.projects-grid {
  @apply grid gap-6 pb-6;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
