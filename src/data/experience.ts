import type { ExperienceRole } from '@/models/ExperienceApp/interfaces'

// Source of truth: the CV. Newest role first.
export const experienceRoles: ExperienceRole[] = [
  {
    id: 'fa',
    titleKey: 'experience.roles.fa.title',
    company: 'Tehnokan d.o.o. (Fair Assistant)',
    periodKey: 'experience.roles.fa.period',
    introKey: 'experience.roles.fa.intro',
    current: true,
    links: [
      { text: 'fairassistant.com', href: 'https://fairassistant.com' },
      {
        text: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.fairassistant.app',
      },
      { text: 'app.fairassistant.com', href: 'https://app.fairassistant.com' },
    ],
    // At most four, each one leads with what shipped. The rest sits in the fold below.
    bulletKeys: [
      'experience.roles.fa.bullets.lead',
      'experience.roles.fa.bullets.android',
      'experience.roles.fa.bullets.web',
      'experience.roles.fa.bullets.api',
    ],
    details: {
      summaryKey: 'experience.roles.fa.details.summary',
      bulletKeys: [
        'experience.roles.fa.details.sync',
        'experience.roles.fa.details.teamKey',
        'experience.roles.fa.details.ai',
      ],
    },
  },
  {
    id: 'euronet',
    titleKey: 'experience.roles.euronet.title',
    company: 'Euronet Worldwide',
    periodKey: 'experience.roles.euronet.period',
    introKey: 'experience.roles.euronet.intro',
    groups: [
      {
        name: 'XE',
        link: { text: 'xe.com', href: 'https://www.xe.com' },
        stack: 'Vue 3, TypeScript, Pinia, Tailwind CSS, Vitest, Cypress',
        bulletKeys: [
          'experience.roles.euronet.xe.build',
          'experience.roles.euronet.xe.migration',
          'experience.roles.euronet.xe.tests',
          'experience.roles.euronet.xe.perf',
          'experience.roles.euronet.xe.i18n',
          'experience.roles.euronet.xe.analytics',
          'experience.roles.euronet.xe.arch',
        ],
      },
      {
        name: 'Ria Money Transfer',
        link: { text: 'riamoneytransfer.com', href: 'https://www.riamoneytransfer.com' },
        stack: 'Vue.js Composition API, Vuex, Tailwind CSS',
        bulletKeys: [
          'experience.roles.euronet.ria.features',
          'experience.roles.euronet.ria.tailwind',
          'experience.roles.euronet.ria.review',
        ],
      },
    ],
  },
]
