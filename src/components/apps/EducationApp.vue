<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { coursework, skills } from '@/data/education'

const { t } = useI18n()
</script>

<template>
  <div class="education-container">
    <div class="page-header">
      <h1 class="page-title">{{ t('startMenu.education') }}</h1>
      <p class="page-subtitle">{{ t('startMenu.educationDescription') }}</p>
    </div>

    <!-- University -->
    <div class="education-card education-card--primary">
      <div class="card-header">
        <div>
          <h3 class="card-title">{{ t('education.degree') }}</h3>
          <p class="card-field">{{ t('education.field') }}</p>
          <p class="card-institution">{{ t('education.institution') }}</p>
        </div>
        <span class="status-badge">{{ t('education.status') }}</span>
      </div>
      <p class="card-description">{{ t('education.description') }}</p>

      <div class="details-grid">
        <div>
          <h4 class="details-title">{{ t('education.courseworkTitle') }}</h4>
          <ul class="details-list">
            <li v-for="item in coursework" :key="item" class="details-item">
              <span class="item-marker">›</span>
              {{ t(item) }}
            </li>
          </ul>
        </div>

        <div>
          <h4 class="details-title">{{ t('education.skillsTitle') }}</h4>
          <ul class="details-list">
            <li v-for="item in skills" :key="item" class="details-item">
              <span class="item-marker">›</span>
              {{ t(item) }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- High School -->
    <div class="education-card education-card--secondary">
      <div class="card-header">
        <div>
          <h3 class="card-title card-title--secondary">{{ t('education.highSchool.title') }}</h3>
          <p class="card-field">{{ t('education.highSchool.course') }}</p>
          <p class="card-institution--muted">{{ t('education.highSchool.institution') }}</p>
        </div>
        <span class="duration-badge">{{ t('education.highSchool.duration') }}</span>
      </div>
      <p class="card-description--small">{{ t('education.highSchool.description') }}</p>
    </div>

    <!-- Music School -->
    <div class="education-card education-card--tertiary">
      <div class="card-header">
        <div>
          <h3 class="card-title card-title--tertiary">{{ t('education.musicSchool.title') }}</h3>
          <p class="card-institution--muted">{{ t('education.musicSchool.institution') }}</p>
        </div>
        <span class="duration-badge">{{ t('education.musicSchool.duration') }}</span>
      </div>
      <p class="card-description--small">{{ t('education.musicSchool.description') }}</p>
      <p class="card-note">{{ t('education.musicSchool.note') }}</p>
    </div>

    <!-- Driving License -->
    <div class="license-card">
      <span class="license-title">{{ t('education.drivingLicense.title') }}</span>
      <span class="license-category">{{ t('education.drivingLicense.category') }}</span>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.education-container {
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

/* Education Cards */
.education-card {
  @apply rounded-lg p-6 mb-6;
}

.education-card--primary {
  @apply bg-background-dark/60 border border-primary/20;
}

.education-card--secondary {
  @apply bg-background-dark/50 border border-primary/15 p-5 mb-4;
}

.education-card--tertiary {
  @apply bg-background-dark/40 border border-primary/10 p-5;
}

.card-header {
  @apply flex justify-between items-start mb-2;
}

.card-title {
  @apply font-display text-lg text-text-base m-0;
}

.card-title--secondary {
  @apply text-base;
}

.card-title--tertiary {
  @apply text-sm text-text-secondary;
}

.card-field {
  @apply text-primary text-sm font-medium mt-1;
}

.card-institution {
  @apply text-text-secondary text-xs mt-1 italic;
}

.card-institution--muted {
  @apply text-text-muted text-xs mt-1;
}

.card-description {
  @apply text-sm text-text-muted leading-relaxed mt-4 mb-6;
}

.card-description--small {
  @apply text-xs text-text-dim leading-relaxed mt-3;
}

.card-note {
  @apply text-[11px] text-primary/60 italic border-l-2 border-primary/20 pl-2 mt-2;
}

/* Badges */
.status-badge {
  @apply text-xs text-text-muted bg-primary/10 px-2 py-1 rounded border border-primary/20;
}

.duration-badge {
  @apply text-[10px] text-text-dim bg-white/5 px-2 py-0.5 rounded border border-white/5;
}

/* Details Grid */
.details-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.details-title {
  @apply font-display text-sm text-primary mb-3 border-b border-primary/10 pb-2;
}

.details-list {
  @apply list-none p-0 m-0 space-y-2;
}

.details-item {
  @apply text-xs text-text-muted flex items-start gap-2;
}

.item-marker {
  @apply text-primary mt-0.5;
}

/* License Card */
.license-card {
  @apply bg-background-dark/40 border border-primary/10 rounded-lg p-4 mt-4;
  @apply flex items-center justify-between;
}

.license-title {
  @apply text-sm text-text-secondary;
}

.license-category {
  @apply text-xs text-primary font-mono border border-primary/20 px-2 py-1 rounded bg-primary/5;
}
</style>
