# Rupanjana Roy — Fashion Model Portfolio

An ultra-premium, Awwwards-quality fashion model portfolio website featuring cinematic animations, editorial layouts, and luxury interactions.

## Tech Stack

- **React 19** + **TypeScript** — Modern, type-safe UI
- **Vite** — Lightning-fast dev server & build
- **Tailwind CSS v4** — Utility-first styling with custom design tokens
- **Framer Motion** — Declarative animations & gestures
- **GSAP** + **ScrollTrigger** — High-performance scroll-driven animations
- **Lenis** — Buttery-smooth scroll experience
- **Embla Carousel** — Touch-friendly carousels
- **React Icons** — Icon library

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

The site will be available at `http://localhost:5173/`.

## Adding Your Images

Images are organized with clear placeholder spots. To add real photos:

### Hero Image
In `src/components/Hero/Hero.tsx`, replace the `<div className="image-placeholder">` with:
```tsx
<img src="/images/hero.jpg" alt="Rupanjana Roy" className="w-full h-full object-cover" />
```

### Gallery Images
In `src/data/portfolio.ts`, update the `src` field for each gallery image:
```ts
{ id: 1, src: '/images/gallery/001.jpg', alt: '...', category: 'editorial', aspect: 'portrait' },
```

### Category Covers
In `src/data/portfolio.ts`, update the `coverImage` field:
```ts
{ id: 'editorial', title: 'Editorial', coverImage: '/images/categories/editorial.jpg', ... },
```

### About Photo
In `src/components/About/About.tsx`, replace the placeholder div with an `<img>` tag.

### Video Reel
In `src/components/VideoReel/VideoReel.tsx`, add a video element or embed.

Place all image files in the `public/images/` directory.

## Project Structure

```
frontend/
├── public/              # Static assets (place images here)
├── src/
│   ├── animations/      # GSAP animation utilities
│   ├── components/      # React components
│   │   ├── About/
│   │   ├── Categories/
│   │   ├── Contact/
│   │   ├── Cursor/      # Custom cursor
│   │   ├── Experience/
│   │   ├── Footer/
│   │   ├── Gallery/     # Masonry + Lightbox
│   │   ├── Hero/
│   │   ├── Loader/      # Cinematic loading screen
│   │   ├── Measurements/
│   │   ├── Navbar/
│   │   ├── Reviews/
│   │   └── VideoReel/
│   ├── data/            # Portfolio data (edit here)
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global CSS + design tokens
│   ├── utils/           # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features

- 🎬 **Cinematic Loading** — Letter-by-letter name reveal with counter
- 🖱️ **Custom Cursor** — Outlined circle with hover expansion and text labels
- 🧈 **Smooth Scrolling** — Lenis with GSAP ScrollTrigger sync
- 📸 **Masonry Gallery** — Category filters, lightbox, keyboard/swipe nav
- 🎭 **Parallax Effects** — Hero image, scroll-driven transforms
- ✨ **Micro-animations** — Text reveals, image masks, stagger effects
- 🧲 **Magnetic Buttons** — Elements subtly follow cursor proximity
- 📱 **Mobile-First** — Responsive layouts with touch interactions
- 🌙 **Glassmorphism** — Frosted navbar on scroll
- ♿ **Accessible** — Semantic HTML, keyboard nav, reduced motion support

## Customization

Edit `src/data/portfolio.ts` to update:
- Personal info (name, measurements, languages)
- Contact details
- Experience entries
- Client reviews
- Social links
- Gallery images & categories

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory, ready for deployment.

## License

All rights reserved. © Rupanjana Roy.
