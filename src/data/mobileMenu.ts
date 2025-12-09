import type { StartMenuDataConfig } from '@/models/StartMenu/interfaces'

export const mobileMenuData: Record<string, StartMenuDataConfig> = {
  about: {
    app: 'about',
    titleKey: 'taskbar.about',
    descriptionKey: 'startMenu.aboutDescription',
    items: [
      {
        id: 'bio',
        titleKey: 'startMenu.bio',
        descriptionKey: 'startMenu.bioDescription',
        type: 'section',
      },
      {
        id: 'skills',
        titleKey: 'startMenu.skills',
        descriptionKey: 'startMenu.skillsDescription',
        type: 'section',
      },
      {
        id: 'resume',
        titleKey: 'startMenu.resume',
        descriptionKey: 'startMenu.resumeDescription',
        type: 'action',
      },
    ],
  },
  projects: {
    app: 'projects',
    titleKey: 'taskbar.projects',
    descriptionKey: 'startMenu.projectsDescription',
    items: [
      {
        id: 'web',
        titleKey: 'startMenu.webProjects',
        descriptionKey: 'startMenu.webProjectsDescription',
        type: 'section',
      },
      {
        id: 'mobile',
        titleKey: 'startMenu.mobileProjects',
        descriptionKey: 'startMenu.mobileProjectsDescription',
        type: 'section',
      },
      {
        id: 'opensource',
        titleKey: 'startMenu.openSource',
        descriptionKey: 'startMenu.openSourceDescription',
        type: 'section',
      },
    ],
  },
  experience: {
    app: 'experience',
    titleKey: 'taskbar.experience',
    descriptionKey: 'startMenu.experienceDescription',
    items: [
      {
        id: 'work',
        titleKey: 'startMenu.workHistory',
        descriptionKey: 'startMenu.workHistoryDescription',
        type: 'section',
      },
      {
        id: 'education',
        titleKey: 'startMenu.education',
        descriptionKey: 'startMenu.educationDescription',
        type: 'section',
      },
    ],
  },
}
