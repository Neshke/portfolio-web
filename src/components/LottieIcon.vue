<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { AnimationItem } from 'lottie-web'
import lottie from 'lottie-web'

interface Props {
  animationData?: object
  animationUrl?: string
  width?: string
  height?: string
  autoplay?: boolean
  loop?: boolean
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: '24px',
  height: '24px',
  autoplay: true,
  loop: false,
  speed: 1,
})

const containerRef = ref<HTMLDivElement | null>(null)
let animation: AnimationItem | null = null

const loadAnimation = async () => {
  if (!containerRef.value) return

  // Clear previous animation if exists
  if (animation) {
    animation.destroy()
  }

  const config: any = {
    container: containerRef.value,
    renderer: 'svg',
    loop: props.loop,
    autoplay: props.autoplay,
  }

  if (props.animationData) {
    config.animationData = props.animationData
  } else if (props.animationUrl) {
    config.path = props.animationUrl
  }

  animation = lottie.loadAnimation(config)

  if (props.speed !== 1) {
    animation.setSpeed(props.speed)
  }
}

onMounted(() => {
  loadAnimation()
})

watch(() => [props.animationData, props.animationUrl], () => {
  loadAnimation()
})

defineExpose({
  play: () => animation?.play(),
  pause: () => animation?.pause(),
  stop: () => animation?.stop(),
  setSpeed: (speed: number) => animation?.setSpeed(speed),
})
</script>

<template>
  <div ref="containerRef" class="lottie-container" :style="{ width: width, height: height }" />
</template>

<style scoped>
@reference "@/assets/main.css";

.lottie-container {
  @apply inline-block overflow-hidden;
}

.lottie-container :deep(svg) {
  @apply w-full h-full;
}
</style>
