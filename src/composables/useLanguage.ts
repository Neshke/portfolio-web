import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { LANGUAGE_STORAGE_KEY, applyDocumentLocale } from '@/i18n'

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  sr: 'Srpski',
}

export function useLanguage() {
  const { locale, availableLocales, t } = useI18n()

  const currentLanguage = computed({
    get: () => locale.value,
    set: (value: string) => {
      locale.value = value
      applyDocumentLocale(value)
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, value)
      } catch {
        // Not saved when storage is blocked; the switch still works for this visit.
      }
    },
  })

  const languages = computed(() =>
    availableLocales.map((code: string) => ({
      code,
      name: LANGUAGE_NAMES[code] ?? code,
    }))
  )

  const toggleLanguage = () => {
    currentLanguage.value = locale.value === 'en' ? 'sr' : 'en'
  }

  return {
    currentLanguage,
    languages,
    toggleLanguage,
    t,
  }
}
