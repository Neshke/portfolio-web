import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { StartMenuData } from '@/models/StartMenu/interfaces'

export const useStartMenuStore = defineStore('startMenu', () => {
  // State
  const isOpen = ref(false)
  const menuData = ref<StartMenuData | null>(null)
  const activeApp = ref<string | null>(null)

  // Getters
  const hasMenuData = computed(() => menuData.value !== null)
  const currentTitle = computed(() => menuData.value?.title || '')
  const currentDescription = computed(() => menuData.value?.description || '')
  const menuItems = computed(() => menuData.value?.items || [])

  // Actions
  function openMenu(data: StartMenuData) {
    menuData.value = data
    activeApp.value = data.app
    isOpen.value = true
  }

  function closeMenu() {
    isOpen.value = false
    // Delay clearing data for exit animation
    setTimeout(() => {
      if (!isOpen.value) {
        menuData.value = null
        activeApp.value = null
      }
    }, 300)
  }

  function toggleMenu(data?: StartMenuData) {
    if (isOpen.value && activeApp.value === data?.app) {
      closeMenu()
    } else if (data) {
      openMenu(data)
    } else {
      closeMenu()
    }
  }

  return {
    // State
    isOpen,
    menuData,
    activeApp,
    // Getters
    hasMenuData,
    currentTitle,
    currentDescription,
    menuItems,
    // Actions
    openMenu,
    closeMenu,
    toggleMenu,
  }
})
