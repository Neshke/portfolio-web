import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWindowsStore, isPhoneLayout } from '@/store/windows'
import { appsConfig } from '@/data/apps'

/**
 * Keeps the URL and the window on top in step.
 *
 * Desktop: the URL is replaced, so moving windows around does not fill the history.
 * Phones: opening a window pushes an entry, so the back gesture closes it instead of
 * leaving the site.
 */
export function useWindowRoute(openApp: (appId: string) => void) {
  const route = useRoute()
  const router = useRouter()
  const windowsStore = useWindowsStore()

  const appFromRoute = () => {
    const app = route.params.app
    return typeof app === 'string' && appsConfig.some((config) => config.id === app) ? app : null
  }

  // URL to windows: first load, back and forward
  watch(
    () => route.params.app,
    () => {
      const app = appFromRoute()
      if (app) {
        if (windowsStore.topWindowId !== app) openApp(app)
      } else if (windowsStore.topWindowId) {
        windowsStore.closeWindow(windowsStore.topWindowId)
      }
    },
    { immediate: true }
  )

  // Windows to URL
  watch(
    () => windowsStore.topWindowId,
    (id) => {
      const target = id ? `/${id}` : '/'
      if (route.path === target) return

      if (!isPhoneLayout()) {
        router.replace(target)
        return
      }

      const back = (window.history.state as { back?: string | null } | null)?.back
      if (back === target) {
        router.back()
      } else if (id) {
        router.push(target)
      } else {
        router.replace(target)
      }
    }
  )
}
