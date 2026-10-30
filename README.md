# portfolio-web

My portfolio, built as a small desktop in the browser: icons, windows you can drag and resize, a taskbar and a start menu. Vue 3 and TypeScript.

Live: [aleksanesic.netlify.app](https://aleksanesic.netlify.app)

## What's on it

- A profile widget on the desktop with my role, location, CV download and contact links, so the basics are visible without opening anything.
- Windows for About, Projects, Experience, Education and Contact. They can be dragged and resized (mouse, pen or touch), minimized and maximized, and they move back into view when the browser gets smaller. On phones they open full screen.
- Each window has its own address (`/projects`, `/experience` and so on), so a link can open one directly. On phones the back gesture closes the open window. `public/_redirects` sends every path to `index.html` on Netlify.
- A taskbar with every app pinned, GitHub and LinkedIn links, a language switch and a clock. On phones the app icons show up there only once a window is open. The start menu lists the apps plus the CV.
- Keyboard: Escape closes the window (but not while you are typing in a field), focus goes back to where you came from, and Tab stays inside the start menu while it is open.
- The contact form keeps what you typed if you close the window.
- English and Serbian (Latin script). Text lives in `src/i18n/locales/`, data such as roles and projects in `src/data/`, project screenshots in `src/assets/images/projects/`.
- The background is a canvas with a few Vue and TypeScript words drifting down slowly. It runs at about 10 fps, pauses when the tab is hidden and stays still when the system asks for reduced motion.

## Stack

| Category | Technologies |
| --- | --- |
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | Pinia |
| Routing | Vue Router |
| i18n | vue-i18n (EN, SR) |
| Utilities | @vueuse/core |
| Build | Vite |
| Testing | Vitest, @vue/test-utils, vue-tsc |

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # vue-tsc
npm run build
npm run preview
npm run test:run   # content, window and component tests
npm run format     # Prettier
```

The contact form sends through EmailJS and reads its keys from `.env` files (see `.env.example`).

## Theme

- Desk `#040814`, windows `#0c1426`, accent `#7fb2ff`, availability green `#5bd88f`
- One typeface, Archivo: wide cuts for headings, normal width for text
- Tokens are in `src/assets/main.css` under `@theme`
