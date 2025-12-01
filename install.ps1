# Installation Script for Windows PowerShell

Write-Host "🚀 Glow and Gather - Installation Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install dependencies
Write-Host "📦 Step 1: Installing authentication packages..." -ForegroundColor Yellow
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install packages" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Packages installed successfully!" -ForegroundColor Green
Write-Host ""

# Step 2: Check for .env file
Write-Host "🔧 Step 2: Checking environment variables..." -ForegroundColor Yellow

if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  No .env file found. Creating template..." -ForegroundColor Yellow
    
    $envContent = @"
# MongoDB Connection (REQUIRED)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/glowandgather"

# JWT Secret (REQUIRED - change this!)
JWT_SECRET="change-this-to-a-long-random-string-$(Get-Random -Maximum 999999)"

# Email Service (OPTIONAL)
RESEND_API_KEY="re_your_api_key_here"
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Created .env template file" -ForegroundColor Green
    Write-Host "⚠️  IMPORTANT: Update DATABASE_URL in .env file!" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Write-Host ""

# Step 3: Generate Prisma Client
Write-Host "🗄️  Step 3: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma client" -ForegroundColor Red
    Write-Host "⚠️  Make sure DATABASE_URL is set in .env" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Prisma client generated!" -ForegroundColor Green
Write-Host ""

# Step 4: Push schema to database
Write-Host "📤 Step 4: Pushing schema to database..." -ForegroundColor Yellow
Write-Host "⚠️  Make sure your MongoDB is running and DATABASE_URL is correct!" -ForegroundColor Yellow
Write-Host ""

$pushSchema = Read-Host "Do you want to push schema to database now? (y/n)"

if ($pushSchema -eq "y" -or $pushSchema -eq "Y") {
    npx prisma db push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Schema pushed successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to push schema" -ForegroundColor Red
        Write-Host "⚠️  Check your DATABASE_URL and database connection" -ForegroundColor Yellow
    }
} else {
    Write-Host "⏭️  Skipped database push" -ForegroundColor Yellow
    Write-Host "   Run manually: npx prisma db push" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🎉 Installation Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Update DATABASE_URL in .env file" -ForegroundColor White
Write-Host "2. Run: npx prisma db push (if not done)" -ForegroundColor White
Write-Host "3. Create admin user (see QUICK_START.md)" -ForegroundColor White
Write-Host "4. Run: npm run dev" -ForegroundColor White
Write-Host "5. Visit: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "- QUICK_START.md - Quick setup guide" -ForegroundColor White
Write-Host "- SETUP_GUIDE.md - Detailed documentation" -ForegroundColor White
Write-Host "- PROJECT_SUMMARY.md - Feature overview" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Cyan
