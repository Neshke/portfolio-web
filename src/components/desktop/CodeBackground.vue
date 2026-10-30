<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId = 0
let lastTime = 0
let cleanup: (() => void) | null = null

// Bits of the code I write every day, drifting down the desk
const TOKENS = [
  '<template>',
  '</template>',
  '<script setup lang="ts">',
  'ref()',
  'computed()',
  'watch()',
  'defineProps',
  'defineEmits',
  'defineStore',
  'onMounted',
  'nextTick()',
  'useI18n()',
  'v-for',
  'v-if',
  ':key',
  '@click',
  'v-model',
  'const',
  'await',
  'import',
  'export default',
  'interface',
  'type',
  'readonly',
  'Promise<void>',
  '=>',
  '{ }',
]

// About 10 frames per second: the words move, but slowly enough to ignore
const FRAME_MS = 100

interface Drop {
  x: number
  y: number
  speed: number
  token: string
  bright: boolean
}

function themeColors() {
  const styles = getComputedStyle(document.documentElement)
  return {
    base: styles.getPropertyValue('--color-primary-dark').trim() || '#3d7ff0',
    bright: styles.getPropertyValue('--color-primary').trim() || '#7fb2ff',
  }
}

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]!

function setupScene(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = window.innerWidth
  const height = window.innerHeight
  const isNarrow = width < 768
  const fontSize = isNarrow ? 12 : 13
  const columnWidth = isNarrow ? 130 : 200
  const columns = Math.max(2, Math.floor(width / columnWidth))
  const colors = themeColors()
  const font = `${fontSize}px ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace`

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const newDrop = (column: number, y: number): Drop => ({
    x: column * columnWidth + Math.random() * (columnWidth * 0.35),
    y,
    // 0.8 to 2 px per frame at 10 fps
    speed: 0.8 + Math.random() * 1.2,
    token: pick(TOKENS),
    bright: Math.random() > 0.85,
  })

  // Two words per column, half a screen apart, so the desk never looks empty or busy
  const drops: Drop[] = []
  for (let column = 0; column < columns; column++) {
    const start = Math.random() * height
    drops.push(newDrop(column, start), newDrop(column, (start + height / 2) % height))
  }

  // Words fade in at the top and out toward the taskbar
  const alphaAt = (y: number) => {
    const t = y / height
    if (t < 0.12) return Math.max(0, t / 0.12)
    if (t > 0.8) return Math.max(0, (1 - t) / 0.2)
    return 1
  }

  function draw() {
    ctx.clearRect(0, 0, width, height)
    ctx.font = font
    ctx.textBaseline = 'top'
    for (const drop of drops) {
      ctx.globalAlpha = alphaAt(drop.y)
      ctx.fillStyle = drop.bright ? colors.bright : colors.base
      ctx.fillText(drop.token, drop.x, drop.y)
    }
    ctx.globalAlpha = 1
  }

  function step() {
    for (let i = 0; i < drops.length; i++) {
      const drop = drops[i]!
      drop.y += drop.speed
      if (drop.y > height) {
        const column = Math.floor(i / 2)
        drops[i] = newDrop(column, -fontSize - Math.random() * 120)
      }
    }
    draw()
  }

  return { step, draw }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let scene = setupScene(canvas, ctx)

  const loop = (timeStamp: number) => {
    animationFrameId = requestAnimationFrame(loop)
    if (timeStamp - lastTime < FRAME_MS) return
    lastTime = timeStamp
    scene.step()
  }

  const stop = () => cancelAnimationFrame(animationFrameId)

  const start = () => {
    stop()
    if (reducedMotion.matches) {
      // One still frame, nothing moves
      scene.draw()
      return
    }
    if (!document.hidden) {
      animationFrameId = requestAnimationFrame(loop)
    }
  }

  const reinit = () => {
    stop()
    scene = setupScene(canvas, ctx)
    start()
  }

  const debouncedReinit = useDebounceFn(reinit, 150)
  const onVisibility = () => (document.hidden ? stop() : start())

  start()
  window.addEventListener('resize', debouncedReinit)
  document.addEventListener('visibilitychange', onVisibility)
  reducedMotion.addEventListener('change', reinit)

  cleanup = () => {
    window.removeEventListener('resize', debouncedReinit)
    document.removeEventListener('visibilitychange', onVisibility)
    reducedMotion.removeEventListener('change', reinit)
    stop()
  }
})

onUnmounted(() => {
  cleanup?.()
})
</script>

<template>
  <div class="code-background" aria-hidden="true">
    <canvas ref="canvasRef" class="code-canvas"></canvas>
    <div class="code-shade"></div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.code-background {
  @apply absolute inset-0 pointer-events-none overflow-hidden;
  /* A faint grid under the words, like squared paper */
  background-image:
    linear-gradient(rgb(160 180 210 / 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgb(160 180 210 / 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
}

.code-canvas {
  @apply absolute inset-0 w-full h-full;
  opacity: 0.45;
}

/* Darkens the words toward the left edge and the bottom, where text and the taskbar sit */
.code-shade {
  @apply absolute inset-0;
  background:
    linear-gradient(90deg, rgb(4 8 20 / 0.8) 0%, rgb(4 8 20 / 0.3) 45%, rgb(4 8 20 / 0) 75%),
    linear-gradient(0deg, rgb(4 8 20 / 0.7) 0%, rgb(4 8 20 / 0) 30%);
}

@media (max-width: 767px) {
  .code-canvas {
    opacity: 0.32;
  }
}
</style>
