export interface ExternalLink {
  text: string
  href: string
  labelKey?: string
}

export interface ExperienceGroup {
  name: string
  link: ExternalLink
  stack: string
  bulletKeys: string[]
}

/** Extra technical detail, folded away so the main bullets stay short */
export interface ExperienceDetails {
  summaryKey: string
  bulletKeys: string[]
}

export interface ExperienceRole {
  id: string
  titleKey: string
  /** Company names are proper nouns; companyKey is used only when the name is translated. */
  company?: string
  companyKey?: string
  periodKey: string
  introKey?: string
  links?: ExternalLink[]
  bulletKeys?: string[]
  details?: ExperienceDetails
  groups?: ExperienceGroup[]
  current?: boolean
}
