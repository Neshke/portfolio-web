import type { AppIconName } from '@/data/apps'

export interface StartMenuItem {
  id: string
  title: string
  description?: string
  icon?: AppIconName
  type: 'app' | 'section' | 'action'
  route?: string
  action?: () => void
}

export interface StartMenuData {
  app: string
  title: string
  description?: string
  items?: StartMenuItem[]
}

export interface StartMenuItemConfig {
  id: string
  titleKey: string
  descriptionKey: string
  icon?: AppIconName
  componentName?: string
  type?: 'app' | 'section' | 'action'
}

export interface StartMenuDataConfig {
  app: string
  titleKey: string
  descriptionKey: string
  items: StartMenuItemConfig[]
}
