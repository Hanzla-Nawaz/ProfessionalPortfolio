# Deployment Guide for GitHub Pages

This guide will help you deploy your portfolio to GitHub Pages (username.github.io).

## 🎯 Quick Deployment Steps

### 1. Create GitHub Repository
```bash
# Option A: Create new repository on GitHub
# Go to github.com and create a new repository named: username.github.io
# (Replace 'username' with your actual GitHub username)

# Option B: Use existing repository
# You can also deploy to any repository with GitHub Pages
```

### 2. Push Your Code
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio commit"

# Add remote repository
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to main branch
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under "Source", select **GitHub Actions**
4. The deployment will start automatically

### 4. Access Your Portfolio
- Your portfolio will be available at: `https://yourusername.github.io`
- Deployment typically takes 2-5 minutes

## 🔧 Configuration Options

### Custom Domain (Optional)
If you have a custom domain:

1. **Update CNAME file**:
   ```bash
   # Edit public/CNAME file
   echo "yourdomain.com" > public/CNAME
   ```

2. **Configure DNS**:
   - Add CNAME record pointing to `yourusername.github.io`
   - Or A records pointing to GitHub Pages IPs

3. **Update GitHub Settings**:
   - Go to Settings > Pages
   - Add your custom domain

### Build Configuration
The deployment uses `vite.config.client.ts` for client-only builds:

```typescript
export default defineConfig({
  base: '/', // Change to '/repo-name/' for project pages
  build: {
    outDir: 'dist/public',
    // ... other options
  }
})
```

### GitHub Actions Workflow
The deployment is automated via `.github/workflows/deploy.yml`:

- **Triggers**: Push to main branch
- **Build**: Runs `npm run build:client`
- **Deploy**: Uses `peaceiris/actions-gh-pages`

## 🚨 Troubleshooting

### Common Issues

1. **404 Error**:
   - Check if GitHub Pages is enabled
   - Verify repository name (should be `username.github.io`)
   - Ensure main branch has content

2. **Build Fails**:
   - Check GitHub Actions logs
   - Verify all dependencies are in package.json
   - Test build locally: `npm run build:client`

3. **Assets Not Loading**:
   - Update base path in vite.config.client.ts
   - Check relative paths in components

4. **Deployment Delays**:
   - GitHub Pages can take 5-10 minutes to update
   - Check Actions tab for deployment status

### Manual Deployment (Alternative)
If automatic deployment doesn't work:

```bash
# One-command deployment
./deploy-github.sh
```

Or step by step:
```bash
# Build the project
node build-client.js

# Deploy manually
npx gh-pages -d dist/public
```

## 📝 Content Updates

### Updating Your Portfolio
1. **Edit content** in component files
2. **Test locally**: `npm run dev`
3. **Commit and push**: Git will trigger auto-deployment
4. **Wait 2-5 minutes** for changes to appear

### Adding New Sections
1. Create new component in `client/src/components/`
2. Import and add to `client/src/pages/home.tsx`
3. Update navigation in `client/src/components/navbar.tsx`

## 🔒 Security Notes

- Never commit sensitive data (API keys, passwords)
- Use environment variables for any secrets
- GitHub Pages serves static content only

## 📊 Analytics (Optional)

Add Google Analytics to track visitors:

1. Get GA tracking ID
2. Add to `client/index.html`
3. Configure privacy settings

---

**Need help?** Check GitHub Pages documentation or open an issue in this repository.