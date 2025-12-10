<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let lastTime = 0

const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.scale(dpr, dpr)
  }

  let colorPrimary = ''
  let colorPrimaryLight = ''
  let colorBackground = ''

  const updateThemeColors = () => {
    const styles = getComputedStyle(document.documentElement)
    colorPrimary = styles.getPropertyValue('--color-primary').trim()
    colorPrimaryLight = styles.getPropertyValue('--color-primary-light').trim()

    const bgHex = styles.getPropertyValue('--color-background').trim()
    if (bgHex) {
      const r = parseInt(bgHex.slice(1, 3), 16)
      const g = parseInt(bgHex.slice(3, 5), 16)
      const b = parseInt(bgHex.slice(5, 7), 16)
      colorBackground = `rgba(${r}, ${g}, ${b}, 0.05)`
    }
  }

  updateThemeColors()
  window.addEventListener('resize', () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset transform before resize
    resizeCanvas()
    updateThemeColors()
  })
  resizeCanvas()

  const isMobile = window.innerWidth < 768
  const fontSize = isMobile ? 10 : 14
  const columns = Math.floor(window.innerWidth / fontSize)
  const drops: number[] = []

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100
  }

  const draw = (timeStamp: number) => {
    if (timeStamp - lastTime < 33) {
      animationFrameId = requestAnimationFrame(draw)
      return
    }
    lastTime = timeStamp

    ctx.fillStyle = colorBackground
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    ctx.fillStyle = colorPrimary
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length))

      if (Math.random() > 0.98) {
        ctx.fillStyle = '#FFF'
      } else if (Math.random() > 0.9) {
        ctx.fillStyle = colorPrimaryLight
      } else {
        ctx.fillStyle = colorPrimary
      }

      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
        drops[i] = 0
      }

      drops[i]++
    }

    animationFrameId = requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('resize', () => { })
  cancelAnimationFrame(animationFrameId)
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
