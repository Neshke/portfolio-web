import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export function useLanguage() {
  const { locale, availableLocales, t } = useI18n()

  const currentLanguage = computed({
    get: () => locale.value,
    set: (value: string) => {
      locale.value = value
      localStorage.setItem('language', value)
    },
  })

  const languages = computed(() => {
    return availableLocales.map((code) => ({
      code,
      name: code === 'en' ? 'English' : 'Српски',
    }))
  })

  const toggleLanguage = () => {
    currentLanguage.value = locale.value === 'en' ? 'sr' : 'en'
  }

  // Load saved language preference
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage && availableLocales.includes(savedLanguage)) {
    locale.value = savedLanguage
  }

  return {
    currentLanguage,
    languages,
    toggleLanguage,
    t,
  }
}
