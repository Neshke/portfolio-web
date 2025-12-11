<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let lastTime = 0
let cleanup: (() => void) | null = null

const CHARS =
  'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function getThemeColors() {
  const styles = getComputedStyle(document.documentElement)
  const primary = styles.getPropertyValue('--color-primary').trim()
  const primaryLight = styles.getPropertyValue('--color-primary-light').trim()
  const bgHex = styles.getPropertyValue('--color-background').trim()

  let background = 'rgba(0, 0, 0, 0.05)'
  if (bgHex) {
    const r = parseInt(bgHex.slice(1, 3), 16)
    const g = parseInt(bgHex.slice(3, 5), 16)
    const b = parseInt(bgHex.slice(5, 7), 16)
    background = `rgba(${r}, ${g}, ${b}, 0.05)`
  }

  return { primary, primaryLight, background }
}

function initMatrix(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1
  const width = window.innerWidth
  const height = window.innerHeight
  const fontSize = width < 768 ? 10 : 14
  const columns = Math.floor(width / fontSize)
  const colors = getThemeColors()

  // Setup canvas
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)

  // Initialize drops
  const drops: number[] = []
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100
  }

  function draw(timeStamp: number) {
    if (timeStamp - lastTime < 33) {
      animationFrameId = requestAnimationFrame(draw)
      return
    }
    lastTime = timeStamp

    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, width, height)
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const char = CHARS.charAt(Math.floor(Math.random() * CHARS.length))
      const rand = Math.random()

      ctx.fillStyle = rand > 0.98 ? '#FFF' : rand > 0.9 ? colors.primaryLight : colors.primary
      ctx.fillText(char, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }

    animationFrameId = requestAnimationFrame(draw)
  }

  animationFrameId = requestAnimationFrame(draw)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const reinit = () => {
    cancelAnimationFrame(animationFrameId)
    initMatrix(canvas, ctx)
  }

  const debouncedReinit = useDebounceFn(reinit, 150)

  initMatrix(canvas, ctx)
  window.addEventListener('resize', debouncedReinit)

  cleanup = () => {
    window.removeEventListener('resize', debouncedReinit)
    cancelAnimationFrame(animationFrameId)
  }
})

onUnmounted(() => {
  cleanup?.()
})
</script>

<template>
  <div class="matrix-wrapper">
    <canvas ref="canvasRef" class="matrix-canvas"></canvas>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.matrix-wrapper {
  @apply absolute inset-0 pointer-events-none overflow-hidden;
}

.matrix-canvas {
  @apply absolute inset-0 w-full h-full opacity-40;
  filter: contrast(1.2) brightness(1.1);
}
</style>
