# Start Menu Quick Reference

## 🚀 Quick Start

### Open Start Menu

```typescript
import { useStartMenuStore } from '@/store/startMenu'

const startMenuStore = useStartMenuStore()

startMenuStore.openMenu({
  app: 'myApp',
  title: 'My App',
  description: 'Optional description',
  items: [
    {
      id: '1',
      title: 'Item 1',
      description: 'Optional',
      type: 'section',
      action: () => console.log('Clicked!'),
    },
  ],
})
```

### Toggle Menu

```typescript
// Opens if closed, closes if same app is open
startMenuStore.toggleMenu(data)
```

### Close Menu

```typescript
startMenuStore.closeMenu()
```

## 📊 Store State

```typescript
startMenuStore.isOpen // boolean
startMenuStore.menuData // StartMenuData | null
startMenuStore.activeApp // string | null
startMenuStore.menuItems // StartMenuItem[]
startMenuStore.currentTitle // string
startMenuStore.currentDescription // string
```

## 🎯 Item Types

```typescript
interface StartMenuItem {
  id: string
  title: string
  description?: string
  icon?: string
  type: 'app' | 'section' | 'action'
  route?: string
  action?: () => void
}
```

## 🎨 Taskbar Active State

```vue
<button @click="openMenu" :class="{ active: startMenuStore.activeApp === 'myApp' }">
  Button
</button>
```

## 🌐 Translation Keys

All translation keys are prefixed with `startMenu.`:

- `startMenu.comingSoon`
- `startMenu.profile`
- `startMenu.settings`
- `startMenu.close`
- `startMenu.aboutDescription`
- `startMenu.projectsDescription`
- etc.

## 🎭 Customization Points

### Change Position

```css
/* StartMenu.vue */
.start-menu-container {
  left: 50%;
  transform: translateX(-50%);
}
```

### Change Colors

```css
background: rgba(17, 26, 17, 0.98);
border: 1px solid rgba(0, 255, 136, 0.3);
```

### Change Animation

```css
.slide-up-menu-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## 🔧 Common Patterns

### With Router

```typescript
{
  id: 'route-item',
  title: 'Go to Page',
  type: 'action',
  action: () => {
    startMenuStore.closeMenu()
    router.push('/page')
  }
}
```

### Dynamic Items

```typescript
const items = computed(() =>
  myData.value.map((item) => ({
    id: item.id,
    title: item.name,
    type: 'section',
  }))
)
```

### Conditional Opening

```typescript
if (!startMenuStore.isOpen) {
  startMenuStore.openMenu(data)
}
```

## 📱 Responsive Breakpoints

- **Desktop**: ≥768px - Full taskbar with labels
- **Mobile**: <768px - Bottom nav with icons

## ⚡ Performance

- Menu content loads only when opened
- Animations are GPU-accelerated
- Click outside handler is debounced
- Store updates are reactive

## 🎁 Pre-configured Sections

The system comes with 4 pre-configured taskbar items:

1. **About** - Bio, Skills, Resume
2. **Projects** - Web, Mobile, Open Source
3. **Experience** - Work, Education, Certifications
4. **Contact** - Email, LinkedIn, GitHub

Each has placeholder content ready to be filled with real data!
