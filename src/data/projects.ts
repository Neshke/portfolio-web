import type { Project } from '@/models/ProjectsApp/interfaces'
import fairAssistantShot from '@/assets/images/projects/fair-assistant.webp'
import deltagrafShot from '@/assets/images/projects/deltagraf.webp'
import tehnokanShot from '@/assets/images/projects/tehnokan.webp'

// Screenshots are of the public home pages only. Never use a screen with real contacts.

export const projectsData: Project[] = [
  {
    id: 'fair-assistant',
    titleKey: 'projects.items.fairAssistant.title',
    descriptionKey: 'projects.items.fairAssistant.description',
    periodKey: 'projects.items.fairAssistant.period',
    featured: true,
    image: { src: fairAssistantShot, width: 1280, height: 720, site: 'fairassistant.com' },
    tech: [
      'Kotlin',
      'Jetpack Compose',
      'Nuxt 4',
      'TypeScript',
      'Node.js',
      'Fastify',
      'PostgreSQL',
      'Gemini API',
    ],
    links: [
      { kind: 'website', href: 'https://fairassistant.com' },
      {
        kind: 'play',
        href: 'https://play.google.com/store/apps/details?id=com.fairassistant.app',
      },
      { kind: 'dashboard', href: 'https://app.fairassistant.com' },
    ],
  },
  {
    id: 'tehnokan',
    titleKey: 'projects.items.tehnokan.title',
    descriptionKey: 'projects.items.tehnokan.description',
    image: { src: tehnokanShot, width: 640, height: 400, site: 'tehnokan.com' },
    tech: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    links: [{ kind: 'website', href: 'https://tehnokan.com/' }],
  },
  {
    id: 'microcloud',
    titleKey: 'projects.items.microcloud.title',
    descriptionKey: 'projects.items.microcloud.description',
    tech: ['Linux', 'Raspberry Pi', 'Cluster Computing'],
    patent: { number: 'RS 1753 U1', application: 'MP-2021/0099' },
    links: [
      {
        kind: 'gazette',
        href: 'https://gery.gef.bg.ac.rs/bitstream/handle/123456789/1379/Glasnik%20intelektualne%20svojine-04-2022.pdf?sequence=2&isAllowed=y',
      },
      { kind: 'registry', href: 'https://e-reg.zis.gov.rs/patreg/?t=u' },
      { kind: 'pdf', href: '/documents/patent-mp-2021-0099.pdf', download: true },
    ],
  },
  {
    id: 'nexton',
    titleKey: 'projects.items.nexton.title',
    descriptionKey: 'projects.items.nexton.description',
    tech: ['Vue 3', 'TypeScript', 'PHP', 'MySQL', 'Apache'],
    links: [
      { kind: 'codeFe', href: 'https://github.com/Neshke/nexton-ecommerce-FE' },
      { kind: 'codeBe', href: 'https://github.com/Neshke/nexton-ecommerce-BE' },
    ],
  },
  {
    id: 'mini-health',
    titleKey: 'projects.items.miniHealth.title',
    descriptionKey: 'projects.items.miniHealth.description',
    tech: ['Kotlin', 'Android SDK', 'Firebase'],
    links: [{ kind: 'code', href: 'https://gitlab.com/Neshke/mini-health-app' }],
  },
  {
    id: 'weather',
    titleKey: 'projects.items.weather.title',
    descriptionKey: 'projects.items.weather.description',
    tech: ['JavaScript', 'OpenWeather API', 'Vuetify'],
    links: [{ kind: 'code', href: 'https://github.com/Neshke/small-weather-app' }],
  },
  {
    id: 'portfolio',
    titleKey: 'projects.items.portfolio.title',
    descriptionKey: 'projects.items.portfolio.description',
    tech: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Pinia', 'Vue Router'],
    links: [{ kind: 'code', href: 'https://github.com/Neshke/portfolio-web' }],
  },
  {
    id: 'deltagraf',
    titleKey: 'projects.items.deltagraf.title',
    descriptionKey: 'projects.items.deltagraf.description',
    image: { src: deltagrafShot, width: 640, height: 400, site: 'deltagraf.rs' },
    tech: ['Vue.js', 'PHP', 'MySQL'],
    links: [
      { kind: 'website', href: 'https://deltagraf.rs' },
      { kind: 'code', href: 'https://github.com/Neshke/deltagraf' },
    ],
  },
  {
    id: 'vokakop',
    titleKey: 'projects.items.vokakop.title',
    descriptionKey: 'projects.items.vokakop.description',
    tech: ['Vue.js', 'Tailwind CSS'],
    links: [
      { kind: 'website', href: 'https://vokakop.com' },
      { kind: 'code', href: 'https://github.com/Neshke/Voka-Kop' },
    ],
  },
]
