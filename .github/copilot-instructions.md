# Copilot Instructions for Portfolio Web

## Project Overview

This is a Vue 3 + TypeScript portfolio website built with Vite. The project follows a clean architecture pattern with a focus on maintainability and scalability.

## Tech Stack

### Core
- **Vue 3** (^3.5.22) - Composition API with `<script setup>` syntax
- **TypeScript** (configured with strict mode)
- **Vite** (^7.1.11) - Build tool and dev server
- **Pinia** (^3.0.4) - State management
- **Vue Router** (^4.6.3) - Client-side routing

### Styling
- **Tailwind CSS** (^4.1.17) - Utility-first CSS framework
- **PostCSS** (^8.5.6) + **Autoprefixer** (^10.4.22)

### Utilities & Composition
- **@vueuse/core** (^14.0.0) - Collection of essential Vue Composition Utilities

### Testing
- **Vitest** - Unit testing framework
- **@vue/test-utils** - Vue component testing utilities
- **jsdom** - DOM implementation for testing
- **@vitest/ui** - Vitest UI for visual test running

### Development Tools
- **Prettier** - Code formatting (configured in `prettier.config.js`)
- **Vue DevTools** - Vite plugin for Vue DevTools integration

## Project Structure

```
src/
├── api/              # API client and endpoint definitions
│   └── index.ts
├── assets/           # Static resources (CSS, images, fonts)
│   └── main.css      # Tailwind CSS imports
├── components/       # Reusable Vue components
├── composables/      # Composition functions (Vue composables)
│   └── useDateTime.ts
├── constants/        # Application constants and enums
│   └── constants.ts
├── layouts/          # Layout components (e.g., DefaultLayout, AdminLayout)
├── router/           # Vue Router configuration
│   └── index.ts      # Router setup with route definitions
├── services/         # Business logic and service layer
│   └── index.ts
├── store/            # Pinia store definitions
│   └── index.ts
├── views/            # Page/View components (route components)
│   └── HomeView.vue
├── App.vue           # Root component with <router-view />
├── main.ts           # Application entry point
└── env.d.ts          # TypeScript declarations for env variables
```

## Coding Guidelines

### Vue Components

1. **Always use Composition API with `<script setup lang="ts">`**
   ```vue
   <script setup lang="ts">
   import { ref, computed } from 'vue'
   
   const count = ref(0)
   const doubled = computed(() => count.value * 2)
   </script>
   ```

2. **Component Structure Order:**
   - `<script setup lang="ts">` (top)
   - `<template>` (middle)
   - `<style scoped>` (bottom)

3. **Use TypeScript for type safety:**
   - Define prop types using `defineProps<T>()`
   - Define emit types using `defineEmits<T>()`
   - Create interfaces/types in separate files when reused

4. **Component Naming:**
   - PascalCase for component files (e.g., `UserProfile.vue`)
   - Multi-word component names (avoid single-word like `User.vue`)

### TypeScript

1. **Strict mode is enabled** - all code must be type-safe
2. **Use interfaces over types** for object shapes
3. **Path aliases:** Use `@/` for imports from `src/` directory
   ```typescript
   import { something } from '@/composables/useSomething'
   ```

### Styling

1. **Use Tailwind CSS with `@apply` directive** inside `<style scoped>` blocks instead of utility classes directly in templates
   ```vue
   <template>
     <div class="card">
       <h1 class="card-title">Title</h1>
     </div>
   </template>
   
   <style scoped>
   .card {
     @apply bg-white rounded-lg shadow-md p-6;
   }
   
   .card-title {
     @apply text-2xl font-bold text-gray-800;
   }
   </style>
   ```
2. **Benefits of this approach:**
   - Cleaner templates with semantic class names
   - Better component encapsulation
   - Easier to maintain and understand component styles
   - Scoped styles prevent style leakage
3. **Follow mobile-first responsive design** with Tailwind's responsive prefixes in `@apply`
   ```css
   .responsive-element {
     @apply text-sm md:text-base lg:text-lg;
   }
   ```

### State Management (Pinia)

1. **Store structure:**
   ```typescript
   import { defineStore } from 'pinia'
   
   export const useMyStore = defineStore('myStore', () => {
     // State (refs)
     const count = ref(0)
     
     // Getters (computed)
     const doubled = computed(() => count.value * 2)
     
     // Actions (functions)
     function increment() {
       count.value++
     }
     
     return { count, doubled, increment }
   })
   ```

2. **Store naming:** Use `use` prefix (e.g., `useUserStore`, `useCartStore`)
3. **Place stores in** `src/store/` directory

### Routing

1. **Route definitions** in `src/router/index.ts`
2. **Lazy loading for views:**
   ```typescript
   {
     path: '/about',
     name: 'about',
     component: () => import('@/views/AboutView.vue')
   }
   ```
3. **Use named routes** for navigation
4. **Route guards** should be defined in the router file

### Composables

1. **Naming:** Use `use` prefix (e.g., `useDateTime`, `useFetch`)
2. **Keep composables focused** - single responsibility
3. **Return reactive values** and functions that operate on them
4. **Leverage @vueuse/core** for common patterns before creating custom composables

### API Layer

1. **API calls** should be in `src/api/` directory
2. **Services** in `src/services/` handle business logic
3. **Keep API layer separate** from components
4. **Use TypeScript interfaces** for request/response types

### Environment Variables

1. **Prefix with `VITE_`** for client-side access
2. **Define types** in `src/env.d.ts`
3. **Use environment files:**
   - `.env.local` - local development (gitignored)
   - `.env.staging` - staging environment
   - `.env.production` - production environment

### Testing

1. **Place tests** next to the files they test or in `__tests__` directories
2. **Naming convention:** `*.spec.ts` or `*.test.ts`
3. **Run tests:** `npm run test`
4. **Visual test UI:** `npm run test:ui`

### Code Formatting

1. **Prettier is configured** - format before committing
2. **Format command:** `npm run format`
3. **Check formatting:** `npm run format:check`
4. **Settings:**
   - No semicolons
   - Single quotes
   - 100 character print width
   - 2 space indentation

## Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run tests in watch mode
npm run test:ui          # Run tests with UI
npm run test:run         # Run tests once

# Code Quality
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted
```

## Best Practices

1. **Keep components small and focused** - extract logic to composables
2. **Use TypeScript strictly** - avoid `any` types
3. **Leverage Tailwind** - minimize custom CSS
4. **Test important logic** - especially composables and services
5. **Use semantic HTML** - maintain accessibility
6. **Follow Vue 3 best practices** - avoid Vue 2 patterns
7. **Code should be self-documenting** - clear naming over comments
8. **Handle errors gracefully** - user-friendly error messages
9. **Optimize performance** - lazy loading, code splitting
10. **Keep dependencies updated** - security and features

## When Making Changes

1. **Always check types** - TypeScript errors must be resolved
2. **Format code** after changes
3. **Run tests** if modifying tested code
4. **Use path aliases** (`@/`) for imports
5. **Follow existing patterns** in the codebase
6. **Keep the structure clean** - files in appropriate directories
7. **Update this document** if adding new patterns or conventions
