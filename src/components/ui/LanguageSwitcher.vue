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
    <button @click="toggleDropdown" class="switcher-button" :class="{ 'switcher-button-active': isDropdownOpen }"
      title="Select Language">
      <svg class="globe-icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
      <span class="lang-code">{{ currentLanguage === 'en' ? 'EN' : 'СР' }}</span>
      <svg class="chevron-icon" :class="{ 'chevron-rotated': isDropdownOpen }" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>

    <transition enter-active-class="dropdown-enter-active" leave-active-class="dropdown-leave-active"
      :enter-from-class="props.direction === 'up' ? 'dropdown-enter-from-up' : 'dropdown-enter-from-down'"
      :leave-to-class="props.direction === 'up' ? 'dropdown-leave-to-up' : 'dropdown-leave-to-down'">
      <div v-if="isDropdownOpen" class="dropdown" :class="props.direction === 'up' ? 'dropdown-up' : 'dropdown-down'">
        <button v-for="lang in languages" :key="lang.code" @click="selectLanguage(lang.code)" class="dropdown-item"
          :class="{ 'dropdown-item-active': currentLanguage === lang.code }">
          <span class="item-code">{{ lang.code.toUpperCase() }}</span>
          <span class="item-name">{{ lang.name }}</span>
          <svg v-if="currentLanguage === lang.code" class="check-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.language-switcher {
  @apply relative;
}

/* Switcher Button */
.switcher-button {
  @apply flex items-center gap-1.5 px-3 py-2;
  @apply bg-transparent border border-transparent rounded-lg;
  @apply text-text-base cursor-pointer;
  @apply transition-all duration-200 font-sans text-sm;
  @apply hover:bg-primary/10 hover:border-primary/30 hover:shadow-glow-sm;
  @apply active:scale-95;
}

.switcher-button-active {
  @apply bg-primary/15 border-primary/40;
}

.globe-icon {
  @apply w-4 h-4 text-text-secondary;
}

.lang-code {
  @apply text-[11px] font-semibold text-primary;
}

.chevron-icon {
  @apply w-3.5 h-3.5 text-text-secondary transition-transform duration-200;
}

.chevron-rotated {
  @apply rotate-180;
}

/* Dropdown Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  @apply transition-all duration-200;
}

.dropdown-enter-active {
  @apply ease-out;
}

.dropdown-leave-active {
  @apply ease-in;
}

.dropdown-enter-from-up,
.dropdown-leave-to-up {
  @apply opacity-0 translate-y-2.5;
}

.dropdown-enter-from-down,
.dropdown-leave-to-down {
  @apply opacity-0 -translate-y-2.5;
}

.dropdown-leave-to-up {
  @apply opacity-0 translate-y-1;
}

.dropdown-leave-to-down {
  @apply opacity-0 -translate-y-1;
}

/* Dropdown */
.dropdown {
  @apply absolute right-0 min-w-40;
  @apply bg-background-elevated/98 backdrop-blur-2xl;
  @apply border border-primary/30 rounded-xl;
  @apply shadow-primary/20 overflow-hidden z-9999;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
}

.dropdown-up {
  @apply bottom-[calc(100%+12px)];
}

.dropdown-down {
  @apply top-[calc(100%+12px)];
}

/* Dropdown Item */
.dropdown-item {
  @apply flex items-center gap-3 w-full px-4 py-3;
  @apply bg-transparent border-none text-text-base cursor-pointer;
  @apply transition-all duration-200 font-sans text-left;
  @apply hover:bg-primary/10;
  @apply border-b border-primary/10 last:border-b-0;
}

.dropdown-item-active {
  @apply bg-primary/15;
}

.item-code {
  @apply text-xs font-bold text-primary font-mono min-w-6;
}

.item-name {
  @apply flex-1 text-sm font-medium text-text-base;
}

.check-icon {
  @apply w-[18px] h-[18px] text-primary shrink-0;
}
</style>
