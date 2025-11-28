# Glow and Gather 🕯️

An e-commerce platform dedicated to selling premium, handcrafted candles. This application provides a complete online shopping experience for candle enthusiasts.

## About the Project

Glow and Gather is a modern web application built to showcase and sell artisan candles. The platform is designed with a focus on user experience, performance, and scalability. It leverages Next.js's powerful features to deliver a fast, SEO-friendly shopping experience.

## Tech Stack

- **Next.js 15** - A React framework that provides server-side rendering, static site generation, and optimal performance out of the box
- **TypeScript** - Adds static typing to JavaScript for better code quality, fewer bugs, and improved developer experience
- **Prisma** - A next-generation ORM that makes database management easier with type-safe queries and migrations
- **CSS** - Custom styling for a unique brand experience
- **Geist Font** - Optimized font loading using Next.js font optimization features

## Project Architecture

```
glowandgather/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── lib/                   # Shared utilities and logic
│   ├── dal/              # Data Access Layer - handles database operations
│   ├── helpers/          # Reusable helper functions
│   ├── fonts.ts          # Font configuration
│   └── prisma.ts         # Prisma client initialization
├── prisma/               # Database configuration
│   └── schema.prisma     # Database schema defining models and relations
├── public/               # Static files (images, icons, etc.)
└── [config files]        # TypeScript, ESLint, Next.js configurations
```

## Key Features

### E-commerce Functionality
- **Product Catalog** - Browse through a curated collection of premium candles
- **Product Management** - Database-driven product information and inventory
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices

### Technical Features
- **Server Components** - Utilizing Next.js 15's App Router for optimal performance
- **Type Safety** - End-to-end type safety from database to UI with TypeScript and Prisma
- **Database Integration** - Structured data management with Prisma ORM
- **Optimized Assets** - Automatic image and font optimization
- **SEO Ready** - Built-in SEO optimization with Next.js metadata API

## Development Approach

This project follows modern web development best practices:

- **Component-based Architecture** - Modular, reusable React components
- **Data Access Layer** - Separation of concerns with dedicated DAL for database operations
- **Type-safe Queries** - Prisma ensures all database queries are type-checked at compile time
- **Helper Functions** - Reusable utility functions for common operations
- **CSS Modules** - Scoped styling to avoid conflicts and improve maintainability

## Database Structure

The application uses Prisma as its ORM, which provides:
- Type-safe database client
- Easy-to-read schema definition
- Automated migrations
- Built-in connection pooling

The database schema (defined in `prisma/schema.prisma`) manages all product data, inventory, and related e-commerce information.

## Why These Technologies?

- **Next.js 15**: Chosen for its excellent performance, built-in optimizations, and seamless full-stack capabilities
- **TypeScript**: Ensures code reliability and reduces runtime errors through static typing
- **Prisma**: Simplifies database operations while maintaining type safety throughout the stack
- **App Router**: Leverages React Server Components for faster page loads and better user experience

---

Built with ❤️ for candle lovers everywhere