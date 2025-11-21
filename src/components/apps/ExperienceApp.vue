<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const experiences = computed(() => [
  {
    id: 1,
    role: t('experience.items.item1.role'),
    company: t('experience.items.item1.company'),
    period: t('experience.items.item1.period'),
    description: t('experience.items.item1.description')
  },
  {
    id: 2,
    role: t('experience.items.item2.role'),
    company: t('experience.items.item2.company'),
    period: t('experience.items.item2.period'),
    description: t('experience.items.item2.description')
  },
  {
    id: 3,
    role: t('experience.items.item3.role'),
    company: t('experience.items.item3.company'),
    period: t('experience.items.item3.period'),
    description: t('experience.items.item3.description')
  }
])
</script>

<template>
  <div class="p-6 text-text-base">
    <div class="mb-10 border-b border-primary/20 pb-4">
      <h1 class="font-display text-2xl text-primary m-0 mb-2">{{ t('taskbar.experience') }}</h1>
      <p class="text-sm text-text-secondary m-0">{{ t('experience.subtitle') }}</p>
    </div>

    <div
      class="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-linear-to-b before:from-primary before:to-primary/10">
      <div v-for="exp in experiences" :key="exp.id" class="relative pl-8 mb-10 last:mb-0 group">
        <div
          class="absolute -left-[5px] top-0 w-3 h-3 bg-background-dark border-2 border-primary rounded-full shadow-[0_0_10px_rgba(0,255,136,0.5)] shadow-primary/50 z-10 transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_15px_#00ff88] group-hover:shadow-primary">
        </div>
        <div
          class="bg-primary/3 border border-primary/10 rounded-lg p-5 transition-all duration-300 group-hover:bg-primary/8 group-hover:border-primary/30 group-hover:translate-x-1">
          <div class="flex justify-between items-start mb-1 flex-wrap gap-2">
            <h3 class="font-display text-lg text-text-base m-0">{{ exp.role }}</h3>
            <span class="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">{{
              exp.period }}</span>
          </div>
          <h4 class="text-sm text-text-secondary m-0 mb-3 font-medium">{{ exp.company }}</h4>
          <p class="text-sm leading-relaxed text-text-muted m-0">{{ exp.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
