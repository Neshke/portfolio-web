<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { experienceRoles } from '@/data/experience'
import { cvFile } from '@/data/contact'
import IconExternalLink from '@/assets/icons/IconExternalLink.vue'
import IconDownload from '@/assets/icons/IconDownload.vue'

const { t } = useI18n()
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h2 class="page-title">{{ t('experience.title') }}</h2>
      <a :href="cvFile.url" :download="cvFile.fileName" class="btn btn-sm">
        <IconDownload aria-hidden="true" />
        {{ t('actions.fullCv') }}
      </a>
    </header>

    <ol class="timeline">
      <li
        v-for="role in experienceRoles"
        :key="role.id"
        class="role"
        :class="{ 'role-current': role.current }"
      >
        <span class="role-dot" aria-hidden="true"></span>

        <div class="role-head">
          <h3 class="role-title">{{ t(role.titleKey) }}</h3>
          <p class="role-period">{{ t(role.periodKey) }}</p>
        </div>
        <p class="role-company">
          {{ role.company ?? (role.companyKey ? t(role.companyKey) : '') }}
        </p>

        <p v-if="role.introKey" class="role-intro">{{ t(role.introKey) }}</p>

        <ul v-if="role.links?.length" class="role-links">
          <li v-for="link in role.links" :key="link.href">
            <a :href="link.href" target="_blank" rel="noopener noreferrer" class="text-link">
              {{ link.text }}
              <IconExternalLink class="link-icon" aria-hidden="true" />
            </a>
          </li>
        </ul>

        <ul v-if="role.bulletKeys?.length" class="bullets role-bullets">
          <li v-for="key in role.bulletKeys" :key="key">{{ t(key) }}</li>
        </ul>

        <details v-if="role.details" class="role-details">
          <summary class="role-details-summary">{{ t(role.details.summaryKey) }}</summary>
          <ul class="bullets">
            <li v-for="key in role.details.bulletKeys" :key="key">{{ t(key) }}</li>
          </ul>
        </details>

        <section v-for="group in role.groups" :key="group.name" class="role-group">
          <div class="group-head">
            <h4 class="group-name">{{ group.name }}</h4>
            <a :href="group.link.href" target="_blank" rel="noopener noreferrer" class="text-link">
              {{ group.link.text }}
              <IconExternalLink class="link-icon" aria-hidden="true" />
            </a>
          </div>
          <p class="group-stack">
            <span class="group-stack-label">{{ t('experience.stack') }}:</span> {{ group.stack }}
          </p>
          <ul class="bullets">
            <li v-for="key in group.bulletKeys" :key="key">{{ t(key) }}</li>
          </ul>
        </section>
      </li>
    </ol>
  </article>
</template>

<style scoped>
@reference "@/assets/main.css";

.timeline {
  @apply relative m-0 p-0 list-none;
  padding-left: 28px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background-color: var(--color-border-strong);
}

.role {
  position: relative;
}

.role + .role {
  margin-top: 40px;
}

.role-dot {
  position: absolute;
  left: -28px;
  top: 7px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: var(--color-background-elevated);
  border: 2px solid var(--color-text-dim);
}

.role-current .role-dot {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
}

.role-head {
  @apply flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1;
}

.role-title {
  margin: 0;
  font-family: var(--font-display);
  font-stretch: 112%;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.25;
  color: var(--color-text-base);
}

.role-period {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.role-current .role-period {
  color: var(--color-primary);
}

.role-company {
  margin: 4px 0 0;
  font-size: 15px;
  font-weight: 550;
  color: var(--color-text-secondary);
}

.role-intro {
  margin: 12px 0 0;
  max-width: 68ch;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.role-links {
  @apply flex flex-wrap gap-x-5 gap-y-1 list-none p-0;
  margin: 10px 0 0;
  font-size: 14px;
}

.role-links a,
.group-head a {
  @apply inline-flex items-center gap-1;
}

.link-icon {
  width: 12px;
  height: 12px;
}

.role-bullets {
  margin-top: 16px;
}

.role-details {
  margin-top: 14px;
  max-width: 70ch;
}

.role-details-summary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  font-size: 14px;
  font-weight: 550;
  color: var(--color-primary);
  cursor: pointer;
  list-style: none;
}

.role-details-summary::-webkit-details-marker {
  display: none;
}

/* A small chevron that turns when the fold opens */
.role-details-summary::before {
  content: '';
  width: 7px;
  height: 7px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(-45deg);
  transition: transform 160ms ease;
}

.role-details[open] > .role-details-summary::before {
  transform: rotate(45deg);
}

.role-details[open] > .bullets {
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 767px) {
  .role-details-summary {
    min-height: 44px;
  }

  .role-links {
    row-gap: 0;
  }

  .role-links a,
  .group-head a {
    min-height: 44px;
  }
}

.role-group {
  margin-top: 22px;
}

.group-head {
  @apply flex flex-wrap items-baseline gap-x-3 gap-y-1;
  font-size: 14px;
}

.group-name {
  margin: 0;
  font-size: 16px;
  font-weight: 650;
  color: var(--color-text-base);
}

.group-stack {
  margin: 4px 0 10px;
  font-size: 13.5px;
  color: var(--color-text-muted);
}

.group-stack-label {
  color: var(--color-text-secondary);
  font-weight: 550;
}
</style>
