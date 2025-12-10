<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStartMenuStore } from '@/store/startMenu'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { mobileMenuData } from '@/data/mobileMenu'
import type { StartMenuDataConfig } from '@/models/StartMenu/interfaces'

const { t } = useI18n()
const startMenuStore = useStartMenuStore()
const dateNow = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
let intervalId: number | null = null

onMounted(() => {
  intervalId = window.setInterval(() => {
    dateNow.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})

const toggleMenu = () => {
  // Open About section in Start Menu instead of mobile slide-up menu
  openAbout()
}

const openMenuFromConfig = (config: StartMenuDataConfig) => {
  startMenuStore.toggleMenu({
    app: config.app,
    title: t(config.titleKey),
    description: t(config.descriptionKey),
    items: config.items.map(item => ({
      id: item.id,
      title: t(item.titleKey),
      description: t(item.descriptionKey),
      type: item.type || 'section'
    }))
  })
}

// Start Menu handlers
const openAbout = () => openMenuFromConfig(mobileMenuData.about)
const openProjects = () => openMenuFromConfig(mobileMenuData.projects)
const openExperience = () => openMenuFromConfig(mobileMenuData.experience)
description: t('startMenu.educationDescription'),
  type: 'section',
      },
{
  id: 'certifications',
    title: t('startMenu.certifications'),
      description: t('startMenu.certificationsDescription'),
        type: 'section',
      },
    ],
  })
}

const openContact = () => {
  startMenuStore.toggleMenu({
    app: 'contact',
    title: t('taskbar.contact'),
    description: t('startMenu.contactDescription'),
    items: [
      {
        id: 'email',
        title: t('startMenu.email'),
        description: 'your.email@example.com',
        type: 'action',
      },
      {
        id: 'linkedin',
        title: t('startMenu.linkedin'),
        description: t('startMenu.linkedinDescription'),
        type: 'action',
      },
      {
        id: 'github',
        title: t('startMenu.github'),
        description: t('startMenu.githubDescription'),
        type: 'action',
      },
    ],
  })
}
</script>

<template>
  <!-- Mobile Bottom Navigation -->
  <nav class="fixed bottom-0 left-0 right-0 z-50 p-2 animate-[slideUpFadeMobile_0.6s_ease-out_1s_both]">
    <!-- Bottom Navigation Bar -->
    <div
      class="flex items-center justify-around gap-2 h-16 bg-background-elevated/90 backdrop-blur-2xl border border-primary/20 rounded-3xl px-4 py-2 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] shadow-primary/10">
      <!-- About Button -->
      <button @click="toggleMenu"
        class="flex flex-col items-center justify-center gap-1.5 px-2 py-2 bg-transparent border border-transparent rounded-2xl text-text-base cursor-pointer transition-all duration-300 flex-1 min-w-0 active:scale-95 group"
        :class="{ 'bg-primary/15 border-primary/30 shadow-glow-sm': startMenuStore.activeApp === 'about' }">
        <div class="relative p-1 transition-transform duration-300 group-hover:-translate-y-1">
          <svg class="w-6 h-6 text-primary shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
            <path d="M6 10h12v2H6zm0 4h8v2H6z" />
          </svg>
        </div>
        <span
          class="text-[10px] font-semibold text-text-muted group-hover:text-primary transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-sans tracking-wide">{{
            t('taskbar.about') }}</span>
      </button>

      <!-- Projects -->
      <button @click="openProjects"
        class="flex flex-col items-center justify-center gap-1.5 px-2 py-2 bg-transparent border border-transparent rounded-2xl text-text-base cursor-pointer transition-all duration-300 flex-1 min-w-0 active:scale-95 group"
        :class="{ 'bg-primary/15 border-primary/30 shadow-glow-sm': startMenuStore.activeApp === 'projects' }">
        <div class="relative p-1 transition-transform duration-300 group-hover:-translate-y-1">
          <svg class="w-6 h-6 text-primary shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24"
            fill="currentColor">
            <path
              d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
          </svg>
        </div>
        <span
          class="text-[10px] font-semibold text-text-muted group-hover:text-primary transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-sans tracking-wide">{{
            t('taskbar.projects') }}</span>
      </button>

      <!-- Experience -->
      <button @click="openExperience"
        class="flex flex-col items-center justify-center gap-1.5 px-2 py-2 bg-transparent border border-transparent rounded-2xl text-text-base cursor-pointer transition-all duration-300 flex-1 min-w-0 active:scale-95 group"
        :class="{ 'bg-primary/15 border-primary/30 shadow-glow-sm': startMenuStore.activeApp === 'experience' }">
        <div class="relative p-1 transition-transform duration-300 group-hover:-translate-y-1">
          <DotLottieVue style="width: 24px; height: 24px" autoplay loop
            src="https://lottie.host/bdf6f19c-7c2e-4b33-ad43-866a1456da47/ui3DYKizpT.lottie" />
        </div>
        <span
          class="text-[10px] font-semibold text-text-muted group-hover:text-primary transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-sans tracking-wide">{{
            t('taskbar.experience') }}</span>
      </button>

      <!-- Contact -->
      <button @click="openContact"
        class="flex flex-col items-center justify-center gap-1.5 px-2 py-2 bg-transparent border border-transparent rounded-2xl text-text-base cursor-pointer transition-all duration-300 flex-1 min-w-0 active:scale-95 group"
        :class="{ 'bg-primary/15 border-primary/30 shadow-glow-sm': startMenuStore.activeApp === 'contact' }">
        <div class="relative p-1 transition-transform duration-300 group-hover:-translate-y-1">
          <svg class="w-6 h-6 text-primary shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" viewBox="0 0 24 24"
            fill="currentColor">
            <path
              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </div>
        <span
          class="text-[10px] font-semibold text-text-muted group-hover:text-primary transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-sans tracking-wide">{{
            t('taskbar.contact') }}</span>
      </button>
    </div>
  </nav>
</template>
