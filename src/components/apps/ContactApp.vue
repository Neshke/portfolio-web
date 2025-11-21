<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSent = ref(false)

const submitForm = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
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
        <div class="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div>
            <h3 class="text-sm text-text-secondary m-0 mb-1">{{ t('contact.labels.email') }}</h3>
            <p class="text-[15px] text-text-base m-0">contact@example.com</p>
          </div>
        </div>

        <div class="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
              </path>
            </svg>
          </div>
          <div>
            <h3 class="text-sm text-text-secondary m-0 mb-1">{{ t('contact.labels.social') }}</h3>
            <p class="text-[15px] text-text-base m-0">@username</p>
          </div>
        </div>

        <div class="flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div>
            <h3 class="text-sm text-text-secondary m-0 mb-1">{{ t('contact.labels.location') }}</h3>
            <p class="text-[15px] text-text-base m-0">Belgrade, Serbia</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitForm" class="bg-background-dark/40 p-6 rounded-lg border border-primary/10">
        <div v-if="isSent"
          class="flex flex-col items-center justify-center gap-4 h-[300px] text-primary text-lg font-medium">
          <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
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
