import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import en from '@/i18n/locales/en.json'
import sr from '@/i18n/locales/sr.json'
import { experienceRoles } from '@/data/experience'
import { projectsData } from '@/data/projects'
import { educationEntries } from '@/data/education'
import { skillGroups } from '@/data/about'
import { appsConfig } from '@/data/apps'
import { contactInfo, cvFile } from '@/data/contact'

type Messages = Record<string, unknown>

function flatten(obj: Messages, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object') {
      Object.assign(acc, flatten(value as Messages, path))
    } else {
      acc[path] = String(value)
    }
    return acc
  }, {})
}

const flatEn = flatten(en)
const flatSr = flatten(sr)
const allText = [...Object.values(flatEn), ...Object.values(flatSr)]

function referencedKeys(): string[] {
  const keys: string[] = []
  for (const role of experienceRoles) {
    keys.push(role.titleKey, role.periodKey)
    if (role.introKey) keys.push(role.introKey)
    if (role.companyKey) keys.push(role.companyKey)
    keys.push(...(role.bulletKeys ?? []))
    if (role.details) keys.push(role.details.summaryKey, ...role.details.bulletKeys)
    for (const group of role.groups ?? []) keys.push(...group.bulletKeys)
  }
  for (const project of projectsData) {
    keys.push(project.titleKey, project.descriptionKey)
    if (project.periodKey) keys.push(project.periodKey)
    for (const link of project.links) keys.push(`projects.links.${link.kind}`)
    if (project.image) keys.push('projects.screenshotAlt')
  }
  for (const entry of educationEntries) {
    keys.push(entry.titleKey, entry.placeKey)
    for (const key of [entry.periodKey, entry.descriptionKey, entry.noteKey]) {
      if (key) keys.push(key)
    }
  }
  for (const group of skillGroups) {
    keys.push(group.labelKey, ...group.items.filter((item) => item.startsWith('about.')))
  }
  for (const app of appsConfig) keys.push(app.titleKey, app.descriptionKey)
  return keys
}

describe('translations', () => {
  it('English and Serbian have the same keys', () => {
    expect(Object.keys(flatSr).sort()).toEqual(Object.keys(flatEn).sort())
  })

  it('every key used by the data files exists in both languages', () => {
    for (const key of referencedKeys()) {
      expect(flatEn, `missing in en: ${key}`).toHaveProperty([key])
      expect(flatSr, `missing in sr: ${key}`).toHaveProperty([key])
    }
  })

  it('has no em dashes, and en dashes only in year ranges', () => {
    for (const text of allText) {
      expect(text).not.toContain('—')
      const withoutRanges = text.replace(/\d{4} – (\d{4}|present|danas)/g, '')
      expect(withoutRanges, text).not.toContain('–')
    }
  })

  it('avoids stock phrases the old copy had', () => {
    const banned = [
      'dedicated',
      'passionate',
      'core philosophy',
      'test of time',
      'ensuring',
      'seamless',
      'leverage',
      'cutting-edge',
      'cyberpunk',
      'matrix',
      'core philosophy',
      'posvećen',
      'osiguravajući',
      'pinia-u',
    ]
    for (const text of allText) {
      for (const phrase of banned) {
        expect(text.toLowerCase(), text).not.toContain(phrase)
      }
    }
  })

  it('Serbian uses "veb", as the Serbian CV does (API names like Web Worker excepted)', () => {
    for (const text of Object.values(flatSr)) {
      expect(text.replace(/Web Worker\w*/g, ''), text).not.toMatch(/\bweb\b/i)
    }
  })

  it('never shows a phone number', () => {
    const phonePattern = /(\+381|\b06\d[\s/-]?\d{3})/
    for (const text of [...allText, ...Object.values(contactInfo)]) {
      expect(text).not.toMatch(phonePattern)
    }
  })
})

describe('facts match the CV', () => {
  it('Euronet ran from 2022 to 2026 and is not the current job', () => {
    const euronet = experienceRoles.find((role) => role.id === 'euronet')
    expect(euronet?.current).toBeFalsy()
    expect(en.experience.roles.euronet.period).toBe('2022 – 2026')
    expect(sr.experience.roles.euronet.period).toBe('2022 – 2026')
  })

  it('the migration is described as one of the main developers, not as leading it', () => {
    expect(en.experience.roles.euronet.xe.migration).toMatch(/^One of the main developers/)
    expect(en.experience.roles.euronet.xe.migration).toContain('team of 10')
    expect(sr.experience.roles.euronet.xe.migration).toContain('jedan od glavnih developera')
    expect(flatEn['about.bio.p1']).not.toMatch(/\bled\b/i)
  })

  it('the current role is Fair Assistant', () => {
    const current = experienceRoles.filter((role) => role.current)
    expect(current.map((role) => role.id)).toEqual(['fa'])
    expect(en.experience.roles.fa.title).toBe('Technical Lead and Co-founder')
    const hrefs = current[0]!.links!.map((link) => link.href)
    expect(hrefs).toContain('https://fairassistant.com')
    expect(hrefs).toContain('https://play.google.com/store/apps/details?id=com.fairassistant.app')
    expect(hrefs).toContain('https://app.fairassistant.com')
  })

  it('the Fair Assistant role keeps at most four bullets, with the rest folded away', () => {
    const fa = experienceRoles.find((role) => role.id === 'fa')!
    expect(fa.company).toBe('Tehnokan d.o.o. (Fair Assistant)')
    expect(fa.bulletKeys!.length).toBeLessThanOrEqual(4)
    expect(fa.details?.bulletKeys.length).toBeGreaterThan(0)
  })

  it('the three months apply to the Android app, not the whole product', () => {
    expect(en.about.bio.p2).toContain('about three months from first commit to public release')
    expect(sr.about.bio.p2).toContain('od prvog commita do javnog izdanja oko tri meseca')
  })

  it('experience lists only Tehnokan (Fair Assistant) and Euronet', () => {
    expect(experienceRoles.map((role) => role.id)).toEqual(['fa', 'euronet'])
  })

  it('education and location are spelled out', () => {
    expect(en.education.degree.place).toBe(
      'Faculty of Technical Sciences Čačak, University of Kragujevac'
    )
    expect(en.education.degree.period).toBe('2017 – 2021')
    expect(en.profile.location).toBe('Belgrade, Serbia')
    expect(en.about.languages).toContain('English (fluent, C2)')
  })

  it('the CV download points at a file that ships with the site', () => {
    // Vitest runs from the project root, where public/ lives
    const path = join(process.cwd(), 'public', decodeURIComponent(cvFile.url))
    expect(existsSync(path)).toBe(true)
  })
})
