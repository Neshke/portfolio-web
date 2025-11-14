# Finding Black & White Animated Icons for Your Portfolio

## Best Sources for Monochrome Lottie Animations

### 1. LottieFiles - Free Animations
The best place to find black & white animated icons:

**Top Collections:**
- **Black & White Icons**: https://lottiefiles.com/free-animations/black-white-animated-icons
  - 25,621+ free animations
  - Perfect for your Matrix-Windows theme
  
- **Monochrome Line Icons**: https://lottiefiles.com/free-animations/monochrome-line-icons
  - 7,478+ line-style animations
  - Minimal and clean
  
- **Minimal Icons Black**: https://lottiefiles.com/free-animations/minimal-icons-black
  - 4,907+ minimal animations
  - Great for modern UI

### 2. How to Download and Use

#### Method A: Use CDN URL (Quick & Easy)
1. Go to LottieFiles and find an animation
2. Click on the animation
3. Look for "Lottie JSON" or "Get URL"
4. Copy the URL
5. Update `src/constants/lottieAnimations.ts`:
   ```typescript
   export const lottieAnimations = {
     about: 'https://your-lottie-url-here.json',
   }
   ```

#### Method B: Download JSON (Better Performance - RECOMMENDED)
1. Go to LottieFiles and find an animation
2. Click "Download" → "Lottie JSON"
3. Save the JSON file to `src/assets/animations/`
4. Import in your constants file:
   ```typescript
   import aboutAnimation from '@/assets/animations/about.json'
   
   export const lottieAnimations = {
     about: aboutAnimation,
   }
   ```
5. Update your component to use `animation-data` instead of `animation-url`:
   ```vue
   <LottieIcon :animation-data="lottieAnimations.about" />
   ```

## Recommended Searches for Your Taskbar

### For "About" Section
Search terms: `user icon black`, `profile icon monochrome`, `person icon minimal`

### For "Projects" Section
Search terms: `briefcase black`, `portfolio icon monochrome`, `folder icon minimal`

### For "Experience" Section
Search terms: `clock black`, `time icon monochrome`, `history icon minimal`, `timeline icon`

### For "Contact" Section
Search terms: `email icon black`, `message icon monochrome`, `mail icon minimal`, `contact icon`

## Popular Black & White Icon Packs on LottieFiles

1. **Minimal UI Animation Pack** - 7 Lotties
   - Clean, simple animations
   - Perfect for navigation

2. **User Interface Vol 1 Animation Pack** - 40 Lotties
   - Comprehensive UI icons
   - Consistent style

3. **Web Design & Development Animation Pack** - 40 Lotties
   - Developer-focused icons
   - Professional look

## Tips for Choosing Icons

### Style Consistency
- ✅ Use icons from the same pack/creator for consistency
- ✅ Match line weights across all icons
- ✅ Keep animation styles similar (all simple or all complex)

### Animation Duration
- ✅ Short animations (0.5-1.5 seconds) work best
- ✅ Set `loop={false}` for one-time animations
- ✅ Use `autoplay={true}` for instant visual feedback

### Color Scheme
For your Matrix-Windows theme:
- ✅ Pure black (#000000) icons
- ✅ Pure white (#FFFFFF) icons
- ✅ Green accents will come from your CSS
- ⚠️ Avoid multi-colored animations (use Lottie Editor to recolor)

## Customizing Animation Colors

If you find a great animation but it's not black & white:

1. Go to https://lottiefiles.com/lottie-editor
2. Upload your animation JSON
3. Select color layers
4. Change colors to black/white/transparent
5. Export and use

## Current Setup

Your icons are already configured in:
- **Desktop**: `src/components/Taskbar.vue`
- **Mobile**: `src/components/TaskbarMobile.vue`
- **Config**: `src/constants/lottieAnimations.ts`

Just update the URLs or JSON imports and the icons will automatically update!

## Next Steps

1. Browse LottieFiles for your favorite black & white icons
2. Download JSON files to `src/assets/animations/`
3. Update imports in `src/constants/lottieAnimations.ts`
4. Refresh your browser to see the new animations!

## Example: Full Setup with Local Files

```typescript
// src/constants/lottieAnimations.ts
import aboutAnimation from '@/assets/animations/about-black.json'
import projectsAnimation from '@/assets/animations/projects-black.json'
import experienceAnimation from '@/assets/animations/experience-black.json'
import contactAnimation from '@/assets/animations/contact-black.json'

export const lottieAnimations = {
  about: aboutAnimation,
  projects: projectsAnimation,
  experience: experienceAnimation,
  contact: contactAnimation,
}
```

That's it! Your black & white animated icons are ready to go! 🎨
