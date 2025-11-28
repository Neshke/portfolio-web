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
  <div ref="windowRef"
    class="fixed flex flex-col min-w-[300px] min-h-[200px] transition-[width,height,opacity,transform] duration-200 bg-background-elevated/95 backdrop-blur-xl border border-border rounded-lg shadow-2xl"
    :class="{
      'border-primary/60 shadow-[0_15px_40px_rgba(0,0,0,0.6)] ring-1 ring-primary/30': isActive,
      'rounded-none border-none': isMaximized
    }" :style="windowStyle" @mousedown="handleMouseDown">
    <!-- Resize Handles -->
    <template v-if="!isMaximized && !isMobile">
      <div class="absolute top-[-4px] left-0 right-0 h-2 cursor-ns-resize z-10" @mousedown="startResize('n', $event)">
      </div>
      <div class="absolute bottom-[-4px] left-0 right-0 h-2 cursor-ns-resize z-10"
        @mousedown="startResize('s', $event)"></div>
      <div class="absolute top-0 bottom-0 right-[-4px] w-2 cursor-ew-resize z-10" @mousedown="startResize('e', $event)">
      </div>
      <div class="absolute top-0 bottom-0 left-[-4px] w-2 cursor-ew-resize z-10" @mousedown="startResize('w', $event)">
      </div>
      <div class="absolute top-[-4px] right-[-4px] w-3 h-3 cursor-nesw-resize z-11"
        @mousedown="startResize('ne', $event)"></div>
      <div class="absolute top-[-4px] left-[-4px] w-3 h-3 cursor-nwse-resize z-11"
        @mousedown="startResize('nw', $event)"></div>
      <div class="absolute bottom-[-4px] right-[-4px] w-3 h-3 cursor-nwse-resize z-11"
        @mousedown="startResize('se', $event)"></div>
      <div class="absolute bottom-[-4px] left-[-4px] w-3 h-3 cursor-nesw-resize z-11"
        @mousedown="startResize('sw', $event)"></div>
    </template>

    <!-- Title Bar -->
    <div ref="titleBarRef"
      class="h-9 bg-primary/10 border-b border-primary/20 flex items-center justify-between px-2 select-none cursor-default rounded-t-lg"
      :class="{ 'rounded-none': isMaximized }" @dblclick="!isMobile && windowsStore.maximizeWindow(props.id)">
      <div class="flex items-center gap-2 font-sans text-[13px] font-medium text-text-base">
        <div class="w-4 h-4 text-primary">
          <slot name="icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </slot>
        </div>
        <span>{{ title }}</span>
      </div>

      <div class="flex items-center gap-1">
        <button
          class="w-7 h-6 flex items-center justify-center border-none bg-transparent text-text-secondary rounded hover:bg-white/10 hover:text-text-base transition-colors"
          @click.stop="windowsStore.minimizeWindow(props.id)">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button v-if="!isMobile"
          class="w-7 h-6 flex items-center justify-center border-none bg-transparent text-text-secondary rounded hover:bg-white/10 hover:text-text-base transition-colors"
          @click.stop="windowsStore.maximizeWindow(props.id)">
          <svg v-if="isMaximized" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <rect x="6" y="6" width="12" height="12" rx="1"></rect>
            <path d="M8 6V4h12v12h-2"></path>
          </svg>
          <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="4" y="4" width="16" height="16" rx="2"></rect>
          </svg>
        </button>
        <button
          class="w-7 h-6 flex items-center justify-center border-none bg-transparent text-text-secondary rounded hover:bg-red-500 hover:text-white transition-colors"
          @click.stop="windowsStore.closeWindow(props.id)">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Window Content -->
    <div
      class="flex-1 overflow-auto relative bg-black/20 rounded-b-lg scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40"
      :class="{ 'rounded-none': isMaximized }">
      <slot></slot>
    </div>
  </div>
</template>
