# Hanzla Nawaz - Professional Portfolio

A modern, responsive portfolio website showcasing AI/ML engineering expertise, built with React and Tailwind CSS.

## 🚀 Live Demo
Visit the portfolio: [https://hanzla-nawaz.github.io](https://hanzla-nawaz.github.io)

## 🛠️ Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Animations**: Framer Motion + Custom CSS
- **Deployment**: GitHub Pages
- **Build Tool**: Vite

## 📋 Features
- ✅ Modern, minimalist design with dark/light theme
- ✅ Fully responsive (mobile-first approach)
- ✅ Interactive skill charts and project demos
- ✅ Research publications and achievements showcase
- ✅ Contact form with social media integration
- ✅ SEO optimized with Open Graph tags
- ✅ Smooth scroll animations
- ✅ Professional resume download

## 🎯 Sections
1. **Hero** - Professional introduction with key metrics
2. **Skills** - Interactive technical expertise visualization
3. **Experience** - Timeline of professional journey
4. **Projects** - Featured AI/ML and cybersecurity projects
5. **Research** - Publications and academic achievements
6. **Certificates** - Professional certifications
7. **Volunteer** - Community contributions
8. **Blog** - Technical articles and insights
9. **Contact** - Get in touch form and social links

## 🚀 Deployment

### Automatic Deployment (Recommended)
This project uses GitHub Actions for automatic deployment to GitHub Pages:

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions
3. **Push to main branch** - deployment happens automatically

### Manual Deployment
```bash
# Install dependencies
npm install

# Deploy with one command
./deploy-github.sh
```

Or manually:
```bash
# Build for production
node build-client.js

# Deploy to GitHub Pages
npx gh-pages -d dist/public
```

## 🔧 Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:client
```

## 📁 Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
├── .github/workflows/    # GitHub Actions deployment
├── public/               # Static assets
└── vite.config.client.ts # Client build configuration
```

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `client/src/components/hero.tsx` - Name, title, and bio
- `client/src/components/experience.tsx` - Work experience
- `client/src/components/projects.tsx` - Your projects
- `client/src/components/contact.tsx` - Contact details and social links

### Styling
- Colors: `client/src/index.css`
- Components: `client/src/components/ui/`
- Custom animations: `client/src/hooks/use-scroll-animation.tsx`

### Content
- Resume PDF: Add to `public/assets/` directory
- Project images: Update image URLs in component files
- Blog posts: Update `client/src/components/blog.tsx`

## 📱 Responsive Design
The portfolio is built with a mobile-first approach:
- **Mobile**: < 640px - Single column layout
- **Tablet**: 640px - 1024px - Two column layout
- **Desktop**: > 1024px - Multi-column layout

## 🔍 SEO Features
- Meta tags and Open Graph support
- Semantic HTML structure
- Optimized images and loading
- Clean URLs and navigation

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing
Feel free to fork this project and customize it for your own portfolio. If you have suggestions for improvements, please open an issue or submit a pull request.

---

**Built with ❤️ by Hanzla Nawaz**