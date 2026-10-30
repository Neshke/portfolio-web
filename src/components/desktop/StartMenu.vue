<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStartMenuStore } from '@/store/startMenu'
import { useAppIcons } from '@/composables/useAppIcons'
import profilePhoto from '@/assets/images/profile-320.webp'
import type { StartMenuItem } from '@/models/StartMenu/interfaces'

const startMenuStore = useStartMenuStore()
const { t } = useI18n()
const { appIcons } = useAppIcons()
const menuRef = ref<HTMLElement | null>(null)

// Closing the menu without choosing an app sends focus back to the Start button.
// Choosing an app moves focus into its window instead (DesktopWindow does that).
const closeAndReturnFocus = () => {
  startMenuStore.closeMenu()
  nextTick(() => document.querySelector<HTMLElement>('.start-button')?.focus())
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && startMenuStore.isOpen) {
    closeAndReturnFocus()
  }
}

// The menu is a modal dialog over a dimmed desktop, so Tab cycles inside it
const trapTab = (event: KeyboardEvent) => {
  if (event.key !== 'Tab' || !menuRef.value) return
  const items = Array.from(
    menuRef.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
  )
  const first = items[0]
  const last = items[items.length - 1]
  if (!first || !last) return
  const active = document.activeElement
  if (event.shiftKey && (active === first || !menuRef.value.contains(active))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (active === last || !menuRef.value.contains(active))) {
    event.preventDefault()
    first.focus()
  }
}

const runItem = (item: StartMenuItem) => {
  item.action?.()
}

watch(
  () => startMenuStore.isOpen,
  (open) => {
    if (open) {
      nextTick(() => {
        menuRef.value?.querySelector<HTMLElement>('.menu-item')?.focus()
      })
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <transition
    enter-active-class="backdrop-enter-active"
    leave-active-class="backdrop-leave-active"
    enter-from-class="backdrop-enter-from"
    leave-to-class="backdrop-leave-to"
  >
    <div
      v-if="startMenuStore.isOpen"
      class="menu-backdrop"
      aria-hidden="true"
      @click="closeAndReturnFocus"
    ></div>
  </transition>

  <transition
    enter-active-class="menu-enter-active"
    leave-active-class="menu-leave-active"
    enter-from-class="menu-enter-from"
    leave-to-class="menu-leave-to"
  >
    <div
      v-if="startMenuStore.isOpen"
      ref="menuRef"
      class="start-menu"
      role="dialog"
      aria-modal="true"
      :aria-label="t('startMenu.label')"
      @keydown="trapTab"
    >
      <div class="menu-header">
        <img :src="profilePhoto" alt="" class="header-photo" width="44" height="44" />
        <div>
          <p class="menu-title">{{ t('profile.name') }}</p>
          <p class="menu-description">{{ t('profile.role') }}</p>
        </div>
      </div>

      <ul class="menu-items">
        <li v-for="item in startMenuStore.menuItems" :key="item.id">
          <a
            v-if="item.href"
            :href="item.href"
            :download="item.download ? '' : undefined"
            class="menu-item"
            @click="closeAndReturnFocus"
          >
            <span class="item-icon-wrapper" aria-hidden="true">
              <component :is="appIcons[item.icon ?? 'document']" class="item-icon" />
            </span>
            <span class="item-text">
              <span class="item-title">{{ item.title }}</span>
              <span v-if="item.description" class="item-description">{{ item.description }}</span>
            </span>
          </a>
          <button v-else type="button" class="menu-item" @click="runItem(item)">
            <span class="item-icon-wrapper" aria-hidden="true">
              <component :is="appIcons[item.icon ?? 'computer']" class="item-icon" />
            </span>
            <span class="item-text">
              <span class="item-title">{{ item.title }}</span>
              <span v-if="item.description" class="item-description">{{ item.description }}</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
@reference "@/assets/main.css";

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 200ms ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 200ms var(--ease-out-expo),
    transform 280ms var(--ease-out-expo);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

.menu-backdrop {
  @apply fixed inset-0 z-9000;
  background-color: rgb(2 4 11 / 0.55);
}

.start-menu {
  @apply fixed z-9001 flex flex-col overflow-hidden;
  left: 0;
  right: 0;
  bottom: 64px;
  max-height: calc(100dvh - 64px);
  background-color: var(--color-background-elevated);
  border-top: 1px solid var(--color-border-strong);
  box-shadow: 0 -12px 32px rgb(0 0 0 / 0.5);
}

@media (min-width: 768px) {
  .start-menu {
    left: 50%;
    right: auto;
    bottom: 88px;
    width: min(92vw, 520px);
    margin-left: calc(min(92vw, 520px) / -2);
    max-height: calc(100dvh - 120px);
    border: 1px solid var(--color-border-strong);
    border-radius: 14px;
    box-shadow: var(--shadow-window);
  }
}

.menu-header {
  @apply flex items-center gap-3.5 px-5 py-4;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-surface-raised);
}

.header-photo {
  @apply w-11 h-11 rounded-full object-cover shrink-0;
}

.menu-title {
  margin: 0;
  font-family: var(--font-display);
  font-stretch: 115%;
  font-weight: 700;
  font-size: 17px;
  color: var(--color-text-base);
}

.menu-description {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--color-text-muted);
}

.menu-items {
  @apply flex flex-col gap-1 p-2 overflow-y-auto scrollbar-thin list-none m-0;
}

.menu-item {
  @apply flex items-center gap-3.5 w-full px-3 py-2.5 rounded-lg text-left no-underline cursor-pointer;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text-base);
  transition: background-color 120ms ease;
}

.menu-item:hover {
  background-color: var(--color-fill-hover);
}

.menu-item:focus-visible {
  background-color: var(--color-fill-active);
  outline-offset: -2px;
}

.item-icon-wrapper {
  @apply flex items-center justify-center w-10 h-10 rounded-lg shrink-0;
  background-color: var(--color-fill-active);
  color: var(--color-primary);
}

.item-icon {
  @apply w-5 h-5;
}

.item-text {
  @apply flex flex-col gap-0.5 flex-1 min-w-0;
}

.item-title {
  font-size: 15px;
  font-weight: 600;
}

.item-description {
  font-size: 13px;
  color: var(--color-text-muted);
}
</style>
