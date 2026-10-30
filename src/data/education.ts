export interface EducationEntry {
  id: string
  titleKey: string
  placeKey: string
  periodKey?: string
  descriptionKey?: string
  noteKey?: string
  primary?: boolean
}

export const educationEntries: EducationEntry[] = [
  {
    id: 'university',
    titleKey: 'education.degree.title',
    placeKey: 'education.degree.place',
    periodKey: 'education.degree.period',
    descriptionKey: 'education.degree.description',
    primary: true,
  },
  {
    id: 'highSchool',
    titleKey: 'education.highSchool.title',
    placeKey: 'education.highSchool.place',
    descriptionKey: 'education.highSchool.description',
  },
  {
    id: 'musicSchool',
    titleKey: 'education.musicSchool.title',
    placeKey: 'education.musicSchool.place',
    noteKey: 'education.musicSchool.note',
  },
]
