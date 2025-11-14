<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { currentLanguage, toggleLanguage } = useLanguage()
</script>

<template>
  <button @click="toggleLanguage" class="taskbar-item tray-item"
    :title="`Switch to ${currentLanguage === 'en' ? 'Српски' : 'English'}`">
    <svg class="taskbar-icon-sm" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
    </svg>
    <span class="taskbar-label">{{ currentLanguage === 'en' ? 'EN' : 'СР' }}</span>
  </button>
</template>

<style scoped>
@reference "tailwindcss";

.taskbar-item {
  @apply flex items-center gap-2 px-3 py-2;
  @apply bg-transparent border border-transparent rounded-lg;
  @apply cursor-pointer transition-all duration-200;
  color: var(--color-text-base);
  font-family: var(--font-sans);
  font-size: 14px;
}

.taskbar-item:hover {
  background-color: rgb(0 255 136 / 0.1);
  border-color: rgb(0 255 136 / 0.3);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
}

.taskbar-item:active {
  @apply scale-95;
}

.tray-item {
  @apply p-2;
}

.taskbar-icon-sm {
  @apply w-4 h-4;
  color: var(--color-secondary);
}

.taskbar-label {
  @apply text-xs font-semibold;
  color: var(--color-primary);
}
</style>
