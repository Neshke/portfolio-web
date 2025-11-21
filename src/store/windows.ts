import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WindowItem {
  id: string
  title: string
  component: string // Name of the component to render content, or 'default'
  icon?: string
  props?: Record<string, any>
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

export const useWindowsStore = defineStore('windows', () => {
  const windows = ref<WindowItem[]>([])
  const activeWindowId = ref<string | null>(null)
  const nextZIndex = ref(100)

  // Getters
  const openWindows = computed(() => windows.value)
  const getWindowById = (id: string) => windows.value.find((w) => w.id === id)

  // Actions
  function openWindow(id: string, title: string, component: string = 'default', props: Record<string, any> = {}, icon?: string) {
    // Minimize all other windows to ensure single window mode ONLY on mobile devices
    // Using 768px (tablet/md) as the breakpoint to match the DesktopWindow component's mobile logic
    // We use matchMedia for more accurate media query matching
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    if (isMobile) {
      windows.value.forEach((w) => {
        if (w.id !== id) {
          w.isMinimized = true
        }
      })
    }

    const existingWindow = getWindowById(id)

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        existingWindow.isMinimized = false
      }
      focusWindow(id)
      return
    }

    // Calculate center position (approximate)
    const width = 900
    const height = 600
    const x = Math.max(20, (window.innerWidth - width) / 2 + (windows.value.length * 20))
    const y = Math.max(20, (window.innerHeight - height) / 2 + (windows.value.length * 20))

    const newWindow: WindowItem = {
      id,
      title,
      component,
      icon,
      props,
      position: { x, y },
      size: { width, height },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex.value++,
    }

    windows.value.push(newWindow)
    activeWindowId.value = id
  }

  function closeWindow(id: string) {
    const index = windows.value.findIndex((w) => w.id === id)
    if (index !== -1) {
      windows.value.splice(index, 1)
      if (activeWindowId.value === id) {
        activeWindowId.value = null
        // Focus the next top-most window
        if (windows.value.length > 0) {
          const topWindow = windows.value.reduce((prev, current) =>
            (prev.zIndex > current.zIndex) ? prev : current
          )
          activeWindowId.value = topWindow.id
        }
      }
    }
  }

  function focusWindow(id: string) {
    const windowItem = getWindowById(id)
    if (windowItem) {
      windowItem.zIndex = nextZIndex.value++
      activeWindowId.value = id
    }
  }

  function minimizeWindow(id: string) {
    const windowItem = getWindowById(id)
    if (windowItem) {
      windowItem.isMinimized = true
      if (activeWindowId.value === id) {
        activeWindowId.value = null
      }
    }
  }

  function maximizeWindow(id: string) {
    const windowItem = getWindowById(id)
    if (windowItem) {
      windowItem.isMaximized = !windowItem.isMaximized
      focusWindow(id)
    }
  }

  function updateWindowPosition(id: string, x: number, y: number) {
    const windowItem = getWindowById(id)
    if (windowItem) {
      windowItem.position = { x, y }
      focusWindow(id)
    }
  }

  function updateWindowSize(id: string, width: number, height: number) {
    const windowItem = getWindowById(id)
    if (windowItem) {
      windowItem.size = { width, height }
      focusWindow(id)
    }
  }

  return {
    windows,
    activeWindowId,
    openWindows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize
  }
})
