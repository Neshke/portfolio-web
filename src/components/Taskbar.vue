<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStartMenuStore } from '@/store/startMenu'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const startMenuStore = useStartMenuStore()
const dateNow = ref(new Date().toLocaleTimeString())
let intervalId: number | null = null

onMounted(() => {
  intervalId = window.setInterval(() => {
    dateNow.value = new Date().toLocaleTimeString()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})

// Start Menu handlers
const openAbout = () => {
  startMenuStore.toggleMenu({
    app: 'about',
    title: t('taskbar.about'),
    description: t('startMenu.aboutDescription'),
    items: [
      {
        id: 'bio',
        title: t('startMenu.bio'),
        description: t('startMenu.bioDescription'),
        type: 'section',
      },
      {
        id: 'skills',
        title: t('startMenu.skills'),
        description: t('startMenu.skillsDescription'),
        type: 'section',
      },
      {
        id: 'resume',
        title: t('startMenu.resume'),
        description: t('startMenu.resumeDescription'),
        type: 'action',
      },
    ],
  })
}

const openProjects = () => {
  startMenuStore.toggleMenu({
    app: 'projects',
    title: t('taskbar.projects'),
    description: t('startMenu.projectsDescription'),
    items: [
      {
        id: 'web',
        title: t('startMenu.webProjects'),
        description: t('startMenu.webProjectsDescription'),
        type: 'section',
      },
      {
        id: 'mobile',
        title: t('startMenu.mobileProjects'),
        description: t('startMenu.mobileProjectsDescription'),
        type: 'section',
      },
      {
        id: 'opensource',
        title: t('startMenu.openSource'),
        description: t('startMenu.openSourceDescription'),
        type: 'section',
      },
    ],
  })
}

const openExperience = () => {
  startMenuStore.toggleMenu({
    app: 'experience',
    title: t('taskbar.experience'),
    description: t('startMenu.experienceDescription'),
    items: [
      {
        id: 'work',
        title: t('startMenu.workHistory'),
        description: t('startMenu.workHistoryDescription'),
        type: 'section',
      },
      {
        id: 'education',
        title: t('startMenu.education'),
        description: t('startMenu.educationDescription'),
        type: 'section',
      },
      {
        id: 'certifications',
        title: t('startMenu.certifications'),
        description: t('startMenu.certificationsDescription'),
        type: 'section',
      },
    ],
  })
}

const openContact = () => {
  startMenuStore.toggleMenu({
    app: 'contact',
    title: t('taskbar.contact'),
    description: t('startMenu.contactDescription'),
    items: [
      {
        id: 'email',
        title: t('startMenu.email'),
        description: 'your.email@example.com',
        type: 'action',
      },
      {
        id: 'linkedin',
        title: t('startMenu.linkedin'),
        description: t('startMenu.linkedinDescription'),
        type: 'action',
      },
      {
        id: 'github',
        title: t('startMenu.github'),
        description: t('startMenu.githubDescription'),
        type: 'action',
      },
    ],
  })
}
</script>

<template>
  <!-- Windows Taskbar -->
  <nav class="taskbar taskbar-animated">
    <div class="taskbar-container">
      <!-- Start Button -->
      <button class="taskbar-item start-button">
        <svg class="taskbar-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
      </button>

      <!-- Taskbar Apps -->
      <div class="taskbar-apps">
        <button @click="openAbout" class="taskbar-item" :class="{ active: startMenuStore.activeApp === 'about' }">
          <svg class="taskbar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
            <path d="M6 10h12v2H6zm0 4h8v2H6z" />
          </svg>
          <span class="taskbar-label">{{ t('taskbar.about') }}</span>
        </button>

        <button @click="openProjects" class="taskbar-item" :class="{ active: startMenuStore.activeApp === 'projects' }">
          <svg class="taskbar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
          </svg>
          <span class="taskbar-label">{{ t('taskbar.projects') }}</span>
        </button>

        <button @click="openExperience" class="taskbar-item" :class="{ active: startMenuStore.activeApp === 'experience' }">
          <svg class="taskbar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
          </svg>
          <span class="taskbar-label">{{ t('taskbar.experience') }}</span>
        </button>

        <button @click="openContact" class="taskbar-item" :class="{ active: startMenuStore.activeApp === 'contact' }">
          <svg class="taskbar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span class="taskbar-label">{{ t('taskbar.contact') }}</span>
        </button>
      </div>

      <!-- System Tray -->
      <div class="taskbar-tray">
        <LanguageSwitcher />
        <button class="taskbar-item tray-item">
          <svg class="taskbar-icon-sm" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </button>
        <button class="taskbar-item tray-item">
          <svg class="taskbar-icon-sm" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </button>
        <div class="taskbar-clock">
          <span class="clock-time">{{ dateNow }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Taskbar Slide Up Animation */
@keyframes slideUpFade {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.taskbar-animated {
  animation: slideUpFade 0.8s ease-out 1.2s both;
}

/* Windows Taskbar */
.taskbar {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 20;
  padding: 0 8px 8px 8px;
  max-width: 80rem;
  width: 100%;
}

.taskbar-container {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 56px;
  background: rgba(17, 26, 17, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 12px;
  padding: 4px 12px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(0, 255, 136, 0.1);
}

.taskbar-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #e0e8e0;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-sans);
  font-size: 14px;
}

.taskbar-item:hover {
  background: rgba(0, 255, 136, 0.1);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
}

.taskbar-item:active {
  transform: scale(0.95);
}

.taskbar-item.active {
  background: rgba(0, 255, 136, 0.2);
  border-color: rgba(0, 255, 136, 0.4);
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
}

.start-button {
  padding: 10px 14px;
}

.start-button:hover {
  background: rgba(0, 255, 136, 0.25);
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
}

.taskbar-apps {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  margin-left: 8px;
}

.taskbar-icon {
  width: 20px;
  height: 20px;
  color: #00ff88;
}

.taskbar-icon-sm {
  width: 16px;
  height: 16px;
  color: #9ba9b4;
}

.taskbar-label {
  font-size: 13px;
  font-weight: 500;
  color: #e0e8e0;
}

.taskbar-tray {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  padding-left: 12px;
  border-left: 1px solid rgba(0, 255, 136, 0.2);
}

.tray-item {
  padding: 8px;
}

.taskbar-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 12px;
  font-family: var(--font-mono);
  color: #00ff88;
}

.clock-time {
  font-size: 13px;
  font-weight: 600;
}
</style>
