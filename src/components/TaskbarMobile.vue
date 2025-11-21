<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStartMenuStore } from '@/store/startMenu'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

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

// Start Menu handlers
const openAbout = () => {
  startMenuStore.toggleMenu({
    app: 'about',
    title: t('taskbar.about'),
    description: t('startMenu.aboutDescription'),
    items: [
      {
        id: 'bio',
        title: t('startMenu.bio'),
        description: t('startMenu.bioDescription'),
        type: 'section',
      },
      {
        id: 'skills',
        title: t('startMenu.skills'),
        description: t('startMenu.skillsDescription'),
        type: 'section',
      },
      {
        id: 'resume',
        title: t('startMenu.resume'),
        description: t('startMenu.resumeDescription'),
        type: 'action',
      },
    ],
  })
}

const openProjects = () => {
  startMenuStore.toggleMenu({
    app: 'projects',
    title: t('taskbar.projects'),
    description: t('startMenu.projectsDescription'),
    items: [
      {
        id: 'web',
        title: t('startMenu.webProjects'),
        description: t('startMenu.webProjectsDescription'),
        type: 'section',
      },
      {
        id: 'mobile',
        title: t('startMenu.mobileProjects'),
        description: t('startMenu.mobileProjectsDescription'),
        type: 'section',
      },
      {
        id: 'opensource',
        title: t('startMenu.openSource'),
        description: t('startMenu.openSourceDescription'),
        type: 'section',
      },
    ],
  })
}

const openExperience = () => {
  startMenuStore.toggleMenu({
    app: 'experience',
    title: t('taskbar.experience'),
    description: t('startMenu.experienceDescription'),
    items: [
      {
        id: 'work',
        title: t('startMenu.workHistory'),
        description: t('startMenu.workHistoryDescription'),
        type: 'section',
      },
      {
        id: 'education',
        title: t('startMenu.education'),
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
      class="flex items-center justify-around gap-1 h-16 bg-background-elevated/95 backdrop-blur-xl border border-primary/20 rounded-[20px] px-3 py-2 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] shadow-primary/15">
      <!-- About Button -->
      <button @click="toggleMenu"
        class="flex flex-col items-center justify-center gap-1 px-3 py-2 bg-transparent border border-transparent rounded-xl text-text-base cursor-pointer transition-all duration-200 flex-1 min-w-0 active:scale-95"
        :class="{ 'bg-primary/15 border-primary/30': startMenuStore.activeApp === 'about' }">
        <svg class="w-6 h-6 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z" />
          <path d="M6 10h12v2H6zm0 4h8v2H6z" />
        </svg>
        <span
          class="text-[11px] font-semibold text-text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-sans">{{
            t('taskbar.about') }}</span>
      </button>

      <!-- Projects -->
      <button @click="openProjects"
        class="flex flex-col items-center justify-center gap-1 px-3 py-2 bg-transparent border border-transparent rounded-xl text-text-base cursor-pointer transition-all duration-200 flex-1 min-w-0 active:scale-95"
        :class="{ 'bg-primary/15 border-primary/30': startMenuStore.activeApp === 'projects' }">
        <svg class="w-6 h-6 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
        </svg>
        <span
          class="text-[11px] font-semibold text-text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-sans">{{
            t('taskbar.projects') }}</span>
      </button>

      <!-- Experience -->
      <button @click="openExperience"
        class="flex flex-col items-center justify-center gap-1 px-3 py-2 bg-transparent border border-transparent rounded-xl text-text-base cursor-pointer transition-all duration-200 flex-1 min-w-0 active:scale-95"
        :class="{ 'bg-primary/15 border-primary/30': startMenuStore.activeApp === 'experience' }">
        <DotLottieVue style="width: 24px; height: 24px" autoplay loop
          src="https://lottie.host/bdf6f19c-7c2e-4b33-ad43-866a1456da47/ui3DYKizpT.lottie" />
        <span
          class="text-[11px] font-semibold text-text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-sans">{{
            t('taskbar.experience') }}</span>
      </button>

      <!-- Contact -->
      <button @click="openContact"
        class="flex flex-col items-center justify-center gap-1 px-3 py-2 bg-transparent border border-transparent rounded-xl text-text-base cursor-pointer transition-all duration-200 flex-1 min-w-0 active:scale-95"
        :class="{ 'bg-primary/15 border-primary/30': startMenuStore.activeApp === 'contact' }">
        <svg class="w-6 h-6 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span
          class="text-[11px] font-semibold text-text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-full font-sans">{{
            t('taskbar.contact') }}</span>
      </button>
    </div>
  </nav>
</template>
