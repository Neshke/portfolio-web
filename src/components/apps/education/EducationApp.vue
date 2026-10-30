<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { educationEntries } from '@/data/education'

const { t } = useI18n()
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h2 class="page-title">{{ t('education.title') }}</h2>
    </header>

    <ul class="entries">
      <li
        v-for="entry in educationEntries"
        :key="entry.id"
        class="entry"
        :class="{ 'entry-primary': entry.primary }"
      >
        <div class="entry-head">
          <h3 class="entry-title">{{ t(entry.titleKey) }}</h3>
          <p v-if="entry.periodKey" class="entry-period">{{ t(entry.periodKey) }}</p>
        </div>
        <p class="entry-place">{{ t(entry.placeKey) }}</p>
        <p v-if="entry.descriptionKey" class="entry-description">{{ t(entry.descriptionKey) }}</p>
        <p v-if="entry.noteKey" class="entry-description">{{ t(entry.noteKey) }}</p>
      </li>
    </ul>
  </article>
</template>

<style scoped>
@reference "@/assets/main.css";

.entries {
  @apply m-0 p-0 list-none grid gap-7;
}

.entry + .entry {
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.entry-head {
  @apply flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1;
}

.entry-title {
  margin: 0;
  font-family: var(--font-display);
  font-stretch: 110%;
  font-weight: 650;
  font-size: 17px;
  line-height: 1.3;
  color: var(--color-text-base);
}

.entry-primary .entry-title {
  font-stretch: 114%;
  font-weight: 700;
  font-size: 20px;
}

.entry-period {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.entry-place {
  margin: 4px 0 0;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.entry-description {
  margin: 10px 0 0;
  max-width: 68ch;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--color-text-muted);
}
</style>
