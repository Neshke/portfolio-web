import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en.json'
import sr from '@/i18n/locales/sr.json'
import ProfileWidget from '@/components/desktop/ProfileWidget.vue'
import { contactInfo, cvFile } from '@/data/contact'

function mountWidget(locale: 'en' | 'sr' = 'en') {
  const i18n = createI18n({ legacy: false, locale, messages: { en, sr } })
  return mount(ProfileWidget, { global: { plugins: [i18n] } })
}

describe('ProfileWidget', () => {
  it('says who he is, that he is open to work, and where to get the CV', () => {
    const wrapper = mountWidget()
    expect(wrapper.get('h1').text()).toBe('Aleksa Nesic')
    expect(wrapper.text()).toContain('Frontend engineer (Vue.js, Nuxt, TypeScript)')
    expect(wrapper.text()).toContain('Open to senior frontend and full-stack roles')
    expect(wrapper.text()).toContain('Belgrade, Serbia')

    const cvLink = wrapper.get(`a[href="${cvFile.url}"]`)
    expect(cvLink.attributes('download')).toBe(cvFile.fileName)
    expect(wrapper.find(`a[href="mailto:${contactInfo.email}"]`).exists()).toBe(true)
  })

  it('asks the desktop to open the projects window', async () => {
    const wrapper = mountWidget()
    await wrapper.get('.now-button').trigger('click')
    expect(wrapper.emitted('open-app')).toEqual([['projects']])
  })

  it('renders in Serbian', () => {
    const wrapper = mountWidget('sr')
    expect(wrapper.text()).toContain('Otvoren za senior frontend i full-stack pozicije')
    expect(wrapper.text()).toContain('Preuzmite CV')
  })
})
