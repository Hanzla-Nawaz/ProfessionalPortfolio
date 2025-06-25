# GitHub Pages Deployment Guide

## Overview
This portfolio is configured for deployment to GitHub Pages with static hosting. The dynamic features (database, AI generation) are simulated with static data for demonstration purposes.

## Deployment Steps

### 1. Create GitHub Repository
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Portfolio with GitHub Pages support"

# Add remote repository (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The deployment will start automatically

### 3. Build and Deploy Locally (Optional)
```bash
# Build static version
npm run build:static

# The built files will be in the 'docs' folder
# You can also deploy manually using:
npm run deploy
```

## Features in Static Version

### ✅ Working Features
- Complete portfolio with all sections
- Responsive design and navigation
- Skills, experience, and projects showcase
- Model showcase with simulated predictions
- Contact form (shows success message)
- AI generator (shows demo placeholder)

### 🔄 Simulated Features
- **Model Predictions**: Uses pre-programmed responses that simulate real ML model outputs
- **Contact Form**: Shows success message but doesn't actually send emails
- **AI Generation**: Displays placeholder images with prompt text

### 📝 Notes
- The GitHub Pages version is a **demonstration portfolio**
- For full functionality with real AI integration and database, use the Replit deployment
- All styling, animations, and user interactions work identically
- Perfect for showcasing your portfolio design and frontend skills

## Repository Structure for GitHub Pages
```
docs/                 # Built static files (auto-generated)
.github/workflows/    # GitHub Actions for auto-deployment
client/src/           # Source code
vite.config.static.ts # Static build configuration
```

## Custom Domain (Optional)
To use a custom domain like `yourname.com`:
1. Add a `CNAME` file to the `docs` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

Your portfolio will be available at: `https://YOUR_USERNAME.github.io`