export type ProjectLinkKind =
  | 'website'
  | 'play'
  | 'dashboard'
  | 'code'
  | 'codeFe'
  | 'codeBe'
  | 'gazette'
  | 'registry'
  | 'pdf'

export interface ProjectLink {
  kind: ProjectLinkKind
  href: string
  download?: boolean
}

export interface ProjectImage {
  src: string
  width: number
  height: number
  /** The site in the screenshot, used in the alt text */
  site: string
}

export interface Project {
  id: string
  titleKey: string
  descriptionKey: string
  tech: string[]
  links: ProjectLink[]
  featured?: boolean
  periodKey?: string
  image?: ProjectImage
  patent?: {
    number: string
    application: string
  }
}
