# Matrix-Windows Theme Guide

## 🎨 Pregled

Ova tema kombinuje **Matrix cyberpunk** estetiku sa **Windows 11** minimalizmom, kreirajući futuristički ali profesionalan izgled idealan za portfolio website programera.

**Tehnička osnova:** Tailwind CSS v4 sa CSS-based konfiguracijom putem `@theme` direktive

### 🆕 Tailwind v4 Prednosti

- **CSS Variables** - Čitljivije i lakše za održavanje
- **No JS Config** - Sve se definiše u CSS-u
- **Faster Build** - Brži build proces
- **Better DX** - Moderniji developer experience

---

## 🔧 CSS Variables (Tailwind v4)

Tema koristi CSS varijable definisane u `@theme` bloku:

```css
/* Primer direktnog korišćenja CSS varijabli */
<style scoped>
.custom-element {
  background-color: var(--color-background-elevated);
  color: var(--color-primary);
  font-family: var(--font-display);
  box-shadow: var(--shadow-glow-md);
  border-radius: var(--radius-glass);
}
</style>
```

### Dostupne CSS Varijable

**Boje:**
- `--color-background`, `--color-background-dark`, `--color-background-elevated`
- `--color-primary`, `--color-primary-light`, `--color-primary-dark`
- `--color-secondary`, `--color-secondary-light`, `--color-secondary-dark`
- `--color-glass`, `--color-glass-light`, `--color-glass-dark`, `--color-glass-border`
- `--color-text-base`, `--color-text-muted`, `--color-text-accent`, etc.

**Shadows:**
- `--shadow-glow-sm`, `--shadow-glow`, `--shadow-glow-md`, `--shadow-glow-lg`, `--shadow-glow-xl`
- `--shadow-glass`, `--shadow-glass-hover`, `--shadow-matrix`

**Fonts:**
- `--font-mono`, `--font-sans`, `--font-display`

**Other:**
- `--radius-glass`, `--radius-window`
- `--blur-glass`, `--blur-xs`
- `--animate-matrix-glow`, `--animate-matrix-flicker`, etc.

---

## 🌈 Paleta Boja

### Pozadine

```typescript
bg-background         // #0a0f0a - Glavna pozadina (Matrix terminal)
bg-background-dark    // #050805 - Tamnija varijanta
bg-background-elevated // #111a11 - Za kartice/površine
```

### Primarna Boja (Matrix Neon Green)

```typescript
bg-primary            // #00ff88 - Matrix zelena
bg-primary-light      // #33ffaa - Svetlija (hover)
bg-primary-dark       // #00cc6a - Tamnija (active)
text-primary          // Zeleni tekst
border-primary        // Zelena ivica
```

### Sekundarna Boja (Windows Gray-Blue)

```typescript
bg-secondary          // #9ba9b4 - Windows sivo-plava
bg-secondary-light    // #b8c5d0 - Svetlija
bg-secondary-dark     // #7a8894 - Tamnija
text-secondary        // Sekundarni tekst
```

### Glass Efekti (Glassmorphism)

```typescript
bg-glass              // rgba(255,255,255,0.1) - Osnovno staklo
bg-glass-light        // rgba(255,255,255,0.15) - Svetlije staklo
bg-glass-dark         // rgba(255,255,255,0.05) - Tamnije staklo
border-glass-border   // rgba(255,255,255,0.2) - Ivica stakla
```

### Boje Teksta

```typescript
text-base             // #e0e8e0 - Osnovni tekst
text-muted            // #7fa77f - Prigušeni tekst
text-accent           // #00ff88 - Akcent tekst
text-secondary        // #9ba9b4 - Sekundarni tekst
text-dim              // #4a5a4a - Veoma prigušen tekst
```

### Status Boje

```typescript
// Success (Matrix-kompatibilno)
text-success          // #00ffaa
bg-success            // Success pozadina

// Error
text-error            // #ff4c4c
bg-error              // Error pozadina

// Warning
text-warning          // #ffaa00
bg-warning            // Warning pozadina

// Info
text-info             // #00aaff
bg-info               // Info pozadina
```

---

## 🎭 Komponente i Klase

### Glass Card (Windows 11 Stil)

```vue
<template>
  <div class="glass-card">
    <!-- Sadržaj kartice -->
  </div>
</template>

<style scoped>
/* Automatski uključuje: */
/* - backdrop blur */
/* - border sa glass efektom */
/* - shadow */
/* - hover efekte */
</style>
```

### Matrix Dugmad

```vue
<template>
  <!-- Outline dugme sa Matrix glow efektom -->
  <button class="btn-matrix">Click Me</button>

  <!-- Solid Matrix dugme -->
  <button class="btn-matrix-solid">Action</button>

  <!-- Windows stil dugme -->
  <button class="btn-windows">Secondary</button>
</template>
```

### Matrix Window/Panel

```vue
<template>
  <div class="matrix-window p-6">
    <h2 class="text-glow">Glowing Title</h2>
    <p class="text-muted">Content here</p>
  </div>
</template>
```

### Input Polja

```vue
<template>
  <input type="text" class="input-matrix" placeholder="Enter code..." />
</template>
```

### Glass Panel sa Hover Efektom

```vue
<template>
  <div class="glass-panel">
    <h3>Panel Title</h3>
    <p>Interactive content</p>
  </div>
</template>
```

### Badge/Tag

```vue
<template>
  <span class="badge-matrix">TypeScript</span>
  <span class="badge-matrix">Vue 3</span>
</template>
```

---

## ✨ Glow Efekti

### Box Shadow Glow

```vue
<template>
  <!-- Mali glow -->
  <div class="shadow-glow-sm">...</div>

  <!-- Srednji glow (default) -->
  <div class="shadow-glow">...</div>

  <!-- Veliki glow -->
  <div class="shadow-glow-lg">...</div>

  <!-- Extra veliki glow -->
  <div class="shadow-glow-xl">...</div>

  <!-- Matrix signature glow (kombinovani) -->
  <div class="shadow-matrix">...</div>
</template>
```

### Text Glow

```vue
<template>
  <!-- Blagi glow -->
  <h1 class="text-glow">Neon Text</h1>

  <!-- Jak glow -->
  <h1 class="text-glow-strong">Strong Neon</h1>
</template>
```

### Border Glow

```vue
<template>
  <div class="border-glow p-4">Content with glowing border</div>
</template>
```

---

## 🌌 Background Gradienti

### Matrix Gradient Backgrounds

```vue
<template>
  <!-- Osnovni Matrix gradient -->
  <div class="bg-matrix-gradient">...</div>

  <!-- Radial gradient (za spotlight efekte) -->
  <div class="bg-matrix-radial">...</div>

  <!-- Hero sekcija gradient -->
  <section class="bg-matrix-hero">...</section>

  <!-- Glass gradient -->
  <div class="bg-glass-gradient">...</div>

  <!-- Glow gradient (za hover efekte) -->
  <div class="bg-glow-gradient">...</div>
</template>
```

### Matrix Background sa Animacijom

```vue
<template>
  <div class="matrix-bg min-h-screen">
    <!-- Automatski uključuje pulsiranje/glow animaciju -->
    <div class="container mx-auto">Content</div>
  </div>
</template>
```

### Hero Gradient (Kombinovan Efekat)

```vue
<template>
  <section class="hero-gradient min-h-screen flex items-center justify-center">
    <h1 class="text-matrix-xl text-glow-strong">Welcome to the Matrix</h1>
  </section>
</template>
```

### Cyber Grid Background

```vue
<template>
  <div class="bg-cyber-grid bg-background p-8">
    <!-- Daje Matrix "grid" efekat -->
  </div>
</template>
```

---

## 🎬 Animacije

### Matrix Glow (Pulsiranje)

```vue
<template>
  <div class="animate-matrix-glow">Pulsating element</div>
</template>
```

### Matrix Flicker (Treptanje)

```vue
<template>
  <div class="animate-matrix-flicker">Flickering text</div>
</template>
```

### Glass Shimmer

```vue
<template>
  <div class="animate-glass-shimmer">Shimmering glass</div>
</template>
```

### Float Animation

```vue
<template>
  <div class="animate-float">Floating element</div>
</template>
```

---

## 🔤 Tipografija

### Font Families

```typescript
font-mono      // JetBrains Mono - Za kod i Matrix osećaj
font-sans      // Inter - Za čisti UI tekst
font-display   // Orbitron - Za futurističke naslove
```

### Custom Font Sizes

```vue
<template>
  <!-- Extra large Matrix style -->
  <h1 class="text-matrix-xl">Hero Title</h1>

  <!-- Large Matrix style -->
  <h2 class="text-matrix-lg">Section Title</h2>
</template>
```

### Primer Kombinacije

```vue
<template>
  <div class="glass-card p-8">
    <h1 class="text-matrix-xl font-display text-glow mb-4">Portfolio</h1>

    <p class="font-sans text-base text-muted mb-6">
      Welcome to my digital workspace
    </p>

    <code class="font-mono text-primary">const code = "Matrix";</code>
  </div>
</template>
```

---

## 🎯 Kompletni Primeri

### Hero Sekcija

```vue
<template>
  <section class="hero-gradient min-h-screen flex items-center justify-center relative">
    <div class="bg-cyber-grid absolute inset-0 opacity-20"></div>

    <div class="relative z-10 text-center">
      <h1 class="text-matrix-xl font-display text-glow-strong mb-6 animate-matrix-glow">
        John Doe
      </h1>

      <p class="text-xl font-sans text-muted mb-8">Full Stack Developer</p>

      <button class="btn-matrix-solid">View Projects</button>
    </div>
  </section>
</template>
```

### Project Card

```vue
<template>
  <div class="card-glow cursor-pointer">
    <div class="mb-4">
      <span class="badge-matrix">Vue 3</span>
      <span class="badge-matrix ml-2">TypeScript</span>
    </div>

    <h3 class="text-xl font-display text-primary mb-3">Project Name</h3>

    <p class="text-muted mb-4 font-sans">
      A modern web application built with cutting-edge technologies.
    </p>

    <div class="divider-matrix mb-4"></div>

    <button class="btn-matrix w-full">View Details</button>
  </div>
</template>
```

### Navigation Bar

```vue
<template>
  <nav class="glass-card px-6 py-4 flex items-center justify-between">
    <div class="font-display text-primary text-xl animate-matrix-pulse">
      &lt;Dev/&gt;
    </div>

    <div class="flex gap-6 font-mono text-sm">
      <a href="#" class="text-muted hover:text-primary transition-colors">Home</a>
      <a href="#" class="text-muted hover:text-primary transition-colors">Projects</a>
      <a href="#" class="text-muted hover:text-primary transition-colors">Contact</a>
    </div>
  </nav>
</template>
```

### Contact Form

```vue
<template>
  <div class="matrix-window p-8 max-w-md mx-auto">
    <h2 class="text-2xl font-display text-glow mb-6">Contact Me</h2>

    <form class="space-y-4">
      <input type="text" placeholder="Name" class="input-matrix w-full" />

      <input type="email" placeholder="Email" class="input-matrix w-full" />

      <textarea placeholder="Message" rows="4" class="input-matrix w-full resize-none">
      </textarea>

      <button type="submit" class="btn-matrix-solid w-full">Send Message</button>
    </form>
  </div>
</template>
```

---

## 💡 Saveti za Upotrebu

### 1. Dark Mode je Default

Tema je dizajnirana da **uvek bude tamna** (Matrix terminal stil). Nema potrebe za dark mode toggle-om.

### 2. Balans Glow Efekata

Ne pretrpavaj stranicu sa previše glow efekata. Koristi:

- **Jak glow** za CTA dugmad i važne elemente
- **Srednji glow** za hover efekte
- **Blagi glow** za border i subtle efekte

### 3. Glassmorphism sa Merom

Windows glass efekti izgledaju najbolje kada:

- Imaju **backdrop-blur**
- Postavljeni su preko gradient pozadine
- Nisu previše gusto postavljeni

### 4. Font Pairing

- **Orbitron** → Veliki naslovi, logo, hero sekcije
- **Inter** → Body tekst, opisi, paragrafi
- **JetBrains Mono** → Kod snippeti, tehnički tekst, badges

### 5. Hover Interakcije

Uvek dodaj transition za smooth iskustvo:

```vue
<template>
  <div class="glass-card transition-all duration-300 hover:shadow-glow-md">...</div>
</template>
```

---

## 🚀 Quick Start

### Osnovni Layout

```vue
<template>
  <div class="min-h-screen bg-background">
    <nav class="glass-card">
      <!-- Navigation -->
    </nav>

    <main class="container mx-auto px-4 py-8">
      <!-- Page content -->
    </main>

    <footer class="matrix-window">
      <!-- Footer -->
    </footer>
  </div>
</template>
```

---

## 📚 Dodatni Resursi

- **Tailwind Config**: `tailwind.config.ts` - Kompletna definicija teme
- **CSS Utilities**: `src/assets/main.css` - Custom klase i komponente
- **Font CDN**: Google Fonts (Inter, JetBrains Mono, Orbitron)

---

_Happy coding in the Matrix! 🟢_
