<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useStartMenuStore } from '@/store/startMenu'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const startMenuStore = useStartMenuStore()
const { t } = useI18n()

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const menu = document.querySelector('.start-menu-container')
  const taskbarButtons = document.querySelectorAll('.taskbar-item, .mobile-nav-item')

  // Don't close if clicking on taskbar buttons or inside the menu
  if (menu && !menu.contains(target)) {
    let isTaskbarClick = false
    taskbarButtons.forEach((button) => {
      if (button.contains(target)) {
        isTaskbarClick = true
      }
    })

    if (!isTaskbarClick) {
      startMenuStore.closeMenu()
    }
  }
}

// Close menu on Escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && startMenuStore.isOpen) {
    startMenuStore.closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <!-- Backdrop -->
  <transition enter-active-class="transition-opacity duration-300 ease-out"
    leave-active-class="transition-opacity duration-300 ease-in" enter-from-class="opacity-0"
    leave-to-class="opacity-0">
    <div v-if="startMenuStore.isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9000] bottom-16 md:bottom-0"
      @click="startMenuStore.closeMenu"></div>
  </transition>

  <!-- Start Menu -->
  <transition enter-active-class="transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)"
    leave-active-class="transition-all duration-250 ease-in" enter-from-class="opacity-0 -translate-x-1/2 translate-y-8"
    leave-to-class="opacity-0 -translate-x-1/2 translate-y-5">
    <div v-if="startMenuStore.isOpen"
      class="fixed bottom-16 left-0 right-0 w-full max-w-full max-h-[calc(100vh-64px)] bg-background-elevated/98 backdrop-blur-2xl border border-primary/30 rounded-none border-x-0 border-b-0 shadow-[0_8px_32px_rgba(0,0,0,0.6)] shadow-primary/20 z-[9001] overflow-hidden flex flex-col md:bottom-20 md:left-1/2 md:-translate-x-1/2 md:w-[90%] md:max-w-2xl md:max-h-[600px] md:rounded-2xl md:border">
      <!-- Menu Header -->
      <div class="flex items-center justify-between bg-primary/5 border-b border-primary/20 px-5 py-4 md:px-6 md:py-5">
        <div class="flex items-center gap-4 flex-1">
          <div
            class="flex items-center justify-center bg-primary/15 border border-primary/30 rounded-xl text-primary shrink-0 w-10 h-10 md:w-12 md:h-12">
            <svg class="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
            </svg>
          </div>
          <div class="flex-1">
            <h2 class="font-bold text-primary font-display m-0 text-lg md:text-xl">{{
              startMenuStore.currentTitle }}</h2>
            <p v-if="startMenuStore.currentDescription"
              class="text-text-secondary font-sans mt-1 text-xs md:text-[13px]">
              {{ startMenuStore.currentDescription }}
            </p>
          </div>
        </div>
        <div class="shrink-0 flex md:hidden">
          <LanguageSwitcher direction="down" />
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>

      <!-- Menu Content -->
      <div
        class="flex-1 overflow-y-auto min-h-[200px] scrollbar-thin scrollbar-track-primary/5 scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50 p-3 md:p-4">
        <!-- Dynamic Menu Items -->
        <div v-if="startMenuStore.menuItems.length > 0" class="flex flex-col gap-2">
          <button v-for="item in startMenuStore.menuItems" :key="item.id" @click="item.action ? item.action() : null"
            class="flex items-center gap-4 px-5 py-4 bg-primary/5 border border-primary/20 rounded-xl text-text-base cursor-pointer transition-all duration-200 hover:bg-primary/15 hover:border-primary/40 hover:shadow-glow hover:translate-x-1 active:scale-[0.98]">
            <div v-if="item.icon"
              class="flex items-center justify-center w-10 h-10 bg-primary/10 border border-primary/30 rounded-lg text-primary shrink-0"
              v-html="item.icon"></div>
            <div v-else
              class="flex items-center justify-center w-10 h-10 bg-primary/10 border border-primary/30 rounded-lg text-primary shrink-0">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div class="flex flex-col gap-1 flex-1 text-left">
              <span class="text-[15px] font-semibold text-text-base font-sans">{{ item.title }}</span>
              <span v-if="item.description" class="text-xs text-text-secondary font-sans">{{ item.description }}</span>
            </div>
            <svg class="w-5 h-5 text-primary/60 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </div>

        <!-- Placeholder Content -->
        <div v-else class="flex flex-col items-center justify-center py-16 px-10 text-center">
          <div
            class="w-20 h-20 bg-primary/10 border-2 border-primary/30 rounded-2xl flex items-center justify-center mb-6 text-primary animate-[pulse-glow_2s_ease-in-out_infinite]">
            <svg class="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
            </svg>
          </div>
          <p class="text-lg font-bold text-primary font-display mb-2">{{ t('startMenu.comingSoon') }}</p>
          <p class="text-sm text-text-secondary font-sans">{{ t('startMenu.contentWillAppear') }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>
