# Kathryn Herod - Personal Portfolio Website

A modern, responsive personal portfolio website built with React 19, TypeScript, and Material-UI. Features a single-page design with smooth scrolling navigation and dynamic light/dark theme switching.

## Features

- **Single-page navigation** with smooth scrolling between sections
- **Dynamic theme switching** with light/dark mode support
- **Responsive design** optimized for desktop and mobile
- **Intersection observer navigation** that updates URL based on scroll position
- **Material-UI integration** with custom color palette and styling
- **TypeScript** for enhanced developer experience and type safety

## Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - React component library with theming
- **React Router** - Client-side routing
- **ESLint** - Code linting and formatting

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
  - `components/` - Reusable React components
  - `contexts/` - React context definitions
  - `providers/` - Context providers with business logic
  - `hooks/` - Custom React hooks
  - `routes/` - Page components for each portfolio section
  - `theme.ts` - Material-UI theme configuration

## Architecture

The application uses a unique single-page architecture where all sections are rendered simultaneously, and navigation is handled through intersection observers that detect which section is currently visible and update the URL accordingly. This provides a smooth user experience while maintaining proper URL-based navigation.
