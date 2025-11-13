# Portfolio Web

Vue 3 + TypeScript portfolio project built with Vite.

## Technologies

- **Vue 3** - Composition API
- **TypeScript** - Type-safe development
- **Pinia** - State management
- **Vue Router** - Routing
- **Tailwind CSS** - Utility-first CSS framework
- **@vueuse/core** - Collection of Vue Composition Utilities
- **Vitest** - Unit testing framework
- **Prettier** - Code formatter

## Project Structure

```
src/
├── api/              # API client and endpoint definitions
├── assets/           # Static resources (CSS, images)
├── components/       # Vue components
├── composables/      # Composition functions
├── constants/        # Application constants
├── layouts/          # Layout components
├── router/           # Vue Router configuration
├── services/         # Business logic services
├── store/            # Pinia store definitions
├── views/            # View components (route components)
├── App.vue           # Root component
├── main.ts           # Entry point
└── env.d.ts          # TypeScript declarations for env variables
```

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run
```

## Code Formatting

```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## Environment Variables

The project supports different environment files:

- `.env.local` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production environment

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Notes

The project is created with a focus on clean structure and maintainability.
The folder structure allows for easy addition of new features and application scaling.
