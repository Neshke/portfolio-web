<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useStartMenuStore } from '@/store/startMenu'
import { useWindowsStore, type WindowItem } from '@/store/windows'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const startMenuStore = useStartMenuStore()
const windowsStore = useWindowsStore()
const { t } = useI18n()
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

const toggleStartMenu = () => {
  startMenuStore.toggleMenu({
    app: 'start',
    title: t('startMenu.title'),
    items: [
      {
        id: 'about',
        title: t('taskbar.about'),
        description: t('startMenu.aboutDescription'),
        type: 'app',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
        action: () => {
          windowsStore.openWindow('about', t('taskbar.about'), 'AboutApp', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>')
          startMenuStore.closeMenu()
        }
      },
      {
        id: 'projects',
        title: t('taskbar.projects'),
        description: t('startMenu.projectsDescription'),
        type: 'app',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
        action: () => {
          windowsStore.openWindow('projects', t('taskbar.projects'), 'ProjectsApp', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>')
          startMenuStore.closeMenu()
        }
      },
      {
        id: 'experience',
        title: t('taskbar.experience'),
        description: t('startMenu.experienceDescription'),
        type: 'app',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
        action: () => {
          windowsStore.openWindow('experience', t('taskbar.experience'), 'ExperienceApp', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>')
          startMenuStore.closeMenu()
        }
      },
      {
        id: 'contact',
        title: t('taskbar.contact'),
        description: t('startMenu.contactDescription'),
        type: 'app',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
        action: () => {
          windowsStore.openWindow('contact', t('taskbar.contact'), 'ContactApp', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>')
          startMenuStore.closeMenu()
        }
      }
    ]
  })
}

const handleTaskbarClick = (win: WindowItem) => {
  if (windowsStore.activeWindowId === win.id && !win.isMinimized) {
    windowsStore.minimizeWindow(win.id)
  } else {
    // Restore if minimized or just focus
    if (win.isMinimized) {
       windowsStore.openWindow(win.id, win.title, win.component, win.props, win.icon)
    } else {
       windowsStore.focusWindow(win.id)
    }
  }
}
</script>

<template>
  <!-- Windows Taskbar -->
  <nav class="taskbar taskbar-animated">
    <div class="taskbar-container">
      <!-- Start Button -->
      <button class="taskbar-item start-button" @click="toggleStartMenu" :class="{ active: startMenuStore.isOpen }">
        <svg class="taskbar-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
      </button>

      <!-- Taskbar Apps -->
      <div class="taskbar-apps">
        <TransitionGroup name="taskbar-item">
          <button 
            v-for="win in windowsStore.openWindows" 
            :key="win.id"
            @click="handleTaskbarClick(win)" 
            class="taskbar-item" 
            :class="{ active: windowsStore.activeWindowId === win.id && !win.isMinimized, minimized: win.isMinimized }"
          >
            <div v-if="win.icon" class="taskbar-icon" v-html="win.icon"></div>
            <div v-else class="taskbar-icon-placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </div>
            <span class="taskbar-label">{{ win.title }}</span>
          </button>
        </TransitionGroup>
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
    transform: translateY(100px) translateX(-50%);
  }

  100% {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
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
  left: 50%;
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
  position: relative;
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

.taskbar-item.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: #00ff88;
  border-radius: 2px;
  box-shadow: 0 0 8px #00ff88;
}

.taskbar-item.minimized {
  opacity: 0.7;
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
  overflow-x: auto; /* Allow scrolling on small screens */
  scrollbar-width: none; /* Firefox */
}

.taskbar-apps::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.taskbar-icon {
  width: 20px;
  height: 20px;
  color: #00ff88;
  flex-shrink: 0;
}

.taskbar-icon svg {
  width: 100%;
  height: 100%;
}

.taskbar-icon-placeholder {
  width: 20px;
  height: 20px;
  color: #00ff88;
  flex-shrink: 0;
}

.taskbar-icon-placeholder svg {
  width: 100%;
  height: 100%;
}

.taskbar-icon-sm {
  width: 16px;
  height: 16px;
  color: #9ba9b4;
  flex-shrink: 0;
}

.taskbar-label {
  font-size: 13px;
  font-weight: 500;
  color: #e0e8e0;
  white-space: nowrap;
}

.taskbar-tray {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  padding-left: 12px;
  border-left: 1px solid rgba(0, 255, 136, 0.2);
  flex-shrink: 0;
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
  white-space: nowrap;
}

.clock-time {
  font-size: 13px;
  font-weight: 600;
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .taskbar {
    padding: 0;
    bottom: 0;
  }

  .taskbar-container {
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
    width: 100%;
    padding: 4px 8px;
  }

  .taskbar-label {
    display: none; /* Hide labels on mobile to save space */
  }

  .taskbar-item {
    padding: 8px;
  }
  
  .taskbar-tray {
    gap: 4px;
    padding-left: 8px;
  }
  
  .tray-item {
    display: none; /* Hide extra tray items on mobile */
  }
}


/* Transitions */
.taskbar-item-enter-active,
.taskbar-item-leave-active {
  transition: all 0.3s ease;
}

.taskbar-item-enter-from,
.taskbar-item-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  width: 0;
  padding: 0;
  margin: 0;
}
</style>
