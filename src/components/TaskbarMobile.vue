<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStartMenuStore } from '@/store/startMenu'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const startMenuStore = useStartMenuStore()
const showMenu = ref(false)
const dateNow = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
let intervalId: number | null = null

onMounted(() => {
  intervalId = window.setInterval(() => {
    dateNow.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})

// Close mobile menu when Start Menu opens
watch(() => startMenuStore.isOpen, (isOpen) => {
  if (isOpen) {
    showMenu.value = false
  }
})

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

// Start Menu handlers
const openAbout = () => {
  showMenu.value = false
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
  showMenu.value = false
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
  showMenu.value = false
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
  showMenu.value = false
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
  <!-- Mobile Bottom Navigation -->
  <nav class="taskbar-mobile taskbar-mobile-animated">
    <!-- Extended Menu Overlay -->
    <transition name="slide-up">
      <div v-if="showMenu" class="mobile-menu">
        <div class="mobile-menu-header">
          <span class="mobile-menu-title">{{ t('taskbar.menu') }}</span>
          <button @click="toggleMenu" class="mobile-menu-close">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <div class="mobile-menu-items">
          <button @click="openAbout" class="mobile-menu-item">
            <svg class="mobile-menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
              <path d="M6 10h12v2H6zm0 4h8v2H6z" />
            </svg>
            <span>{{ t('taskbar.about') }}</span>
          </button>

          <button @click="openProjects" class="mobile-menu-item">
            <svg class="mobile-menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
            </svg>
            <span>{{ t('taskbar.projects') }}</span>
          </button>

          <button @click="openExperience" class="mobile-menu-item">
            <svg class="mobile-menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <span>{{ t('taskbar.experience') }}</span>
          </button>

          <button @click="openContact" class="mobile-menu-item">
            <svg class="mobile-menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>{{ t('taskbar.contact') }}</span>
          </button>
        </div>
      </div>
    </transition>

    <!-- Bottom Navigation Bar -->
    <div class="mobile-nav-container">
      <!-- Menu Button -->
      <button @click="toggleMenu" class="mobile-nav-item" :class="{ active: showMenu }">
        <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
        <span class="mobile-nav-label">{{ t('taskbar.menu') }}</span>
      </button>

      <!-- Home/About -->
      <button class="mobile-nav-item">
        <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span class="mobile-nav-label">{{ t('taskbar.home') }}</span>
      </button>

      <!-- Projects -->
      <button class="mobile-nav-item">
        <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
        </svg>
        <span class="mobile-nav-label">{{ t('taskbar.projects') }}</span>
      </button>

      <!-- Language Switcher -->
      <div class="mobile-nav-item-wrapper">
        <LanguageSwitcher />
      </div>
    </div>
  </nav>
</template>

<style scoped>
@reference "../assets/main.css";

/* Mobile Taskbar Slide Up Animation */
@keyframes slideUpFadeMobile {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.taskbar-mobile-animated {
  animation: slideUpFadeMobile 0.6s ease-out 1s both;
}

/* Mobile Bottom Navigation */
.taskbar-mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0 8px 8px 8px;
}

.mobile-nav-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 4px;
  height: 64px;
  background: rgba(17, 26, 17, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 20px;
  padding: 8px 12px;
  box-shadow:
    0 -4px 24px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(0, 255, 136, 0.15);
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 12px;
  color: #e0e8e0;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 0;
}

.mobile-nav-item:active {
  transform: scale(0.95);
}

.mobile-nav-item.active {
  background: rgba(0, 255, 136, 0.15);
  border-color: rgba(0, 255, 136, 0.3);
}

.mobile-nav-item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.mobile-nav-icon {
  width: 24px;
  height: 24px;
  color: #00ff88;
  flex-shrink: 0;
}

.mobile-nav-label {
  font-size: 11px;
  font-weight: 600;
  color: #e0e8e0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-family: var(--font-sans);
}

/* Extended Menu Overlay */
.mobile-menu {
  position: absolute;
  bottom: 80px;
  left: 8px;
  right: 8px;
  background: rgba(17, 26, 17, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 20px;
  box-shadow:
    0 -8px 32px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(0, 255, 136, 0.2);
  overflow: hidden;
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
}

.mobile-menu-title {
  font-size: 16px;
  font-weight: 700;
  color: #00ff88;
  font-family: var(--font-display);
}

.mobile-menu-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  color: #00ff88;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-menu-close:active {
  transform: scale(0.95);
  background: rgba(0, 255, 136, 0.1);
}

.icon {
  width: 20px;
  height: 20px;
}

.mobile-menu-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 12px;
  color: #e0e8e0;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 500;
}

.mobile-menu-item:active {
  transform: scale(0.98);
  background: rgba(0, 255, 136, 0.15);
  border-color: rgba(0, 255, 136, 0.4);
}

.mobile-menu-icon {
  width: 24px;
  height: 24px;
  color: #00ff88;
  flex-shrink: 0;
}

/* Slide up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
