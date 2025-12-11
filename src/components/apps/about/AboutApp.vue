<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { skills } from '@/data/about'
import IconDownload from '@/assets/icons/IconDownload.vue'

const { t } = useI18n()
</script>

<template>
  <div class="about-container">
    <div class="about-header">
      <img src="/src/assets/images/profile-picture.jpg" alt="Profile" class="profile-image" />
      <div class="profile-info">
        <h1 class="profile-name">{{ t('hero.title') }}</h1>
        <p class="profile-role">{{ t('about.role') }}</p>
      </div>
    </div>

    <section class="about-section">
      <h2 class="section-title">
        <span class="section-indicator"></span>
        {{ t('startMenu.bio') }}
      </h2>
      <p class="section-text">{{ t('about.bioText') }}</p>
    </section>

    <section class="about-section">
      <h2 class="section-title">
        <span class="section-indicator"></span>
        {{ t('startMenu.skills') }}
      </h2>
      <div class="skills-list">
        <span v-for="skill in skills" :key="skill" class="skill-tag">{{ skill }}</span>
      </div>
    </section>

    <section class="about-section">
      <a href="/documents/Aleksa Nesic - CV.pdf" download class="resume-button">
        <IconDownload class="button-icon" />
        {{ t('startMenu.resume') }}
      </a>
    </section>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.about-container {
  @apply p-6 text-text-base;
}

.about-header {
  @apply flex items-center gap-6 mb-8 pb-6 border-b border-primary/20;
  @apply flex-col text-center sm:flex-row sm:text-left;
}

.profile-image {
  @apply w-auto h-[150px] rounded-full border-[3px] border-primary;
  @apply shadow-primary/30;
  box-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
}

.profile-info {
  @apply flex-1;
}

.profile-name {
  @apply font-display text-2xl text-primary m-0 mb-2;
}

.profile-role {
  @apply text-base text-text-secondary m-0;
}

.profile-description {
  @apply text-sm leading-relaxed text-text-base m-0;
}

.about-section {
  @apply mb-8;
}

.section-title {
  @apply font-display text-lg text-primary m-0 mb-4 flex items-center gap-2;
  @apply justify-center sm:justify-start;
}

.section-indicator {
  @apply hidden sm:block w-1 h-[18px] bg-primary rounded-sm;
}

.section-text {
  @apply text-sm leading-relaxed text-text-muted m-0;
}

.skills-list {
  @apply flex flex-wrap gap-2;
}

.skill-tag {
  @apply px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full;
  @apply text-[13px] text-primary transition-all duration-200;
  @apply hover:bg-primary/20 hover:-translate-y-0.5;
}

.resume-button {
  @apply flex items-center gap-2 px-5 py-2.5 bg-primary text-background-dark;
  @apply border-none rounded-md font-semibold cursor-pointer;
  @apply transition-all duration-200 hover:bg-primary-light hover:shadow-glow;
}

.button-icon {
  @apply w-[18px] h-[18px];
}
</style>
