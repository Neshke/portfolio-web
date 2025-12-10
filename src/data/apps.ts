export type AppIconName = 'computer' | 'folder' | 'briefcase' | 'mail' | 'graduation'

export interface AppConfig {
  id: string
  titleKey: string
  componentName: string
  icon: AppIconName
}

export const appsConfig: AppConfig[] = [
  {
    id: 'about',
    titleKey: 'taskbar.about',
    componentName: 'AboutApp',
    icon: 'computer'
  },
  {
    id: 'projects',
    titleKey: 'taskbar.projects',
    componentName: 'ProjectsApp',
    icon: 'folder'
  },
  {
    id: 'experience',
    titleKey: 'taskbar.experience',
    componentName: 'ExperienceApp',
    icon: 'briefcase'
  },
  {
    id: 'contact',
    titleKey: 'taskbar.contact',
    componentName: 'ContactApp',
    icon: 'mail'
  },
  {
    id: 'education',
    titleKey: 'startMenu.education',
    componentName: 'EducationApp',
    icon: 'graduation'
  }
]
