# replit.md

## Overview

This is a modern full-stack web application featuring a personal portfolio for Hanzla Nawaz, an AI/ML Engineer. The application showcases a React-based frontend with a Node.js Express backend, designed to highlight professional experience, projects, skills, and provide contact functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and build processes

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API endpoints
- **Development**: Hot reload with tsx for development server

### UI Components
- **Design System**: shadcn/ui with Radix UI primitives
- **Theme**: Customizable CSS variables with light/dark mode support
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Key Components

### Frontend Components
- **Navigation**: Sticky navigation with smooth scroll functionality
- **Hero Section**: Professional introduction with call-to-action buttons
- **About Section**: Educational background and professional focus
- **Experience Section**: Timeline-based work history display
- **Projects Section**: Featured projects with technology tags and links
- **Skills Section**: Categorized technical skills with visual tags
- **Certifications Section**: Professional certifications and achievements
- **Blog Section**: External Medium blog integration
- **Contact Section**: Contact form with validation and submission handling
- **Footer**: Site navigation and professional information

### Backend Services
- **Contact API**: Form submission endpoint with validation
- **AI Generation API**: Google Gemini integration for image/video generation
- **Model Management API**: MLOps system for model inference and reports
- **Static File Serving**: Vite integration for development and production
- **Error Handling**: Centralized error middleware
- **Request Logging**: Custom middleware for API request tracking

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: User management with username/password authentication
- **Migration**: Drizzle-kit for database schema management
- **Connection**: Neon Database serverless PostgreSQL

## Data Flow

1. **Client Requests**: React frontend makes API calls using fetch
2. **Backend Processing**: Express routes handle requests with validation
3. **Database Operations**: Drizzle ORM manages database interactions
4. **Response Handling**: Structured JSON responses with error handling
5. **State Management**: TanStack Query caches and synchronizes server state

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router alternative)
- UI libraries (Radix UI, Lucide icons, class-variance-authority)
- Styling (Tailwind CSS, clsx, tailwind-merge)
- State management (TanStack Query)
- Form handling (React Hook Form, Hookform resolvers)
- Date utilities (date-fns)

### Backend Dependencies
- Express.js with TypeScript support
- Database (Drizzle ORM, Neon Database connector)
- Development tools (tsx, esbuild)
- Session management (connect-pg-simple)
- Validation (Zod, drizzle-zod)

### Development Tools
- Vite for build tooling and development server
- TypeScript for type safety
- ESLint and Prettier for code quality
- PostCSS for CSS processing

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` - Runs development server with hot reload
- **Port**: 5000 (configured in .replit)
- **Database**: PostgreSQL 16 module in Replit environment

### Production Build
- **Frontend Build**: Vite builds optimized static assets to `dist/public`
- **Backend Build**: esbuild bundles server code to `dist/index.js`
- **Start Command**: `npm run start` - Runs production server

### Platform Configuration
- **Replit Modules**: Node.js 20, Web, PostgreSQL 16
- **Deployment Target**: Autoscale deployment
- **Environment Variables**: DATABASE_URL for PostgreSQL connection

### Database Management
- **Push Changes**: `npm run db:push` - Applies schema changes to database
- **Migration Directory**: `./migrations` for version control
- **Schema Location**: `./shared/schema.ts` for type-safe database definitions

## Recent Changes

### GitHub Pages Deployment Configuration (June 25, 2025)
- Configured static deployment for free GitHub Pages hosting
- Created dual-mode API handling (dynamic for Replit, static for GitHub Pages)
- Built GitHub Actions workflow for automatic deployment
- Added static data simulation for model predictions and AI features
- Generated comprehensive deployment documentation and scripts

### AI Content Generation Project (June 25, 2025)
- Added interactive AI image/video generator using Google Gemini API
- Implemented real-time text-to-image generation with prompt optimization
- Created dedicated /ai-generator route with professional UI
- Added video concept generation and prompt analysis features

### MLOps Model Showcase (June 25, 2025)  
- Built comprehensive model management system for Transformer, ResNet50, and Scikit-learn models
- Implemented real-time model inference APIs with performance metrics
- Created interactive model showcase at /models route
- Added technical report generation and model comparison features
- Integrated metadata management and prediction confidence scoring

### Portfolio Enhancement (June 25, 2025)
- Updated projects section with live demo links for internal navigation
- Fixed CSS import ordering and navigation warnings
- Enhanced mobile responsiveness and smooth hover animations
- Added comprehensive error handling and loading states

## User Preferences

```
Preferred communication style: Simple, everyday language.
```