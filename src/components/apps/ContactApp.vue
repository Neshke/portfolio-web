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
  <div class="app-container">
    <div class="header">
      <h1 class="page-title">{{ t('startMenu.contact') }}</h1>
      <p class="page-subtitle">{{ t('contact.subtitle') }}</p>
    </div>

    <div class="contact-content">
      <div class="contact-info">
        <div class="info-item">
          <div class="icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div>
            <h3>{{ t('contact.labels.email') }}</h3>
            <p>contact@example.com</p>
          </div>
        </div>
        
        <div class="info-item">
          <div class="icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </div>
          <div>
            <h3>{{ t('contact.labels.social') }}</h3>
            <p>@username</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div>
            <h3>{{ t('contact.labels.location') }}</h3>
            <p>Belgrade, Serbia</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitForm" class="contact-form">
        <div v-if="isSent" class="success-message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {{ t('contact.success') }}
        </div>

        <template v-else>
          <div class="form-group">
            <label for="name">{{ t('contact.labels.name') }}</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required 
              :placeholder="t('contact.placeholders.name')"
            />
          </div>

          <div class="form-group">
            <label for="email">{{ t('contact.labels.email') }}</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required 
              :placeholder="t('contact.placeholders.email')"
            />
          </div>

          <div class="form-group">
            <label for="message">{{ t('contact.labels.message') }}</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              required 
              :placeholder="t('contact.placeholders.message')"
              rows="4"
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting">{{ t('contact.buttons.sending') }}</span>
            <span v-else>{{ t('contact.buttons.send') }}</span>
          </button>
        </template>
      </form>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.app-container {
  padding: 24px;
  color: #e0e8e0;
  height: 100%;
  overflow-y: auto;
}

.header {
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
  padding-bottom: 16px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 24px;
  color: #00ff88;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #7fa77f;
  margin: 0;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: 8px;
}

.icon-box {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 50%;
  color: #00ff88;
}

.icon-box svg {
  width: 20px;
  height: 20px;
}

.info-item h3 {
  font-size: 14px;
  color: #7fa77f;
  margin: 0 0 4px 0;
}

.info-item p {
  font-size: 15px;
  color: #e0e8e0;
  margin: 0;
}

.contact-form {
  background: rgba(0, 20, 10, 0.4);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #00ff88;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 4px;
  color: #e0e8e0;
  font-family: inherit;
  transition: all 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00ff88;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #00ff88;
  color: #0a0f0a;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #33ff9e;
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 300px;
  color: #00ff88;
  font-size: 18px;
  font-weight: 500;
}

.success-message svg {
  width: 48px;
  height: 48px;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
