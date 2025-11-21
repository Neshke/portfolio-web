<script setup lang="ts">
import { defineProps } from 'vue'

interface ExplorerItem {
  id: string
  title: string
  description?: string
  icon?: string
  type: 'app' | 'section' | 'action'
  action?: () => void
}

defineProps<{
  items: ExplorerItem[]
  description?: string
}>()
</script>

<template>
  <div class="explorer-content">
    <p v-if="description" class="explorer-description">{{ description }}</p>

    <div class="explorer-items">
      <button v-for="item in items" :key="item.id" class="explorer-item" @click="item.action ? item.action() : null">
        <div v-if="item.icon" class="explorer-item-icon" v-html="item.icon"></div>
        <div v-else class="explorer-item-icon-placeholder">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div class="explorer-item-content">
          <span class="explorer-item-title">{{ item.title }}</span>
          <span v-if="item.description" class="explorer-item-description">{{ item.description }}</span>
        </div>
        <svg class="explorer-item-arrow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.explorer-content {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.explorer-description {
  font-size: 14px;
  color: #7fa77f;
  font-family: var(--font-sans);
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
}

.explorer-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.explorer-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.1);
  border-radius: 8px;
  color: #e0e8e0;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.explorer-item:hover {
  background: rgba(0, 255, 136, 0.15);
  border-color: rgba(0, 255, 136, 0.3);
  transform: translateX(4px);
}

.explorer-item-icon,
.explorer-item-icon-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 6px;
  color: #00ff88;
  flex-shrink: 0;
}

.explorer-item-icon svg,
.explorer-item-icon-placeholder svg {
  width: 20px;
  height: 20px;
}

.explorer-item-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.explorer-item-title {
  font-size: 14px;
  font-weight: 600;
  color: #e0e8e0;
  font-family: var(--font-sans);
}

.explorer-item-description {
  font-size: 11px;
  color: #7fa77f;
  font-family: var(--font-sans);
}

.explorer-item-arrow {
  width: 16px;
  height: 16px;
  color: #00ff88;
  opacity: 0.6;
  flex-shrink: 0;
}
</style>
