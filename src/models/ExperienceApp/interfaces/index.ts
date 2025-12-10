// Display interfaces (translated values)
export interface Project {
  name: string
  url: string
  image: string
  description?: string
  achievements?: string[]
  tech?: string[]
}

export interface Experience {
  id: number
  role: string
  company: string
  period: string
  description: string
  projects?: Project[]
}

// Data interfaces (i18n keys)
export interface ProjectData {
  name: string
  url: string
  image: string
  descriptionKey?: string
  achievementKeys?: string[]
  tech?: string[]
}

export interface ExperienceData {
  id: number
  roleKey: string
  companyKey: string
  periodKey: string
  descriptionKey: string
  projects?: ProjectData[]
}
