import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'
import type { AppIconName } from '@/data/apps'

export interface WindowItem {
  id: string
  /** i18n key, translated at render time so open windows follow a language switch */
  titleKey: string
  component: string
  icon?: AppIconName
  props?: Record<string, unknown>
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

export interface WindowGeometry {
  x: number
  y: number
  width: number
  height: number
}

/** Taskbar height plus its margin on desktop */
export const TASKBAR_SPACE = 80
export const MIN_WINDOW_WIDTH = 360
export const MIN_WINDOW_HEIGHT = 240
const DESKTOP_ICON_COLUMN = 150
const EDGE = 8

export const PHONE_QUERY = '(max-width: 767px)'

export function isPhoneLayout() {
  return window.matchMedia(PHONE_QUERY).matches
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/** Where a new window opens: centered next to the icon column, cascading by 24px */
export function initialGeometry(
  openCount: number,
  vw = window.innerWidth,
  vh = window.innerHeight
): WindowGeometry {
  const usableHeight = vh - TASKBAR_SPACE
  const width = Math.min(920, vw - DESKTOP_ICON_COLUMN - 40)
  const height = Math.min(700, usableHeight - 32)
  const offset = openCount * 24
  const x = clamp((vw - width) / 2 + offset, DESKTOP_ICON_COLUMN, Math.max(16, vw - width - 16))
  // The bottom edge stays above the taskbar, even for the third window of a cascade
  const y = clamp(
    (usableHeight - height) / 2 + offset,
    16,
    Math.max(EDGE, usableHeight - height - EDGE)
  )
  return { width, height, x, y }
}

/** Shrinks and moves a window so it sits inside the viewport, above the taskbar */
export function fitGeometry(
  geometry: WindowGeometry,
  vw = window.innerWidth,
  vh = window.innerHeight
): WindowGeometry {
  const usableHeight = vh - TASKBAR_SPACE
  const width = Math.max(MIN_WINDOW_WIDTH, Math.min(geometry.width, vw - 2 * EDGE))
  const height = Math.max(MIN_WINDOW_HEIGHT, Math.min(geometry.height, usableHeight - 2 * EDGE))
  const x = clamp(geometry.x, 0, Math.max(0, vw - width))
  const y = clamp(geometry.y, 0, Math.max(0, usableHeight - height))
  return { x, y, width, height }
}

const isFocusable = (el: HTMLElement | null | undefined): el is HTMLElement =>
  !!el && el.isConnected && el.getClientRects().length > 0 && !el.closest('[inert]')

function focusFirst(candidates: Array<HTMLElement | null | undefined>) {
  candidates.find(isFocusable)?.focus()
}

const desktopIcon = (id: string) =>
  document.querySelector<HTMLElement>(`.desktop-icon[data-app="${id}"]`)
const taskbarButton = (id: string) =>
  document.querySelector<HTMLElement>(`.taskbar-app[data-app="${id}"]`)
const startButton = () => document.querySelector<HTMLElement>('.start-button')

export const useWindowsStore = defineStore('windows', () => {
  const windows = ref<WindowItem[]>([])
  const activeWindowId = ref<string | null>(null)
  const nextZIndex = ref(100)
  // The element that opened each window, so focus can go back to it on close
  const openers = new Map<string, HTMLElement>()

  const openWindows = computed(() => windows.value)
  const getWindowById = (id: string) => windows.value.find((w) => w.id === id)

  /** The window on top of the visible ones, or null when none is showing */
  const topWindowId = computed(() => {
    const visible = windows.value.filter((w) => !w.isMinimized)
    if (visible.length === 0) return null
    return visible.reduce((prev, current) => (prev.zIndex > current.zIndex ? prev : current)).id
  })

  function rememberOpener(id: string) {
    const el = document.activeElement
    if (el instanceof HTMLElement && el !== document.body && !el.closest('.desktop-window')) {
      openers.set(id, el)
    }
  }

  function openWindow(
    id: string,
    titleKey: string,
    component: string = 'default',
    props: Record<string, unknown> = {},
    icon?: AppIconName
  ) {
    rememberOpener(id)

    if (isPhoneLayout()) {
      windows.value.forEach((w) => {
        if (w.id !== id) {
          w.isMinimized = true
        }
      })
    }

    const existingWindow = getWindowById(id)

    if (existingWindow) {
      existingWindow.isMinimized = false
      focusWindow(id)
      return
    }

    const { width, height, x, y } = initialGeometry(windows.value.length)

    windows.value.push({
      id,
      titleKey,
      component,
      icon,
      props,
      position: { x, y },
      size: { width, height },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex.value++,
    })
    activeWindowId.value = id
  }

  function closeWindow(id: string) {
    const index = windows.value.findIndex((w) => w.id === id)
    if (index === -1) return
    windows.value.splice(index, 1)
    if (activeWindowId.value === id) {
      activeWindowId.value = topWindowId.value
    }

    const opener = openers.get(id)
    openers.delete(id)
    // When another window becomes active it takes focus itself (DesktopWindow)
    if (activeWindowId.value === null) {
      nextTick(() => focusFirst([opener, desktopIcon(id), taskbarButton(id), startButton()]))
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
      // The window went to the taskbar, so focus follows it there
      nextTick(() => focusFirst([taskbarButton(id), openers.get(id), startButton()]))
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

  /** Runs when the browser window changes size, so no window ends up out of reach */
  function fitWindowsToViewport(vw = window.innerWidth, vh = window.innerHeight) {
    for (const win of windows.value) {
      const fitted = fitGeometry({ ...win.position, ...win.size }, vw, vh)
      if (fitted.x !== win.position.x || fitted.y !== win.position.y) {
        win.position = { x: fitted.x, y: fitted.y }
      }
      if (fitted.width !== win.size.width || fitted.height !== win.size.height) {
        win.size = { width: fitted.width, height: fitted.height }
      }
    }
  }

  return {
    windows,
    activeWindowId,
    openWindows,
    topWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
    fitWindowsToViewport,
  }
})
