import type { StartMenuItemConfig } from '@/models/StartMenu/interfaces'

export const startMenuItemsConfig: StartMenuItemConfig[] = [
  {
    id: 'about',
    titleKey: 'taskbar.about',
    descriptionKey: 'startMenu.aboutDescription',
    componentName: 'AboutApp',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
  },
  {
    id: 'projects',
    titleKey: 'taskbar.projects',
    descriptionKey: 'startMenu.projectsDescription',
    componentName: 'ProjectsApp',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>'
  },
  {
    id: 'experience',
    titleKey: 'taskbar.experience',
    descriptionKey: 'startMenu.experienceDescription',
    componentName: 'ExperienceApp',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
  },
  {
    id: 'education',
    titleKey: 'startMenu.education',
    descriptionKey: 'startMenu.educationDescription',
    componentName: 'EducationApp',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 0 6-1 6-1v-7"></path></svg>'
  },
  {
    id: 'contact',
    titleKey: 'taskbar.contact',
    descriptionKey: 'startMenu.contactDescription',
    componentName: 'ContactApp',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'
  }
]
