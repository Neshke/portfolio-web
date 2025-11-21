<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useWindowsStore } from '@/store/windows'
import TaskbarWrapper from '@/components/TaskbarWrapper.vue'
import StartMenu from '@/components/StartMenu.vue'
import DesktopWindow from '@/components/DesktopWindow.vue'
import ExplorerContent from '@/components/ExplorerContent.vue'
import AboutApp from '@/components/apps/AboutApp.vue'
import ProjectsApp from '@/components/apps/ProjectsApp.vue'
import ExperienceApp from '@/components/apps/ExperienceApp.vue'
import ContactApp from '@/components/apps/ContactApp.vue'

const { t } = useI18n()
const windowsStore = useWindowsStore()

// Desktop App Launchers (Replicating Taskbar Logic)
const openAbout = () => {
  windowsStore.openWindow('about', t('taskbar.about'), 'AboutApp', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>')
}

const openProjects = () => {
  windowsStore.openWindow('projects', t('taskbar.projects'), 'ProjectsApp', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>')
}

const openExperience = () => {
  windowsStore.openWindow('experience', t('taskbar.experience'), 'ExperienceApp', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>')
}

const openContact = () => {
  windowsStore.openWindow('contact', t('taskbar.contact'), 'ContactApp', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>')
}

const openGithub = () => {
  window.open('https://github.com', '_blank')
}

const getComponent = (name: string) => {
  switch (name) {
    case 'ExplorerContent':
      return ExplorerContent
    case 'AboutApp':
      return AboutApp
    case 'ProjectsApp':
      return ProjectsApp
    case 'ExperienceApp':
      return ExperienceApp
    case 'ContactApp':
      return ContactApp
    default:
      return 'div'
  }
}
</script>

<template>
  <div class="desktop-environment">
    <!-- Desktop Background -->
    <div class="desktop-wallpaper"></div>
    
    <!-- Desktop Icons Grid -->
    <div class="desktop-grid">
      <!-- My Computer (About) -->
      <button class="desktop-icon" @click="openAbout">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <span class="icon-label">{{ t('taskbar.about') }}</span>
      </button>

      <!-- Projects Folder -->
      <button class="desktop-icon" @click="openProjects">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <span class="icon-label">{{ t('taskbar.projects') }}</span>
      </button>

      <!-- Experience -->
      <button class="desktop-icon" @click="openExperience">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <span class="icon-label">{{ t('taskbar.experience') }}</span>
      </button>

      <!-- Contact -->
      <button class="desktop-icon" @click="openContact">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <span class="icon-label">{{ t('taskbar.contact') }}</span>
      </button>

      <!-- GitHub Shortcut -->
      <button class="desktop-icon" @click="openGithub">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <div class="shortcut-arrow">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </div>
        </div>
        <span class="icon-label">GitHub</span>
      </button>

      <!-- Recycle Bin -->
      <button class="desktop-icon">
        <div class="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </div>
        <span class="icon-label">{{ t('startMenu.recycleBin') }}</span>
      </button>
    </div>

    <!-- Desktop Widget (Profile) -->
    <div class="desktop-widget-container">
      <div class="glass-card profile-widget">
        <img src="/src/assets/images/profile-picture.jpg" alt="Profile" class="widget-avatar" />
        <div class="widget-content">
          <h2 class="widget-title">{{ t('hero.title') }}</h2>
          <p class="widget-subtitle">{{ t('about.role') }}</p>
        </div>
      </div>
    </div>

    <!-- Windows Layer -->
    <div class="windows-layer">
      <TransitionGroup name="window-minimize">
        <DesktopWindow
          v-for="win in windowsStore.openWindows"
          :key="win.id"
          :id="win.id"
          :title="win.title"
          :initial-x="win.position.x"
          :initial-y="win.position.y"
          :initial-width="win.size.width"
          :initial-height="win.size.height"
          :z-index="win.zIndex"
          :is-active="windowsStore.activeWindowId === win.id"
          :is-maximized="win.isMaximized"
          v-show="!win.isMinimized"
        >
          <component :is="getComponent(win.component)" v-bind="win.props" />
        </DesktopWindow>
      </TransitionGroup>
    </div>

    <!-- Taskbar & Start Menu -->
    <TaskbarWrapper />
    <StartMenu />
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.desktop-environment {
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  user-select: none;
}

.desktop-wallpaper {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, #1a2c24 0%, #0a0f0a 100%);
  z-index: -1;
}

/* Desktop Grid */
.desktop-grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px;
  padding: 24px;
  height: calc(100% - 60px); /* Minus taskbar */
  width: 100%;
  max-width: 400px; /* Limit width for column wrapping */
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 84px;
  padding: 8px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.desktop-icon:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.desktop-icon:active, .desktop-icon:focus {
  background: rgba(0, 255, 136, 0.1);
  border-color: rgba(0, 255, 136, 0.2);
}

.icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff88;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
}

.icon-wrapper svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.5;
}

.shortcut-arrow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 16px;
  height: 16px;
  background: #0a0f0a;
  color: #e0e8e0;
  border: 1px solid #7fa77f;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-label {
  font-family: var(--font-sans);
  font-size: 12px;
  color: #e0e8e0;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
  line-height: 1.2;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Desktop Widget */
.desktop-widget-container {
  position: absolute;
  top: 40px;
  right: 40px;
  width: 300px;
}

.profile-widget {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(17, 26, 17, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 136, 0.2);
  animation: slideIn 0.6s ease-out;
}

.widget-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #00ff88;
  object-fit: cover;
}

.widget-content {
  flex: 1;
}

.widget-title {
  font-family: var(--font-display);
  font-size: 16px;
  color: #e0e8e0;
  margin: 0;
}

.widget-subtitle {
  font-family: var(--font-sans);
  font-size: 12px;
  color: #7fa77f;
  margin: 4px 0 0 0;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .desktop-grid {
    flex-direction: row;
    align-content: flex-start;
    max-width: 100%;
    padding: 16px;
  }
  
  .desktop-widget-container {
    top: auto;
    bottom: 100px;
    right: 50%;
    transform: translateX(50%);
    width: 90%;
  }
}

/* Window Minimize/Restore Animation */
.window-minimize-enter-active,
.window-minimize-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.window-minimize-enter-from,
.window-minimize-leave-to {
  opacity: 0;
  transform: translateY(100px) scale(0.8);
  transform-origin: bottom center;
}
</style>
