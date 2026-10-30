<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import profilePhoto from '@/assets/images/profile-320.webp'
import IconDownload from '@/assets/icons/IconDownload.vue'
import IconEmail from '@/assets/icons/IconEmail.vue'
import IconLinkedIn from '@/assets/icons/IconLinkedIn.vue'
import IconGithub from '@/assets/icons/IconGithub.vue'
import IconLocation from '@/assets/icons/IconLocation.vue'
import { contactInfo, cvFile } from '@/data/contact'

const emit = defineEmits<{
  (e: 'open-app', appId: string): void
}>()

const { t } = useI18n()
</script>

<template>
  <section class="profile-widget" aria-labelledby="profile-name">
    <div class="identity">
      <img
        :src="profilePhoto"
        :alt="t('profile.photoAlt')"
        class="photo"
        width="112"
        height="112"
        decoding="async"
        fetchpriority="high"
      />
      <div class="identity-text">
        <h1 id="profile-name" class="name">{{ t('profile.name') }}</h1>
        <p class="role">{{ t('profile.role') }}</p>
        <p class="status">
          <span class="status-dot" aria-hidden="true"></span>
          {{ t('profile.available') }}
        </p>
      </div>
    </div>

    <p class="location">
      <IconLocation class="location-icon" aria-hidden="true" />
      <span>{{ t('profile.location') }}. {{ t('profile.workMode') }}</span>
    </p>

    <p class="intro">{{ t('profile.intro') }}</p>

    <div class="actions">
      <a :href="cvFile.url" :download="cvFile.fileName" class="btn btn-primary">
        <IconDownload aria-hidden="true" />
        {{ t('actions.downloadCv') }}
        <span class="btn-hint">{{ t('actions.cvHint') }}</span>
      </a>
      <a :href="`mailto:${contactInfo.email}`" class="btn">
        <IconEmail aria-hidden="true" />
        {{ contactInfo.email }}
      </a>
      <a
        :href="contactInfo.linkedinUrl"
        class="btn btn-icon"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="t('taskbar.linkedin')"
        :title="t('actions.linkedin')"
      >
        <IconLinkedIn aria-hidden="true" />
      </a>
      <a
        :href="contactInfo.githubUrl"
        class="btn btn-icon"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="t('taskbar.github')"
        :title="t('actions.github')"
      >
        <IconGithub aria-hidden="true" />
      </a>
    </div>

    <div class="now">
      <p class="now-text">{{ t('profile.now') }}</p>
      <button type="button" class="now-button" @click="emit('open-app', 'projects')">
        {{ t('actions.seeProject') }}
      </button>
    </div>
  </section>
</template>

<style scoped>
@reference "@/assets/main.css";

.profile-widget {
  width: 100%;
  padding: 28px 28px 24px;
  border-radius: 16px;
  border: 1px solid var(--color-border-strong);
  background-color: rgb(12 20 38 / 0.92);
  box-shadow: var(--shadow-widget);
  animation: rise-in 700ms var(--ease-out-expo) both;
}

@supports (backdrop-filter: blur(1px)) {
  .profile-widget {
    background-color: rgb(12 20 38 / 0.8);
    backdrop-filter: blur(14px) saturate(140%);
  }
}

.identity {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: 22px;
}

.photo {
  width: 112px;
  height: 112px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-border-accent);
  box-shadow: 0 6px 18px -6px rgb(0 0 0 / 0.6);
}

.name {
  margin: 0;
  font-family: var(--font-display);
  font-stretch: 120%;
  font-weight: 750;
  font-size: 40px;
  line-height: 1.02;
  letter-spacing: -0.025em;
  color: var(--color-text-base);
}

.role {
  margin: 8px 0 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 0;
  padding: 4px 12px 4px 10px;
  border-radius: 999px;
  border: 1px solid rgb(91 216 143 / 0.35);
  background: rgb(91 216 143 / 0.08);
  font-size: 13.5px;
  font-weight: 550;
  color: var(--color-available);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-available);
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 22px 0 0;
  font-size: 14px;
  color: var(--color-text-muted);
}

.location-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  color: var(--color-text-muted);
}

.intro {
  margin: 10px 0 0;
  max-width: 58ch;
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.btn-hint {
  font-weight: 450;
  font-size: 12.5px;
  opacity: 0.75;
}

.btn-icon {
  width: 40px;
  padding: 0;
  justify-content: center;
}

.btn-icon svg {
  width: 18px;
  height: 18px;
}

.now {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px 20px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--color-border);
}

.now-text {
  margin: 0;
  max-width: 52ch;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--color-text-secondary);
}

.now-button {
  flex-shrink: 0;
  padding: 6px 2px;
  border: 0;
  background: none;
  font: 600 14px/1.2 var(--font-sans);
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-color: var(--color-border-accent);
  text-underline-offset: 0.25em;
  cursor: pointer;
}

.now-button:hover {
  text-decoration-color: var(--color-primary);
}

@media (max-width: 767px) {
  .profile-widget {
    padding: 18px 16px 16px;
    border-radius: 14px;
  }

  .identity {
    column-gap: 16px;
  }

  /* Name and role sit next to the photo; the status line gets the full width below */
  .identity-text {
    display: contents;
  }

  .photo {
    grid-row: 1 / span 2;
    width: 72px;
    height: 72px;
  }

  .status {
    grid-column: 1 / -1;
    justify-self: start;
  }

  .name {
    font-size: 30px;
    align-self: end;
  }

  .role {
    font-size: 14.5px;
    margin-top: 4px;
    align-self: start;
  }

  .status {
    font-size: 13px;
    margin-top: 14px;
  }

  .location {
    margin-top: 14px;
    font-size: 13.5px;
  }

  .intro {
    margin-top: 8px;
    font-size: 14.5px;
    line-height: 1.55;
  }

  .actions {
    margin-top: 16px;
  }

  .actions .btn-primary {
    flex: 1 1 100%;
    justify-content: center;
  }

  .now {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    margin-top: 16px;
    padding-top: 12px;
  }

  .now-text {
    font-size: 14px;
  }

  /* 44px tap targets */
  .btn-icon {
    width: 44px;
  }

  .now-button {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 12px 2px;
  }
}
</style>
