<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const skills = [
  'Vue.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vite', 'Pinia', 'Git', 'Docker'
]
</script>

<template>
  <div class="app-container">
    <div class="profile-header">
      <img src="/src/assets/images/profile-picture.jpg" alt="Profile" class="profile-image" />
      <div class="profile-info">
        <h1 class="profile-name">{{ t('hero.title') }}</h1>
        <p class="profile-role">{{ t('about.role') }}</p>
        <p class="profile-bio">{{ t('hero.description') }}</p>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">{{ t('startMenu.bio') }}</h2>
      <p class="section-text">
        {{ t('about.bioText') }}
      </p>
    </div>

    <div class="section">
      <h2 class="section-title">{{ t('startMenu.skills') }}</h2>
      <div class="skills-grid">
        <span v-for="skill in skills" :key="skill" class="skill-tag">
          {{ skill }}
        </span>
      </div>
    </div>

    <div class="section">
      <button class="action-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        {{ t('startMenu.resume') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.app-container {
  padding: 24px;
  color: #e0e8e0;
  height: 100%;
  overflow-y: auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #00ff88;
  object-fit: cover;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-family: var(--font-display);
  font-size: 24px;
  color: #00ff88;
  margin: 0 0 4px 0;
}

.profile-role {
  font-size: 16px;
  color: #7fa77f;
  margin: 0 0 12px 0;
}

.profile-bio {
  font-size: 14px;
  line-height: 1.5;
  color: #e0e8e0;
  margin: 0;
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 18px;
  color: #00ff88;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 18px;
  background: #00ff88;
  border-radius: 2px;
}

.section-text {
  font-size: 14px;
  line-height: 1.6;
  color: #c0c8c0;
  margin: 0;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 6px 12px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 20px;
  font-size: 13px;
  color: #00ff88;
  transition: all 0.2s;
}

.skill-tag:hover {
  background: rgba(0, 255, 136, 0.2);
  transform: translateY(-2px);
}

.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #00ff88;
  color: #0a0f0a;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background: #33ff9e;
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
}

.action-button svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 640px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .section-title {
    justify-content: center;
  }

  .section-title::before {
    display: none;
  }
}
</style>
