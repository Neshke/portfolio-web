<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import Taskbar from './Taskbar.vue'
import TaskbarMobile from './TaskbarMobile.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('sm')
</script>

<template>
  <TaskbarMobile v-if="isMobile" />
  <Taskbar v-else />
</template>
