# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development**: `npm run dev` - Start Vite development server
- **Build**: `npm run build` - TypeScript compilation followed by Vite build
- **Lint**: `npm run lint` - Run ESLint on the codebase
- **Preview**: `npm run preview` - Preview production build locally

## Architecture

This is a personal portfolio website built with React 19, TypeScript, Vite, and Material-UI. The application uses a single-page design with smooth scrolling navigation between sections.

### Key Architecture Patterns

**Single Page Navigation**: The app renders all sections (`Home`, `About`, `Experience`, `Hobbies`) simultaneously in `App.tsx` and uses intersection observers to detect which section is visible, automatically updating the URL via React Router.

**Theme System**: Custom light/dark theme implementation using Material-UI's `createTheme`. Theme state is managed via React Context (`ThemeModeContext`) with localStorage persistence and system preference detection.

**Component Structure**:
- `App.tsx` - Main application container with scroll-based navigation logic
- `Router.tsx` - React Router configuration (though routing is handled by scroll position)
- `src/contexts/` - React contexts for theme management
- `src/providers/` - Context providers with business logic
- `src/hooks/` - Custom hooks including `useThemeMode` and `useIntersectionObserver`
- `src/routes/` - Page components for each section
- `src/components/` - Reusable UI components
- `src/theme.ts` - Material-UI theme definitions with custom color palette

### Styling

Uses Material-UI's styled components with custom themes. Color palette centers around dark blue (`#01344D`) and light green (`#9CCE4D`) with smooth transitions between light/dark modes.

### State Management

- Theme mode: React Context with localStorage persistence
- Navigation: URL state managed by React Router, synchronized with scroll position via intersection observers