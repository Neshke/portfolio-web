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
  <div class="relative">
    <button @click="toggleDropdown"
      class="flex items-center gap-1.5 px-3 py-2 bg-transparent border border-transparent rounded-lg text-text-base cursor-pointer transition-all duration-200 font-sans text-sm hover:bg-primary/10 hover:border-primary/30 hover:shadow-glow-sm active:scale-95"
      :class="{ 'bg-primary/15 border-primary/40': isDropdownOpen }" title="Select Language">
      <svg class="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
      <span class="text-[11px] font-semibold text-primary">{{ currentLanguage === 'en' ? 'EN' : 'СР' }}</span>
      <svg class="w-3.5 h-3.5 text-text-secondary transition-transform duration-200" viewBox="0 0 24 24"
        fill="currentColor" :class="{ 'rotate-180': isDropdownOpen }">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>

    <transition enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      :enter-from-class="props.direction === 'up' ? 'opacity-0 translate-y-2.5' : 'opacity-0 -translate-y-2.5'"
      :leave-to-class="props.direction === 'up' ? 'opacity-0 translate-y-1' : 'opacity-0 -translate-y-1'">
      <div v-if="isDropdownOpen"
        class="absolute right-0 min-w-40 bg-background-elevated/98 backdrop-blur-2xl border border-primary/30 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] shadow-primary/20 overflow-hidden z-100"
        :class="props.direction === 'up' ? 'bottom-[calc(100%+12px)]' : 'top-[calc(100%+12px)]'">
        <button v-for="lang in languages" :key="lang.code" @click="selectLanguage(lang.code)"
          class="flex items-center gap-3 w-full px-4 py-3 bg-transparent border-none text-text-base cursor-pointer transition-all duration-200 font-sans text-left hover:bg-primary/10 border-b border-primary/10 last:border-b-0"
          :class="{ 'bg-primary/15': currentLanguage === lang.code }">
          <span class="text-xs font-bold text-primary font-mono min-w-6">{{ lang.code.toUpperCase() }}</span>
          <span class="flex-1 text-sm font-medium text-text-base">{{ lang.name }}</span>
          <svg v-if="currentLanguage === lang.code" class="w-[18px] h-[18px] text-primary shrink-0" viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>
