<script setup lang="ts">
import MatrixBackground from '@/components/desktop/MatrixBackground.vue'
</script>

<template>
  <div class="h-dvh overflow-hidden bg-background text-text-base relative">
    <MatrixBackground />
    <router-view />
  </div>
</template>
