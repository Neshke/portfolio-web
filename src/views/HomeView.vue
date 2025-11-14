<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Taskbar from '@/components/Taskbar.vue'

const { t } = useI18n()
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <!-- Matrix Video Background -->
      <video autoplay loop muted playsinline class="hero-video">
        <source src="/matrix-background.mp4" type="video/mp4" />
      </video>
      <div class="hero-overlay"></div>

      <div class="relative z-10 text-center px-4">
        <h1 class="hero-title-animated text-4xl font-display text-glow-strong mb-6 animate-matrix-glow">
          {{ t('hero.title') }}
        </h1>

        <!-- Profile Picture -->
        <div class="hero-image-animated">
          <img src="/src/assets/images/profile-picture.jpg" alt="Profile Picture" class="profile-picture" />
        </div>

        <p class="hero-description-animated text-xl font-sans text-muted mb-8 max-w-2xl mx-auto">
          {{ t('hero.description') }}
        </p>

        <div class="hero-buttons-animated flex gap-4 justify-center flex-wrap">
          <button class="btn-matrix-solid">{{ t('hero.buttons.getStarted') }}</button>
          <button class="btn-matrix">{{ t('hero.buttons.learnMore') }}</button>
        </div>
      </div>

      <!-- Windows Taskbar -->
      <Taskbar />
    </section>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.home {
  min-height: 100vh;
}

/* Hero Section with Video Background */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
  opacity: 0.4;
  filter: hue-rotate(90deg) brightness(1.2);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(to bottom,
      rgb(10 15 10 / 0.4),
      rgb(10 15 10 / 0.3),
      rgb(10 15 10 / 0.6));
  pointer-events: none;
}

/* Hero Animation - Slide Down from Top */
@keyframes slideDownFade {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title-animated {
  animation: slideDownFade 0.8s ease-out 0.2s both;
}

.hero-image-animated {
  animation: slideDownFade 0.8s ease-out 0.35s both;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.profile-picture {
  @apply m-10;
  width: clamp(8rem, 15vw + 8rem, 20rem);
  height: clamp(8rem, 15vw + 8rem, 20rem);
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #00ff88;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.6),
    0 0 60px rgba(0, 255, 136, 0.3),
    inset 0 0 20px rgba(0, 255, 136, 0.1);
  transition: all 0.3s ease;
}

.profile-picture:hover {
  transform: scale(1.05);
  box-shadow: 0 0 40px rgba(0, 255, 136, 0.8),
    0 0 80px rgba(0, 255, 136, 0.4),
    inset 0 0 30px rgba(0, 255, 136, 0.2);
}

.hero-description-animated {
  animation: slideDownFade 0.8s ease-out 0.5s both;
}

.hero-buttons-animated {
  animation: slideDownFade 0.8s ease-out 0.8s both;
}
</style>
