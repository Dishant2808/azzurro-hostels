# Azzurro Pod Hotels - Website Development Guide

## Overview
Azzurro Pod Hotels is a full-stack React application for a pod-style micro-hotel in Darling Harbour, Sydney. The project aims to provide a modern, responsive website with an integrated booking system, enhanced visual hierarchy, and improved user flow, reflecting the "Azzurro" brand with blue and white tones. The application is built with a React/TypeScript frontend, Express backend, and uses Drizzle ORM with PostgreSQL for data management. It seeks to optimize booking conversion through a clean design and user-centric features.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom Azzurro brand colors, incorporating modern UI/UX principles like gradients, rounded corners, and enhanced spacing. Dark mode support is included.
- **UI Components**: Radix UI components via shadcn/ui library
- **Build Tool**: Vite for fast development and optimized production builds
- **Design Principles**: Enhanced visual hierarchy with improved typography, color schemes, section layouts, and interactive elements (hover effects, smooth transitions). Layouts consistently use a centered design with proper spacing. Mobile responsiveness is prioritized.

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful API with `/api` prefix routing
- **Development**: Hot reloading with tsx for TypeScript execution

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Environment-based DATABASE_URL configuration
- **Schema**: Includes `Users`, `Favorites`, and `Reservations` tables with proper relations. The Reservations table stores complete booking data including guest information, payment details, and room information. Zod schema validation is integrated.

### Key Features & Design Choices
- **Booking System**: Merged booking and payment pages with step progression system. Integrated booking form shows guest details collection, then transitions to payment section after successful reservation creation. Progress steps show: "Your selection" (always completed), "Your details" (completed after API call), and "Finish booking" (active during payment). "Book Now" buttons dynamically open a booking modal for date/guest selection before adding to cart.
- **My Bookings & Trips**: Complete booking history management system with dedicated page (/my-bookings) accessible through profile panel. Features responsive booking cards displaying property name, room type, check-in/out dates, guest count, booking status, payment status, and total amount. Includes empty states, loading states, and authentication requirements.
- **Multi-Page Navigation**: Comprehensive pages include Home, Locations (Potts Point, Surry Hills, Central Sydney, Darling Harbour), About Us, Breakfast & Dinner, Discounts & Offers (now Rewards), FAQ, and Refund Policy. A collapsible location dropdown is in the sidebar.
- **Location Pages**: Redesigned templates for individual location pages featuring professional headers, image galleries, detailed descriptions, amenities, guest reviews, interactive map placeholders, and comprehensive booking sections. Room layouts are structured into distinct three-column (bed details, reviews, price) and responsive designs (vertical for mobile, horizontal for desktop).
- **User Authentication**: Integrated user authentication system using Replit Auth with PostgreSQL for user profiles, session management, and favorites/likes functionality.
- **User Profile Dashboard**: Comprehensive dashboard for managing bookings, favorites, and accessing FAQs.
- **Global Header**: Implemented with a promotional banner, shopping cart integration, profile access, and search functionality.
- **Currency System**: Comprehensive global currency system with CurrencyContext supporting 8 currencies (AUD, USD, EUR, GBP, JPY, CAD, SGD, NZD), localStorage persistence, and dynamic price updates across the site.
- **Image Updates**: Specific image updates for Central Sydney (Hotel Azzurro front entrance) and Darling Harbour (heritage-style exterior).

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon.
- **drizzle-orm**: Type-safe SQL query builder and ORM.
- **@tanstack/react-query**: Data synchronization for React.
- **wouter**: Minimalist routing library for React.

### UI Dependencies
- **@radix-ui/***: Low-level UI primitives.
- **tailwindcss**: Utility-first CSS framework.
- **class-variance-authority**: Utility for creating variant-based component APIs.
- **lucide-react**: Modern icon library.

### Development Dependencies
- **vite**: Fast build tool and development server.
- **tsx**: TypeScript execution engine for Node.js.
- **esbuild**: Fast JavaScript bundler for production builds.