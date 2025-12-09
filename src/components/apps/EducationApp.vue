<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { coursework, skills } from '@/data/education'

const { t } = useI18n()
</script>

<template>
  <div class="p-6 text-text-base h-full overflow-y-auto custom-scrollbar">
    <div class="mb-8 border-b border-primary/20 pb-4">
      <h1 class="font-display text-2xl text-primary m-0 mb-2">{{ t('startMenu.education') }}</h1>
      <p class="text-sm text-text-secondary m-0">{{ t('startMenu.educationDescription') }}</p>
    </div>

    <div class="bg-background-dark/60 border border-primary/20 rounded-lg p-6 mb-6">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="font-display text-lg text-text-base m-0">{{ t('education.degree') }}</h3>
          <p class="text-primary text-sm font-medium mt-1">{{ t('education.field') }}</p>
          <p class="text-text-secondary text-xs mt-1 italic">{{ t('education.institution') }}</p>
        </div>
        <span class="text-xs text-text-muted bg-primary/10 px-2 py-1 rounded border border-primary/20">{{ t('education.status') }}</span>
      </div>
      <p class="text-sm text-text-muted leading-relaxed mt-4 mb-6">
        {{ t('education.description') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-display text-sm text-primary mb-3 border-b border-primary/10 pb-2">{{ t('education.courseworkTitle') }}</h4>
          <ul class="list-none p-0 m-0 space-y-2">
            <li v-for="item in coursework" :key="item" class="text-xs text-text-muted flex items-start gap-2">
              <span class="text-primary mt-0.5">›</span>
              {{ t(item) }}
            </li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-display text-sm text-primary mb-3 border-b border-primary/10 pb-2">{{ t('education.skillsTitle') }}</h4>
          <ul class="list-none p-0 m-0 space-y-2">
            <li v-for="item in skills" :key="item" class="text-xs text-text-muted flex items-start gap-2">
              <span class="text-primary mt-0.5">›</span>
              {{ t(item) }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- High School -->
    <div class="bg-background-dark/50 border border-primary/15 rounded-lg p-5 mb-4">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="font-display text-base text-text-base m-0">{{ t('education.highSchool.title') }}</h3>
          <p class="text-primary text-sm font-medium mt-1">{{ t('education.highSchool.course') }}</p>
          <p class="text-text-muted text-xs mt-1 italic">{{ t('education.highSchool.institution') }}</p>
        </div>
        <span class="text-[10px] text-text-dim bg-white/5 px-2 py-0.5 rounded border border-white/5">{{ t('education.highSchool.duration') }}</span>
      </div>
      <p class="text-xs text-text-dim leading-relaxed mt-3">
        {{ t('education.highSchool.description') }}
      </p>
    </div>

    <!-- Music School -->
    <div class="bg-background-dark/40 border border-primary/10 rounded-lg p-5">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="font-display text-sm text-text-secondary m-0">{{ t('education.musicSchool.title') }}</h3>
          <p class="text-text-muted text-xs mt-1">{{ t('education.musicSchool.institution') }}</p>
        </div>
        <span class="text-[10px] text-text-dim bg-white/5 px-2 py-0.5 rounded border border-white/5">{{ t('education.musicSchool.duration') }}</span>
      </div>
      <p class="text-xs text-text-dim leading-relaxed mt-2 mb-2">
        {{ t('education.musicSchool.description') }}
      </p>
      <p class="text-[11px] text-primary/60 italic border-l-2 border-primary/20 pl-2 mt-2">
        {{ t('education.musicSchool.note') }}
      </p>
    </div>

    <!-- Driving License -->
    <div class="bg-background-dark/40 border border-primary/10 rounded-lg p-4 mt-4 flex items-center justify-between">
      <span class="text-sm text-text-secondary">{{ t('education.drivingLicense.title') }}</span>
      <span class="text-xs text-primary font-mono border border-primary/20 px-2 py-1 rounded bg-primary/5">{{ t('education.drivingLicense.category') }}</span>
    </div>
  </div>
</template>
