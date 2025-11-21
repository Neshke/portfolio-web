<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const experiences = computed(() => [
  {
    id: 1,
    role: t('experience.items.item1.role'),
    company: t('experience.items.item1.company'),
    period: t('experience.items.item1.period'),
    description: t('experience.items.item1.description')
  },
  {
    id: 2,
    role: t('experience.items.item2.role'),
    company: t('experience.items.item2.company'),
    period: t('experience.items.item2.period'),
    description: t('experience.items.item2.description')
  },
  {
    id: 3,
    role: t('experience.items.item3.role'),
    company: t('experience.items.item3.company'),
    period: t('experience.items.item3.period'),
    description: t('experience.items.item3.description')
  }
])
</script>

<template>
  <div class="app-container">
    <div class="header">
      <h1 class="page-title">{{ t('startMenu.experience') }}</h1>
      <p class="page-subtitle">{{ t('experience.subtitle') }}</p>
    </div>

    <div class="timeline">
      <div v-for="exp in experiences" :key="exp.id" class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="exp-header">
            <h3 class="exp-role">{{ exp.role }}</h3>
            <span class="exp-period">{{ exp.period }}</span>
          </div>
          <h4 class="exp-company">{{ exp.company }}</h4>
          <p class="exp-description">{{ exp.description }}</p>
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
  margin-bottom: 40px;
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

.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #00ff88, rgba(0, 255, 136, 0.1));
}

.timeline-item {
  position: relative;
  padding-left: 32px;
  margin-bottom: 40px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -5px;
  top: 0;
  width: 12px;
  height: 12px;
  background: #0a0f0a;
  border: 2px solid #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  z-index: 1;
}

.timeline-content {
  background: rgba(0, 255, 136, 0.03);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  background: rgba(0, 255, 136, 0.08);
  border-color: rgba(0, 255, 136, 0.3);
  transform: translateX(4px);
}

.timeline-item:hover .timeline-marker {
  background: #00ff88;
  box-shadow: 0 0 15px #00ff88;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
  flex-wrap: wrap;
  gap: 8px;
}

.exp-role {
  font-family: var(--font-display);
  font-size: 18px;
  color: #e0e8e0;
  margin: 0;
}

.exp-period {
  font-size: 12px;
  color: #00ff88;
  background: rgba(0, 255, 136, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.exp-company {
  font-size: 14px;
  color: #7fa77f;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.exp-description {
  font-size: 14px;
  line-height: 1.6;
  color: #c0c8c0;
  margin: 0;
}
</style>
