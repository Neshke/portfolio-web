<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconExternalLink from '@/components/icons/IconExternalLink.vue'
import IconMedal from '@/components/icons/IconMedal.vue'
import IconDocument from '@/components/icons/IconDocument.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconDownload from '@/components/icons/IconDownload.vue'
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
      <div v-for="project in projects" :key="project.id" class="project-card group">
        <div class="card-header">
          <h3 class="project-title">{{ project.title }}</h3>
          <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="external-link"
            :title="t('projects.viewProject')">
            <IconExternalLink class="external-link-icon" />
          </a>
        </div>

        <p class="project-description">{{ project.description }}</p>

        <div class="tech-tags">
          <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>

        <div class="card-footer">
          <!-- Dual Repo Buttons -->
          <template v-if="project.repoFe && project.repoBe">
            <a :href="project.repoFe" target="_blank" rel="noopener noreferrer" class="repo-link">
              <IconGithub class="repo-icon" />
              {{ t('projects.viewFe') }}
            </a>
            <a :href="project.repoBe" target="_blank" rel="noopener noreferrer" class="repo-link">
              <IconGithub class="repo-icon" />
              {{ t('projects.viewBe') }}
            </a>
          </template>

          <!-- Single Repo Button -->
          <a v-else-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer" class="repo-link">
            <IconGithub class="repo-icon" />
            {{ t('projects.viewCode') }}
          </a>

          <!-- Patent Badge and Links -->
          <template v-else-if="project.isPatent">
            <span class="patent-badge">
              <IconMedal class="patent-icon" />
              {{ t('projects.patent') }}: {{ project.patentNumber }}
            </span>
            <a v-if="project.patentPdf" :href="project.patentPdf" target="_blank" rel="noopener noreferrer"
              class="repo-link">
              <IconDocument class="repo-icon" />
              {{ t('projects.viewGazette') }}
            </a>
            <a v-if="project.patentRegistry" :href="project.patentRegistry" target="_blank" rel="noopener noreferrer"
              class="repo-link">
              <IconSearch class="repo-icon" />
              {{ t('projects.searchRegistry') }}
            </a>
            <a v-if="project.patentDocument" :href="project.patentDocument" download class="repo-link">
              <IconDownload class="repo-icon" />
              {{ t('projects.downloadPatent') }}
            </a>
          </template>
        </div>
      </div>
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

.project-card {
  @apply bg-background-dark/60 border border-primary/20 rounded-lg p-6 flex flex-col;
  @apply transition-all duration-300;
  @apply hover:-translate-y-1 hover:border-primary/50 hover:shadow-primary/15;
}

.card-header {
  @apply flex justify-between items-start mb-4;
}

.project-title {
  @apply font-display text-lg text-text-base m-0;
  @apply group-hover:text-primary transition-colors;
}

.external-link {
  @apply text-text-muted hover:text-primary transition-colors;
}

.project-description {
  @apply text-sm text-text-muted m-0 mb-6 leading-relaxed grow;
}

/* Tech Tags */
.tech-tags {
  @apply flex flex-wrap gap-2 mb-6;
}

.tech-tag {
  @apply text-xs px-2.5 py-1 bg-primary/5 border border-primary/20 rounded text-primary font-mono;
}

/* Card Footer */
.card-footer {
  @apply mt-auto pt-4 border-t border-primary/10 flex flex-wrap gap-3;
}

.repo-link {
  @apply flex items-center gap-2 text-xs px-3 py-2;
  @apply bg-background-dark border border-primary/30 rounded;
  @apply hover:bg-primary/10 hover:border-primary transition-all;
  @apply text-text-base no-underline;
}

.repo-icon {
  @apply text-base text-primary shrink-0;
}

.external-link-icon {
  @apply text-xl shrink-0;
}

/* Patent Badge */
.patent-badge {
  @apply flex items-center gap-2 text-xs px-3 py-2;
  @apply bg-amber-500/10 border border-amber-500/30 rounded;
  @apply text-amber-400 font-semibold;
}

.patent-icon {
  @apply text-base shrink-0;
}
</style>
