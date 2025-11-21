<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const projects = computed(() => [
  {
    id: 1,
    title: t('projects.items.item1.title'),
    description: t('projects.items.item1.description'),
    tech: ['Vue 3', 'Node.js', 'MongoDB'],
    image: 'https://placehold.co/600x400/002010/00ff88?text=E-Commerce',
    link: '#'
  },
  {
    id: 2,
    title: t('projects.items.item2.title'),
    description: t('projects.items.item2.description'),
    tech: ['React', 'Firebase', 'Tailwind'],
    image: 'https://placehold.co/600x400/002010/00ff88?text=Task+App',
    link: '#'
  },
  {
    id: 3,
    title: t('projects.items.item3.title'),
    description: t('projects.items.item3.description'),
    tech: ['TypeScript', 'OpenWeather API', 'Chart.js'],
    image: 'https://placehold.co/600x400/002010/00ff88?text=Weather',
    link: '#'
  },
  {
    id: 4,
    title: t('projects.items.item4.title'),
    description: t('projects.items.item4.description'),
    tech: ['Vue 3', 'TypeScript', 'Tailwind v4'],
    image: 'https://placehold.co/600x400/002010/00ff88?text=Portfolio',
    link: '#'
  }
])
</script>

<template>
  <div class="app-container">
    <div class="header">
      <h1 class="page-title">{{ t('startMenu.projects') }}</h1>
      <p class="page-subtitle">{{ t('projects.subtitle') }}</p>
    </div>

    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="card-image-container">
          <img :src="project.image" :alt="project.title" class="card-image" />
          <div class="card-overlay">
            <a :href="project.link" class="view-btn">{{ t('projects.viewProject') }}</a>
          </div>
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ project.title }}</h3>
          <p class="card-description">{{ project.description }}</p>
          <div class="card-tags">
            <span v-for="tech in project.tech" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
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

.header {
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
  padding-bottom: 16px;
}

.page-title {
  font-family: var(--font-display);
  font-size: 24px;
  color: #00ff88;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #7fa77f;
  margin: 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.project-card {
  background: rgba(0, 20, 10, 0.6);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 255, 136, 0.5);
  box-shadow: 0 8px 24px rgba(0, 255, 136, 0.15);
}

.card-image-container {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .card-image {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .card-overlay {
  opacity: 1;
}

.view-btn {
  padding: 8px 16px;
  background: #00ff88;
  color: #0a0f0a;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  font-size: 14px;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.project-card:hover .view-btn {
  transform: translateY(0);
}

.card-content {
  padding: 16px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 16px;
  color: #e0e8e0;
  margin: 0 0 8px 0;
}

.card-description {
  font-size: 13px;
  color: #a0b0a0;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  font-size: 11px;
  padding: 2px 8px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 12px;
  color: #00ff88;
}
</style>
