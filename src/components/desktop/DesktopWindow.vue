<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDraggable, useBreakpoints } from '@vueuse/core'
import { useWindowsStore } from '@/store/windows'
import type { CSSProperties } from 'vue'

const props = defineProps<{
  id: string
  title: string
  initialX: number
  initialY: number
  initialWidth: number
  initialHeight: number
  zIndex: number
  isActive: boolean
  isMaximized: boolean
}>()

const windowsStore = useWindowsStore()
const windowRef = ref<HTMLElement | null>(null)
const titleBarRef = ref<HTMLElement | null>(null)

const width = ref(props.initialWidth)
const height = ref(props.initialHeight)
const isResizing = ref(false)

const breakpoints = useBreakpoints({
  mobile: 640, // Tailwind sm
  tablet: 768,
  desktop: 1024,
})

const isMobile = breakpoints.smaller('tablet')

// Use VueUse draggable
const { x, y } = useDraggable(windowRef, {
  initialValue: { x: props.initialX, y: props.initialY },
  handle: titleBarRef,
  preventDefault: true,
  onStart: () => {
    windowsStore.focusWindow(props.id)
  },
  onEnd: () => {
    windowsStore.updateWindowPosition(props.id, x.value, y.value)
  },
  disabled: isMobile // Disable dragging on mobile
})

// Sync position if updated from store (e.g. initial open)
watch(() => [props.initialX, props.initialY, props.initialWidth, props.initialHeight], ([newX, newY, newW, newH]) => {
  if (!props.isMaximized && !isResizing.value) {
    x.value = newX
    y.value = newY
    width.value = newW
    height.value = newH
  }
})

const windowStyle = computed((): CSSProperties => {
  if (isMobile.value) {
    return {
      top: '0px',
      left: '0px',
      width: '100%',
      height: 'calc(100% - 64px)', // Leave space for taskbar (64px)
      zIndex: props.zIndex,
      position: 'fixed',
      borderRadius: '0'
    }
  }

  if (props.isMaximized) {
    return {
      top: '0px',
      left: '0px',
      width: '100%',
      height: 'calc(100% - 64px)', // Subtract taskbar height
      zIndex: props.zIndex,
      position: 'fixed'
    }
  }

  return {
    top: `${y.value}px`,
    left: `${x.value}px`,
    width: `${width.value}px`,
    height: `${height.value}px`,
    zIndex: props.zIndex,
    position: 'fixed'
  }
})

const handleMouseDown = () => {
  windowsStore.focusWindow(props.id)
}

const startResize = (direction: string, event: MouseEvent) => {
  if (props.isMaximized || isMobile.value) return

  event.preventDefault()
  event.stopPropagation()
  isResizing.value = true
  windowsStore.focusWindow(props.id)

  const startX = event.clientX
  const startY = event.clientY
  const startWidth = width.value
  const startHeight = height.value
  const startLeft = x.value
  const startTop = y.value

  const onMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY

    if (direction.includes('e')) {
      width.value = Math.max(300, startWidth + deltaX)
    }
    if (direction.includes('w')) {
      const newWidth = Math.max(300, startWidth - deltaX)
      if (newWidth > 300) {
        width.value = newWidth
        x.value = startLeft + (startWidth - newWidth)
      }
    }
    if (direction.includes('s')) {
      height.value = Math.max(200, startHeight + deltaY)
    }
    if (direction.includes('n')) {
      const newHeight = Math.max(200, startHeight - deltaY)
      if (newHeight > 200) {
        height.value = newHeight
        y.value = startTop + (startHeight - newHeight)
      }
    }
  }

  const onMouseUp = () => {
    isResizing.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    windowsStore.updateWindowSize(props.id, width.value, height.value)
    windowsStore.updateWindowPosition(props.id, x.value, y.value)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <div ref="windowRef" class="desktop-window" :class="{
    'window-active': isActive,
    'window-maximized': isMaximized
  }" :style="windowStyle" @mousedown="handleMouseDown">
    <!-- Resize Handles -->
    <template v-if="!isMaximized && !isMobile">
      <div class="resize-handle resize-n" @mousedown="startResize('n', $event)"></div>
      <div class="resize-handle resize-s" @mousedown="startResize('s', $event)"></div>
      <div class="resize-handle resize-e" @mousedown="startResize('e', $event)"></div>
      <div class="resize-handle resize-w" @mousedown="startResize('w', $event)"></div>
      <div class="resize-handle resize-ne" @mousedown="startResize('ne', $event)"></div>
      <div class="resize-handle resize-nw" @mousedown="startResize('nw', $event)"></div>
      <div class="resize-handle resize-se" @mousedown="startResize('se', $event)"></div>
      <div class="resize-handle resize-sw" @mousedown="startResize('sw', $event)"></div>
    </template>

    <!-- Title Bar -->
    <div ref="titleBarRef" class="title-bar" :class="{ 'title-bar-maximized': isMaximized }"
      @dblclick="!isMobile && windowsStore.maximizeWindow(props.id)">
      <div class="title-content">
        <div class="title-icon">
          <slot name="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </slot>
        </div>
        <span>{{ title }}</span>
      </div>

      <div class="window-controls">
        <button class="control-button" @click.stop="windowsStore.minimizeWindow(props.id)">
          <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button v-if="!isMobile" class="control-button" @click.stop="windowsStore.maximizeWindow(props.id)">
          <svg v-if="isMaximized" class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <rect x="6" y="6" width="12" height="12" rx="1"></rect>
            <path d="M8 6V4h12v12h-2"></path>
          </svg>
          <svg v-else class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="4" y="4" width="16" height="16" rx="2"></rect>
          </svg>
        </button>
        <button class="control-button control-close" @click.stop="windowsStore.closeWindow(props.id)">
          <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Window Content -->
    <div class="window-content" :class="{ 'content-maximized': isMaximized }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.desktop-window {
  @apply fixed flex flex-col min-w-[300px] min-h-[200px];
  @apply bg-background-elevated/95 backdrop-blur-xl;
  @apply border border-border rounded-lg shadow-2xl;
  transition: width 200ms, height 200ms, opacity 200ms, transform 200ms;
}

.window-active {
  @apply border-primary/60 ring-1 ring-primary/30;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
}

.window-maximized {
  @apply rounded-none border-none;
}

/* Resize Handles */
.resize-handle {
  @apply absolute z-10;
}

.resize-n {
  @apply -top-1 left-0 right-0 h-2 cursor-ns-resize;
}

.resize-s {
  @apply -bottom-1 left-0 right-0 h-2 cursor-ns-resize;
}

.resize-e {
  @apply top-0 bottom-0 -right-1 w-2 cursor-ew-resize;
}

.resize-w {
  @apply top-0 bottom-0 -left-1 w-2 cursor-ew-resize;
}

.resize-ne {
  @apply -top-1 -right-1 w-3 h-3 cursor-nesw-resize z-11;
}

.resize-nw {
  @apply -top-1 -left-1 w-3 h-3 cursor-nwse-resize z-11;
}

.resize-se {
  @apply -bottom-1 -right-1 w-3 h-3 cursor-nwse-resize z-11;
}

.resize-sw {
  @apply -bottom-1 -left-1 w-3 h-3 cursor-nesw-resize z-11;
}

/* Title Bar */
.title-bar {
  @apply h-9 bg-primary/10 border-b border-primary/20;
  @apply flex items-center justify-between px-2;
  @apply select-none cursor-default rounded-t-lg;
}

.title-bar-maximized {
  @apply rounded-none;
}

.title-content {
  @apply flex items-center gap-2;
  @apply font-sans text-[13px] font-medium text-text-base;
}

.title-icon {
  @apply w-4 h-4 text-primary;
}

/* Window Controls */
.window-controls {
  @apply flex items-center gap-1;
}

.control-button {
  @apply w-7 h-6 flex items-center justify-center;
  @apply border-none bg-transparent text-text-secondary rounded;
  @apply hover:bg-white/10 hover:text-text-base transition-colors;
}

.control-close:hover {
  @apply bg-red-500 text-white;
}

.control-icon {
  @apply w-3.5 h-3.5;
}

/* Window Content */
.window-content {
  @apply flex-1 overflow-auto relative bg-black/20 rounded-b-lg;
  @apply scrollbar-thin;
}

.content-maximized {
  @apply rounded-none;
}
</style>
