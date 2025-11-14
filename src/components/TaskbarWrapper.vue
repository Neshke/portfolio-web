<script setup lang="ts">
import { computed } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import Taskbar from './Taskbar.vue'
import TaskbarMobile from './TaskbarMobile.vue'

// Define breakpoints (Tailwind default: md = 768px)
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768,
  desktop: 1024,
})

const isMobile = breakpoints.smaller('tablet')
</script>

<template>
  <!-- Show mobile version on screens < 768px, desktop version otherwise -->
  <TaskbarMobile v-if="isMobile" />
  <Taskbar v-else />
</template>
