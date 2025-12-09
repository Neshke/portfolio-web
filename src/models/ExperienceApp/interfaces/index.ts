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
