<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStartMenuStore } from '@/store/startMenu'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const { t } = useI18n()
const startMenuStore = useStartMenuStore()
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

const toggleMenu = () => {
  // Open About section in Start Menu instead of mobile slide-up menu
  openAbout()
}

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
  <!-- Mobile Bottom Navigation -->
  <nav class="taskbar-mobile taskbar-mobile-animated">
    <!-- Bottom Navigation Bar -->
    <div class="mobile-nav-container">
      <!-- About Button -->
      <button @click="toggleMenu" class="mobile-nav-item" :class="{ active: startMenuStore.activeApp === 'about' }">
        <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
          <path d="M6 10h12v2H6zm0 4h8v2H6z" />
        </svg>
        <span class="mobile-nav-label">{{ t('taskbar.about') }}</span>
      </button>

      <!-- Projects -->
      <button @click="openProjects" class="mobile-nav-item"
        :class="{ active: startMenuStore.activeApp === 'projects' }">
        <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
        </svg>
        <span class="mobile-nav-label">{{ t('taskbar.projects') }}</span>
      </button>

      <!-- Experience -->
      <button @click="openExperience" class="mobile-nav-item"
        :class="{ active: startMenuStore.activeApp === 'experience' }">
        <DotLottieVue style="width: 24px; height: 24px" autoplay loop
          src="https://lottie.host/bdf6f19c-7c2e-4b33-ad43-866a1456da47/ui3DYKizpT.lottie" />
        <span class="mobile-nav-label">{{ t('taskbar.experience') }}</span>
      </button>

      <!-- Contact -->
      <button @click="openContact" class="mobile-nav-item" :class="{ active: startMenuStore.activeApp === 'contact' }">
        <svg class="mobile-nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span class="mobile-nav-label">{{ t('taskbar.contact') }}</span>
      </button>
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
</style>
