<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useStartMenuStore } from '@/store/startMenu'
import { useI18n } from 'vue-i18n'

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
  <transition name="fade">
    <div v-if="startMenuStore.isOpen" class="start-menu-backdrop" @click="startMenuStore.closeMenu"></div>
  </transition>

  <!-- Start Menu -->
  <transition name="slide-up-menu">
    <div v-if="startMenuStore.isOpen" class="start-menu-container">
      <!-- Menu Header -->
      <div class="start-menu-header">
        <div class="start-menu-header-content">
          <div class="start-menu-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
            </svg>
          </div>
          <div class="start-menu-header-text">
            <h2 class="start-menu-title">{{ startMenuStore.currentTitle }}</h2>
            <p v-if="startMenuStore.currentDescription" class="start-menu-description">
              {{ startMenuStore.currentDescription }}
            </p>
          </div>
        </div>
        <button @click="startMenuStore.closeMenu" class="start-menu-close">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      <!-- Divider -->
      <div class="start-menu-divider"></div>

      <!-- Menu Content -->
      <div class="start-menu-content">
        <!-- Dynamic Menu Items -->
        <div v-if="startMenuStore.menuItems.length > 0" class="start-menu-items">
          <button v-for="item in startMenuStore.menuItems" :key="item.id" @click="item.action ? item.action() : null"
            class="start-menu-item">
            <div v-if="item.icon" class="start-menu-item-icon" v-html="item.icon"></div>
            <div v-else class="start-menu-item-icon-placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div class="start-menu-item-content">
              <span class="start-menu-item-title">{{ item.title }}</span>
              <span v-if="item.description" class="start-menu-item-description">{{ item.description }}</span>
            </div>
            <svg class="start-menu-item-arrow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </div>

        <!-- Placeholder Content -->
        <div v-else class="start-menu-placeholder">
          <div class="start-menu-placeholder-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
            </svg>
          </div>
          <p class="start-menu-placeholder-text">{{ t('startMenu.comingSoon') }}</p>
          <p class="start-menu-placeholder-subtext">{{ t('startMenu.contentWillAppear') }}</p>
        </div>
      </div>

      <!-- Menu Footer -->
      <div class="start-menu-footer">
        <button class="start-menu-footer-btn">
          <svg class="start-menu-footer-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          <span>{{ t('startMenu.profile') }}</span>
        </button>
        <button class="start-menu-footer-btn">
          <svg class="start-menu-footer-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
          <span>{{ t('startMenu.settings') }}</span>
        </button>
        <button @click="startMenuStore.closeMenu" class="start-menu-footer-btn">
          <svg class="start-menu-footer-icon" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
          </svg>
          <span>{{ t('startMenu.close') }}</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@reference "../assets/main.css";

/* Backdrop */
.start-menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 15;
}

/* Start Menu Container */
.start-menu-container {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 640px;
  max-height: 600px;
  background: rgba(17, 26, 17, 0.98);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 16px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(0, 255, 136, 0.2),
    inset 0 0 60px rgba(0, 255, 136, 0.05);
  z-index: 19;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Header */
.start-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: rgba(0, 255, 136, 0.05);
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
}

.start-menu-header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.start-menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(0, 255, 136, 0.15);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  color: #00ff88;
  flex-shrink: 0;
}

.start-menu-icon svg {
  width: 28px;
  height: 28px;
}

.start-menu-header-text {
  flex: 1;
}

.start-menu-title {
  font-size: 20px;
  font-weight: 700;
  color: #00ff88;
  font-family: var(--font-display);
  margin: 0;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

.start-menu-description {
  font-size: 13px;
  color: #7fa77f;
  font-family: var(--font-sans);
  margin: 4px 0 0 0;
}

.start-menu-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 8px;
  color: #00ff88;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.start-menu-close:hover {
  background: rgba(0, 255, 136, 0.1);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.start-menu-close:active {
  transform: scale(0.95);
}

.start-menu-close svg {
  width: 20px;
  height: 20px;
}

/* Divider */
.start-menu-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(0, 255, 136, 0.3), transparent);
}

/* Content Area */
.start-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  min-height: 200px;
}

/* Scrollbar Styling */
.start-menu-content::-webkit-scrollbar {
  width: 8px;
}

.start-menu-content::-webkit-scrollbar-track {
  background: rgba(0, 255, 136, 0.05);
  border-radius: 4px;
}

.start-menu-content::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 136, 0.3);
  border-radius: 4px;
}

.start-menu-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 136, 0.5);
}

/* Menu Items */
.start-menu-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.start-menu-item {
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
}

.start-menu-item:hover {
  background: rgba(0, 255, 136, 0.15);
  border-color: rgba(0, 255, 136, 0.4);
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.2);
  transform: translateX(4px);
}

.start-menu-item:active {
  transform: translateX(4px) scale(0.98);
}

.start-menu-item-icon,
.start-menu-item-icon-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 10px;
  color: #00ff88;
  flex-shrink: 0;
}

.start-menu-item-icon svg,
.start-menu-item-icon-placeholder svg {
  width: 24px;
  height: 24px;
}

.start-menu-item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.start-menu-item-title {
  font-size: 15px;
  font-weight: 600;
  color: #e0e8e0;
  font-family: var(--font-sans);
}

.start-menu-item-description {
  font-size: 12px;
  color: #7fa77f;
  font-family: var(--font-sans);
}

.start-menu-item-arrow {
  width: 20px;
  height: 20px;
  color: #00ff88;
  opacity: 0.6;
  flex-shrink: 0;
}

/* Placeholder */
.start-menu-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
}

.start-menu-placeholder-icon {
  width: 80px;
  height: 80px;
  background: rgba(0, 255, 136, 0.1);
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: #00ff88;
  animation: pulse-glow 2s ease-in-out infinite;
}

.start-menu-placeholder-icon svg {
  width: 40px;
  height: 40px;
}

.start-menu-placeholder-text {
  font-size: 18px;
  font-weight: 700;
  color: #00ff88;
  font-family: var(--font-display);
  margin-bottom: 8px;
}

.start-menu-placeholder-subtext {
  font-size: 14px;
  color: #7fa77f;
  font-family: var(--font-sans);
}

@keyframes pulse-glow {

  0%,
  100% {
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }

  50% {
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
  }
}

/* Footer */
.start-menu-footer {
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  background: rgba(0, 255, 136, 0.05);
  border-top: 1px solid rgba(0, 255, 136, 0.2);
}

.start-menu-footer-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: transparent;
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 10px;
  color: #e0e8e0;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  flex: 1;
}

.start-menu-footer-btn:hover {
  background: rgba(0, 255, 136, 0.1);
  border-color: rgba(0, 255, 136, 0.4);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
}

.start-menu-footer-btn:active {
  transform: scale(0.98);
}

.start-menu-footer-icon {
  width: 18px;
  height: 18px;
  color: #00ff88;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-menu-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-up-menu-leave-active {
  transition: all 0.25s ease-in;
}

.slide-up-menu-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(30px);
}

.slide-up-menu-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .start-menu-backdrop {
    bottom: 88px;
  }

  .start-menu-container {
    bottom: 88px;
    width: 95%;
    max-height: 70vh;
  }

  .start-menu-header {
    padding: 16px 20px;
  }

  .start-menu-icon {
    width: 40px;
    height: 40px;
  }

  .start-menu-icon svg {
    width: 24px;
    height: 24px;
  }

  .start-menu-title {
    font-size: 18px;
  }

  .start-menu-description {
    font-size: 12px;
  }

  .start-menu-footer {
    flex-wrap: wrap;
  }

  .start-menu-footer-btn {
    flex: 0 0 calc(50% - 4px);
  }
}
</style>
