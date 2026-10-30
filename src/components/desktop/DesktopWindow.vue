<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useDraggable, useBreakpoints } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import {
  useWindowsStore,
  TASKBAR_SPACE,
  MIN_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
} from '@/store/windows'
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
  isMinimized: boolean
}>()

const { t } = useI18n()
const windowsStore = useWindowsStore()
const windowRef = ref<HTMLElement | null>(null)
const titleBarRef = ref<HTMLElement | null>(null)
const titleId = computed(() => `window-title-${props.id}`)

const width = ref(props.initialWidth)
const height = ref(props.initialHeight)
const isResizing = ref(false)

// Phones have no taskbar margin, so the full-screen window stops at the 64px bar
const TASKBAR_HEIGHT = 64
const TITLE_BAR_HEIGHT = 44

const breakpoints = useBreakpoints({
  tablet: 768,
})

const isMobile = breakpoints.smaller('tablet')

const { x, y } = useDraggable(windowRef, {
  initialValue: { x: props.initialX, y: props.initialY },
  handle: titleBarRef,
  preventDefault: true,
  onStart: (_position, event) => {
    // Clicks on the window buttons must not start a drag
    if ((event.target as HTMLElement).closest('button')) return false
    windowsStore.focusWindow(props.id)
  },
  onEnd: () => {
    // Keep the title bar reachable so the window can always be dragged back
    x.value = Math.min(Math.max(x.value, 120 - width.value), window.innerWidth - 120)
    y.value = Math.min(Math.max(y.value, 0), window.innerHeight - TASKBAR_SPACE - TITLE_BAR_HEIGHT)
    windowsStore.updateWindowPosition(props.id, x.value, y.value)
  },
  disabled: isMobile,
})

watch(
  () => [props.initialX, props.initialY, props.initialWidth, props.initialHeight],
  ([newX, newY, newW, newH]) => {
    if (!props.isMaximized && !isResizing.value) {
      x.value = newX!
      y.value = newY!
      width.value = newW!
      height.value = newH!
    }
  }
)

const focusWindowElement = () => {
  const el = windowRef.value
  if (el && !el.contains(document.activeElement)) {
    el.focus({ preventScroll: true })
  }
}

onMounted(() => {
  nextTick(focusWindowElement)
})

// When a window comes back from the taskbar or is brought forward, move keyboard focus into it
watch(
  () => [props.isActive, props.isMinimized, props.zIndex] as const,
  ([active, minimized]) => {
    if (active && !minimized) nextTick(focusWindowElement)
  }
)

const windowStyle = computed((): CSSProperties => {
  if (isMobile.value) {
    return {
      top: '0px',
      left: '0px',
      width: '100%',
      height: `calc(100% - ${TASKBAR_HEIGHT}px)`,
      zIndex: props.zIndex,
      position: 'fixed',
      borderRadius: '0',
    }
  }

  if (props.isMaximized) {
    return {
      top: '0px',
      left: '0px',
      width: '100%',
      height: `calc(100% - ${TASKBAR_SPACE}px)`,
      zIndex: props.zIndex,
      position: 'fixed',
    }
  }

  return {
    top: `${y.value}px`,
    left: `${x.value}px`,
    width: `${width.value}px`,
    height: `${height.value}px`,
    zIndex: props.zIndex,
    position: 'fixed',
  }
})

const handlePointerDown = () => {
  if (!props.isActive) windowsStore.focusWindow(props.id)
}

// Escape typed into a form field belongs to that field (autocomplete, IME), not to the window
const isTextEntry = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  !!target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) return
  if (isTextEntry(event.target)) return
  event.stopPropagation()
  windowsStore.closeWindow(props.id)
}

// Pointer events cover mouse, pen and touch; capture keeps the drag alive outside the handle
const startResize = (direction: string, event: PointerEvent) => {
  if (props.isMaximized || isMobile.value || event.button !== 0) return

  event.preventDefault()
  event.stopPropagation()
  isResizing.value = true
  windowsStore.focusWindow(props.id)

  const handle = event.currentTarget as HTMLElement
  handle.setPointerCapture?.(event.pointerId)

  const startX = event.clientX
  const startY = event.clientY
  const startWidth = width.value
  const startHeight = height.value
  const startLeft = x.value
  const startTop = y.value
  const maxRight = window.innerWidth
  const maxBottom = window.innerHeight - TASKBAR_SPACE

  const onPointerMove = (e: PointerEvent) => {
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY

    if (direction.includes('e')) {
      width.value = Math.max(MIN_WINDOW_WIDTH, Math.min(startWidth + deltaX, maxRight - startLeft))
    }
    if (direction.includes('w')) {
      const newWidth = Math.max(
        MIN_WINDOW_WIDTH,
        Math.min(startWidth - deltaX, startLeft + startWidth)
      )
      width.value = newWidth
      x.value = startLeft + (startWidth - newWidth)
    }
    if (direction.includes('s')) {
      height.value = Math.max(
        MIN_WINDOW_HEIGHT,
        Math.min(startHeight + deltaY, maxBottom - startTop)
      )
    }
    if (direction.includes('n')) {
      const newHeight = Math.max(
        MIN_WINDOW_HEIGHT,
        Math.min(startHeight - deltaY, startTop + startHeight)
      )
      height.value = newHeight
      y.value = startTop + (startHeight - newHeight)
    }
  }

  const onPointerUp = () => {
    isResizing.value = false
    handle.removeEventListener('pointermove', onPointerMove)
    handle.removeEventListener('pointerup', onPointerUp)
    handle.removeEventListener('pointercancel', onPointerUp)
    windowsStore.updateWindowSize(props.id, width.value, height.value)
    windowsStore.updateWindowPosition(props.id, x.value, y.value)
  }

  handle.addEventListener('pointermove', onPointerMove)
  handle.addEventListener('pointerup', onPointerUp)
  handle.addEventListener('pointercancel', onPointerUp)
}
</script>

<template>
  <section
    ref="windowRef"
    class="desktop-window"
    :class="{
      'window-active': isActive,
      'window-maximized': isMaximized && !isMobile,
      'window-mobile': isMobile,
    }"
    :style="windowStyle"
    role="dialog"
    aria-modal="false"
    :aria-labelledby="titleId"
    tabindex="-1"
    @pointerdown="handlePointerDown"
    @keydown="handleKeydown"
  >
    <template v-if="!isMaximized && !isMobile">
      <div class="resize-handle resize-n" @pointerdown="startResize('n', $event)"></div>
      <div class="resize-handle resize-s" @pointerdown="startResize('s', $event)"></div>
      <div class="resize-handle resize-e" @pointerdown="startResize('e', $event)"></div>
      <div class="resize-handle resize-w" @pointerdown="startResize('w', $event)"></div>
      <div class="resize-handle resize-ne" @pointerdown="startResize('ne', $event)"></div>
      <div class="resize-handle resize-nw" @pointerdown="startResize('nw', $event)"></div>
      <div class="resize-handle resize-se" @pointerdown="startResize('se', $event)"></div>
      <div class="resize-handle resize-sw" @pointerdown="startResize('sw', $event)"></div>
    </template>

    <header
      ref="titleBarRef"
      class="title-bar"
      @dblclick="!isMobile && windowsStore.maximizeWindow(props.id)"
    >
      <div class="title-content">
        <span class="title-icon" aria-hidden="true">
          <slot name="icon"></slot>
        </span>
        <span :id="titleId" class="title-text">{{ title }}</span>
      </div>

      <div class="window-controls">
        <button
          type="button"
          class="control-button"
          :aria-label="t('window.minimize')"
          :title="t('window.minimize')"
          @click.stop="windowsStore.minimizeWindow(props.id)"
        >
          <svg class="control-icon" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h10" />
          </svg>
        </button>
        <button
          v-if="!isMobile"
          type="button"
          class="control-button control-maximize"
          :aria-label="isMaximized ? t('window.restore') : t('window.maximize')"
          :title="isMaximized ? t('window.restore') : t('window.maximize')"
          @click.stop="windowsStore.maximizeWindow(props.id)"
        >
          <svg v-if="isMaximized" class="control-icon" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="3" y="5" width="8" height="8" rx="1.5" />
            <path
              d="M5.5 5V4.5A1.5 1.5 0 0 1 7 3h4.5A1.5 1.5 0 0 1 13 4.5V9a1.5 1.5 0 0 1-1.5 1.5H11"
            />
          </svg>
          <svg v-else class="control-icon" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="3" y="3" width="10" height="10" rx="1.5" />
          </svg>
        </button>
        <button
          type="button"
          class="control-button control-close"
          :aria-label="t('window.close')"
          :title="t('window.close')"
          @click.stop="windowsStore.closeWindow(props.id)"
        >
          <svg class="control-icon" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>
    </header>

    <div class="window-content">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
@reference "@/assets/main.css";

.desktop-window {
  @apply fixed flex flex-col min-w-[360px] min-h-[240px] outline-none;
  background-color: var(--color-background-elevated);
  border: 1px solid var(--color-border-strong);
  border-radius: 10px;
  box-shadow: var(--shadow-window);
}

.window-active {
  border-color: var(--color-border-accent);
}

.desktop-window:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.window-maximized {
  border-radius: 0 0 10px 10px;
  border-top: none;
}

.window-mobile {
  @apply min-w-0 border-0;
  border-radius: 0;
}

/* Resize handles */
.resize-handle {
  @apply absolute z-10;
  touch-action: none;
}

.resize-n {
  @apply -top-1 left-2 right-2 h-2 cursor-ns-resize;
}

.resize-s {
  @apply -bottom-1 left-2 right-2 h-2 cursor-ns-resize;
}

.resize-e {
  @apply top-2 bottom-2 -right-1 w-2 cursor-ew-resize;
}

.resize-w {
  @apply top-2 bottom-2 -left-1 w-2 cursor-ew-resize;
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

/* Title bar */
.title-bar {
  @apply h-10 flex items-center justify-between shrink-0 select-none cursor-default;
  padding-left: 14px;
  touch-action: none;
  background-color: var(--color-surface-raised);
  border-bottom: 1px solid var(--color-border);
  border-radius: 9px 9px 0 0;
}

.window-maximized .title-bar,
.window-mobile .title-bar {
  border-radius: 0;
}

.title-content {
  @apply flex items-center gap-2.5 min-w-0;
}

.title-icon {
  @apply w-4 h-4 shrink-0 text-primary;
}

.title-icon :deep(svg) {
  @apply w-full h-full;
}

.title-text {
  @apply truncate;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.window-active .title-text {
  color: var(--color-text-base);
}

/* Window controls, sized like the desktop OS they borrow from */
.window-controls {
  @apply flex items-stretch h-full;
}

.control-button {
  @apply w-[46px] h-full flex items-center justify-center bg-transparent border-0 cursor-pointer;
  color: var(--color-text-secondary);
  transition:
    background-color 120ms ease,
    color 120ms ease;
}

.control-button:hover {
  background-color: var(--color-fill-hover);
  color: var(--color-text-base);
}

.control-button:focus-visible {
  outline-offset: -2px;
}

.control-close {
  border-top-right-radius: 9px;
}

.window-maximized .control-close,
.window-mobile .control-close {
  border-radius: 0;
}

.control-close:hover {
  background-color: var(--color-close);
  color: #fff;
}

.control-icon {
  @apply w-4 h-4;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Window content */
.window-content {
  @apply flex-1 overflow-auto relative scrollbar-thin select-text;
  overscroll-behavior: contain;
  border-radius: 0 0 9px 9px;
}

.window-maximized .window-content,
.window-mobile .window-content {
  border-radius: 0;
}

/* Window content can switch layout on its own width, not the viewport's */
.window-content {
  container-type: inline-size;
}

/* Touch: bigger corner handles */
@media (pointer: coarse) {
  .resize-ne,
  .resize-nw,
  .resize-se,
  .resize-sw {
    @apply w-6 h-6;
  }
}

/* Phones: 44px title bar so the window buttons are comfortable to tap.
   The title bar is not a drag handle here, so the page can scroll normally. */
@media (max-width: 767px) {
  .title-bar {
    /* 44px buttons plus the 1px bottom border */
    height: 45px;
    touch-action: auto;
  }
}
</style>
