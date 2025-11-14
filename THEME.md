# Matrix-Windows Theme Guide

## 🎨 Overview

This theme combines **Matrix cyberpunk** aesthetics with **Windows 11** minimalism, creating a futuristic yet professional look ideal for a developer portfolio website.

**Technical foundation:** Tailwind CSS v4 with CSS-based configuration via `@theme` directive

### 🆕 Tailwind v4 Advantages

- **CSS Variables** - More readable and easier to maintain
- **No JS Config** - Everything is defined in CSS
- **Faster Build** - Faster build process
- **Better DX** - Modern developer experience

---

## 🔧 CSS Variables (Tailwind v4)

The theme uses CSS variables defined in the `@theme` block:

```css
/* Example of direct CSS variable usage */
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

### Available CSS Variables

**Colors:**

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

## 🌈 Color Palette

### Backgrounds

```typescript
bg - background // #0a0f0a - Main background (Matrix terminal)
bg - background - dark // #050805 - Darker variant
bg - background - elevated // #111a11 - For cards/surfaces
```

### Primary Color (Matrix Neon Green)

```typescript
bg - primary // #00ff88 - Matrix green
bg - primary - light // #33ffaa - Lighter (hover)
bg - primary - dark // #00cc6a - Darker (active)
text - primary // Green text
border - primary // Green border
```

### Secondary Color (Windows Gray-Blue)

```typescript
bg - secondary // #9ba9b4 - Windows gray-blue
bg - secondary - light // #b8c5d0 - Lighter
bg - secondary - dark // #7a8894 - Darker
text - secondary // Secondary text
```

### Glass Effects (Glassmorphism)

```typescript
bg - glass // rgba(255,255,255,0.1) - Base glass
bg - glass - light // rgba(255,255,255,0.15) - Lighter glass
bg - glass - dark // rgba(255,255,255,0.05) - Darker glass
border - glass - border // rgba(255,255,255,0.2) - Glass border
```

### Text Colors

```typescript
text - base // #e0e8e0 - Base text
text - muted // #7fa77f - Muted text
text - accent // #00ff88 - Accent text
text - secondary // #9ba9b4 - Secondary text
text - dim // #4a5a4a - Very muted text
```

### Status Colors

```typescript
// Success (Matrix-compatible)
text - success // #00ffaa
bg - success // Success background

// Error
text - error // #ff4c4c
bg - error // Error background

// Warning
text - warning // #ffaa00
bg - warning // Warning background

// Info
text - info // #00aaff
bg - info // Info background
```

---

## 🎭 Components and Classes

### Glass Card (Windows 11 Style)

```vue
<template>
  <div class="glass-card">
    <!-- Card content -->
  </div>
</template>

<style scoped>
/* Automatically includes: */
/* - backdrop blur */
/* - border with glass effect */
/* - shadow */
/* - hover effects */
</style>
```

### Matrix Buttons

```vue
<template>
  <!-- Outline button with Matrix glow effect -->
  <button class="btn-matrix">Click Me</button>

  <!-- Solid Matrix button -->
  <button class="btn-matrix-solid">Action</button>

  <!-- Windows style button -->
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

### Input Fields

```vue
<template>
  <input type="text" class="input-matrix" placeholder="Enter code..." />
</template>
```

### Glass Panel with Hover Effect

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

## ✨ Glow Effects

### Box Shadow Glow

```vue
<template>
  <!-- Small glow -->
  <div class="shadow-glow-sm">...</div>

  <!-- Medium glow (default) -->
  <div class="shadow-glow">...</div>

  <!-- Large glow -->
  <div class="shadow-glow-lg">...</div>

  <!-- Extra large glow -->
  <div class="shadow-glow-xl">...</div>

  <!-- Matrix signature glow (combined) -->
  <div class="shadow-matrix">...</div>
</template>
```

### Text Glow

```vue
<template>
  <!-- Subtle glow -->
  <h1 class="text-glow">Neon Text</h1>

  <!-- Strong glow -->
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

## 🌌 Background Gradients

### Matrix Gradient Backgrounds

```vue
<template>
  <!-- Basic Matrix gradient -->
  <div class="bg-matrix-gradient">...</div>

  <!-- Radial gradient (for spotlight effects) -->
  <div class="bg-matrix-radial">...</div>

  <!-- Hero section gradient -->
  <section class="bg-matrix-hero">...</section>

  <!-- Glass gradient -->
  <div class="bg-glass-gradient">...</div>

  <!-- Glow gradient (for hover effects) -->
  <div class="bg-glow-gradient">...</div>
</template>
```

### Matrix Background with Animation

```vue
<template>
  <div class="matrix-bg min-h-screen">
    <!-- Automatically includes pulsing/glow animation -->
    <div class="container mx-auto">Content</div>
  </div>
</template>
```

### Hero Gradient (Combined Effect)

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
    <!-- Provides Matrix "grid" effect -->
  </div>
</template>
```

---

## 🎬 Animations

### Matrix Glow (Pulsing)

```vue
<template>
  <div class="animate-matrix-glow">Pulsating element</div>
</template>
```

### Matrix Flicker (Flickering)

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

## 🔤 Typography

### Font Families

```typescript
font - mono // JetBrains Mono - For code and Matrix feel
font - sans // Inter - For clean UI text
font - display // Orbitron - For futuristic titles
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

### Combination Example

```vue
<template>
  <div class="glass-card p-8">
    <h1 class="text-matrix-xl font-display text-glow mb-4">Portfolio</h1>

    <p class="font-sans text-base text-muted mb-6">Welcome to my digital workspace</p>

    <code class="font-mono text-primary">const code = "Matrix";</code>
  </div>
</template>
```

---

## 🎯 Complete Examples

### Hero Section

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
    <div class="font-display text-primary text-xl animate-matrix-pulse">&lt;Dev/&gt;</div>

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

      <textarea placeholder="Message" rows="4" class="input-matrix w-full resize-none"> </textarea>

      <button type="submit" class="btn-matrix-solid w-full">Send Message</button>
    </form>
  </div>
</template>
```

---

## 💡 Usage Tips

### 1. Dark Mode is Default

The theme is designed to **always be dark** (Matrix terminal style). No need for a dark mode toggle.

### 2. Balance Glow Effects

Don't overcrowd the page with too many glow effects. Use:

- **Strong glow** for CTA buttons and important elements
- **Medium glow** for hover effects
- **Subtle glow** for borders and subtle effects

### 3. Glassmorphism with Moderation

Windows glass effects look best when:

- They have **backdrop-blur**
- Placed over gradient backgrounds
- Not too densely positioned

### 4. Font Pairing

- **Orbitron** → Large titles, logo, hero sections
- **Inter** → Body text, descriptions, paragraphs
- **JetBrains Mono** → Code snippets, technical text, badges

### 5. Hover Interactions

Always add transitions for smooth experience:

```vue
<template>
  <div class="glass-card transition-all duration-300 hover:shadow-glow-md">...</div>
</template>
```

---

## 🚀 Quick Start

### Basic Layout

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

## 📚 Additional Resources

- **Tailwind Config**: `tailwind.config.ts` - Complete theme definition
- **CSS Utilities**: `src/assets/main.css` - Custom classes and components
- **Font CDN**: Google Fonts (Inter, JetBrains Mono, Orbitron)

---

_Happy coding in the Matrix! 🟢_
