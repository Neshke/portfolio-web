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

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
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
    resizeCanvas()
    updateThemeColors()
  })
  resizeCanvas()

  const fontSize = 14
  const columns = Math.floor(canvas.width / fontSize)
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
    ctx.fillRect(0, 0, canvas.width, canvas.height)

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

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      drops[i]++
    }

    animationFrameId = requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <canvas 
      ref="canvasRef" 
      class="absolute inset-0 w-full h-full opacity-40 blur-[2px]"
    ></canvas>
  </div>
</template>

<style scoped>
canvas {
  filter: contrast(1.2) brightness(1.1) blur(1px);
}
</style>
