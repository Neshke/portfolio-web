<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const props = withDefaults(defineProps<{
  direction?: 'up' | 'down'
}>(), {
  direction: 'up'
})

const { currentLanguage, languages } = useLanguage()
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectLanguage = (langCode: string) => {
  currentLanguage.value = langCode
  isDropdownOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const dropdown = document.querySelector('.language-switcher')

  if (dropdown && !dropdown.contains(target)) {
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
  <div class="language-switcher">
    <button @click="toggleDropdown" class="taskbar-item tray-item" :class="{ active: isDropdownOpen }"
      title="Select Language">
      <svg class="taskbar-icon-sm" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
      <span class="taskbar-label">{{ currentLanguage === 'en' ? 'EN' : 'СР' }}</span>
      <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor"
        :class="{ 'dropdown-arrow-open': isDropdownOpen }">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>

    <transition :name="`dropdown-${props.direction}`">
      <div v-if="isDropdownOpen" class="language-dropdown" :class="`dropdown-${props.direction}`">
        <button v-for="lang in languages" :key="lang.code" @click="selectLanguage(lang.code)" class="language-option"
          :class="{ active: currentLanguage === lang.code }">
          <span class="language-code">{{ lang.code.toUpperCase() }}</span>
          <span class="language-name">{{ lang.name }}</span>
          <svg v-if="currentLanguage === lang.code" class="check-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.language-switcher {
  position: relative;
}

.taskbar-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #e0e8e0;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-sans);
  font-size: 14px;
}

.taskbar-item:hover {
  background: rgba(0, 255, 136, 0.1);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
}

.taskbar-item.active {
  background: rgba(0, 255, 136, 0.15);
  border-color: rgba(0, 255, 136, 0.4);
}

.taskbar-item:active {
  transform: scale(0.95);
}

.tray-item {
  padding: 8px;
}

.taskbar-icon-sm {
  width: 16px;
  height: 16px;
  color: #9ba9b4;
}

.taskbar-label {
  font-size: 11px;
  font-weight: 600;
  color: #00ff88;
}

.dropdown-arrow {
  width: 14px;
  height: 14px;
  color: #9ba9b4;
  transition: transform 0.2s ease;
}

.dropdown-arrow-open {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  right: 0;
  min-width: 160px;
  background: rgba(17, 26, 17, 0.98);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(0, 255, 136, 0.2);
  overflow: hidden;
  z-index: 100;
}

.dropdown-up {
  bottom: calc(100% + 12px);
}

.dropdown-down {
  top: calc(100% + 12px);
}

.language-option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #e0e8e0;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-sans);
  text-align: left;
}

.language-option:hover {
  background: rgba(0, 255, 136, 0.1);
}

.language-option.active {
  background: rgba(0, 255, 136, 0.15);
}

.language-option:not(:last-child) {
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
}

.language-code {
  font-size: 12px;
  font-weight: 700;
  color: #00ff88;
  font-family: var(--font-mono);
  min-width: 24px;
}

.language-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #e0e8e0;
}

.check-icon {
  width: 18px;
  height: 18px;
  color: #00ff88;
  flex-shrink: 0;
}

/* Dropdown Transition Up */
.dropdown-up-enter-active,
.dropdown-up-leave-active {
  transition: all 0.2s ease;
}

.dropdown-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.dropdown-up-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

/* Dropdown Transition Down */
.dropdown-down-enter-active,
.dropdown-down-leave-active {
  transition: all 0.2s ease;
}

.dropdown-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-down-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
