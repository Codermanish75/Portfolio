# Manish Singh — Portfolio Website

A modern, animated portfolio built with **React + Vite + Three.js**.

## ✨ Features
- 🌐 Interactive **Three.js 3D** particle background, wireframe meshes & floating cube
- 🖱️ Custom cursor with magnetic hover effect
- ⌨️ Typewriter role animation in hero section
- 🎴 3D perspective tilt on project cards (mouse tracking)
- 📜 Scroll-triggered reveal animations throughout
- 📱 Fully responsive design
- 🎨 Dark cyberpunk aesthetic with teal/purple accents

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
# 1. Enter the project folder
cd manish-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy anywhere.

## 🌐 Free Hosting Options

### GitHub Pages
```bash
npm run build
# Push the dist/ folder to your repo's gh-pages branch
```

### Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag & drop the `dist/` folder
3. Done! Live in seconds.

### Vercel
```bash
npm install -g vercel
vercel
```

## 🗂️ Project Structure

```
manish-portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── global.css
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx          ← Three.js 3D background
        ├── About.jsx         ← Floating wireframe cube
        ├── Skills.jsx
        ├── Projects.jsx      ← 3D tilt cards
        ├── Certifications.jsx
        ├── Education.jsx
        ├── Contact.jsx
        ├── Footer.jsx
        └── CustomCursor.jsx
```

## 🛠 Tech Stack
- **React 18** — UI framework
- **Vite** — Build tool
- **Three.js** — 3D graphics & animations
- **Framer Motion** — Animation library
- **react-intersection-observer** — Scroll reveal

---
Made with ❤️ by Manish Singh
