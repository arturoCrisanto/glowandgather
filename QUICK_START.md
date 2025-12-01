# 🚀 Quick Start Checklist

## ☑️ Pre-Launch Setup

### Step 1: Install Dependencies

```bash
# Install auth packages (REQUIRED)
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

# Install email service (OPTIONAL - for contact form emails)
npm install resend
```

### Step 2: Environment Variables

Create `.env` file in root directory:

```env
# MongoDB Connection (REQUIRED)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/glowandgather"

# JWT Secret (REQUIRED - change this!)
JWT_SECRET="change-this-to-a-long-random-string-in-production"

# Email Service (OPTIONAL)
RESEND_API_KEY="re_your_api_key_here"
```

### Step 3: Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio (optional - to view/edit data)
npx prisma studio
```

### Step 4: Create Admin User

**Option A: Using Prisma Studio**

1. Run `npx prisma studio`
2. Go to Admin model
3. Click "Add record"
4. First, hash your password in Node.js:
   ```javascript
   const bcrypt = require("bcryptjs");
   const hash = await bcrypt.hash("yourpassword", 10);
   console.log(hash);
   ```
5. Add admin with:
   - email: admin@glowandgather.com
   - password: [paste hashed password]
   - name: Admin

**Option B: Using MongoDB Shell/Compass**

```javascript
// In MongoDB shell or Compass
db.Admin.insertOne({
  email: "admin@glowandgather.com",
  password: "$2a$10$hashedpasswordhere", // Use bcrypt to hash first
  name: "Admin",
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

### Step 5: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🎯 First-Time Usage Guide

### 1. Login to Admin

- Go to http://localhost:3000/login
- Use the admin credentials you created
- You'll be redirected to the dashboard

### 2. Add Your First Product

- Click "+ Add Product" button
- Fill in:
  - Product Name (e.g., "Lavender Dreams")
  - Price (e.g., 24.99)
  - Category (Candles/Room Sprays/Wax Melts)
  - Image URL (e.g., "/images/candle1.jpg")
  - Description
- Click "Add Product"

### 3. Mark as Best Seller

- Find your product in the table
- Click the "No" button under "Best Seller" column
- It will turn to "Yes" with yellow background
- This product will now appear on the homepage!

### 4. View on Homepage

- Go to http://localhost:3000
- Scroll down to "Best Sellers" section
- Your product should appear there!

### 5. Test Contact Form

- Go to http://localhost:3000/contact
- Fill out the form
- Submit
- Return to admin dashboard
- Click "Contact Messages" tab
- Your message should be there!

---

## 📝 Common Tasks

### Adding Products

1. Admin Dashboard → "+ Add Product"
2. Fill form → Submit
3. Product appears in table

### Featuring Products on Homepage

1. Find product in table
2. Click "Best Seller" toggle
3. Product appears on homepage (max 3)

### Hiding Products

1. Find product in table
2. Click "Active" toggle to make it "Hidden"
3. Product disappears from customer views

### Viewing Contact Messages

1. Admin Dashboard → "Contact Messages" tab
2. Unread messages have blue border
3. All messages sorted newest first

---

## 🎨 Customization Guide

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --primary: 210 95% 61%; /* Change this */
  --primary-foreground: 0 0% 100%;
}
```

### Update Images

1. Add images to `/public/images/`
2. Reference as `/images/your-image.jpg`
3. Update in admin when adding products

### Modify Categories

1. Edit `prisma/schema.prisma`:
   ```prisma
   enum ProductCategory {
     CANDLES
     ROOM_SPRAYS
     WAX_MELTS
     YOUR_NEW_CATEGORY  // Add here
   }
   ```
2. Run `npx prisma db push`
3. Update category arrays in components

---

## 🐛 Troubleshooting

### "Cannot find module 'bcryptjs'"

```bash
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

### "Invalid connection string"

- Check your `.env` file
- Ensure DATABASE_URL is correct
- Test connection in MongoDB Compass

### Admin login not working

- Verify admin user exists in database
- Check password is hashed (use bcrypt.hash())
- Check JWT_SECRET is set in `.env`

### Products not showing

- Check products have `isActive: true`
- Verify API is returning data (check console)
- Run `npx prisma studio` to view database

### Best sellers not on homepage

- Ensure products have `isBestSeller: true`
- Check products are also `isActive: true`
- Maximum 3 best sellers shown

---

## ✅ Production Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a secure random string
- [ ] Setup production MongoDB database (MongoDB Atlas)
- [ ] Add proper domain to email service (Resend)
- [ ] Update admin email addresses
- [ ] Add real product images
- [ ] Test all forms and API endpoints
- [ ] Setup error monitoring (Sentry, etc.)
- [ ] Configure CORS if needed
- [ ] Add rate limiting on API routes
- [ ] Enable HTTPS
- [ ] Test mobile responsiveness
- [ ] Add loading skeletons
- [ ] Implement proper error boundaries

---

## 📞 Need Help?

- Review `SETUP_GUIDE.md` for detailed documentation
- Check `PROJECT_SUMMARY.md` for feature overview
- Inspect API routes in `app/api/` directory
- View Prisma schema in `prisma/schema.prisma`

---

**Status**: Ready to launch after completing Steps 1-5! 🎉
