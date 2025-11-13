<script setup lang="ts"></script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-gradient min-h-screen flex items-center justify-center relative">
      <div class="bg-cyber-grid absolute inset-0 opacity-10"></div>

      <div class="relative z-10 text-center px-4">
        <h1 class="text-matrix-xl font-display text-glow-strong mb-6 animate-matrix-glow">
          Matrix-Windows Theme
        </h1>

        <p class="text-xl font-sans text-muted mb-8 max-w-2xl mx-auto">
          Futuristic portfolio theme combining Matrix cyberpunk aesthetics with Windows 11
          minimalism
        </p>

        <div class="flex gap-4 justify-center flex-wrap">
          <button class="btn-matrix-solid">Get Started</button>
          <button class="btn-matrix">Learn More</button>
        </div>
      </div>
    </section>

    <!-- Components Demo -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-display text-primary text-center mb-12">Theme Components</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="card-glow">
          <h3 class="text-xl font-display text-primary mb-3">Glass Cards</h3>
          <p class="text-muted mb-4 font-sans">
            Beautiful glassmorphism effects with backdrop blur and subtle borders.
          </p>
          <div class="flex gap-2">
            <span class="badge-matrix">Vue 3</span>
            <span class="badge-matrix">TypeScript</span>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="glass-panel">
          <h3 class="text-xl font-display text-primary mb-3">Matrix Glow</h3>
          <p class="text-muted mb-4 font-sans">
            Neon green glow effects that pulse and animate like the Matrix code.
          </p>
          <button class="btn-matrix w-full">Explore</button>
        </div>

        <!-- Card 3 -->
        <div class="matrix-window p-6">
          <h3 class="text-xl font-display text-glow mb-3">Terminal Style</h3>
          <code class="font-mono text-sm text-primary block mb-4">
            const theme = "matrix";<br />
            console.log(theme);
          </code>
          <button class="btn-windows w-full">Run Code</button>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="bg-background-elevated py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-display text-center text-glow mb-12">Theme Features</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="glass-card p-6">
            <div class="text-4xl mb-4 animate-matrix-pulse">🎨</div>
            <h3 class="text-xl font-display text-primary mb-2">Rich Color Palette</h3>
            <p class="text-muted font-sans">
              Carefully crafted Matrix-inspired colors with Windows minimalism
            </p>
          </div>

          <div class="glass-card p-6">
            <div class="text-4xl mb-4 animate-float">✨</div>
            <h3 class="text-xl font-display text-primary mb-2">Glow Effects</h3>
            <p class="text-muted font-sans">
              Multiple glow intensities for buttons, text, and interactive elements
            </p>
          </div>

          <div class="glass-card p-6">
            <div class="text-4xl mb-4 animate-matrix-flicker">🪟</div>
            <h3 class="text-xl font-display text-primary mb-2">Glassmorphism</h3>
            <p class="text-muted font-sans">Windows 11-inspired glass effects with backdrop blur</p>
          </div>

          <div class="glass-card p-6">
            <div class="text-4xl mb-4 animate-matrix-glow">⚡</div>
            <h3 class="text-xl font-display text-primary mb-2">Smooth Animations</h3>
            <p class="text-muted font-sans">
              Built-in animations for pulse, flicker, float, and shimmer effects
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Typography Showcase -->
    <section class="container mx-auto px-4 py-16">
      <div class="matrix-bg p-12 rounded-window">
        <h2 class="text-matrix-lg font-display text-glow mb-8">Typography</h2>

        <div class="space-y-6">
          <div>
            <h3 class="font-display text-2xl text-primary mb-2">Orbitron Display Font</h3>
            <p class="text-muted font-sans">For futuristic headings and hero sections</p>
          </div>

          <div class="divider-matrix"></div>

          <div>
            <h3 class="font-sans text-2xl text-secondary mb-2">Inter Sans Font</h3>
            <p class="text-muted font-sans">For clean, readable body text and UI elements</p>
          </div>

          <div class="divider-matrix"></div>

          <div>
            <h3 class="font-mono text-2xl text-primary mb-2">JetBrains Mono</h3>
            <p class="text-muted font-mono">For code snippets and technical content</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-matrix-gradient py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-display text-glow-strong mb-6">Ready to Build?</h2>
        <p class="text-xl text-muted mb-8 max-w-2xl mx-auto">
          Start creating your futuristic portfolio with this Matrix-Windows theme
        </p>
        <button class="btn-matrix-solid text-lg px-8 py-4">View Documentation</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  @apply min-h-screen;
}
</style>
