// Black & White animated icons (local JSON files)
// Simple, clean animations that work with the Matrix-Windows theme
import aboutAnimation from '@/assets/animations/about.json'
import projectsAnimation from '@/assets/animations/projects.json'
import contactAnimation from '@/assets/animations/contact.json'

export const lottieAnimations = {
  // Navigation icons (Black & White, locally hosted)
  about: aboutAnimation,
  projects: projectsAnimation,
  experience: "https://lottie.host/bd11b473-32f8-44e8-9cb5-e037ad5ed00d/I5UfIuDkZi.lottie",
  contact: contactAnimation,

  // You can add more animations by:
  // 1. Download from https://lottiefiles.com/free-animations/black-white-animated-icons
  // 2. Save JSON to src/assets/animations/
  // 3. Import and add here
}

// ALTERNATIVE: Download JSON files and import them locally
// This is better for performance and works offline
//
// Example:
// 1. Download animations to src/assets/animations/
// 2. Import them:
//    import aboutAnimation from '@/assets/animations/about.json'
// 3. Use animation-data prop instead of animation-url:
//    <LottieIcon :animation-data="aboutAnimation" />

// Alternative: You can also download JSON files and import them directly
// Example:
// import aboutAnimation from '@/assets/animations/about.json'
// export const animations = { about: aboutAnimation }
