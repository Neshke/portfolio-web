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
      height: 'calc(100% - 56px)', // Leave space for taskbar (56px)
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
      height: 'calc(100% - 48px)', // Subtract taskbar height
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
  <div 
    ref="windowRef"
    class="desktop-window"
    :class="{ 'is-active': isActive, 'is-maximized': isMaximized }"
    :style="windowStyle"
    @mousedown="handleMouseDown"
  >
    <!-- Resize Handles -->
    <template v-if="!isMaximized && !isMobile">
      <div class="resize-handle n" @mousedown="startResize('n', $event)"></div>
      <div class="resize-handle s" @mousedown="startResize('s', $event)"></div>
      <div class="resize-handle e" @mousedown="startResize('e', $event)"></div>
      <div class="resize-handle w" @mousedown="startResize('w', $event)"></div>
      <div class="resize-handle ne" @mousedown="startResize('ne', $event)"></div>
      <div class="resize-handle nw" @mousedown="startResize('nw', $event)"></div>
      <div class="resize-handle se" @mousedown="startResize('se', $event)"></div>
      <div class="resize-handle sw" @mousedown="startResize('sw', $event)"></div>
    </template>

    <!-- Title Bar -->
    <div ref="titleBarRef" class="window-title-bar" @dblclick="!isMobile && windowsStore.maximizeWindow(props.id)">
      <div class="window-title">
        <div class="window-icon">
          <slot name="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </slot>
        </div>
        <span>{{ title }}</span>
      </div>
      
      <div class="window-controls">
        <button class="control-btn minimize" @click.stop="windowsStore.minimizeWindow(props.id)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button v-if="!isMobile" class="control-btn maximize" @click.stop="windowsStore.maximizeWindow(props.id)">
          <svg v-if="isMaximized" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="6" y="6" width="12" height="12" rx="1"></rect>
            <path d="M8 6V4h12v12h-2"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="4" y="4" width="16" height="16" rx="2"></rect>
          </svg>
        </button>
        <button class="control-btn close" @click.stop="windowsStore.closeWindow(props.id)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Window Content -->
    <div class="window-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.desktop-window {
  position: fixed;
  background: rgba(10, 15, 10, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(0, 255, 136, 0.1);
  display: flex;
  flex-direction: column;
  /* overflow: hidden; Removed to allow resize handles to be clickable */
  transition: width 0.2s, height 0.2s, opacity 0.2s, transform 0.1s;
  min-width: 300px;
  min-height: 200px;
}

.desktop-window.is-active {
  border-color: rgba(0, 255, 136, 0.6);
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(0, 255, 136, 0.3);
}

.desktop-window.is-maximized {
  border-radius: 0;
  border: none;
}

/* Title Bar */
.window-title-bar {
  height: 36px;
  background: rgba(0, 255, 136, 0.1);
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  user-select: none;
  cursor: default;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.window-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-size: 13px;
  color: #e0e8e0;
  font-weight: 500;
}

.window-icon {
  width: 16px;
  height: 16px;
  color: #00ff88;
}

.window-icon svg {
  width: 100%;
  height: 100%;
}

/* Controls */
.window-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.control-btn {
  width: 28px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #7fa77f;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.1s;
}

.control-btn svg {
  width: 14px;
  height: 14px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e0e8e0;
}

.control-btn.close:hover {
  background: #ff4444;
  color: white;
}

/* Content */
.window-content {
  flex: 1;
  overflow: auto;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Scrollbar */
.window-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.window-content::-webkit-scrollbar-track {
  background: rgba(0, 255, 136, 0.05);
}

.window-content::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 136, 0.2);
  border-radius: 4px;
}

.window-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 136, 0.4);
}

/* Resize Handles */
.resize-handle {
  position: absolute;
  z-index: 10;
}

.resize-handle.n { top: -4px; left: 0; right: 0; height: 8px; cursor: ns-resize; }
.resize-handle.s { bottom: -4px; left: 0; right: 0; height: 8px; cursor: ns-resize; }
.resize-handle.e { top: 0; bottom: 0; right: -4px; width: 8px; cursor: ew-resize; }
.resize-handle.w { top: 0; bottom: 0; left: -4px; width: 8px; cursor: ew-resize; }

.resize-handle.ne { top: -4px; right: -4px; width: 12px; height: 12px; cursor: nesw-resize; z-index: 11; }
.resize-handle.nw { top: -4px; left: -4px; width: 12px; height: 12px; cursor: nwse-resize; z-index: 11; }
.resize-handle.se { bottom: -4px; right: -4px; width: 12px; height: 12px; cursor: nwse-resize; z-index: 11; }
.resize-handle.sw { bottom: -4px; left: -4px; width: 12px; height: 12px; cursor: nesw-resize; z-index: 11; }
</style>
