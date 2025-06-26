# Portfolio Website - replit.md

## Overview

This is a professional portfolio website for Hanzla Nawaz, an AI/ML Engineer. The application is built as a full-stack web application using React for the frontend and Express.js for the backend, with a PostgreSQL database for data persistence. The portfolio showcases projects, experience, certificates, and includes interactive features like contact forms and blog sections.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Theme Support**: Built-in dark/light mode with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure (routes to be implemented)
- **Request Logging**: Custom middleware for API request logging
- **Error Handling**: Centralized error handling middleware

### Database & ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Schema**: User authentication schema (extensible for portfolio data)
- **Connection**: Neon serverless PostgreSQL driver

## Key Components

### Frontend Components
- **Layout Components**: Navbar with smooth scrolling, responsive design
- **Portfolio Sections**: Hero, Experience, Projects, Certificates, Volunteer work, Blog, Contact
- **Interactive Features**: 
  - Scroll animations with Intersection Observer
  - Mobile-responsive navigation
  - Image upload for project demos
  - Contact form with toast notifications
- **UI System**: Complete design system with consistent theming

### Backend Components
- **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for database integration)
- **Authentication Ready**: User schema and CRUD operations defined
- **Development Tools**: Vite integration for hot module replacement in development

### Build System
- **Frontend Build**: Vite with React plugin and custom aliases
- **Backend Build**: ESBuild for server-side bundling
- **Development**: Concurrent development with hot reloading
- **Production**: Static file serving with Express

## Data Flow

1. **Client Requests**: React Router handles client-side navigation
2. **API Communication**: TanStack Query manages server communication with automatic caching
3. **Server Processing**: Express routes handle API requests (authentication, data CRUD)
4. **Database Operations**: Drizzle ORM provides type-safe database interactions
5. **Response Handling**: Standardized JSON responses with error handling
6. **State Updates**: Query cache invalidation triggers UI updates

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React-DOM, React Router alternative Wouter)
- Express.js with TypeScript support
- Drizzle ORM with PostgreSQL adapter

### UI & Styling
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible components
- Lucide React for icons
- Custom fonts (Inter) loaded via Google Fonts

### Development Tools
- Vite for frontend bundling and development
- ESBuild for backend bundling
- TypeScript for type safety
- Drizzle Kit for database migrations

### External Services
- Neon Database for PostgreSQL hosting
- Replit for development environment
- Email service integration ready (contact form)

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module in Replit
- **Hot Reloading**: Vite dev server with Express proxy
- **Port Configuration**: Internal port 5000, external port 80

### Production Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server to `dist/index.js`
3. **Asset Handling**: Static files served from build directory
4. **Database**: Automated migrations via Drizzle Kit

### Deployment Configuration
- **Target**: Autoscale deployment on Replit
- **Build Command**: `npm run build` (builds both frontend and backend)
- **Start Command**: `npm run start` (runs production server)
- **Environment Variables**: Database URL configuration required

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

✓ Enhanced portfolio with professional features for academic and industry applications
✓ Added comprehensive Skills section with interactive progress bars
✓ Created Professional Achievements section for recognition and contributions
✓ Enhanced Hero section with expertise areas focus
✓ Improved project cards with technology badges and qualitative impact descriptions
✓ Removed placeholder metrics and made content authentic to user's experience
✓ Set up GitHub Pages deployment with automated CI/CD pipeline
✓ Created deployment scripts and comprehensive documentation

## Changelog

- June 25, 2025: Enhanced portfolio for academic/industry applications with skills visualization, research section, and GitHub Pages deployment setup