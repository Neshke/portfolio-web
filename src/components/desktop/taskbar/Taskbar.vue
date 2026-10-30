<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStartMenuStore } from '@/store/startMenu'
import { useWindowsStore, type WindowItem } from '@/store/windows'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import IconGithub from '@/assets/icons/IconGithub.vue'
import IconLinkedIn from '@/assets/icons/IconLinkedIn.vue'
import { appsConfig, type AppConfig } from '@/data/apps'
import { contactInfo, cvFile } from '@/data/contact'
import { useAppIcons } from '@/composables/useAppIcons'
import type { StartMenuData } from '@/models/StartMenu/interfaces'

const startMenuStore = useStartMenuStore()
const windowsStore = useWindowsStore()
const { t, locale } = useI18n()
const { appIcons } = useAppIcons()

const now = ref(new Date())
let intervalId: number | null = null

onMounted(() => {
  intervalId = window.setInterval(() => {
    now.value = new Date()
  }, 15000)
})

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId)
})

const intlLocale = computed(() => (locale.value === 'sr' ? 'sr-Latn-RS' : 'en-GB'))
const timeText = computed(() =>
  now.value.toLocaleTimeString(intlLocale.value, { hour: '2-digit', minute: '2-digit' })
)
const dateText = computed(() =>
  now.value.toLocaleDateString(intlLocale.value, { day: 'numeric', month: 'short' })
)

const getStartMenuData = (): StartMenuData => ({
  app: 'start',
  title: t('startMenu.title'),
  items: [
    ...appsConfig.map((app) => ({
      id: app.id,
      title: t(app.titleKey),
      description: t(app.descriptionKey),
      type: 'app' as const,
      icon: app.icon,
      action: () => {
        windowsStore.openWindow(app.id, app.titleKey, app.componentName, {}, app.icon)
        startMenuStore.closeMenu()
      },
    })),
    {
      id: 'cv',
      title: t('desktop.cvFile'),
      description: t('startMenu.descriptions.cv'),
      type: 'action' as const,
      icon: 'document' as const,
      href: cvFile.url,
      download: true,
    },
  ],
})

const toggleStartMenu = () => {
  startMenuStore.toggleMenu(getStartMenuData())
}

watch(locale, () => {
  if (startMenuStore.isOpen && startMenuStore.activeApp === 'start') {
    startMenuStore.openMenu(getStartMenuData())
  }
})

const windowFor = (appId: string): WindowItem | undefined =>
  windowsStore.openWindows.find((win) => win.id === appId)

const isActive = (appId: string) => {
  const win = windowFor(appId)
  return !!win && !win.isMinimized && windowsStore.activeWindowId === appId
}

// Every app is pinned, like a desktop taskbar: open it, bring it forward, or minimize it
const handleTaskbarClick = (app: AppConfig) => {
  const win = windowFor(app.id)
  if (!win) {
    windowsStore.openWindow(app.id, app.titleKey, app.componentName, {}, app.icon)
  } else if (isActive(app.id)) {
    windowsStore.minimizeWindow(app.id)
  } else if (win.isMinimized) {
    windowsStore.openWindow(win.id, win.titleKey, win.component, win.props, win.icon)
  } else {
    windowsStore.focusWindow(app.id)
  }
}
</script>

<template>
  <nav class="taskbar-wrapper" :aria-label="t('taskbar.label')">
    <div class="taskbar">
      <button
        type="button"
        class="start-button"
        :class="{ 'start-button-active': startMenuStore.isOpen }"
        :aria-label="t('taskbar.start')"
        :aria-expanded="startMenuStore.isOpen"
        aria-haspopup="dialog"
        @click="toggleStartMenu"
      >
        <svg class="start-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
      </button>

      <!-- Phones show the apps on the home screen, so here they only appear as a
           window switcher once something is open -->
      <ul
        class="taskbar-apps"
        :class="{ 'taskbar-apps-idle': windowsStore.openWindows.length === 0 }"
        :aria-label="t('taskbar.apps')"
      >
        <li v-for="app in appsConfig" :key="app.id">
          <button
            type="button"
            class="taskbar-app"
            :data-app="app.id"
            :class="{
              'taskbar-app-open': !!windowFor(app.id),
              'taskbar-app-active': isActive(app.id),
            }"
            :aria-label="t(app.titleKey)"
            :aria-pressed="isActive(app.id)"
            :title="t(app.titleKey)"
            @click="handleTaskbarClick(app)"
          >
            <component :is="appIcons[app.icon]" class="app-icon" aria-hidden="true" />
          </button>
        </li>
      </ul>

      <div class="system-tray">
        <a
          :href="contactInfo.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="tray-button tray-button-desktop"
          :aria-label="t('taskbar.github')"
          :title="t('actions.github')"
        >
          <IconGithub class="tray-icon" aria-hidden="true" />
        </a>
        <a
          :href="contactInfo.linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="tray-button tray-button-desktop"
          :aria-label="t('taskbar.linkedin')"
          :title="t('actions.linkedin')"
        >
          <IconLinkedIn class="tray-icon" aria-hidden="true" />
        </a>
        <LanguageSwitcher />
        <time class="clock" :datetime="now.toISOString()">
          <span class="clock-time">{{ timeText }}</span>
          <span class="clock-date">{{ dateText }}</span>
        </time>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@reference "@/assets/main.css";

.taskbar-wrapper {
  @apply absolute bottom-0 left-0 right-0 mx-auto z-9002 flex justify-center;
  @apply w-full max-w-5xl p-0 md:p-2;
}

.taskbar {
  @apply flex items-center gap-1 h-16 w-full px-2;
  background-color: rgb(12 20 38 / 0.94);
  border-top: 1px solid var(--color-border-strong);
  box-shadow: 0 -8px 24px rgb(0 0 0 / 0.35);
}

@supports (backdrop-filter: blur(1px)) {
  .taskbar {
    background-color: rgb(12 20 38 / 0.82);
    backdrop-filter: blur(18px) saturate(140%);
  }
}

@media (min-width: 768px) {
  .taskbar {
    @apply w-auto min-w-[560px] px-3 rounded-xl;
    border: 1px solid var(--color-border-strong);
    box-shadow:
      0 2px 6px rgb(0 0 0 / 0.3),
      0 16px 40px -12px rgb(0 0 0 / 0.7);
  }
}

.start-button {
  @apply flex items-center justify-center w-11 h-11 rounded-lg shrink-0 cursor-pointer;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-primary);
  transition: background-color 140ms ease;
}

.start-button:hover {
  background-color: var(--color-fill-hover);
}

.start-button-active {
  background-color: var(--color-fill-active);
  border-color: var(--color-border-accent);
}

.start-icon {
  @apply w-5 h-5;
}

.taskbar-apps {
  @apply flex items-center gap-1 flex-1 min-w-0 ml-1 overflow-x-auto scrollbar-none list-none m-0 p-0;
}

.taskbar-app {
  @apply relative flex items-center justify-center w-11 h-11 rounded-lg cursor-pointer;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-primary);
  transition: background-color 140ms ease;
}

.taskbar-app:hover {
  background-color: var(--color-fill-hover);
}

.taskbar-app-active {
  background-color: var(--color-fill-hover);
  border-color: var(--color-border);
}

@media (max-width: 767px) {
  .taskbar-apps-idle {
    display: none;
  }
}

/* Running indicator: short and grey for open windows, longer and blue for the active one */
.taskbar-app-open::after {
  content: '';
  @apply absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-1.5 rounded-full;
  background-color: var(--color-text-dim);
}

.taskbar-app-active::after {
  @apply w-4;
  background-color: var(--color-primary);
}

.app-icon {
  @apply w-[22px] h-[22px];
}

.system-tray {
  @apply flex items-center ml-auto shrink-0 gap-0.5 pl-2;
  border-left: 1px solid var(--color-border);
}

.tray-button {
  @apply items-center justify-center w-10 h-10 rounded-lg;
  color: var(--color-text-secondary);
  transition:
    background-color 140ms ease,
    color 140ms ease;
}

.tray-button:hover {
  background-color: var(--color-fill-hover);
  color: var(--color-text-base);
}

.tray-button-desktop {
  @apply hidden md:flex;
}

.tray-icon {
  @apply w-[18px] h-[18px];
}

.clock {
  @apply hidden md:flex flex-col items-end justify-center px-3 whitespace-nowrap leading-tight;
  font-variant-numeric: tabular-nums;
}

.clock-time {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-base);
}

.clock-date {
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>
