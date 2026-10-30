<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, nextTick, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import emailjs from '@emailjs/browser'
import IconEmail from '@/assets/icons/IconEmail.vue'
import IconLinkedIn from '@/assets/icons/IconLinkedIn.vue'
import IconLocation from '@/assets/icons/IconLocation.vue'
import IconCheck from '@/assets/icons/IconCheck.vue'
import IconGithub from '@/assets/icons/IconGithub.vue'
import { contactInfo } from '@/data/contact'
import { useContactDraftStore } from '@/store/contactDraft'

const { t } = useI18n()

// The draft lives in a store, so it survives closing and reopening the window
const draft = useContactDraftStore()
const form = draft.form

const rules = computed(() => ({
  name: {
    required,
    minLength: minLength(2),
    maxLength: maxLength(50),
  },
  email: {
    required,
    email,
  },
  message: {
    required,
    minLength: minLength(10),
    maxLength: maxLength(1000),
  },
}))

const v$ = useVuelidate(rules, form)

const isSubmitting = ref(false)
const isSent = ref(false)
const errorMessage = ref('')

const fieldOrder = ['name', 'email', 'message'] as const

const resetForm = () => {
  draft.clear()
  v$.value.$reset()
}

const focusFirstInvalidField = async () => {
  await nextTick()
  const firstInvalid = fieldOrder.find((field) => v$.value[field].$invalid)
  if (firstInvalid) document.getElementById(`contact-${firstInvalid}`)?.focus()
}

const submitForm = async () => {
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) {
    await focusFirstInvalidField()
    return
  }

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
        to_name: 'Aleksa',
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
  <article class="page">
    <header class="page-header">
      <div>
        <h2 class="page-title">{{ t('contact.title') }}</h2>
        <p class="page-lede">{{ t('contact.lede') }}</p>
      </div>
    </header>

    <div class="contact-grid">
      <ul class="contact-info">
        <li>
          <a :href="`mailto:${contactInfo.email}`" class="contact-row">
            <IconEmail class="contact-icon" aria-hidden="true" />
            <span>
              <span class="contact-label">{{ t('contact.labels.email') }}</span>
              <span class="contact-value">{{ contactInfo.email }}</span>
            </span>
          </a>
        </li>
        <li>
          <a
            :href="contactInfo.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-row"
          >
            <IconLinkedIn class="contact-icon" aria-hidden="true" />
            <span>
              <span class="contact-label">{{ t('contact.labels.linkedin') }}</span>
              <span class="contact-value">linkedin.com/in/{{ contactInfo.linkedinHandle }}</span>
            </span>
          </a>
        </li>
        <li>
          <a
            :href="contactInfo.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-row"
          >
            <IconGithub class="contact-icon" aria-hidden="true" />
            <span>
              <span class="contact-label">{{ t('contact.labels.github') }}</span>
              <span class="contact-value">github.com/{{ contactInfo.githubHandle }}</span>
            </span>
          </a>
        </li>
        <li class="contact-row contact-row--static">
          <IconLocation class="contact-icon" aria-hidden="true" />
          <span>
            <span class="contact-label">{{ t('contact.labels.location') }}</span>
            <span class="contact-value">{{ t('contact.locationValue') }}</span>
          </span>
        </li>
      </ul>

      <form class="contact-form" novalidate @submit.prevent="submitForm">
        <h3 class="section-title">{{ t('contact.formTitle') }}</h3>

        <div v-if="isSent" class="form-status form-status--success" role="status">
          <IconCheck class="status-icon" aria-hidden="true" />
          {{ t('contact.success') }}
        </div>

        <div v-else-if="errorMessage" class="form-status form-status--error" role="alert">
          <p class="status-text">{{ errorMessage }}</p>
          <a :href="`mailto:${contactInfo.email}`" class="text-link">{{ contactInfo.email }}</a>
          <button type="button" class="btn btn-sm" @click="errorMessage = ''">
            {{ t('contact.buttons.retry') }}
          </button>
        </div>

        <template v-else>
          <div class="form-row">
            <div class="form-group">
              <label for="contact-name" class="form-label">{{ t('contact.labels.name') }}</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                :placeholder="t('contact.placeholders.name')"
                class="form-input"
                :class="{ 'form-input--error': v$.name.$error }"
                :aria-invalid="v$.name.$error"
                aria-describedby="contact-name-error"
                @blur="v$.name.$touch()"
              />
              <p id="contact-name-error" class="form-error" aria-live="polite">
                <template v-if="v$.name.$error">
                  <span v-if="v$.name.required.$invalid">{{
                    t('contact.validation.nameRequired')
                  }}</span>
                  <span v-else-if="v$.name.minLength.$invalid">{{
                    t('contact.validation.nameMinLength')
                  }}</span>
                  <span v-else-if="v$.name.maxLength.$invalid">{{
                    t('contact.validation.nameMaxLength')
                  }}</span>
                </template>
              </p>
            </div>

            <div class="form-group">
              <label for="contact-email" class="form-label">{{ t('contact.labels.email') }}</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                :placeholder="t('contact.placeholders.email')"
                class="form-input"
                :class="{ 'form-input--error': v$.email.$error }"
                :aria-invalid="v$.email.$error"
                aria-describedby="contact-email-error"
                @blur="v$.email.$touch()"
              />
              <p id="contact-email-error" class="form-error" aria-live="polite">
                <template v-if="v$.email.$error">
                  <span v-if="v$.email.required.$invalid">{{
                    t('contact.validation.emailRequired')
                  }}</span>
                  <span v-else-if="v$.email.email.$invalid">{{
                    t('contact.validation.emailInvalid')
                  }}</span>
                </template>
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="contact-message" class="form-label">{{
              t('contact.labels.message')
            }}</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              :placeholder="t('contact.placeholders.message')"
              rows="4"
              class="form-input form-textarea"
              :class="{ 'form-input--error': v$.message.$error }"
              :aria-invalid="v$.message.$error"
              aria-describedby="contact-message-error"
              @blur="v$.message.$touch()"
            ></textarea>
            <p id="contact-message-error" class="form-error" aria-live="polite">
              <template v-if="v$.message.$error">
                <span v-if="v$.message.required.$invalid">{{
                  t('contact.validation.messageRequired')
                }}</span>
                <span v-else-if="v$.message.minLength.$invalid">{{
                  t('contact.validation.messageMinLength')
                }}</span>
                <span v-else-if="v$.message.maxLength.$invalid">{{
                  t('contact.validation.messageMaxLength')
                }}</span>
              </template>
            </p>
          </div>

          <!-- Disabled only while sending: a click on an incomplete form shows what is missing -->
          <button type="submit" class="btn btn-primary submit-button" :disabled="isSubmitting">
            <span v-if="isSubmitting">{{ t('contact.buttons.sending') }}</span>
            <span v-else>{{ t('contact.buttons.send') }}</span>
          </button>
        </template>
      </form>
    </div>
  </article>
</template>

<style scoped>
@reference "@/assets/main.css";

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

/* Two columns when the window is wide enough, whatever the screen size */
@container (min-width: 700px) {
  .contact-grid {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.3fr);
    gap: 36px;
  }
}

.contact-info {
  @apply m-0 p-0 list-none flex flex-col;
}

.contact-row {
  @apply flex items-center gap-3.5 py-3 no-underline;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-base);
}

a.contact-row:hover .contact-value {
  color: var(--color-primary);
}

.contact-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-primary);
}

.contact-label {
  display: block;
  font-size: 13px;
  color: var(--color-text-muted);
}

.contact-value {
  display: block;
  font-size: 15px;
  font-weight: 500;
  overflow-wrap: anywhere;
  transition: color 140ms ease;
}

.contact-form {
  container-type: inline-size;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background-color: var(--color-surface);
}

.form-status {
  @apply flex flex-col items-start gap-3 py-6;
  font-size: 15.5px;
  font-weight: 500;
}

.form-status--success {
  color: var(--color-available);
}

.form-status--error {
  color: var(--color-error);
}

.status-text {
  margin: 0;
}

.status-icon {
  width: 32px;
  height: 32px;
}

/* Name and email side by side when the form has room for both */
.form-row {
  display: grid;
  column-gap: 12px;
}

@container (min-width: 400px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  margin-bottom: 12px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 550;
  color: var(--color-text-secondary);
}

.form-input {
  @apply w-full px-3 py-2.5 rounded-lg;
  border: 1px solid var(--color-border-input);
  background-color: var(--color-input);
  color: var(--color-text-base);
  font: 400 15px/1.5 var(--font-sans);
  caret-color: var(--color-primary);
  transition: border-color 140ms ease;
}

.form-input::placeholder {
  color: var(--color-text-dim);
}

.form-input:hover {
  border-color: var(--color-text-dim);
}

.form-input:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 0;
  border-color: var(--color-primary);
}

.form-textarea {
  @apply resize-y;
  min-height: 104px;
}

.form-input--error {
  border-color: var(--color-error);
}

/* Takes no space until there is an error to show */
.form-error {
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  color: var(--color-error);
}

.form-error:not(:empty) {
  margin-top: 4px;
}

.submit-button {
  @apply w-full justify-center;
  min-height: 44px;
}

.submit-button:disabled {
  @apply cursor-progress;
  opacity: 0.7;
}
</style>
