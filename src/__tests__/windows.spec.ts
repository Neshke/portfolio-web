import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import {
  fitGeometry,
  initialGeometry,
  useWindowsStore,
  TASKBAR_SPACE,
  MIN_WINDOW_WIDTH,
} from '@/store/windows'

describe('window geometry', () => {
  it('keeps a cascade of three windows above the taskbar', () => {
    for (const [vw, vh] of [
      [1440, 900],
      [1280, 720],
      [1024, 640],
    ] as const) {
      for (let open = 0; open < 3; open++) {
        const g = initialGeometry(open, vw, vh)
        expect(g.y + g.height, `${vw}x${vh} window ${open + 1}`).toBeLessThanOrEqual(
          vh - TASKBAR_SPACE
        )
        expect(g.x + g.width).toBeLessThanOrEqual(vw)
      }
    }
  })

  it('pulls a window back on screen after the browser gets smaller', () => {
    // Education dragged to x=1320 at 1440 wide, then the browser shrinks to 1024x640
    const fitted = fitGeometry({ x: 1320, y: 84, width: 920, height: 700 }, 1024, 640)
    expect(fitted.x).toBeGreaterThanOrEqual(0)
    expect(fitted.x + fitted.width).toBeLessThanOrEqual(1024)
    expect(fitted.y + fitted.height).toBeLessThanOrEqual(640 - TASKBAR_SPACE)
    expect(fitted.width).toBeGreaterThanOrEqual(MIN_WINDOW_WIDTH)
  })

  it('leaves a window that already fits alone', () => {
    const g = { x: 200, y: 40, width: 800, height: 600 }
    expect(fitGeometry(g, 1440, 900)).toEqual(g)
  })
})

describe('windows store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.body.innerHTML = ''
  })

  it('tracks the window on top, ignoring minimized ones', () => {
    const store = useWindowsStore()
    store.openWindow('about', 'apps.about', 'AboutApp')
    store.openWindow('projects', 'apps.projects', 'ProjectsApp')
    expect(store.topWindowId).toBe('projects')
    store.minimizeWindow('projects')
    expect(store.topWindowId).toBe('about')
    store.closeWindow('about')
    expect(store.topWindowId).toBeNull()
  })

  it('fits every open window into a smaller viewport', () => {
    const store = useWindowsStore()
    store.openWindow('education', 'apps.education', 'EducationApp')
    store.updateWindowPosition('education', 1320, 84)
    store.fitWindowsToViewport(1024, 640)
    const win = store.windows[0]!
    expect(win.position.x + win.size.width).toBeLessThanOrEqual(1024)
    expect(win.position.y + win.size.height).toBeLessThanOrEqual(640 - TASKBAR_SPACE)
  })
})
