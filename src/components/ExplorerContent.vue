<script setup lang="ts">
import { defineProps } from 'vue'

interface ExplorerItem {
  id: string
  title: string
  description?: string
  icon?: string
  type: 'app' | 'section' | 'action'
  action?: () => void
}

defineProps<{
  items: ExplorerItem[]
  description?: string
}>()
</script>

<template>
  <div class="p-4 h-full flex flex-col gap-4">
    <p v-if="description" class="text-sm text-text-secondary font-sans m-0 pb-2 border-b border-primary/10">{{
      description }}</p>

    <div class="flex flex-col gap-2">
      <button v-for="item in items" :key="item.id"
        class="flex items-center gap-4 px-4 py-3 bg-primary/5 border border-primary/10 rounded-lg text-text-base cursor-pointer transition-all duration-200 text-left hover:bg-primary/15 hover:border-primary/30 hover:translate-x-1"
        @click="item.action ? item.action() : null">
        <div v-if="item.icon"
          class="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md text-primary shrink-0"
          v-html="item.icon"></div>
        <div v-else class="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md text-primary shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div class="flex flex-col gap-0.5 flex-1">
          <span class="text-sm font-semibold text-text-base font-sans">{{ item.title }}</span>
          <span v-if="item.description" class="text-[11px] text-text-secondary font-sans">{{ item.description }}</span>
        </div>
        <svg class="w-4 h-4 text-primary/60 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
    </div>
  </div>
</template>
