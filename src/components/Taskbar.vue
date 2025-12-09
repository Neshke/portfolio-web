<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useStartMenuStore } from '@/store/startMenu'
import { useWindowsStore, type WindowItem } from '@/store/windows'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { startMenuItemsConfig } from '@/data/startMenu'

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
  <nav
    class="absolute bottom-0 left-0 right-0 mx-auto z-9002 w-full max-w-7xl flex justify-center animate-[slideUpFade_0.8s_ease-out_1.2s_both] p-0 sm:p-2">
    <div
      class="flex items-center gap-1 h-16 bg-background-elevated/85 backdrop-blur-xl border border-primary/20 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] shadow-primary/10 w-full rounded-none border-x-0 border-b-0 sm:rounded-xl sm:border sm:w-auto">
      <!-- Start Button -->
      <button
        class="flex items-center justify-center p-2.5 bg-transparent border border-transparent rounded-lg text-text-base cursor-pointer transition-all duration-200 hover:bg-primary/25 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] active:scale-95"
        @click="toggleStartMenu" :class="{ 'bg-primary/20 border-primary/40 shadow-glow': startMenuStore.isOpen }">
        <svg class="w-5 h-5 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
      </button>

      <!-- Taskbar Apps -->
      <div class="flex items-center gap-1 flex-1 ml-2 overflow-x-auto scrollbar-none">
        <TransitionGroup enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 translate-y-5 scale-75 w-0 p-0 m-0"
          leave-to-class="opacity-0 translate-y-5 scale-75 w-0 p-0 m-0">
          <button v-for="win in windowsStore.openWindows" :key="win.id" @click="handleTaskbarClick(win)"
            class="flex items-center gap-2 bg-transparent border border-transparent rounded-lg text-text-base cursor-pointer transition-all duration-200 font-sans text-sm relative hover:bg-white/5 hover:border-white/10 active:scale-95 p-2 md:px-4"
            :class="{
              'bg-white/5 border-white/10 after:content-[\'\'] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-[3px] after:bg-primary after:rounded-full after:shadow-[0_0_8px_rgba(59,130,246,0.8)]': windowsStore.activeWindowId === win.id && !win.isMinimized,
              'opacity-70': win.isMinimized
            }">
            <div v-if="win.icon" class="w-5 h-5 text-primary shrink-0" v-html="win.icon"></div>
            <div v-else class="w-5 h-5 text-primary shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </div>
            <span class="text-[13px] font-medium text-text-base whitespace-nowrap hidden md:block">{{ win.title
            }}</span>
          </button>
        </TransitionGroup>
      </div>

      <!-- System Tray -->
      <div class="flex items-center ml-auto border-l border-primary/20 shrink-0 gap-1 pl-2 md:gap-2 md:pl-3">
        <LanguageSwitcher />
        <button
          class="p-2 items-center justify-center bg-transparent border border-transparent rounded-lg text-text-base cursor-pointer transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-glow-sm active:scale-95 hidden md:flex">
          <svg class="w-4 h-4 text-text-secondary shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </button>
        <button
          class="p-2 items-center justify-center bg-transparent border border-transparent rounded-lg text-text-base cursor-pointer transition-all duration-200 hover:bg-primary/10 hover:border-primary/30 hover:shadow-glow-sm active:scale-95 hidden md:flex">
          <svg class="w-4 h-4 text-text-secondary shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </button>
        <div class="flex flex-col items-center px-3 font-mono text-primary whitespace-nowrap">
          <span class="text-[13px] font-semibold">{{ dateNow }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>
