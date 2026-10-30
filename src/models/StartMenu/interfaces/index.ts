import type { AppIconName } from '@/data/apps'

export interface StartMenuItem {
  id: string
  title: string
  description?: string
  icon?: AppIconName | 'document'
  type: 'app' | 'section' | 'action'
  href?: string
  download?: boolean
  action?: () => void
}

export interface StartMenuData {
  app: string
  title: string
  description?: string
  items?: StartMenuItem[]
}
