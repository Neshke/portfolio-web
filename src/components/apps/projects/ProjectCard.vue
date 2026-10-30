<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import IconGithub from '@/assets/icons/IconGithub.vue'
import IconExternalLink from '@/assets/icons/IconExternalLink.vue'
import IconMedal from '@/assets/icons/IconMedal.vue'
import IconDocument from '@/assets/icons/IconDocument.vue'
import IconSearch from '@/assets/icons/IconSearch.vue'
import IconDownload from '@/assets/icons/IconDownload.vue'
import type { Project, ProjectLink, ProjectLinkKind } from '@/models/ProjectsApp/interfaces'

const props = defineProps<{
  project: Project
}>()

const { t } = useI18n()

const linkIcons: Record<ProjectLinkKind, typeof IconGithub> = {
  website: IconExternalLink,
  play: IconExternalLink,
  dashboard: IconExternalLink,
  code: IconGithub,
  codeFe: IconGithub,
  codeBe: IconGithub,
  gazette: IconDocument,
  registry: IconSearch,
  pdf: IconDownload,
}

const isExternal = (link: ProjectLink) => link.href.startsWith('http')

const headingId = computed(() => `project-${props.project.id}`)
</script>

<template>
  <article
    class="project"
    :class="{ 'project-featured': project.featured }"
    :aria-labelledby="headingId"
  >
    <div class="project-body">
      <img
        v-if="project.image"
        :src="project.image.src"
        :width="project.image.width"
        :height="project.image.height"
        :alt="t('projects.screenshotAlt', { site: project.image.site })"
        class="project-image"
        loading="lazy"
        decoding="async"
      />

      <div class="project-text">
        <div class="project-head">
          <h3 :id="headingId" class="project-title">{{ t(project.titleKey) }}</h3>
          <p v-if="project.periodKey" class="project-period">{{ t(project.periodKey) }}</p>
        </div>

        <p v-if="project.patent" class="patent-line">
          <IconMedal class="patent-icon" aria-hidden="true" />
          <span class="patent-number">{{
            t('projects.patentLabel', { number: project.patent.number })
          }}</span>
          <span class="patent-application">{{
            t('projects.patentApplication', { number: project.patent.application })
          }}</span>
        </p>

        <p class="project-description">{{ t(project.descriptionKey) }}</p>

        <p v-if="!project.featured" class="project-tech">{{ project.tech.join(', ') }}</p>
        <ul v-else class="chip-list project-chips" :aria-label="t('projects.techLabel')">
          <li v-for="tech in project.tech" :key="tech" class="chip">{{ tech }}</li>
        </ul>

        <ul class="project-links">
          <li v-for="(link, index) in project.links" :key="link.href">
            <a
              :href="link.href"
              :target="isExternal(link) ? '_blank' : undefined"
              :rel="isExternal(link) ? 'noopener noreferrer' : undefined"
              :download="link.download ? '' : undefined"
              :class="
                project.featured ? ['btn', 'btn-sm', index === 0 ? 'btn-primary' : ''] : 'text-link'
              "
            >
              <component :is="linkIcons[link.kind]" class="link-icon" aria-hidden="true" />
              {{ t(`projects.links.${link.kind}`) }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped>
@reference "@/assets/main.css";

.project {
  padding-top: 18px;
  border-top: 1px solid var(--color-border);
}

.project-featured {
  container-type: inline-size;
  padding: 24px;
  border: 1px solid var(--color-border-accent);
  border-radius: 12px;
  background-color: var(--color-surface);
}

/* Thumbnails for client sites: 16:10, above the title */
.project-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  margin-bottom: 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background-dark);
}

.project-featured .project-image {
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;
}

/* Wide card: text on the left, the screenshot on the right */
@container (min-width: 640px) {
  .project-featured .project-body {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    column-gap: 28px;
    align-items: start;
  }

  .project-featured .project-image {
    order: 2;
    margin: 6px 0 0;
  }
}

.project-head {
  @apply flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1;
}

.project-title {
  margin: 0;
  font-family: var(--font-display);
  font-stretch: 110%;
  font-weight: 650;
  font-size: 17px;
  line-height: 1.3;
  color: var(--color-text-base);
}

.project-featured .project-title {
  font-stretch: 120%;
  font-weight: 750;
  font-size: 26px;
  letter-spacing: -0.015em;
}

.project-period {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
  white-space: nowrap;
}

.patent-line {
  @apply flex flex-wrap items-center gap-x-3 gap-y-1;
  margin: 8px 0 0;
  font-size: 13.5px;
}

.patent-icon {
  width: 15px;
  height: 15px;
  color: var(--color-patent);
}

.patent-number {
  font-weight: 600;
  color: var(--color-patent);
}

.patent-application {
  color: var(--color-text-muted);
}

.project-description {
  margin: 8px 0 0;
  max-width: 68ch;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.project-featured .project-description {
  margin-top: 12px;
  font-size: 15.5px;
}

.project-tech {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--color-text-muted);
}

.project-chips {
  margin-top: 16px;
}

.project-links {
  @apply flex flex-wrap items-center gap-x-4 gap-y-2 list-none p-0;
  margin: 12px 0 0;
  font-size: 14px;
}

.project-featured .project-links {
  @apply gap-2;
  margin-top: 20px;
}

.project-links a {
  @apply inline-flex items-center gap-1.5;
}

.link-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* Phones: text links get a taller hit area without changing how they look */
@media (max-width: 767px) {
  .project-links {
    row-gap: 0;
  }

  .project-links a.text-link {
    min-height: 44px;
  }
}
</style>
