<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import IconEmail from '@/assets/icons/IconEmail.vue'
import IconLinkedIn from '@/assets/icons/IconLinkedIn.vue'
import IconLocation from '@/assets/icons/IconLocation.vue'
import IconCheck from '@/assets/icons/IconCheck.vue'
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
  <div class="contact-container">
    <div class="contact-header">
      <h1 class="contact-title">{{ t('taskbar.contact') }}</h1>
      <p class="contact-subtitle">{{ t('contact.subtitle') }}</p>
    </div>

    <div class="contact-grid">
      <!-- Contact Info Cards -->
      <div class="contact-info">
        <a :href="`mailto:${contactInfo.email}`" class="contact-card">
          <div class="contact-card-icon">
            <IconEmail class="icon" />
          </div>
          <div>
            <h3 class="contact-card-label">{{ t('contact.labels.email') }}</h3>
            <p class="contact-card-value">{{ contactInfo.email }}</p>
          </div>
        </a>

        <a :href="contactInfo.linkedinUrl" target="_blank" rel="noopener noreferrer" class="contact-card">
          <div class="contact-card-icon">
            <IconLinkedIn class="icon" />
          </div>
          <div>
            <h3 class="contact-card-label">{{ t('contact.labels.linkedin') }}</h3>
            <p class="contact-card-value">{{ contactInfo.linkedinName }}</p>
          </div>
        </a>

        <div class="contact-card contact-card--static">
          <div class="contact-card-icon">
            <IconLocation class="icon" />
          </div>
          <div>
            <h3 class="contact-card-label">{{ t('contact.labels.location') }}</h3>
            <p class="contact-card-value">{{ t('contact.locationValue') }}</p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="submitForm" class="contact-form">
        <div v-if="isSent" class="success-message">
          <IconCheck class="success-icon" />
          {{ t('contact.success') }}
        </div>

        <template v-else>
          <div class="form-group">
            <label for="name" class="form-label">{{ t('contact.labels.name') }}</label>
            <input type="text" id="name" v-model="form.name" required :placeholder="t('contact.placeholders.name')"
              class="form-input" />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">{{ t('contact.labels.email') }}</label>
            <input type="email" id="email" v-model="form.email" required :placeholder="t('contact.placeholders.email')"
              class="form-input" />
          </div>

          <div class="form-group">
            <label for="message" class="form-label">{{ t('contact.labels.message') }}</label>
            <textarea id="message" v-model="form.message" required :placeholder="t('contact.placeholders.message')"
              rows="4" class="form-input form-textarea"></textarea>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting">
            <span v-if="isSubmitting">{{ t('contact.buttons.sending') }}</span>
            <span v-else>{{ t('contact.buttons.send') }}</span>
          </button>
        </template>
      </form>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.contact-container {
  @apply p-6 text-text-base;
}

.contact-header {
  @apply mb-8 border-b border-primary/20 pb-4;
}

.contact-title {
  @apply font-display text-2xl text-primary m-0 mb-2;
}

.contact-subtitle {
  @apply text-sm text-text-secondary m-0;
}

.contact-grid {
  @apply grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-10;
}

.contact-info {
  @apply flex flex-col gap-6;
}

.contact-card {
  @apply flex items-center gap-4 p-4 bg-primary/5 border border-primary/10 rounded-lg no-underline cursor-pointer;
  @apply hover:bg-primary/10 transition-colors duration-200;
}

.contact-card--static {
  @apply cursor-default hover:bg-primary/5;
}

.contact-card-icon {
  @apply w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full text-primary;
}

.contact-card-icon .icon {
  @apply w-5 h-5;
}

.contact-card-label {
  @apply text-sm text-text-secondary m-0 mb-1;
}

.contact-card-value {
  @apply text-[15px] text-text-base m-0;
}

.contact-form {
  @apply bg-background-dark/40 p-6 rounded-lg border border-primary/10;
}

.success-message {
  @apply flex flex-col items-center justify-center gap-4 h-[300px] text-primary text-lg font-medium;
}

.success-icon {
  @apply w-12 h-12;
}

.form-group {
  @apply mb-5;
}

.form-label {
  @apply block text-sm text-primary mb-2;
}

.form-input {
  @apply w-full px-3 py-2.5 bg-black/30 border border-primary/20 rounded text-text-base font-sans;
  @apply transition-all duration-200;
  @apply focus:outline-none focus:border-primary focus:shadow-glow-sm;
}

.form-textarea {
  @apply resize-none;
}

.submit-button {
  @apply w-full p-3 bg-primary text-background-dark border-none rounded font-semibold cursor-pointer;
  @apply transition-all duration-200;
  @apply hover:bg-primary-light hover:shadow-glow;
  @apply disabled:opacity-70 disabled:cursor-not-allowed;
}
</style>
