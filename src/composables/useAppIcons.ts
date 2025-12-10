import { markRaw, type Component } from 'vue'
import IconComputer from '@/assets/icons/IconComputer.vue'
import IconFolder from '@/assets/icons/IconFolder.vue'
import IconBriefcase from '@/assets/icons/IconBriefcase.vue'
import IconMail from '@/assets/icons/IconMail.vue'
import IconGraduation from '@/assets/icons/IconGraduation.vue'
import { appsConfig, type AppIconName, type AppConfig } from '@/data/apps'

// Icon components mapping
const appIcons: Record<AppIconName, Component> = {
  computer: markRaw(IconComputer),
  folder: markRaw(IconFolder),
  briefcase: markRaw(IconBriefcase),
  mail: markRaw(IconMail),
  graduation: markRaw(IconGraduation)
}

export function useAppIcons() {
  const getAppIcon = (iconName: AppIconName): Component => {
    return appIcons[iconName]
  }

  const getAppConfig = (id: string): AppConfig | undefined => {
    return appsConfig.find(app => app.id === id)
  }

  return {
    appIcons,
    getAppIcon,
    getAppConfig
  }
}
