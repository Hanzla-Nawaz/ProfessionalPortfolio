#!/bin/bash

# GitHub Pages Deployment Script for Hanzla Nawaz Portfolio

echo "🚀 Deploying Portfolio to GitHub Pages"
echo "======================================="

# Step 1: Build the static version
echo "📦 Building static version..."
VITE_STATIC_DEPLOY=true npx vite build --config vite.config.static.ts

# Step 2: Create .nojekyll file to prevent Jekyll processing
echo "" > docs/.nojekyll

# Step 3: Add CNAME file if custom domain is needed (uncomment and modify)
# echo "yourdomain.com" > docs/CNAME

echo "✅ Build completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Create a GitHub repository named 'your-username.github.io'"
echo "2. Push this code to the repository:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial portfolio deployment'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git"
echo "   git push -u origin main"
echo ""
echo "3. Go to repository Settings > Pages > Source: GitHub Actions"
echo "4. Your portfolio will be live at: https://YOUR_USERNAME.github.io"
echo ""
echo "🎉 Portfolio ready for deployment!"