import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { ContactForm } from '@/models/ContactApp/interfaces'

// The message lives here rather than in the Contact window, so closing the
// window (or pressing Escape by accident) does not throw away what was typed.
export const useContactDraftStore = defineStore('contactDraft', () => {
  const form = reactive<ContactForm>({
    name: '',
    email: '',
    message: '',
  })

  function clear() {
    form.name = ''
    form.email = ''
    form.message = ''
  }

  return { form, clear }
})
