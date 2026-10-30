import { markRaw, type Component } from 'vue'
import IconComputer from '@/assets/icons/IconComputer.vue'
import IconFolder from '@/assets/icons/IconFolder.vue'
import IconBriefcase from '@/assets/icons/IconBriefcase.vue'
import IconMail from '@/assets/icons/IconMail.vue'
import IconGraduation from '@/assets/icons/IconGraduation.vue'
import IconDocument from '@/assets/icons/IconDocument.vue'
import type { AppIconName } from '@/data/apps'

export type IconName = AppIconName | 'document'

// One icon map for the desktop, taskbar, start menu and window title bars
const appIcons: Record<IconName, Component> = {
  computer: markRaw(IconComputer),
  folder: markRaw(IconFolder),
  briefcase: markRaw(IconBriefcase),
  mail: markRaw(IconMail),
  graduation: markRaw(IconGraduation),
  document: markRaw(IconDocument),
}

export function useAppIcons() {
  const getAppIcon = (iconName: IconName): Component => appIcons[iconName]

  return {
    appIcons,
    getAppIcon,
  }
}
