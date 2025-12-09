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
import EducationApp from '@/components/apps/EducationApp.vue'
import MatrixBackground from '@/components/MatrixBackground.vue'

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

const openEducation = () => {
  windowsStore.openWindow('education', t('startMenu.education'), 'EducationApp', {}, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 0 6-1 6-1v-7"></path></svg>')
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
    case 'EducationApp':
      return EducationApp
    default:
      return 'div'
  }
}
</script>

<template>
  <div class="h-full w-full overflow-hidden relative select-none">
    <!-- Desktop Background -->
    <MatrixBackground />

    <!-- Desktop Icons Grid -->
    <div
      class="flex flex-col flex-wrap content-start gap-4 p-6 h-[calc(100%-60px)] w-full max-w-[400px] max-md:flex-row max-md:content-start max-md:max-w-full max-md:p-4">
      <!-- My Computer (About) -->
      <button
        class="desktop-icon flex flex-col items-center gap-2 w-[96px] p-3 rounded-xl bg-transparent border border-transparent cursor-pointer transition-all duration-200 hover:bg-white/5 hover:border-white/10 hover:backdrop-blur-sm active:bg-primary/10 active:border-primary/20 focus:bg-primary/10 focus:border-primary/20 group"
        @click="openAbout">
        <div
          class="relative w-14 h-14 flex items-center justify-center text-primary drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_12px_24px_rgba(59,130,246,0.3)]">
          <svg class="w-full h-full stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" class="fill-background-elevated/50"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <span
          class="font-sans text-[13px] font-medium text-text-base text-center shadow-black drop-shadow-md leading-tight max-w-full overflow-hidden text-ellipsis line-clamp-2 group-hover:text-primary-light transition-colors">{{
            t('taskbar.about') }}</span>
      </button>

      <!-- Projects Folder -->
      <button
        class="desktop-icon flex flex-col items-center gap-2 w-[96px] p-3 rounded-xl bg-transparent border border-transparent cursor-pointer transition-all duration-200 hover:bg-white/5 hover:border-white/10 hover:backdrop-blur-sm active:bg-primary/10 active:border-primary/20 focus:bg-primary/10 focus:border-primary/20 group"
        @click="openProjects">
        <div
          class="relative w-14 h-14 flex items-center justify-center text-primary drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_12px_24px_rgba(59,130,246,0.3)]">
          <svg class="w-full h-full stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
              class="fill-background-elevated/50"></path>
          </svg>
        </div>
        <span
          class="font-sans text-[13px] font-medium text-text-base text-center shadow-black drop-shadow-md leading-tight max-w-full overflow-hidden text-ellipsis line-clamp-2 group-hover:text-primary-light transition-colors">{{
            t('taskbar.projects') }}</span>
      </button>

      <!-- Experience -->
      <button
        class="desktop-icon flex flex-col items-center gap-2 w-[96px] p-3 rounded-xl bg-transparent border border-transparent cursor-pointer transition-all duration-200 hover:bg-white/5 hover:border-white/10 hover:backdrop-blur-sm active:bg-primary/10 active:border-primary/20 focus:bg-primary/10 focus:border-primary/20 group"
        @click="openExperience">
        <div
          class="relative w-14 h-14 flex items-center justify-center text-primary drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_12px_24px_rgba(59,130,246,0.3)]">
          <svg class="w-full h-full stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" class="fill-background-elevated/50"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <span
          class="font-sans text-[13px] font-medium text-text-base text-center shadow-black drop-shadow-md leading-tight max-w-full overflow-hidden text-ellipsis line-clamp-2 group-hover:text-primary-light transition-colors">{{
            t('taskbar.experience') }}</span>
      </button>

      <!-- Contact -->
      <button
        class="desktop-icon flex flex-col items-center gap-2 w-[96px] p-3 rounded-xl bg-transparent border border-transparent cursor-pointer transition-all duration-200 hover:bg-white/5 hover:border-white/10 hover:backdrop-blur-sm active:bg-primary/10 active:border-primary/20 focus:bg-primary/10 focus:border-primary/20 group"
        @click="openContact">
        <div
          class="relative w-14 h-14 flex items-center justify-center text-primary drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_12px_24px_rgba(59,130,246,0.3)]">
          <svg class="w-full h-full stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              class="fill-background-elevated/50"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <span
          class="font-sans text-[13px] font-medium text-text-base text-center shadow-black drop-shadow-md leading-tight max-w-full overflow-hidden text-ellipsis line-clamp-2 group-hover:text-primary-light transition-colors">{{
            t('taskbar.contact') }}</span>
      </button>

      <!-- Education Shortcut -->
      <button
        class="desktop-icon flex flex-col items-center gap-2 w-[96px] p-3 rounded-xl bg-transparent border border-transparent cursor-pointer transition-all duration-200 hover:bg-white/5 hover:border-white/10 hover:backdrop-blur-sm active:bg-primary/10 active:border-primary/20 focus:bg-primary/10 focus:border-primary/20 group"
        @click="openEducation">
        <div
          class="relative w-14 h-14 flex items-center justify-center text-primary drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_12px_24px_rgba(59,130,246,0.3)]">
          <svg class="w-full h-full stroke-[1.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" class="fill-background-elevated/50"></path>
            <path d="M6 12v5c3 0 6-1 6-1v-7"></path>
          </svg>
        </div>
        <span
          class="font-sans text-[13px] font-medium text-text-base text-center shadow-black drop-shadow-md leading-tight max-w-full overflow-hidden text-ellipsis line-clamp-2 group-hover:text-primary-light transition-colors">{{
            t('startMenu.education') }}</span>
      </button>
    </div>

    <!-- Desktop Widget (Profile) -->
    <div
      class="absolute top-10 right-10 w-[300px] max-md:top-auto max-md:bottom-[100px] max-md:right-1/2 max-md:translate-x-1/2 max-md:w-[90%]">
      <div
        class="flex items-center gap-4 p-4 bg-background-elevated/60 backdrop-blur-md border border-primary/20 animate-[slideIn_0.6s_ease-out] rounded-xl shadow-glass">
        <img src="/src/assets/images/profile-picture.jpg" alt="Profile"
          class="w-[60px] h-[60px] rounded-full border-2 border-primary object-cover" />
        <div class="flex-1">
          <h2 class="font-display text-base text-text-base m-0">{{ t('hero.title') }}</h2>
          <p class="font-sans text-xs text-text-secondary mt-1">{{ t('about.role') }}</p>
        </div>
      </div>
    </div>

    <!-- Windows Layer -->
    <div class="windows-layer">
      <TransitionGroup name="window-minimize">
        <DesktopWindow v-for="win in windowsStore.openWindows" :key="win.id" :id="win.id" :title="win.title"
          :initial-x="win.position.x" :initial-y="win.position.y" :initial-width="win.size.width"
          :initial-height="win.size.height" :z-index="win.zIndex" :is-active="windowsStore.activeWindowId === win.id"
          :is-maximized="win.isMaximized" v-show="!win.isMinimized">
          <template #icon v-if="win.icon">
            <div v-html="win.icon" class="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
            </div>
          </template>
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
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.desktop-icon {
  animation: slideInLeft 0.5s ease-out backwards;
}

.desktop-icon:nth-child(1) {
  animation-delay: 0.1s;
}

.desktop-icon:nth-child(2) {
  animation-delay: 0.2s;
}

.desktop-icon:nth-child(3) {
  animation-delay: 0.3s;
}

.desktop-icon:nth-child(4) {
  animation-delay: 0.4s;
}

.desktop-icon:nth-child(5) {
  animation-delay: 0.5s;
}

.desktop-icon:nth-child(6) {
  animation-delay: 0.6s;
}
</style>
