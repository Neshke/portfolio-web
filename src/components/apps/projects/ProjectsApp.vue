<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectCard from './ProjectCard.vue'
import { projectsData } from '@/data/projects'

const { t } = useI18n()

const featured = computed(() => projectsData.filter((project) => project.featured))
const others = computed(() => projectsData.filter((project) => !project.featured))
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">{{ t('projects.title') }}</h2>
        <p class="page-lede">{{ t('projects.lede') }}</p>
      </div>
    </header>

    <div class="featured">
      <ProjectCard v-for="project in featured" :key="project.id" :project="project" />
    </div>

    <div class="projects-grid">
      <ProjectCard v-for="project in others" :key="project.id" :project="project" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.featured {
  margin-bottom: 32px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
  gap: 28px 36px;
}
</style>
