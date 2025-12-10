<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useStartMenuStore } from '@/store/startMenu'
import { useI18n } from 'vue-i18n'
import type { AppIconName } from '@/data/apps'
import IconComputer from '@/components/icons/IconComputer.vue'
import IconFolder from '@/components/icons/IconFolder.vue'
import IconBriefcase from '@/components/icons/IconBriefcase.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconGraduation from '@/components/icons/IconGraduation.vue'

// Icon components mapping for start menu
const menuIcons: Record<AppIconName, typeof IconComputer> = {
  computer: IconComputer,
  folder: IconFolder,
  briefcase: IconBriefcase,
  mail: IconMail,
  graduation: IconGraduation
}

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
  <transition enter-active-class="backdrop-enter-active" leave-active-class="backdrop-leave-active"
    enter-from-class="backdrop-enter-from" leave-to-class="backdrop-leave-to">
    <div v-if="startMenuStore.isOpen" class="menu-backdrop" @click="startMenuStore.closeMenu"></div>
  </transition>

  <!-- Start Menu -->
  <transition enter-active-class="menu-enter-active" leave-active-class="menu-leave-active"
    enter-from-class="menu-enter-from" leave-to-class="menu-leave-to">
    <div v-if="startMenuStore.isOpen" class="start-menu">
      <!-- Menu Header -->
      <div class="menu-header">
        <div class="header-content">
          <div class="header-icon">
            <svg class="windows-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
            </svg>
          </div>
          <div class="header-text">
            <h2 class="menu-title">{{ startMenuStore.currentTitle }}</h2>
            <p v-if="startMenuStore.currentDescription" class="menu-description">
              {{ startMenuStore.currentDescription }}
            </p>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="menu-divider"></div>

      <!-- Menu Content -->
      <div class="menu-content">
        <!-- Dynamic Menu Items -->
        <div v-if="startMenuStore.menuItems.length > 0" class="menu-items">
          <button v-for="item in startMenuStore.menuItems" :key="item.id" @click="item.action ? item.action() : null"
            class="menu-item">
            <div v-if="item.icon && menuIcons[item.icon]" class="item-icon-wrapper">
              <component :is="menuIcons[item.icon]" class="item-icon" />
            </div>
            <div v-else class="item-icon-wrapper">
              <svg class="item-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div class="item-text">
              <span class="item-title">{{ item.title }}</span>
              <span v-if="item.description" class="item-description">{{ item.description }}</span>
            </div>
            <svg class="item-arrow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </div>

        <!-- Placeholder Content -->
        <div v-else class="placeholder-content">
          <div class="placeholder-icon-wrapper">
            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
            </svg>
          </div>
          <p class="placeholder-title">{{ t('startMenu.comingSoon') }}</p>
          <p class="placeholder-description">{{ t('startMenu.contentWillAppear') }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@reference "@/assets/main.css";

/* Backdrop Transitions */
.backdrop-enter-active,
.backdrop-leave-active {
  @apply transition-opacity duration-300;
}

.backdrop-enter-active {
  @apply ease-out;
}

.backdrop-leave-active {
  @apply ease-in;
}

.backdrop-enter-from,
.backdrop-leave-to {
  @apply opacity-0;
}

/* Menu Transitions */
.menu-enter-active {
  @apply transition-all duration-300;
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

.menu-leave-active {
  @apply transition-all duration-250 ease-in;
}

.menu-enter-from {
  @apply opacity-0 -translate-x-1/2 translate-y-8;
}

.menu-leave-to {
  @apply opacity-0 -translate-x-1/2 translate-y-5;
}

/* Backdrop */
.menu-backdrop {
  @apply fixed inset-0 bg-black/60 backdrop-blur-sm z-9000 bottom-16 md:bottom-0;
}

/* Start Menu */
.start-menu {
  @apply fixed bottom-16 left-0 right-0 w-full max-w-full max-h-[calc(100vh-64px)];
  @apply bg-background-elevated/98 backdrop-blur-2xl;
  @apply border border-primary/30 rounded-none border-x-0 border-b-0;
  @apply shadow-primary/20 z-9001 overflow-hidden flex flex-col;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);

  @apply md:bottom-20 md:left-1/2 md:-translate-x-1/2;
  @apply md:w-[90%] md:max-w-2xl md:max-h-[600px];
  @apply md:rounded-2xl md:border;
}

/* Menu Header */
.menu-header {
  @apply flex items-center justify-between bg-primary/5 border-b border-primary/20;
  @apply px-5 py-4 md:px-6 md:py-5;
}

.header-content {
  @apply flex items-center gap-4 flex-1;
}

.header-icon {
  @apply flex items-center justify-center;
  @apply bg-primary/15 border border-primary/30 rounded-xl text-primary shrink-0;
  @apply w-10 h-10 md:w-12 md:h-12;
}

.windows-icon {
  @apply w-6 h-6 md:w-7 md:h-7;
}

.header-text {
  @apply flex-1;
}

.menu-title {
  @apply font-bold text-primary font-display m-0 text-lg md:text-xl;
}

.menu-description {
  @apply text-text-secondary font-sans mt-1 text-xs md:text-[13px];
}

/* Divider */
.menu-divider {
  @apply h-px bg-linear-to-r from-transparent via-primary/30 to-transparent;
}

/* Menu Content */
.menu-content {
  @apply flex-1 overflow-y-auto min-h-[200px] p-3 md:p-4;
  @apply scrollbar-thin;
}

/* Menu Items */
.menu-items {
  @apply flex flex-col gap-2;
}

.menu-item {
  @apply flex items-center gap-4 px-5 py-4;
  @apply bg-primary/5 border border-primary/20 rounded-xl;
  @apply text-text-base cursor-pointer;
  @apply transition-all duration-200;
  @apply hover:bg-primary/15 hover:border-primary/40 hover:shadow-glow hover:translate-x-1;
  @apply active:scale-[0.98];
}

.item-icon-wrapper {
  @apply flex items-center justify-center w-10 h-10;
  @apply bg-primary/10 border border-primary/30 rounded-lg;
  @apply text-primary shrink-0;
}

.item-icon {
  @apply w-6 h-6;
}

.item-text {
  @apply flex flex-col gap-1 flex-1 text-left;
}

.item-title {
  @apply text-[15px] font-semibold text-text-base font-sans;
}

.item-description {
  @apply text-xs text-text-secondary font-sans;
}

.item-arrow {
  @apply w-5 h-5 text-primary/60 shrink-0;
}

/* Placeholder Content */
.placeholder-content {
  @apply flex flex-col items-center justify-center py-16 px-10 text-center;
}

.placeholder-icon-wrapper {
  @apply w-20 h-20 bg-primary/10 border-2 border-primary/30 rounded-2xl;
  @apply flex items-center justify-center mb-6 text-primary;
  animation: pulse-glow 2s ease-in-out infinite;
}

.placeholder-icon {
  @apply w-10 h-10;
}

.placeholder-title {
  @apply text-lg font-bold text-primary font-display mb-2;
}

.placeholder-description {
  @apply text-sm text-text-secondary font-sans;
}
</style>
