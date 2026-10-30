import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en.json'
import DesktopWindow from '@/components/desktop/DesktopWindow.vue'
import { useWindowsStore } from '@/store/windows'
import { useContactDraftStore } from '@/store/contactDraft'

function mountWindow(slot: string) {
  const i18n = createI18n({ legacy: false, locale: 'en', messages: { en } })
  const store = useWindowsStore()
  store.openWindow('contact', 'apps.contact', 'ContactApp')
  const win = store.windows[0]!
  const wrapper = mount(DesktopWindow, {
    props: {
      id: win.id,
      title: 'Contact',
      initialX: win.position.x,
      initialY: win.position.y,
      initialWidth: win.size.width,
      initialHeight: win.size.height,
      zIndex: win.zIndex,
      isActive: true,
      isMaximized: false,
      isMinimized: false,
    },
    slots: { default: slot },
    global: { plugins: [i18n] },
    attachTo: document.body,
  })
  return { wrapper, store }
}

describe('DesktopWindow and Escape', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.body.innerHTML = ''
  })

  it('Escape in a text field stays with the field', async () => {
    const { wrapper, store } = mountWindow('<textarea id="msg"></textarea><input id="name" />')
    await wrapper.get('#msg').trigger('keydown', { key: 'Escape' })
    await wrapper.get('#name').trigger('keydown', { key: 'Escape' })
    expect(store.windows).toHaveLength(1)
    wrapper.unmount()
  })

  it('Escape elsewhere in the window closes it', async () => {
    const { wrapper, store } = mountWindow('<p>Text</p><button id="b">Button</button>')
    await wrapper.get('#b').trigger('keydown', { key: 'Escape' })
    expect(store.windows).toHaveLength(0)
    wrapper.unmount()
  })

  it('a contact draft outlives the window', () => {
    const draft = useContactDraftStore()
    draft.form.message = 'Hello, we have a frontend role in Belgrade.'
    const store = useWindowsStore()
    store.openWindow('contact', 'apps.contact', 'ContactApp')
    store.closeWindow('contact')
    expect(useContactDraftStore().form.message).toBe('Hello, we have a frontend role in Belgrade.')
  })
})
