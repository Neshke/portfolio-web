<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import IconGithub from '@/assets/icons/IconGithub.vue'
import IconExternalLink from '@/assets/icons/IconExternalLink.vue'
import IconMedal from '@/assets/icons/IconMedal.vue'
import IconDocument from '@/assets/icons/IconDocument.vue'
import IconSearch from '@/assets/icons/IconSearch.vue'
import IconDownload from '@/assets/icons/IconDownload.vue'
import type { Project } from '@/models/ProjectsApp/interfaces'

defineProps<{
  project: Project
}>()

const { t } = useI18n()
</script>

<template>
  <div class="project-card group">
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
</template>

<style scoped>
@reference "@/assets/main.css";

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

.external-link-icon {
  @apply text-xl shrink-0;
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
