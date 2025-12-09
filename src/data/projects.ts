import type { Project } from '@/models/ProjectsApp/interfaces'

export const projectsData: Project[] = [
  {
    id: 6,
    title: 'projects.items.item6.title',
    description: 'projects.items.item6.description',
    tech: ['Linux', 'Raspberry Pi', 'Cluster Computing'],
    isPatent: true,
    patentNumber: 'MP-2021/0099',
    patentPdf: 'https://gery.gef.bg.ac.rs/bitstream/handle/123456789/1379/Glasnik%20intelektualne%20svojine-04-2022.pdf?sequence=2&isAllowed=y',
    patentRegistry: 'https://e-reg.zis.gov.rs/patreg/?t=u',
    patentDocument: '/documents/patent-mp-2021-0099.pdf'
  },
  {
    id: 1,
    title: 'projects.items.item1.title',
    description: 'projects.items.item1.description',
    tech: ['Vue 3', 'TypeScript', 'PHP', 'MySQL', 'Apache'],
    repoFe: 'https://github.com/Neshke/nexton-ecommerce',
    repoBe: 'https://github.com/Neshke/nexton-shop'
  },
  {
    id: 3,
    title: 'projects.items.item3.title',
    description: 'projects.items.item3.description',
    tech: ['Vue.js', 'Tailwind CSS'],
    repo: 'https://github.com/Neshke/Voka-Kop',
    link: 'https://vokakop.com'
  },
  {
    id: 4,
    title: 'projects.items.item4.title',
    description: 'projects.items.item4.description',
    tech: ['Vue.js', 'PHP', 'MySQL'],
    repo: 'https://github.com/Neshke/deltagraf',
    link: 'https://deltagraf.rs'
  },
  {
    id: 5,
    title: 'projects.items.item5.title',
    description: 'projects.items.item5.description',
    tech: ['Kotlin', 'Android SDK', 'Firebase'],
    repo: 'https://gitlab.com/Neshke/mini-health-app'
  },
  {
    id: 7,
    title: 'projects.items.item7.title',
    description: 'projects.items.item7.description',
    tech: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://tehnokan.com/',
    repo: 'https://github.com/Neshke/tehnokan'
  },
  {
    id: 2,
    title: 'projects.items.item2.title',
    description: 'projects.items.item2.description',
    tech: ['JavaScript', 'OpenWeather API', 'Vuetify'],
    repo: 'https://github.com/Neshke/small-weather-app'
  }
]
