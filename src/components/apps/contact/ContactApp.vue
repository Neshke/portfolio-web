<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { reactive, computed, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import emailjs from '@emailjs/browser'
import IconEmail from '@/assets/icons/IconEmail.vue'
import IconLinkedIn from '@/assets/icons/IconLinkedIn.vue'
import IconLocation from '@/assets/icons/IconLocation.vue'
import IconCheck from '@/assets/icons/IconCheck.vue'
import { contactInfo } from '@/data/contact'
import type { ContactForm } from '@/models/ContactApp/interfaces'

const { t } = useI18n()

const form = reactive<ContactForm>({
  name: '',
  email: '',
  message: ''
})

const rules = computed(() => ({
  name: {
    required,
    minLength: minLength(2),
    maxLength: maxLength(50)
  },
  email: {
    required,
    email
  },
  message: {
    required,
    minLength: minLength(10),
    maxLength: maxLength(1000)
  }
}))

const v$ = useVuelidate(rules, form)

const isSubmitting = ref(false)
const isSent = ref(false)
const errorMessage = ref('')

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.message = ''
  v$.value.$reset()
}

const submitForm = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: 'Nenad'
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )

    isSent.value = true
    resetForm()

    // Reset success state after delay
    setTimeout(() => {
      isSent.value = false
    }, 3000)
  } catch (error) {
    console.error('EmailJS error:', error)
    errorMessage.value = t('contact.error')
  } finally {
    isSubmitting.value = false
  }
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

        <div v-else-if="errorMessage" class="error-message">
          {{ errorMessage }}
          <button type="button" class="retry-button" @click="errorMessage = ''">{{ t('contact.buttons.retry')
            }}</button>
        </div>

        <template v-else>
          <div class="form-group">
            <label for="name" class="form-label">{{ t('contact.labels.name') }}</label>
            <input type="text" id="name" v-model="form.name" :placeholder="t('contact.placeholders.name')"
              class="form-input" :class="{ 'form-input--error': v$.name.$error }" @blur="v$.name.$touch()" />
            <div v-if="v$.name.$error" class="form-error">
              <span v-if="v$.name.required.$invalid">{{ t('contact.validation.nameRequired') }}</span>
              <span v-else-if="v$.name.minLength.$invalid">{{ t('contact.validation.nameMinLength') }}</span>
              <span v-else-if="v$.name.maxLength.$invalid">{{ t('contact.validation.nameMaxLength') }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">{{ t('contact.labels.email') }}</label>
            <input type="email" id="email" v-model="form.email" :placeholder="t('contact.placeholders.email')"
              class="form-input" :class="{ 'form-input--error': v$.email.$error }" @blur="v$.email.$touch()" />
            <div v-if="v$.email.$error" class="form-error">
              <span v-if="v$.email.required.$invalid">{{ t('contact.validation.emailRequired') }}</span>
              <span v-else-if="v$.email.email.$invalid">{{ t('contact.validation.emailInvalid') }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="message" class="form-label">{{ t('contact.labels.message') }}</label>
            <textarea id="message" v-model="form.message" :placeholder="t('contact.placeholders.message')" rows="4"
              class="form-input form-textarea" :class="{ 'form-input--error': v$.message.$error }"
              @blur="v$.message.$touch()"></textarea>
            <div v-if="v$.message.$error" class="form-error">
              <span v-if="v$.message.required.$invalid">{{ t('contact.validation.messageRequired') }}</span>
              <span v-else-if="v$.message.minLength.$invalid">{{ t('contact.validation.messageMinLength') }}</span>
              <span v-else-if="v$.message.maxLength.$invalid">{{ t('contact.validation.messageMaxLength') }}</span>
            </div>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting || v$.$invalid">
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

.error-message {
  @apply flex flex-col items-center justify-center gap-4 h-[300px] text-red-500 text-lg font-medium text-center;
}

.retry-button {
  @apply px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded cursor-pointer;
  @apply hover:bg-primary/30 transition-colors duration-200;
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

.form-input--error {
  @apply border-red-500 focus:border-red-500 focus:shadow-none;
}

.form-error {
  @apply text-red-500 text-xs mt-1;
}

.submit-button {
  @apply w-full p-3 bg-primary text-background-dark border-none rounded font-semibold cursor-pointer;
  @apply transition-all duration-200;
  @apply hover:bg-primary-light hover:shadow-glow;
  @apply disabled:opacity-70 disabled:cursor-not-allowed;
}
</style>
