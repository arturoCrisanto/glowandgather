# Glow and Gather 🕯️

An e-commerce platform dedicated to selling premium, handcrafted candles. This application provides a complete online shopping experience for candle enthusiasts.

## About the Project

Glow and Gather is a modern web application built to showcase and sell artisan candles. The platform is designed with a focus on user experience, performance, and scalability. It leverages Next.js's powerful features to deliver a fast, SEO-friendly shopping experience.

## Tech Stack

- **Next.js 16** - A React framework with App Router, server components, and optimized performance
- **React 19** - Latest React with concurrent rendering capabilities
- **TypeScript** - Full type safety from database to UI for better code quality and fewer bugs
- **Prisma 7** - Type-safe ORM for MongoDB with automatic migrations
- **MongoDB** - NoSQL database for flexible product and user data management
- **Tailwind CSS 4** - Utility-first CSS framework for responsive, maintainable styling
- **GSAP 3** - Advanced animations and interactive effects
- **Lucide React** - Beautiful, consistent icon library
- **Bcrypt** - Secure password hashing for admin authentication
- **Playfair Display & Inter Fonts** - Optimized font loading for premium branding

## Project Architecture

```
glowandgather/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout with Navbar and metadata
│   ├── page.tsx           # Home page with Hero Section and Features
│   ├── about/
│   │   └── page.tsx       # About Us page
│   ├── products/
│   │   └── page.tsx       # Products catalog page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Navbar.tsx         # Sticky navigation with mobile menu
│   ├── HeroSection.tsx    # Animated hero section with GSAP
│   └── SplitText.jsx      # Character split animation component
├── lib/                   # Shared utilities and logic
│   ├── fonts.ts          # Font configuration (Playfair Display, Inter)
│   ├── utils.ts          # General utility functions
│   ├── prisma.ts         # Prisma client initialization
│   ├── dal/              # Data Access Layer
│   │   ├── index.ts
│   │   ├── repositories/ # Data repository patterns
│   │   │   ├── admin.repository.ts
│   │   │   └── index.ts
│   │   └── services/     # Business logic layer
│   │       ├── admin.service.ts
│   │       └── index.ts
│   └── helpers/          # Reusable helper functions
│       ├── error-handler.ts
│       ├── logger.ts
│       ├── metadata.ts   # SEO metadata generation
│       ├── response.ts   # API response formatting
│       └── index.ts
├── prisma/               # Database configuration
│   └── schema.prisma     # Database schema with models:
│                         #   - Admin (authentication)
│                         #   - Product (candles, sprays, wax melts)
│                         #   - ContactMessage (form submissions)
├── public/               # Static files
│   ├── icons/           # SVG icons
│   └── images/          # Product and hero images
├── components.json      # shadcn/ui configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS customization
├── postcss.config.mjs   # PostCSS configuration
├── next.config.ts       # Next.js configuration
└── eslint.config.mjs    # ESLint configuration
```

## Key Features

### Frontend Components

- **Navbar** - Sticky navigation with mobile hamburger menu, responsive design
- **Hero Section** - Full-height animated section with GSAP character animations
- **Features Collection** - Grid layout showcasing product benefits with hover effects
- **Responsive Design** - Mobile-first approach for all screen sizes

### E-commerce Functionality

- **Product Catalog** - Browse through a curated collection of premium candles
- **Product Management** - Database-driven product information with flexible categorization
- **Admin System** - Secure admin authentication with bcrypt password hashing
- **Contact Form** - Customer message submission and tracking

### Product Categories

- Candles
- Room Sprays
- Wax Melts

### Technical Features

- **Server & Client Components** - Optimized performance with React Server Components
- **Type Safety** - End-to-end type safety with TypeScript and Prisma
- **Database Integration** - MongoDB with Prisma for flexible data management
- **Animated Interactions** - GSAP-powered animations for engaging UI
- **SEO Optimization** - Metadata generation with Next.js API and open graph support
- **Image Optimization** - Next.js Image component with responsive sizing

## Development Approach

This project follows modern web development best practices:

- **Component-based Architecture** - Modular, reusable React components
- **Data Access Layer (DAL)** - Separation of concerns with dedicated repositories and services
- **Type-safe Queries** - Prisma ensures all database queries are type-checked at compile time
- **Helper Functions** - Centralized utility functions for common operations
- **Error Handling** - Dedicated error handler for consistent error management
- **Logging** - Logger utility for debugging and monitoring

## Database Models

The application uses MongoDB with Prisma and includes:

### Admin Model

- Email and hashed password for authentication
- Name and timestamps

### Product Model

- Name, category, price, and description
- Flexible sizing (bottle size for sprays, weight for candles/wax melts)
- Ingredients array and scent profile
- Multiple images support
- Stock and featured status tracking
- Indexed by category and featured status for performance

### ContactMessage Model

- Customer name, email, subject, and message
- Read status tracking
- Indexed by read status and creation date for efficient queries

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd glowandgather
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file with your database connection string:

```
DATABASE_URL=your_mongodb_connection_string
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint code quality checks

## Technologies Rationale

- **Next.js 16**: Chosen for excellent performance, built-in optimizations, and seamless full-stack capabilities
- **Prisma 7**: Simplifies database operations while maintaining type safety with MongoDB
- **GSAP**: Industry-standard for smooth, performant animations
- **Tailwind CSS**: Rapid development with utility-first approach while maintaining consistency
- **TypeScript**: Ensures reliability and reduces runtime errors through static typing

## Project Status

Currently in active development on the `navbar` branch with focus on:

- Responsive navigation implementation
- Hero section animations
- Product collection display
- Admin authentication system

---

Built with ❤️ for candle lovers everywhere
