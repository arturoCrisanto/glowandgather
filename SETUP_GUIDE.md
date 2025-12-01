# Glow and Gather - E-commerce Platform

A full-stack e-commerce platform for handcrafted candles, room sprays, and wax melts built with Next.js 14, TypeScript, Prisma, and MongoDB.

## 🌟 Features

### Customer Features

- **Homepage**: Dynamic hero section with best seller products
- **Products Page**: Category filtering (Candles, Room Sprays, Wax Melts) with reusable ProductCard component
- **Contact Form**: Auto-email functionality for customer inquiries
- **About Page**: Company story and values
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Admin Features

- **Admin Dashboard**: Manage products and view contact messages
- **Product Management**:
  - Add new products with details (name, price, description, category, image)
  - Mark products as "Best Sellers" to display on homepage
  - Toggle product visibility (active/inactive)
  - Delete products
- **Contact Messages**: View all customer inquiries with unread indicators
- **Secure Authentication**: Admin login with JWT tokens

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: JWT (bcryptjs + jsonwebtoken)
- **Email**: Ready for Resend/Nodemailer integration

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd glowandgather
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install required packages for authentication**

   ```bash
   npm install bcryptjs jsonwebtoken
   npm install -D @types/bcryptjs @types/jsonwebtoken
   ```

4. **Setup environment variables**
   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="your-mongodb-connection-string"

   # JWT Secret (change this in production)
   JWT_SECRET="your-secure-secret-key-here"

   # Email Service (optional - for contact form emails)
   RESEND_API_KEY="your-resend-api-key"
   ```

5. **Setup Prisma**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Create an admin user** (Run this in Prisma Studio or MongoDB)

   ```javascript
   // Use bcryptjs to hash the password first
   const bcrypt = require('bcryptjs');
   const hashedPassword = await bcrypt.hash('your-password', 10);

   // Then create admin in database with hashed password
   {
     email: "admin@glowandgather.com",
     password: hashedPassword,
     name: "Admin"
   }
   ```

7. **Run the development server**

   ```bash
   npm run dev
   ```

8. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
glowandgather/
├── app/
│   ├── page.tsx                    # Homepage with best sellers
│   ├── layout.tsx                  # Root layout with Navbar & Footer
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── admin/
│   │   └── page.tsx               # Admin dashboard
│   ├── contact/
│   │   └── page.tsx               # Contact form page
│   ├── login/
│   │   └── page.tsx               # Admin login page
│   ├── products/
│   │   └── page.tsx               # Products listing with filters
│   └── api/
│       ├── auth/
│       │   └── login/
│       │       └── route.ts       # Admin authentication
│       ├── contact/
│       │   └── route.ts           # Contact form handler
│       └── products/
│           ├── route.ts           # GET all, POST new product
│           └── [id]/
│               └── route.ts       # PATCH, DELETE product
├── components/
│   ├── FeatureCard.tsx            # Reusable feature card
│   ├── Footer.tsx                 # Site footer
│   ├── HeroSection.tsx            # Hero section component
│   ├── Navbar.tsx                 # Navigation bar
│   └── ProductCard.tsx            # Reusable product card
├── lib/
│   ├── prisma.ts                  # Prisma client instance
│   ├── fonts.ts                   # Custom fonts (Playfair, Inter)
│   └── helpers/
│       ├── email.ts               # Email service helpers
│       └── ...
└── prisma/
    └── schema.prisma              # Database schema
```

## 🗄️ Database Schema

### Product Model

- name, description, price, category
- images (array), ingredients (array)
- isBestSeller (for homepage display)
- isActive (visibility toggle)
- inStock, bottleSize, weight, burnTime

### ContactMessage Model

- name, email, subject, message
- isRead (for admin notifications)
- createdAt

### Admin Model

- email, password (hashed)
- name, createdAt, updatedAt

## 🔐 Admin Access

1. Navigate to `/login`
2. Enter admin credentials
3. Access dashboard at `/admin`

**Dashboard Features:**

- View all products in a table
- Toggle "Best Seller" status (shows on homepage)
- Toggle "Active" status (hide/show products)
- Add new products with form
- View contact messages with unread indicators

## 📧 Email Configuration (Optional)

To enable auto-email functionality for the contact form:

1. **Install Resend**

   ```bash
   npm install resend
   ```

2. **Get API Key**

   - Sign up at [resend.com](https://resend.com)
   - Get your API key

3. **Update `.env`**

   ```env
   RESEND_API_KEY="your-api-key"
   ```

4. **Uncomment email code**
   - Update `lib/helpers/email.ts`
   - Update `app/api/contact/route.ts` to call email functions

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Setup

- Use MongoDB Atlas for production
- Update `DATABASE_URL` in Vercel environment variables

## 🎨 Customization

### Colors & Branding

Edit `app/globals.css` to change theme colors:

```css
:root {
  --primary: ...;
  --foreground: ...;
}
```

### Fonts

Fonts are configured in `lib/fonts.ts`:

- Playfair Display (headings)
- Inter (body text)

## 📝 API Endpoints

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PATCH /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Contact

- `GET /api/contact` - Get all messages (admin)
- `POST /api/contact` - Submit contact form

### Authentication

- `POST /api/auth/login` - Admin login

## 🐛 Troubleshooting

### Issue: Cannot connect to database

- Check MongoDB connection string in `.env`
- Ensure database is running
- Run `npx prisma generate`

### Issue: Admin login not working

- Ensure bcryptjs is installed
- Check if admin user exists in database
- Verify password is hashed correctly

### Issue: Products not showing

- Run Prisma migrations: `npx prisma db push`
- Check if products exist in database
- Verify `isActive` is set to true

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Built with ❤️ using Next.js and TypeScript
