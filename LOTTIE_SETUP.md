# Lottie Animations Setup

This project uses Lottie for animated icons in the taskbar and UI components.

## Libraries Used

- **lottie-web** - Core Lottie library for rendering animations
- **vue3-lottie** - Vue 3 wrapper for Lottie (optional, we built a custom component)

## Files Structure

```
src/
├── components/
│   └── LottieIcon.vue          # Reusable Lottie icon component
├── constants/
│   └── lottieAnimations.ts     # Animation URLs/data
└── assets/
    └── animations/             # (Optional) Local JSON files
```

## Using LottieIcon Component

### Basic Usage

```vue
<script setup lang="ts">
import LottieIcon from '@/components/LottieIcon.vue'
import { lottieAnimations } from '@/constants/lottieAnimations'
</script>

<template>
  <LottieIcon 
    :animation-url="lottieAnimations.about"
    width="32px"
    height="32px"
    :loop="false"
  />
</template>
```

### Props

- `animationData?: object` - Lottie JSON animation data (imported locally)
- `animationUrl?: string` - URL to animation JSON (from CDN or server)
- `width?: string` - Icon width (default: '24px')
- `height?: string` - Icon height (default: '24px')
- `autoplay?: boolean` - Auto-play on mount (default: true)
- `loop?: boolean` - Loop animation (default: false)
- `speed?: number` - Animation speed multiplier (default: 1)

### Methods (via ref)

```vue
<script setup lang="ts">
const iconRef = ref()

const playAnimation = () => iconRef.value?.play()
const pauseAnimation = () => iconRef.value?.pause()
const stopAnimation = () => iconRef.value?.stop()
const changeSpeed = (speed: number) => iconRef.value?.setSpeed(speed)
</script>

<template>
  <LottieIcon ref="iconRef" :animation-url="..." />
</template>
```

## Finding Free Lottie Animations

1. **LottieFiles** - https://lottiefiles.com/
   - Free and premium animations
   - Can use CDN URLs or download JSON
   - Example: `https://assets10.lottiefiles.com/packages/lf20_2znxgjyt.json`

2. **Icons8 Animated Icons** - https://icons8.com/icons/family-animated--animated
   - Can export as Lottie JSON
   - Requires Icons8 subscription

3. **Create Your Own**
   - Use After Effects with Bodymovin plugin
   - Export as Lottie JSON

## Animation URLs vs Local Files

### Using CDN URLs (Current Setup)
```typescript
// src/constants/lottieAnimations.ts
export const lottieAnimations = {
  about: 'https://assets10.lottiefiles.com/packages/lf20_2znxgjyt.json',
}
```

**Pros:**
- No bundle size increase
- Easy to update
- Fast to implement

**Cons:**
- Requires internet connection
- External dependency

### Using Local JSON Files (Alternative)
```typescript
// Download JSON files to src/assets/animations/
import aboutAnimation from '@/assets/animations/about.json'

export const lottieAnimations = {
  about: aboutAnimation,
}
```

Then use `animation-data` prop instead:
```vue
<LottieIcon :animation-data="lottieAnimations.about" />
```

**Pros:**
- Works offline
- Full control
- No external dependencies

**Cons:**
- Increases bundle size
- Slower initial load

## Current Animations

| Name | Usage | URL |
|------|-------|-----|
| about | Profile/Document | LottieFiles CDN |
| projects | Briefcase | LottieFiles CDN |
| experience | Clock/Time | LottieFiles CDN |
| contact | Email/Message | LottieFiles CDN |

## Customization Tips

1. **Change colors:** Some Lottie files support color customization via CSS
2. **Adjust speed:** Use the `speed` prop to control animation speed
3. **Trigger on hover:** Set `autoplay={false}` and use `@mouseenter` to play
4. **Loop animations:** Set `loop={true}` for continuous animations

## Performance

- Lottie uses SVG rendering by default (good performance)
- Animations only play when triggered (no CPU waste)
- Consider lazy loading for many icons
- Use `loop={false}` for one-time animations to save resources

## Troubleshooting

**Animation not showing:**
- Check if the URL is accessible
- Verify JSON format is valid Lottie format
- Check browser console for errors

**Animation too fast/slow:**
- Adjust the `speed` prop
- Check if animation frame rate matches expectations

**Size issues:**
- Ensure `width` and `height` props are set correctly
- Check parent container CSS
- Lottie animations maintain aspect ratio by default
