# ProdigyDev — Premium Agency Website

A modern, animated digital agency website built with React, Vite, Tailwind CSS, and GSAP.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧱 Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| GSAP + ScrollTrigger | Animations |
| React Router v6 | Client-side routing |

## 📁 Structure

```
src/
├── animations/
│   ├── gsapAnimations.js   # Reusable GSAP helpers
│   └── useScrollReveal.js  # IntersectionObserver hook
├── components/
│   ├── Cursor.jsx          # Custom animated cursor
│   ├── Footer.jsx
│   ├── Marquee.jsx
│   ├── Navbar.jsx
│   ├── ProjectRow.jsx
│   └── ServiceCard.jsx
├── pages/
│   ├── Home.jsx            # Full homepage
│   ├── About.jsx           # About us page
│   └── Contact.jsx         # Contact form
├── styles/
│   └── index.css           # Global styles + Tailwind
├── App.jsx
└── main.jsx
```

## 🎨 Design System

- **Colors**: `#080808` black, `#c8f05e` accent green, `#f5f4f0` cream
- **Fonts**: Syne (display/headings) + DM Sans (body)
- **Custom cursor** with magnetic follow effect
- **GSAP ScrollTrigger** for section entrance animations
- **IntersectionObserver** reveal hook for scroll-triggered fades

## 🌐 Deploy

### Netlify
```bash
npm run build
# Drag & drop /dist folder to Netlify, or connect GitHub repo
```

### Vercel
```bash
npx vercel --prod
```

Add a `vercel.json` or `_redirects` for SPA routing:
```
/* /index.html 200
```

## 📜 License

MIT — ProdigyDev 2025
