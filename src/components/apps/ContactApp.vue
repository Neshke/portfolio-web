<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import IconEmail from '@/components/icons/IconEmail.vue'
import IconLinkedIn from '@/components/icons/IconLinkedIn.vue'
import IconLocation from '@/components/icons/IconLocation.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import { contactInfo } from '@/data/contact'
import type { ContactForm } from '@/models/ContactApp/interfaces'

const { t } = useI18n()

const form = ref<ContactForm>({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSent = ref(false)

const submitForm = () => {
  const subject = `Portfolio Contact: ${form.value.name}`
  const body = `Name: ${form.value.name}\nEmail: ${form.value.email}\n\nMessage:\n${form.value.message}`

  window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  isSent.value = true

  // Reset form after delay
  setTimeout(() => {
    isSent.value = false
    form.value = { name: '', email: '', message: '' }
  }, 3000)
}
</script>

<template>
  <div class="p-6 text-text-base">
    <div class="mb-8 border-b border-primary/20 pb-4">
      <h1 class="font-display text-2xl text-primary m-0 mb-2">{{ t('taskbar.contact') }}</h1>
      <p class="text-sm text-text-secondary m-0">{{ t('contact.subtitle') }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-10">
      <div class="flex flex-col gap-6">
        <a :href="`mailto:${contactInfo.email}`"
          class="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-lg no-underline hover:bg-primary/10 transition-colors duration-200 cursor-pointer">
          <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary">
            <IconEmail class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm text-text-secondary m-0 mb-1">{{ t('contact.labels.email') }}</h3>
            <p class="text-[15px] text-text-base m-0">{{ contactInfo.email }}</p>
          </div>
        </a>

        <a :href="contactInfo.linkedinUrl" target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-lg no-underline hover:bg-primary/10 transition-colors duration-200 cursor-pointer">
          <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary">
            <IconLinkedIn class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm text-text-secondary m-0 mb-1">{{ t('contact.labels.linkedin') }}</h3>
            <p class="text-[15px] text-text-base m-0">{{ contactInfo.linkedinName }}</p>
          </div>
        </a>

        <div class="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary">
            <IconLocation class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-sm text-text-secondary m-0 mb-1">{{ t('contact.labels.location') }}</h3>
            <p class="text-[15px] text-text-base m-0">{{ t('contact.locationValue') }}</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitForm" class="bg-background-dark/40 p-6 rounded-lg border border-primary/10">
        <div v-if="isSent"
          class="flex flex-col items-center justify-center gap-4 h-[300px] text-primary text-lg font-medium">
          <IconCheck class="w-12 h-12" />
          {{ t('contact.success') }}
        </div>

        <template v-else>
          <div class="mb-5">
            <label for="name" class="block text-sm text-primary mb-2">{{ t('contact.labels.name') }}</label>
            <input type="text" id="name" v-model="form.name" required :placeholder="t('contact.placeholders.name')"
              class="w-full px-3 py-2.5 bg-black/30 border border-primary/20 rounded text-text-base font-sans transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-glow-sm" />
          </div>

          <div class="mb-5">
            <label for="email" class="block text-sm text-primary mb-2">{{ t('contact.labels.email') }}</label>
            <input type="email" id="email" v-model="form.email" required :placeholder="t('contact.placeholders.email')"
              class="w-full px-3 py-2.5 bg-black/30 border border-primary/20 rounded text-text-base font-sans transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-glow-sm" />
          </div>

          <div class="mb-5">
            <label for="message" class="block text-sm text-primary mb-2">{{ t('contact.labels.message') }}</label>
            <textarea id="message" v-model="form.message" required :placeholder="t('contact.placeholders.message')"
              rows="4"
              class="w-full px-3 py-2.5 bg-black/30 border border-primary/20 rounded text-text-base font-sans transition-all duration-200 focus:outline-none focus:border-primary focus:shadow-glow-sm"></textarea>
          </div>

          <button type="submit"
            class="w-full p-3 bg-primary text-background-dark border-none rounded font-semibold cursor-pointer transition-all duration-200 hover:bg-primary-light hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="isSubmitting">
            <span v-if="isSubmitting">{{ t('contact.buttons.sending') }}</span>
            <span v-else>{{ t('contact.buttons.send') }}</span>
          </button>
        </template>
      </form>
    </div>
  </div>
</template>
