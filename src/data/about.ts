// A short, honest list: what I reach for first. The CV has the long version.
export interface SkillGroup {
  labelKey: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    labelKey: 'about.skillGroups.frontend',
    items: ['Vue.js 3', 'Nuxt 4', 'TypeScript', 'Pinia', 'Tailwind CSS'],
  },
  {
    labelKey: 'about.skillGroups.testing',
    items: ['Vitest', 'Cypress', 'Playwright'],
  },
  {
    labelKey: 'about.skillGroups.other',
    items: ['Node.js', 'PostgreSQL', 'Kotlin', 'Jetpack Compose'],
  },
]
