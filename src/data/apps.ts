export type AppIconName = 'computer' | 'folder' | 'briefcase' | 'mail' | 'graduation'

export interface AppConfig {
  id: string
  titleKey: string
  descriptionKey: string
  componentName: string
  icon: AppIconName
}

// Order matches how a recruiter reads: who, what, where, schooling, how to reach.
export const appsConfig: AppConfig[] = [
  {
    id: 'about',
    titleKey: 'apps.about',
    descriptionKey: 'startMenu.descriptions.about',
    componentName: 'AboutApp',
    icon: 'computer',
  },
  {
    id: 'projects',
    titleKey: 'apps.projects',
    descriptionKey: 'startMenu.descriptions.projects',
    componentName: 'ProjectsApp',
    icon: 'folder',
  },
  {
    id: 'experience',
    titleKey: 'apps.experience',
    descriptionKey: 'startMenu.descriptions.experience',
    componentName: 'ExperienceApp',
    icon: 'briefcase',
  },
  {
    id: 'education',
    titleKey: 'apps.education',
    descriptionKey: 'startMenu.descriptions.education',
    componentName: 'EducationApp',
    icon: 'graduation',
  },
  {
    id: 'contact',
    titleKey: 'apps.contact',
    descriptionKey: 'startMenu.descriptions.contact',
    componentName: 'ContactApp',
    icon: 'mail',
  },
]
