<script setup lang="ts">
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
  <div class="explorer-container">
    <p v-if="description" class="explorer-description">{{ description }}</p>

    <div class="explorer-items">
      <button v-for="item in items" :key="item.id" class="explorer-item" @click="item.action ? item.action() : null">
        <div v-if="item.icon" class="item-icon" v-html="item.icon"></div>
        <div v-else class="item-icon">
          <svg class="default-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div class="item-content">
          <span class="item-title">{{ item.title }}</span>
          <span v-if="item.description" class="item-description">{{ item.description }}</span>
        </div>
        <svg class="item-arrow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.explorer-container {
  @apply p-4 h-full flex flex-col gap-4;
}

.explorer-description {
  @apply text-sm text-text-secondary font-sans m-0 pb-2 border-b border-primary/10;
}

.explorer-items {
  @apply flex flex-col gap-2;
}

.explorer-item {
  @apply flex items-center gap-4 px-4 py-3;
  @apply bg-primary/5 border border-primary/10 rounded-lg;
  @apply text-text-base cursor-pointer text-left;
  @apply transition-all duration-200;
  @apply hover:bg-primary/15 hover:border-primary/30 hover:translate-x-1;
}

.item-icon {
  @apply flex items-center justify-center w-8 h-8;
  @apply bg-primary/10 rounded-md text-primary shrink-0;
}

.default-icon {
  @apply w-5 h-5;
}

.item-content {
  @apply flex flex-col gap-0.5 flex-1;
}

.item-title {
  @apply text-sm font-semibold text-text-base font-sans;
}

.item-description {
  @apply text-[11px] text-text-secondary font-sans;
}

.item-arrow {
  @apply w-4 h-4 text-primary/60 shrink-0;
}
</style>
