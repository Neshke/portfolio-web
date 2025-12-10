# Portfolio Web

A Vue 3 + TypeScript portfolio website designed as a **Desktop Environment Simulation** - combining a Windows 11-inspired interface with a professional dark blue theme.

## 🖥️ Overview

This portfolio presents itself as an interactive desktop operating system where visitors can:

- Click on **desktop icons** to open application windows
- **Drag, resize, minimize, and maximize** windows just like a real OS
- Use the **taskbar** to switch between open applications
- Access the **Start Menu** for navigation
- View a **profile widget** with quick information

## ✨ Features

### Desktop Environment
- **Window Management** - Draggable, resizable windows with minimize/maximize
- **Taskbar** - Shows open windows, system tray with clock and language switcher
- **Start Menu** - Application launcher with navigation options
- **Desktop Icons** - Quick access to portfolio sections
- **Profile Widget** - Glassmorphism card with profile info

### Applications
- 📁 **About** - Personal introduction and skills
- 💼 **Projects** - Portfolio of work and projects
- 🎓 **Education** - Academic background
- 💼 **Experience** - Professional experience
- ✉️ **Contact** - Contact information and form

### UI/UX
- **Dark Professional Theme** - Blue/slate color palette
- **Glassmorphism** - Modern glass effects with backdrop blur
- **Responsive Design** - Desktop and mobile taskbar variants
- **Internationalization** - English and Serbian language support
- **Smooth Animations** - Transitions for windows and interactions

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Vue 3 (Composition API with `<script setup>`) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 (CSS-based config) |
| **State** | Pinia |
| **Routing** | Vue Router |
| **i18n** | vue-i18n (EN/SR) |
| **Utilities** | @vueuse/core |
| **Build** | Vite |
| **Testing** | Vitest |

---

## 📁 Project Structure

```
src/
├── assets/
│   ├── main.css          # Tailwind v4 theme configuration
│   └── images/           # Static images
├── components/
│   ├── apps/             # Application content components
│   │   ├── AboutApp.vue
│   │   ├── ContactApp.vue
│   │   ├── EducationApp.vue
│   │   ├── ExperienceApp.vue
│   │   └── ProjectsApp.vue
│   ├── icons/            # SVG icon components
│   ├── DesktopWindow.vue # Draggable/resizable window
│   ├── StartMenu.vue     # Start menu overlay
│   ├── Taskbar.vue       # Desktop taskbar
│   ├── TaskbarMobile.vue # Mobile bottom navigation
│   └── TaskbarWrapper.vue# Responsive taskbar switcher
├── composables/          # Vue composables
│   ├── useDateTime.ts    # Date/time formatting
│   └── useLanguage.ts    # Language switching
├── data/
│   └── apps.ts           # Application configuration
├── i18n/
│   └── locales/          # Translation files (en.json, sr.json)
├── store/
│   ├── windows.ts        # Window management state
│   └── startMenu.ts      # Start menu state
├── views/
│   └── HomeView.vue      # Desktop environment view
└── main.ts               # App entry point
```

---

## 🛠️ Development

### Prerequisites
- Node.js ^20.19.0 or >=22.12.0

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Server runs at `http://localhost:5173`

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
npm run test        # Watch mode
npm run test:ui     # With UI
npm run test:run    # Single run
```

---

## 💅 Code Formatting

```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

**Prettier config:** No semicolons, single quotes, 100 char width, 2 space indent

---

## 🎨 Theme

The project uses a **Professional Dark Theme** with:

- **Background:** Slate 950 (`#020617`)
- **Primary:** Blue 400 (`#60a5fa`)
- **Glass Effects:** Semi-transparent panels with backdrop blur
- **Fonts:** 
  - Orbitron (display/headings)
  - Inter (body text)
  - JetBrains Mono (code)

Theme is configured via CSS in `src/assets/main.css` using Tailwind v4's `@theme` directive.

---

## 🌍 Internationalization

Supported languages:
- 🇺🇸 English (en)
- 🇷🇸 Serbian (sr)

Language can be toggled via the taskbar. Preference is saved in localStorage.

---

## 🖥️ Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension

---

## 📄 License

Private project - All rights reserved.

---

**Built with Vue 3 + TypeScript + Tailwind CSS**
