import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import sr from './locales/sr.json'

export type MessageSchema = typeof en
export type AppLocale = 'en' | 'sr'

export const LANGUAGE_STORAGE_KEY = 'language'

function readSavedLocale(): AppLocale {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (saved === 'en' || saved === 'sr') return saved
  } catch {
    // Storage can be blocked (private mode, previews). English is the default.
  }
  return 'en'
}

export function applyDocumentLocale(locale: string) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = locale === 'sr' ? 'sr-Latn' : 'en'
}

const initialLocale = readSavedLocale()
applyDocumentLocale(initialLocale)

const i18n = createI18n<[MessageSchema], AppLocale>({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    sr,
  },
})

export default i18n
