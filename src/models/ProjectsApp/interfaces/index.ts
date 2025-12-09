export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  repoFe?: string
  repoBe?: string
  repo?: string
  link?: string
  isPatent?: boolean
  patentNumber?: string
  patentPdf?: string
  patentRegistry?: string
  patentDocument?: string
}
