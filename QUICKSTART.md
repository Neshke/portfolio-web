# 🚀 Quick Start - Matrix-Windows Portfolio

## Instalacija

```bash
# Kloniraj repo (ili koristi postojeći)
cd portfolio-web

# Instaliraj dependencies
npm install

# Pokreni dev server
npm run dev
```

Server će biti dostupan na `http://localhost:5173`

---

## 🎨 Korišćenje Teme

### Osnovna Komponenta

```vue
<script setup lang="ts"></script>

<template>
  <div class="glass-card p-6">
    <h2 class="text-2xl font-display text-glow mb-4">Matrix Heading</h2>
    <p class="text-muted mb-4">Clean, professional content</p>
    <button class="btn-matrix-solid">Click Me</button>
  </div>
</template>

<style scoped>
/* Custom styles ako su potrebni */
</style>
```

### Hero Sekcija

```vue
<template>
  <section class="hero-gradient min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-display text-glow-strong mb-6 animate-matrix-glow">Your Name</h1>
      <p class="text-xl text-muted mb-8">Your Title</p>
      <button class="btn-matrix-solid">View Work</button>
    </div>
  </section>
</template>
```

### Project Card

```vue
<template>
  <div class="card-glow">
    <h3 class="text-xl font-display text-primary mb-3">Project Name</h3>
    <p class="text-muted mb-4">Project description here...</p>

    <div class="flex gap-2 mb-4">
      <span class="badge-matrix">Vue 3</span>
      <span class="badge-matrix">TypeScript</span>
    </div>

    <button class="btn-matrix w-full">View Project</button>
  </div>
</template>
```

---

## 🎨 Najkorišćenije Klase

### Boje

```html
<!-- Pozadine -->
<div class="bg-background">Dark background</div>
<div class="bg-background-elevated">Lighter surface</div>

<!-- Tekst -->
<p class="text-primary">Matrix green</p>
<p class="text-secondary">Windows gray-blue</p>
<p class="text-muted">Muted text</p>

<!-- Glow tekst -->
<h1 class="text-glow">Glowing heading</h1>
<h1 class="text-glow-strong">Strong glow</h1>
```

### Komponente

```html
<!-- Glass card -->
<div class="glass-card p-6">Glass effect panel</div>

<!-- Matrix window -->
<div class="matrix-window p-6">Terminal-style panel</div>

<!-- Buttons -->
<button class="btn-matrix">Outline Button</button>
<button class="btn-matrix-solid">Solid Button</button>
<button class="btn-windows">Windows Style</button>

<!-- Input -->
<input type="text" class="input-matrix w-full" placeholder="Enter text..." />

<!-- Badge -->
<span class="badge-matrix">Tag</span>

<!-- Divider -->
<div class="divider-matrix"></div>
```

### Efekti i Animacije

```html
<!-- Shadow glow -->
<div class="shadow-glow">Subtle glow</div>
<div class="shadow-glow-lg">Large glow</div>

<!-- Animations -->
<div class="animate-matrix-glow">Pulsating</div>
<div class="animate-matrix-flicker">Flickering</div>
<div class="animate-float">Floating</div>

<!-- Background effects -->
<div class="matrix-bg">Matrix background with animation</div>
<div class="bg-cyber-grid">Cyber grid pattern</div>
```

---

## 📐 Layout Pattern

```vue
<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <nav class="glass-card px-6 py-4 sticky top-0 z-50">
      <div class="container mx-auto flex justify-between items-center">
        <div class="font-display text-primary text-xl">&lt;Logo/&gt;</div>
        <div class="flex gap-6 font-mono text-sm">
          <a href="#" class="text-muted hover:text-primary transition-colors">Home</a>
          <a href="#" class="text-muted hover:text-primary transition-colors">Projects</a>
          <a href="#" class="text-muted hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="matrix-window p-8 mt-16">
      <div class="container mx-auto text-center text-muted">
        <p>&copy; 2025 Your Name. Built with Matrix code.</p>
      </div>
    </footer>
  </div>
</template>
```

---

## 🎯 Tips

1. **Kombinuj font familije:**
   - `font-display` (Orbitron) → Veliki naslovi
   - `font-sans` (Inter) → Body tekst
   - `font-mono` (JetBrains Mono) → Kod i tehnički tekst

2. **Balance glow efekte:**
   - Ne koristi previše glow-a odjednom
   - Rezerviši jak glow za CTA elemente

3. **Glassmorphism najbolje radi:**
   - Preko gradient pozadina
   - Sa backdrop-blur efektom
   - Kada nije previše gusto postavljen

4. **Responsive dizajn:**

   ```html
   <div class="glass-card p-4 md:p-6 lg:p-8">
     <h2 class="text-xl md:text-2xl lg:text-3xl font-display text-glow">Responsive Heading</h2>
   </div>
   ```

5. **Dodaj transitions:**
   ```html
   <div class="glass-card transition-all duration-300 hover:shadow-glow-md">
     Smooth hover effect
   </div>
   ```

---

## 📚 Dalje

- **Kompletan guide:** Pogledaj [THEME.md](./THEME.md) za detaljnu dokumentaciju
- **Tailwind v4 Theme:** `src/assets/main.css` - CSS-based konfiguracija sa `@theme` direktivom
- **Custom Components:** `src/assets/main.css` - Component klase i utilities

### 🆕 Tailwind v4

Projekt koristi **Tailwind CSS v4** (next gen) sa CSS-based konfiguracijom:

```css
@theme {
  --color-primary: #00ff88;
  --font-display: Orbitron, sans-serif;
  --shadow-glow: 0 0 15px rgb(0 255 136 / 0.4);
}
```

Sve boje, fontovi i efekti se definišu kao CSS varijable - čistije i brže!

---

**Uživaj u kodiranju! 🟢✨**
