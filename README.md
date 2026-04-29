# portfolio-web

A Vue 3 + TypeScript portfolio website designed as a **Desktop Environment Simulation** — combining a Windows 11-inspired interface with a professional dark blue theme.

Live: [aleksanesic.netlify.app](https://aleksanesic.netlify.app)

---

## Overview

This portfolio presents itself as an interactive desktop OS where visitors can:

- Click on **desktop icons** to open application windows
- **Drag, resize, minimize, and maximize** windows
- Use the **taskbar** to switch between open apps
- Access the **Start Menu** for navigation
- View a **profile widget** with quick info

---

## Features

**Desktop Environment**
- Window Management — draggable, resizable with minimize/maximize
- Taskbar — open windows, system tray with clock and language switcher
- Start Menu — app launcher with navigation
- Desktop Icons — quick access to portfolio sections
- Profile Widget — glassmorphism card

**Applications**
- About — personal intro and skills
- Projects — portfolio of work
- Education — academic background
- Experience — professional experience
- Contact — contact form

**UI/UX**
- Dark professional theme (blue/slate palette)
- Glassmorphism with backdrop blur
- Responsive (desktop + mobile taskbar)
- Internationalization — English and Serbian
- Smooth window animations

---

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| State | Pinia |
| Routing | Vue Router |
| i18n | vue-i18n (EN/SR) |
| Utilities | @vueuse/core |
| Build | Vite |
| Testing | Vitest |

---

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run preview
```

Testing:
```bash
npm run test
npm run test:run
```

---

## Theme

- Background: Slate 950 (`#020617`)
- Primary: Blue 400 (`#60a5fa`)
- Glass effects: semi-transparent panels with backdrop blur
- Fonts: Orbitron (display), Inter (body), JetBrains Mono (code)

---

Built with Vue 3 + TypeScript + Tailwind CSS