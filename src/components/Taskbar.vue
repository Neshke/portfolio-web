<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useStartMenuStore } from '@/store/startMenu'
import { useWindowsStore, type WindowItem } from '@/store/windows'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { startMenuItemsConfig } from '@/data/startMenu'
import type { AppIconName } from '@/data/apps'
import IconComputer from '@/components/icons/IconComputer.vue'
import IconFolder from '@/components/icons/IconFolder.vue'
import IconBriefcase from '@/components/icons/IconBriefcase.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconGraduation from '@/components/icons/IconGraduation.vue'

// Icon components mapping for taskbar
const taskbarIcons: Record<AppIconName, typeof IconComputer> = {
  computer: IconComputer,
  folder: IconFolder,
  briefcase: IconBriefcase,
  mail: IconMail,
  graduation: IconGraduation
}

const startMenuStore = useStartMenuStore()
const windowsStore = useWindowsStore()
const { t, locale } = useI18n()
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

const getStartMenuData = () => ({
  app: 'start',
  title: t('startMenu.title'),
  items: startMenuItemsConfig.map(item => ({
    id: item.id,
    title: t(item.titleKey),
    description: t(item.descriptionKey),
    type: 'app' as const,
    icon: item.icon,
    action: () => {
      windowsStore.openWindow(item.id, t(item.titleKey), item.componentName, {}, item.icon)
      startMenuStore.closeMenu()
    }
  }))
})

const toggleStartMenu = () => {
  startMenuStore.toggleMenu(getStartMenuData())
}

// Watch for language changes and update the menu if it's open
watch(locale, () => {
  if (startMenuStore.isOpen && startMenuStore.activeApp === 'start') {
    startMenuStore.openMenu(getStartMenuData())
  }
})

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
  <nav class="taskbar-wrapper">
    <div class="taskbar">
      <!-- Start Button -->
      <button class="start-button" @click="toggleStartMenu" :class="{ 'start-button-active': startMenuStore.isOpen }">
        <svg class="start-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
      </button>

      <!-- Taskbar Apps -->
      <div class="taskbar-apps">
        <TransitionGroup enter-active-class="app-enter-active" leave-active-class="app-leave-active"
          enter-from-class="app-enter-from" leave-to-class="app-leave-to">
          <button v-for="win in windowsStore.openWindows" :key="win.id" @click="handleTaskbarClick(win)"
            class="taskbar-app" :class="{
              'taskbar-app-active': windowsStore.activeWindowId === win.id && !win.isMinimized,
              'taskbar-app-minimized': win.isMinimized
            }">
            <div v-if="win.icon && taskbarIcons[win.icon]" class="app-icon-wrapper">
              <component :is="taskbarIcons[win.icon]" class="app-icon" />
            </div>
            <div v-else class="app-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </div>
            <span class="app-title">{{ win.title }}</span>
          </button>
        </TransitionGroup>
      </div>

      <!-- System Tray -->
      <div class="system-tray">
        <LanguageSwitcher />
        <button class="tray-button tray-button-hidden">
          <svg class="tray-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </button>
        <button class="tray-button tray-button-hidden">
          <svg class="tray-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </button>
        <div class="clock">
          <span class="clock-time">{{ dateNow }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@reference "@/assets/main.css";

/* Taskbar Wrapper */
.taskbar-wrapper {
  @apply absolute bottom-0 left-0 right-0 mx-auto z-9002;
  @apply w-full max-w-7xl flex justify-center;
  @apply p-0 sm:p-2;
  animation: slideUpFade 0.8s ease-out 1.2s both;
}

/* Taskbar */
.taskbar {
  @apply flex items-center gap-1 h-16;
  @apply bg-background-elevated/85 backdrop-blur-xl;
  @apply border border-primary/20 px-3;
  @apply shadow-primary/10;
  @apply w-full rounded-none border-x-0 border-b-0;
  @apply sm:rounded-xl sm:border sm:w-auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Start Button */
.start-button {
  @apply flex items-center justify-center p-2.5;
  @apply bg-transparent border border-transparent rounded-lg;
  @apply text-text-base cursor-pointer;
  @apply transition-all duration-200;
  @apply hover:bg-primary/25 active:scale-95;
}

.start-button:hover {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

.start-button-active {
  @apply bg-primary/20 border-primary/40 shadow-glow;
}

.start-icon {
  @apply w-5 h-5 text-primary shrink-0;
}

/* Taskbar Apps */
.taskbar-apps {
  @apply flex items-center gap-1 flex-1 ml-2 overflow-x-auto scrollbar-none;
}

/* App Transitions */
.app-enter-active,
.app-leave-active {
  @apply transition-all duration-300;
}

.app-enter-active {
  @apply ease-out;
}

.app-leave-active {
  @apply ease-in;
}

.app-enter-from,
.app-leave-to {
  @apply opacity-0 translate-y-5 scale-75 w-0 p-0 m-0;
}

/* Taskbar App Button */
.taskbar-app {
  @apply flex items-center gap-2;
  @apply bg-transparent border border-transparent rounded-lg;
  @apply text-text-base cursor-pointer;
  @apply transition-all duration-200 font-sans text-sm relative;
  @apply hover:bg-white/5 hover:border-white/10 active:scale-95;
  @apply p-2 md:px-4;
}

.taskbar-app-active {
  @apply bg-white/5 border-white/10;
}

.taskbar-app-active::after {
  content: '';
  @apply absolute bottom-1 left-1/2 -translate-x-1/2;
  @apply w-5 h-[3px] bg-primary rounded-full;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
}

.taskbar-app-minimized {
  @apply opacity-70;
}

.app-icon-wrapper {
  @apply w-5 h-5 text-primary shrink-0;
}

.app-icon {
  @apply w-full h-full;
}

.app-title {
  @apply text-[13px] font-medium text-text-base whitespace-nowrap;
  @apply hidden md:block;
}

/* System Tray */
.system-tray {
  @apply flex items-center ml-auto border-l border-primary/20 shrink-0;
  @apply gap-1 pl-2 md:gap-2 md:pl-3;
}

.tray-button {
  @apply p-2 items-center justify-center;
  @apply bg-transparent border border-transparent rounded-lg;
  @apply text-text-base cursor-pointer;
  @apply transition-all duration-200;
  @apply hover:bg-primary/10 hover:border-primary/30 hover:shadow-glow-sm;
  @apply active:scale-95;
}

.tray-button-hidden {
  @apply hidden md:flex;
}

.tray-icon {
  @apply w-4 h-4 text-text-secondary shrink-0;
}

/* Clock */
.clock {
  @apply flex flex-col items-center px-3 font-mono text-primary whitespace-nowrap;
}

.clock-time {
  @apply text-[13px] font-semibold;
}
</style>
