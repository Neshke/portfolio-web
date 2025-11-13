<template>
  <div class="app-container">
    <video class="background-video" autoplay loop muted playsinline>
      <source src="/matrix-background.mp4" type="video/mp4" />
    </video>
    <div class="overlay"></div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@import 'tailwindcss';

.app-container {
  @apply relative w-full min-h-screen overflow-hidden;
}

.background-video {
  @apply fixed top-0 left-0 w-full h-full object-cover z-0;
}

.overlay {
  @apply fixed top-0 left-0 w-full h-full z-10;
  background-color: rgba(255, 255, 255, 0.1);
}

.content {
  @apply relative z-20;
}
</style>
