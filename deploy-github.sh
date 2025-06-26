#!/bin/bash

echo "🚀 Deploying Portfolio to GitHub Pages..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ This is not a git repository. Please initialize git first:"
    echo "   git init"
    echo "   git remote add origin https://github.com/yourusername/yourusername.github.io.git"
    exit 1
fi

# Build the client application
echo "📦 Building client application..."
node build-client.js

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Check if gh-pages package is available
if ! command -v gh-pages &> /dev/null; then
    echo "📦 Installing gh-pages..."
    npm install gh-pages
fi

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npx gh-pages -d dist/public

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your portfolio should be available at:"
    echo "   https://yourusername.github.io"
    echo ""
    echo "📝 Next steps:"
    echo "1. Replace 'yourusername' with your actual GitHub username"
    echo "2. Enable GitHub Pages in your repository settings"
    echo "3. Wait 2-5 minutes for deployment to complete"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi