<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { skillGroups } from '@/data/about'

const { t } = useI18n()
</script>

<template>
  <!-- The name, photo and role are already on the desktop, so this window starts with the story -->
  <article class="page" aria-labelledby="about-title">
    <h2 id="about-title" class="sr-only">{{ t('apps.about') }}</h2>

    <section class="prose-block about-bio">
      <p class="about-lead">{{ t('about.bio.p1') }}</p>
      <p>{{ t('about.bio.p2') }}</p>
      <p>{{ t('about.bio.p3') }}</p>
    </section>

    <section class="about-section" aria-labelledby="about-skills">
      <h3 id="about-skills" class="section-title">{{ t('about.skillsTitle') }}</h3>
      <dl class="skill-groups">
        <div v-for="group in skillGroups" :key="group.labelKey" class="skill-group">
          <dt class="skill-group-label">{{ t(group.labelKey) }}</dt>
          <dd class="skill-group-items">{{ group.items.join(', ') }}</dd>
        </div>
      </dl>
    </section>

    <section class="about-section" aria-labelledby="about-languages">
      <h3 id="about-languages" class="section-title">{{ t('about.languagesTitle') }}</h3>
      <p class="languages">{{ t('about.languages') }}</p>
    </section>
  </article>
</template>

<style scoped>
@reference "@/assets/main.css";

.about-bio p.about-lead {
  max-width: 60ch;
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-base);
}

.about-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.skill-groups {
  @apply grid m-0;
  gap: 10px;
}

.skill-group {
  @apply grid;
  grid-template-columns: 1fr;
  gap: 2px;
}

@media (min-width: 640px) {
  .skill-group {
    grid-template-columns: 170px 1fr;
    align-items: baseline;
    gap: 16px;
  }
}

.skill-group-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-base);
}

.skill-group-items {
  @apply m-0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.languages {
  margin: 0;
  font-size: 15px;
  color: var(--color-text-secondary);
}

@media (max-width: 640px) {
  .about-bio p.about-lead {
    font-size: 16.5px;
  }
}
</style>
