import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import sr from './locales/sr.json'

export type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema], 'en' | 'sr'>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    sr,
  },
})

export default i18n
