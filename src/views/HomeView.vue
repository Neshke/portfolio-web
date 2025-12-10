<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useWindowsStore } from '@/store/windows'
import TaskbarWrapper from '@/components/desktop/taskbar/TaskbarWrapper.vue'
import StartMenu from '@/components/desktop/StartMenu.vue'
import DesktopWindow from '@/components/desktop/DesktopWindow.vue'
import ExplorerContent from '@/components/ui/ExplorerContent.vue'
import AboutApp from '@/components/apps/about/AboutApp.vue'
import ProjectsApp from '@/components/apps/projects/ProjectsApp.vue'
import ExperienceApp from '@/components/apps/experience/ExperienceApp.vue'
import ContactApp from '@/components/apps/contact/ContactApp.vue'
import EducationApp from '@/components/apps/education/EducationApp.vue'
import MatrixBackground from '@/components/desktop/MatrixBackground.vue'
import IconComputer from '@/assets/icons/IconComputer.vue'
import IconFolder from '@/assets/icons/IconFolder.vue'
import IconBriefcase from '@/assets/icons/IconBriefcase.vue'
import IconMail from '@/assets/icons/IconMail.vue'
import IconGraduation from '@/assets/icons/IconGraduation.vue'
import { appsConfig } from '@/data/apps'

const { t } = useI18n()
const windowsStore = useWindowsStore()

const openApp = (appId: string) => {
  const config = appsConfig.find(app => app.id === appId)
  if (config) {
    windowsStore.openWindow(config.id, t(config.titleKey), config.componentName, {}, config.icon)
  }
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

const desktopIcons = {
  computer: IconComputer,
  folder: IconFolder,
  briefcase: IconBriefcase,
  mail: IconMail,
  graduation: IconGraduation
}
</script>

<template>
  <div class="home-view">
    <!-- Desktop Background -->
    <MatrixBackground />

    <!-- Desktop Icons Grid -->
    <div class="desktop-icons-grid">
      <!-- Desktop Icons from Config -->
      <button v-for="app in appsConfig" :key="app.id" class="desktop-icon group" @click="openApp(app.id)">
        <div class="icon-wrapper">
          <component :is="desktopIcons[app.icon]" class="icon" />
        </div>
        <span class="icon-label">{{ t(app.titleKey) }}</span>
      </button>
    </div>

    <!-- Desktop Widget (Profile) -->
    <div class="profile-widget-wrapper">
      <div class="profile-widget">
        <img src="/src/assets/images/profile-picture.jpg" alt="Profile" class="profile-image" />
        <div class="profile-info">
          <h2 class="profile-name">{{ t('hero.title') }}</h2>
          <p class="profile-role">{{ t('about.role') }}</p>
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
          <template #icon v-if="win.icon && desktopIcons[win.icon]">
            <component :is="desktopIcons[win.icon]" class="window-icon" />
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
@reference "@/assets/main.css";

.home-view {
  @apply h-full w-full overflow-hidden relative select-none;
}

/* Desktop Icons Grid */
.desktop-icons-grid {
  @apply flex flex-col flex-wrap content-start gap-4 p-6;
  @apply h-[calc(100%-60px)] w-full max-w-[400px];
  @apply max-md:flex-row max-md:content-start max-md:max-w-full max-md:p-4;
}

/* Desktop Icon */
.desktop-icon {
  @apply flex flex-col items-center gap-2 w-24 p-3;
  @apply rounded-xl bg-transparent border border-transparent cursor-pointer;
  @apply transition-all duration-200;
  @apply hover:bg-white/5 hover:border-white/10 hover:backdrop-blur-sm;
  @apply active:bg-primary/10 active:border-primary/20;
  @apply focus:bg-primary/10 focus:border-primary/20;
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

.icon-wrapper {
  @apply relative w-14 h-14 flex items-center justify-center text-primary;
  @apply transition-transform duration-300;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
  @apply group-hover:scale-110;
}

.icon-wrapper:hover {
  filter: drop-shadow(0 12px 24px rgba(59, 130, 246, 0.3));
}

.icon {
  @apply w-full h-full;
  stroke-width: 1.2;
}

.icon-label {
  @apply font-sans text-[13px] font-medium text-text-base text-center;
  @apply leading-tight max-w-full overflow-hidden text-ellipsis line-clamp-2;
  @apply group-hover:text-primary-light transition-colors;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

/* Profile Widget */
.profile-widget-wrapper {
  @apply absolute top-10 right-10 w-[300px];
  @apply max-md:top-auto max-md:bottom-[100px] max-md:right-1/2;
  @apply max-md:translate-x-1/2 max-md:w-[90%];
}

.profile-widget {
  @apply flex items-center gap-4 p-4;
  @apply bg-background-elevated/60 backdrop-blur-md;
  @apply border border-primary/20 rounded-xl shadow-glass;
  animation: slideIn 0.6s ease-out;
}

.profile-image {
  @apply w-[60px] h-[60px] rounded-full border-2 border-primary object-cover;
}

.profile-info {
  @apply flex-1;
}

.profile-name {
  @apply font-display text-base text-text-base m-0;
}

.profile-role {
  @apply font-sans text-xs text-text-secondary mt-1;
}

/* Window Icon */
.window-icon {
  @apply w-full h-full;
}

/* Animations */
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
</style>
