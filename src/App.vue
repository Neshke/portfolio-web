<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import CodeBackground from '@/components/desktop/CodeBackground.vue'

const { t } = useI18n()

watchEffect(() => {
  document.title = t('meta.title')
})
</script>

<template>
  <div class="h-dvh overflow-hidden bg-background text-text-base relative">
    <CodeBackground />
    <router-view />
  </div>
</template>
