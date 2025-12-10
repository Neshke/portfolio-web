import type { StartMenuItemConfig } from '@/models/StartMenu/interfaces'

export const startMenuItemsConfig: StartMenuItemConfig[] = [
  {
    id: 'about',
    titleKey: 'taskbar.about',
    descriptionKey: 'startMenu.aboutDescription',
    componentName: 'AboutApp',
    icon: 'computer'
  },
  {
    id: 'projects',
    titleKey: 'taskbar.projects',
    descriptionKey: 'startMenu.projectsDescription',
    componentName: 'ProjectsApp',
    icon: 'folder'
  },
  {
    id: 'experience',
    titleKey: 'taskbar.experience',
    descriptionKey: 'startMenu.experienceDescription',
    componentName: 'ExperienceApp',
    icon: 'briefcase'
  },
  {
    id: 'education',
    titleKey: 'startMenu.education',
    descriptionKey: 'startMenu.educationDescription',
    componentName: 'EducationApp',
    icon: 'graduation'
  },
  {
    id: 'contact',
    titleKey: 'taskbar.contact',
    descriptionKey: 'startMenu.contactDescription',
    componentName: 'ContactApp',
    icon: 'mail'
  }
]
