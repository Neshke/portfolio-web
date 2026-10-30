<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDebounceFn, useMediaQuery } from '@vueuse/core'
import { useWindowsStore, PHONE_QUERY } from '@/store/windows'
import Taskbar from '@/components/desktop/taskbar/Taskbar.vue'
import StartMenu from '@/components/desktop/StartMenu.vue'
import DesktopWindow from '@/components/desktop/DesktopWindow.vue'
import ProfileWidget from '@/components/desktop/ProfileWidget.vue'
import AboutApp from '@/components/apps/about/AboutApp.vue'
import ProjectsApp from '@/components/apps/projects/ProjectsApp.vue'
import ExperienceApp from '@/components/apps/experience/ExperienceApp.vue'
import ContactApp from '@/components/apps/contact/ContactApp.vue'
import EducationApp from '@/components/apps/education/EducationApp.vue'
import { appsConfig } from '@/data/apps'
import { useAppIcons } from '@/composables/useAppIcons'
import { useWindowRoute } from '@/composables/useWindowRoute'

const { t } = useI18n()
const windowsStore = useWindowsStore()
const { appIcons } = useAppIcons()

const openApp = (appId: string) => {
  const config = appsConfig.find((app) => app.id === appId)
  if (config) {
    windowsStore.openWindow(config.id, config.titleKey, config.componentName, {}, config.icon)
  }
}

useWindowRoute(openApp)

// On phones a window covers the whole screen; the desktop behind it should not be
// reachable by Tab or by a screen reader while it is hidden.
const isPhone = useMediaQuery(PHONE_QUERY)
const desktopHidden = computed(() => isPhone.value && windowsStore.topWindowId !== null)

const fitWindows = useDebounceFn(() => windowsStore.fitWindowsToViewport(), 150)
onMounted(() => window.addEventListener('resize', fitWindows))
onUnmounted(() => window.removeEventListener('resize', fitWindows))

const appComponents = {
  AboutApp,
  ProjectsApp,
  ExperienceApp,
  ContactApp,
  EducationApp,
} as const

const getComponent = (name: string) => appComponents[name as keyof typeof appComponents] ?? 'div'
</script>

<template>
  <div class="home-view">
    <main class="desktop">
      <div class="desktop-area" :inert="desktopHidden || undefined">
        <div class="widget-slot">
          <ProfileWidget @open-app="openApp" />
        </div>

        <nav class="desktop-icons" :aria-label="t('desktop.label')">
          <button
            v-for="(app, index) in appsConfig"
            :key="app.id"
            type="button"
            class="desktop-icon"
            :data-app="app.id"
            :style="{ animationDelay: `${120 + index * 40}ms` }"
            @click="openApp(app.id)"
          >
            <span class="icon-wrapper" aria-hidden="true">
              <component :is="appIcons[app.icon]" class="icon" />
            </span>
            <span class="icon-label">{{ t(app.titleKey) }}</span>
          </button>
        </nav>
      </div>

      <div class="windows-layer">
        <TransitionGroup name="window-minimize">
          <DesktopWindow
            v-for="win in windowsStore.openWindows"
            v-show="!win.isMinimized"
            :id="win.id"
            :key="win.id"
            :title="t(win.titleKey)"
            :initial-x="win.position.x"
            :initial-y="win.position.y"
            :initial-width="win.size.width"
            :initial-height="win.size.height"
            :z-index="win.zIndex"
            :is-active="windowsStore.activeWindowId === win.id"
            :is-maximized="win.isMaximized"
            :is-minimized="win.isMinimized"
          >
            <template v-if="win.icon" #icon>
              <component :is="appIcons[win.icon]" />
            </template>
            <component :is="getComponent(win.component)" v-bind="win.props" @open-app="openApp" />
          </DesktopWindow>
        </TransitionGroup>
      </div>
    </main>

    <Taskbar />
    <StartMenu />
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.home-view {
  @apply h-full w-full overflow-hidden relative;
}

.desktop {
  position: absolute;
  inset: 0;
}

/* Desktop: icon column on the left, the profile widget next to it */
.desktop-area {
  position: absolute;
  inset: 0 0 80px 0;
  display: grid;
  grid-template-columns: 112px minmax(0, 660px);
  grid-template-areas: 'icons widget';
  column-gap: clamp(32px, 5vw, 88px);
  align-items: start;
  padding: 20px 24px;
}

.widget-slot {
  grid-area: widget;
  margin-top: clamp(8px, 7vh, 88px);
}

.desktop-icons {
  grid-area: icons;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.desktop-icon {
  @apply flex flex-col items-center gap-1.5 w-[104px] px-2 py-2.5 rounded-lg no-underline select-none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text-base);
  cursor: pointer;
  transition:
    background-color 140ms ease,
    border-color 140ms ease;
  animation: rise-in 500ms var(--ease-out-expo) both;
}

.desktop-icon:hover {
  background-color: var(--color-fill-hover);
  border-color: var(--color-border);
}

.desktop-icon:focus-visible {
  background-color: var(--color-fill-active);
  border-color: var(--color-border-accent);
  outline: none;
}

.desktop-icon:active {
  background-color: var(--color-fill-active);
}

.icon-wrapper {
  @apply w-12 h-12 flex items-center justify-center;
  color: var(--color-primary);
  filter: drop-shadow(0 4px 10px rgb(0 0 0 / 0.55));
}

.icon {
  @apply w-full h-full;
  stroke-width: 1.3;
}

.icon-label {
  @apply text-center leading-tight max-w-full;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-base);
  text-shadow: 0 1px 3px rgb(0 0 0 / 0.9);
}

/* Phones: the profile comes first, then the icons as a grid, page scrolls */
@media (max-width: 767px) {
  .desktop-area {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    inset: 0 0 64px 0;
    padding: 16px 16px 24px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .widget-slot {
    margin-top: 0;
  }

  .desktop-icons {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2px;
  }

  .desktop-icon {
    width: 100%;
    padding-block: 8px;
  }

  .icon-wrapper {
    width: 40px;
    height: 40px;
  }
}

.windows-layer {
  @apply contents;
}
</style>
