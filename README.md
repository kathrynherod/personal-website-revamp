# Kathryn Herod - Personal Portfolio Website

A modern, responsive personal portfolio website built with React 19, TypeScript, and Material-UI. Features a single-page design with smooth scrolling navigation and dynamic light/dark theme switching.

## Features

- **Single-page navigation** with smooth scrolling between sections
- **Dynamic theme switching** with light/dark mode support and localStorage persistence
- **Responsive design** optimized for desktop and mobile
- **Intersection observer navigation** that updates URL based on scroll position
- **Material-UI integration** with custom color palette (dark blue #01344D, light green #9CCE4D)
- **TypeScript** with comprehensive path aliases for clean imports
- **Comprehensive testing** with Vitest and React Testing Library
- **Accessibility optimized** with proper ARIA labels and semantic markup

## Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript with comprehensive type definitions
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - React component library with custom theming
- **Vitest** - Modern testing framework with coverage reporting
- **React Testing Library** - Testing utilities for React components
- **ESLint** - Code linting and formatting
- **Path Aliases** - Clean import statements using @components, @hooks, @pages, etc.

## Getting Started

### Prerequisites

- Node.js (recommended version 18+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage report:
```bash
npm test -- --coverage
```

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

- `src/` - Source code
  - `components/` - Reusable React components with organized subfolders
    - `Education/` - Education section components
    - `Hobbies/` - Hobby card and photo components
    - `JobExperienceTimeline/` - Job experience timeline components
    - `Skills/` - Skills display components
    - `shared/` - Shared utility components
  - `contexts/` - React context definitions
  - `providers/` - Context providers with business logic
  - `hooks/` - Custom React hooks (useThemeMode, useIntersectionObserver)
  - `pages/` - Page components for each section (Home, About, Experience, Hobbies)
  - `test/` - Testing utilities and setup files
  - `types/` - TypeScript type definitions
  - `assets/` - Static assets (images, resume data)
  - `theme.ts` - Material-UI theme configuration

## Architecture

The application uses a unique single-page architecture where all sections are rendered simultaneously, and navigation is handled through intersection observers that detect which section is currently visible and update the URL accordingly. This provides a smooth user experience while maintaining proper URL-based navigation.

### Key Patterns

- **Path Aliases**: Clean imports using `@components`, `@hooks`, `@pages`, `@types`, etc.
- **Component Extraction**: Large components broken into smaller, focused modules
- **Theme Context**: Centralized theme management with localStorage persistence
- **Intersection Observer Pattern**: Automatic section detection for navigation
- **Comprehensive Testing**: 200+ tests covering components, hooks, and pages
- **Type Safety**: Full TypeScript coverage with custom type definitions

## Quality Assurance

- **Comprehensive Testing**: 200+ tests with Vitest and React Testing Library covering components, hooks, and pages
- **Accessibility**: Optimized for screen readers and keyboard navigation
- **TypeScript**: Full type coverage for enhanced developer experience
- **ESLint**: Code quality enforcement with consistent formatting
- **Path Aliases**: Clean, maintainable import structure
- **Build Validation**: Automated linting and type-checking before production builds

## Accessibility

The application is built with accessibility in mind:
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic HTML markup throughout
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Screen reader optimization
