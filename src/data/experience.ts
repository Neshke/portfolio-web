import type { ExperienceData } from '@/models/ExperienceApp/interfaces'

export const experiencesData: ExperienceData[] = [
  {
    id: 1,
    roleKey: 'experience.items.item1.role',
    companyKey: 'experience.items.item1.company',
    periodKey: 'experience.items.item1.period',
    descriptionKey: 'experience.items.item1.description',
    projects: [
      {
        name: 'XE.com',
        url: 'https://www.xe.com/',
        image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.xe.com%2F?w=600&h=400',
        descriptionKey: 'experience.items.item1.projects.xe.description',
        tech: ['Vue 3', 'TypeScript', 'Pinia', 'Tailwind', 'Vitest', 'Cypress', 'Axios', 'i18n'],
        achievementKeys: [
          'experience.items.item1.projects.xe.achievements[0]',
          'experience.items.item1.projects.xe.achievements[1]',
          'experience.items.item1.projects.xe.achievements[2]',
          'experience.items.item1.projects.xe.achievements[3]',
          'experience.items.item1.projects.xe.achievements[4]',
          'experience.items.item1.projects.xe.achievements[5]',
          'experience.items.item1.projects.xe.achievements[6]',
          'experience.items.item1.projects.xe.achievements[7]',
          'experience.items.item1.projects.xe.achievements[8]',
          'experience.items.item1.projects.xe.achievements[9]'
        ]
      },
      {
        name: 'Ria Money Transfer',
        url: 'https://www.riamoneytransfer.com/en-us/',
        image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.riamoneytransfer.com%2Fen-us%2F?w=600&h=400',
        descriptionKey: 'experience.items.item1.projects.ria.description',
        tech: ['Vue 2', 'Vuex', 'Composition API', 'SCSS', 'Tailwind'],
        achievementKeys: [
          'experience.items.item1.projects.ria.achievements[0]',
          'experience.items.item1.projects.ria.achievements[1]',
          'experience.items.item1.projects.ria.achievements[2]',
          'experience.items.item1.projects.ria.achievements[3]',
          'experience.items.item1.projects.ria.achievements[4]',
          'experience.items.item1.projects.ria.achievements[5]',
          'experience.items.item1.projects.ria.achievements[6]'
        ]
      }
    ]
  },
  {
    id: 2,
    roleKey: 'experience.items.item2.role',
    companyKey: 'experience.items.item2.company',
    periodKey: 'experience.items.item2.period',
    descriptionKey: 'experience.items.item2.description',
    projects: [
      {
        name: 'Tehnokan',
        url: 'https://tehnokan.com/',
        image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Ftehnokan.com%2F?w=600&h=400'
      },
      {
        name: 'Delta Graf',
        url: 'https://deltagraf.rs/',
        image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fdeltagraf.rs?w=600&h=400'
      },
      {
        name: 'Voka Kop',
        url: 'https://vokakop.com/',
        image: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fvokakop.com?w=600&h=400'
      }
    ]
  }
]
