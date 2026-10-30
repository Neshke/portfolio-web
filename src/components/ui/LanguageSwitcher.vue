<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const props = withDefaults(
  defineProps<{
    direction?: 'up' | 'down'
  }>(),
  {
    direction: 'up',
  }
)

const { currentLanguage, languages, t } = useLanguage()
const isDropdownOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectLanguage = (langCode: string) => {
  currentLanguage.value = langCode
  isDropdownOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isDropdownOpen.value) {
    event.stopPropagation()
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="rootRef" class="language-switcher" @keydown="handleKeydown">
    <button
      type="button"
      class="switcher-button"
      :class="{ 'switcher-button-active': isDropdownOpen }"
      :aria-label="t('taskbar.language')"
      :aria-expanded="isDropdownOpen"
      aria-haspopup="true"
      :title="t('taskbar.language')"
      @click="toggleDropdown"
    >
      <svg class="globe-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
        />
      </svg>
      <span class="lang-code">{{ currentLanguage.toUpperCase() }}</span>
    </button>

    <transition
      enter-active-class="dropdown-enter-active"
      leave-active-class="dropdown-leave-active"
      :enter-from-class="props.direction === 'up' ? 'dropdown-from-up' : 'dropdown-from-down'"
      :leave-to-class="props.direction === 'up' ? 'dropdown-from-up' : 'dropdown-from-down'"
    >
      <ul
        v-if="isDropdownOpen"
        class="dropdown"
        :class="props.direction === 'up' ? 'dropdown-up' : 'dropdown-down'"
      >
        <li v-for="lang in languages" :key="lang.code">
          <button
            type="button"
            class="dropdown-item"
            :class="{ 'dropdown-item-active': currentLanguage === lang.code }"
            :aria-pressed="currentLanguage === lang.code"
            :lang="lang.code === 'sr' ? 'sr-Latn' : 'en'"
            @click="selectLanguage(lang.code)"
          >
            <span class="item-name">{{ lang.name }}</span>
            <svg
              v-if="currentLanguage === lang.code"
              class="check-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.language-switcher {
  @apply relative;
}

.switcher-button {
  @apply flex items-center gap-1.5 h-11 md:h-10 px-2.5 rounded-lg cursor-pointer;
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text-secondary);
  font: 600 12.5px/1 var(--font-sans);
  transition: background-color 140ms ease;
}

.switcher-button:hover,
.switcher-button-active {
  background-color: var(--color-fill-hover);
  color: var(--color-text-base);
}

.globe-icon {
  @apply w-4 h-4;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 160ms ease,
    transform 200ms var(--ease-out-expo);
}

.dropdown-from-up {
  opacity: 0;
  transform: translateY(6px);
}

.dropdown-from-down {
  opacity: 0;
  transform: translateY(-6px);
}

.dropdown {
  @apply absolute right-0 min-w-40 p-1 m-0 list-none overflow-hidden z-9999;
  background-color: var(--color-background-elevated);
  border: 1px solid var(--color-border-strong);
  border-radius: 10px;
  box-shadow: var(--shadow-window);
}

.dropdown-up {
  bottom: calc(100% + 12px);
}

.dropdown-down {
  top: calc(100% + 12px);
}

.dropdown-item {
  @apply flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-left cursor-pointer;
  border: 0;
  background: transparent;
  color: var(--color-text-base);
  font: 500 14px/1.2 var(--font-sans);
}

.dropdown-item:hover {
  background-color: var(--color-fill-hover);
}

.dropdown-item-active {
  background-color: var(--color-fill-active);
}

.item-name {
  @apply flex-1;
}

.check-icon {
  @apply w-4 h-4 shrink-0;
  color: var(--color-primary);
}
</style>
