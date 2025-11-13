# Portfolio Web

Vue 3 + TypeScript portfolio website with **Matrix-Windows Theme** - a unique blend of Matrix cyberpunk aesthetics and Windows 11 minimalism.

## 🎨 Theme Overview

This project features a custom **Matrix-Windows** design system that combines:

- 🟢 **Matrix Cyberpunk** - Neon green accents, terminal-inspired dark backgrounds, and code aesthetics
- 🪟 **Windows Minimalism** - Clean glassmorphism effects, modern UI patterns, and professional design
- ✨ **Glow Effects** - Smooth animations and neon glow effects for interactive elements
- 🎭 **Glassmorphism** - Windows 11-inspired glass panels with backdrop blur

👉 **[View Theme Documentation →](./THEME.md)** for complete color palette, components, and usage examples.

---

## 🚀 Technologies

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Type-safe development
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Custom Matrix-Windows theme configuration
- **@vueuse/core** - Collection of Vue Composition Utilities
- **Vitest** - Unit testing framework
- **Prettier** - Code formatter

---

## 📁 Project Structure

```
src/
├── api/              # API client and endpoint definitions
├── assets/           # Static resources (CSS with Matrix-Windows theme)
│   └── main.css      # Custom Tailwind components and utilities
├── components/       # Reusable Vue components
├── composables/      # Composition functions
├── constants/        # Application constants
├── layouts/          # Layout components
├── router/           # Vue Router configuration
├── services/         # Business logic services
├── store/            # Pinia store definitions
├── views/            # View components (route components)
│   └── HomeView.vue  # Theme showcase and demo
├── App.vue           # Root component
├── main.ts           # Entry point
└── env.d.ts          # TypeScript declarations for env variables
```

---

## 🛠️ Setup & Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Server will start at `http://localhost:5173` (or next available port)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🧪 Testing

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run
```

---

## 💅 Code Formatting

```bash
# Format all files
npm run format

# Check if code is formatted
npm run format:check
```

**Prettier configuration:**

- No semicolons
- Single quotes
- 100 character print width
- 2 space indentation

---

## 🌍 Environment Variables

The project supports different environment files:

- `.env.local` - Local development (gitignored)
- `.env.staging` - Staging environment
- `.env.production` - Production environment

**Note:** All client-side env variables must be prefixed with `VITE_`

---

## 🎨 Theme Usage

### Quick Start with Matrix-Windows Components

```vue
<template>
  <!-- Glass Card with hover glow -->
  <div class="glass-card p-6">
    <h2 class="text-glow font-display">Matrix Style Heading</h2>
    <p class="text-muted">Clean Windows-inspired content</p>
  </div>

  <!-- Matrix Buttons -->
  <button class="btn-matrix-solid">Primary Action</button>
  <button class="btn-matrix">Secondary Action</button>

  <!-- Badge/Tags -->
  <span class="badge-matrix">Vue 3</span>
  <span class="badge-matrix">TypeScript</span>
</template>
```

### Color Palette Examples

```vue
<template>
  <!-- Backgrounds -->
  <div class="bg-background">Dark Matrix terminal background</div>
  <div class="bg-background-elevated">Elevated surface</div>

  <!-- Text Colors -->
  <p class="text-primary">Matrix neon green</p>
  <p class="text-secondary">Windows gray-blue</p>
  <p class="text-muted">Muted text</p>

  <!-- Glass Effects -->
  <div class="bg-glass backdrop-blur-glass border border-glass-border">
    Windows glassmorphism
  </div>
</template>
```

### Glow Effects

```vue
<template>
  <!-- Text Glow -->
  <h1 class="text-glow">Subtle neon glow</h1>
  <h1 class="text-glow-strong">Strong Matrix glow</h1>

  <!-- Box Shadow Glow -->
  <div class="shadow-glow">Glowing container</div>
  <div class="shadow-glow-lg hover:shadow-glow-xl">Hover for more glow</div>
</template>
```

**📖 For complete documentation, see [THEME.md](./THEME.md)**

---

## 🎯 Theme Features

- ✅ **Rich Color Palette** - Matrix greens + Windows grays
- ✅ **Glassmorphism Components** - Glass cards, panels, and windows
- ✅ **Glow Effects** - Multiple intensity levels for hover and active states
- ✅ **Custom Animations** - Pulse, flicker, float, and shimmer effects
- ✅ **Typography** - Orbitron (display), Inter (UI), JetBrains Mono (code)
- ✅ **Background Gradients** - Matrix-inspired hero and terminal backgrounds
- ✅ **Utility Classes** - Pre-built components for rapid development

---

## 📚 Key Files

### Theme Configuration

- **`src/assets/main.css`** - Tailwind v4 CSS-based theme with `@theme` directive, custom components, and animations
- **No JS/TS config needed** - Tailwind v4 uses pure CSS configuration

### Font Setup

Theme uses Google Fonts CDN (imported in `main.css`):

- **Orbitron** - Futuristic display font for headings
- **Inter** - Clean sans-serif for body text
- **JetBrains Mono** - Monospace font for code snippets

---

## 🖥️ Recommended IDE Setup

- **[VS Code](https://code.visualstudio.com/)**
- **[Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)** extension
- **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)** extension

---

## 📝 Development Guidelines

### Component Structure

```vue
<script setup lang="ts">
// Imports and logic
</script>

<template>
  <!-- Template with Tailwind classes -->
</template>

<style scoped>
/* Scoped styles using @apply */
.custom-class {
  @apply bg-glass backdrop-blur-glass;
}
</style>
```

### Styling Best Practices

1. **Use Tailwind utilities** inside `@apply` in `<style scoped>` blocks
2. **Semantic class names** for component-specific styles
3. **Leverage theme colors** from `tailwind.config.ts`
4. **Apply glow effects sparingly** - balance visual impact with usability

### TypeScript

- ✅ Strict mode enabled
- ✅ Use `defineProps<T>()` and `defineEmits<T>()`
- ✅ Path alias `@/` for imports from `src/`

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

---

## 📄 License

Private project - All rights reserved.

---

**Built with 🟢 Matrix code and ✨ Windows polish**
