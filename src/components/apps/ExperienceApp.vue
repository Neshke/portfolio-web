<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { experiencesData } from '@/data/experience'
import IconExternalLink from '@/components/icons/IconExternalLink.vue'
import type { Experience } from '@/models/ExperienceApp/interfaces'

const { t } = useI18n()

const experiences = computed<Experience[]>(() =>
  experiencesData.map(exp => ({
    id: exp.id,
    role: t(exp.roleKey),
    company: t(exp.companyKey),
    period: t(exp.periodKey),
    description: t(exp.descriptionKey),
    projects: exp.projects?.map(proj => ({
      name: proj.name,
      url: proj.url,
      image: proj.image,
      tech: proj.tech,
      description: proj.descriptionKey ? t(proj.descriptionKey) : undefined,
      achievements: proj.achievementKeys?.map(key => t(key))
    }))
  }))
)
</script>

<template>
  <div class="experience-container">
    <div class="page-header">
      <h1 class="page-title">{{ t('taskbar.experience') }}</h1>
      <p class="page-subtitle">{{ t('experience.subtitle') }}</p>
    </div>

    <div class="timeline">
      <div v-for="exp in experiences" :key="exp.id" class="timeline-item group">
        <div class="timeline-dot"></div>
        <div class="experience-card">
          <div class="card-header">
            <h3 class="role-title">{{ exp.role }}</h3>
            <span class="period-badge">{{ exp.period }}</span>
          </div>
          <h4 class="company-name">{{ exp.company }}</h4>
          <p class="role-description">{{ exp.description }}</p>

          <div v-if="exp.projects" class="projects-grid">
            <div v-for="project in exp.projects" :key="project.name" class="project-card group/project">
              <a :href="project.url" target="_blank" rel="noopener noreferrer" class="project-image-link">
                <img :src="project.image" :alt="project.name" class="project-image" />
                <div class="project-overlay">
                  <div class="view-project-button">
                    {{ t('projects.viewProject') }}
                    <IconExternalLink class="link-icon" />
                  </div>
                </div>
              </a>
              <div class="project-content">
                <div class="project-header">
                  <h5 class="project-name">{{ project.name }}</h5>
                </div>

                <p v-if="project.description" class="project-description">{{ project.description }}</p>

                <ul v-if="project.achievements" class="achievements-list">
                  <li v-for="(achievement, index) in project.achievements" :key="index" class="achievement-item">
                    {{ achievement }}
                  </li>
                </ul>

                <div v-if="project.tech" class="tech-tags">
                  <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.experience-container {
  @apply p-6 text-text-base;
}

.page-header {
  @apply mb-10 border-b border-primary/20 pb-4;
}

.page-title {
  @apply font-display text-2xl text-primary m-0 mb-2;
}

.page-subtitle {
  @apply text-sm text-text-secondary m-0;
}

/* Timeline */
.timeline {
  @apply relative pl-5;
}

.timeline::before {
  content: '';
  @apply absolute left-0 top-0 bottom-0 w-0.5;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-primary-10));
}

.timeline-item {
  @apply relative pl-8 mb-10 last:mb-0;
}

.timeline-dot {
  @apply absolute -left-[5px] top-0 w-3 h-3 bg-background-dark border-2 border-primary rounded-full z-10;
  @apply shadow-primary/50;
  @apply transition-all duration-300;
  @apply group-hover:bg-primary group-hover:shadow-primary;
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
}

.timeline-dot:hover {
  box-shadow: 0 0 15px rgba(96, 165, 250, 0.8);
}

/* Experience Card */
.experience-card {
  @apply bg-primary/3 border border-primary/10 rounded-lg p-5;
  @apply transition-all duration-300;
  @apply group-hover:bg-primary/8 group-hover:border-primary/30 group-hover:translate-x-1;
}

.card-header {
  @apply flex justify-between items-start mb-1 flex-wrap gap-2;
}

.role-title {
  @apply font-display text-lg text-text-base m-0;
}

.period-badge {
  @apply text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20;
}

.company-name {
  @apply text-sm text-text-secondary m-0 mb-3 font-medium;
}

.role-description {
  @apply text-sm leading-relaxed text-text-muted m-0;
}

/* Projects Grid */
.projects-grid {
  @apply mt-6 grid grid-cols-1 gap-6;
}

.project-card {
  @apply bg-background-dark/40 border border-primary/10 rounded-lg overflow-hidden;
  @apply hover:border-primary/40 transition-all;
}

.project-image-link {
  @apply block h-48 overflow-hidden relative border-b border-primary/5 no-underline;
}

.project-image {
  @apply w-full h-full object-cover opacity-80;
  @apply group-hover/project:opacity-100 group-hover/project:scale-105;
  @apply transition-all duration-500;
}

.project-overlay {
  @apply absolute inset-0 bg-black/20 flex items-center justify-center;
  @apply group-hover/project:bg-transparent transition-colors;
}

.view-project-button {
  @apply bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full;
  @apply border border-primary/30 text-primary text-sm font-medium;
  @apply opacity-0 translate-y-2 flex items-center gap-2;
  @apply group-hover/project:opacity-100 group-hover/project:translate-y-0;
  @apply transition-all duration-300;
}

.link-icon {
  @apply w-3 h-3;
}

.project-content {
  @apply p-5 bg-primary/5;
}

.project-header {
  @apply flex items-center justify-between mb-3;
}

.project-name {
  @apply text-base font-display text-text-base m-0;
}

.project-description {
  @apply text-sm text-text-muted mb-4 leading-relaxed;
}

/* Achievements */
.achievements-list {
  @apply m-0 pl-4 list-disc space-y-1.5 mb-4;
}

.achievement-item {
  @apply text-xs text-text-secondary leading-relaxed pl-1 marker:text-primary/70;
}

/* Tech Tags */
.tech-tags {
  @apply flex flex-wrap gap-1.5 pt-2 border-t border-primary/10;
}

.tech-tag {
  @apply text-[10px] px-2 py-0.5 bg-primary/5 border border-primary/20 rounded-full text-primary/80;
}
</style>
