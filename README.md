# JINCU Furniture Official Website

## Project Overview
High-end minimalist furniture company website built with Nuxt 4 and Tailwind CSS.
Focuses on natural wood aesthetics, minimalism, and premium visual experience.

## Features
- **Minimalist Design**: Clean layout, wood tones, and ample whitespace.
- **Responsive**: Fully adapted for Desktop (1920px/1366px) and Mobile devices.
- **Components**:
  - `TheHeader`: Sticky navigation with transparency effects.
  - `HeroSection`: Full-screen immersive banner.
  - `BrandIntro`: Storytelling section with left-right layout.
  - `ProductShowcase`: Grid layout with category filtering tabs.
  - `Craftsmanship`: Step-by-step process visualization.
  - `ContactSection`: Contact form and information.
  - `TheFooter`: Simple copyright footer.

## Tech Stack
- **Framework**: Nuxt 4
- **Styling**: Tailwind CSS
- **Fonts**: Montserrat (Headings), Roboto/PingFang SC (Body)

## Setup & Run

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
node .output/server/index.mjs
```

## Project Structure
- `app/`: Source code directory.
  - `components/`: Vue components.
  - `assets/`: Static assets and global CSS.
  - `app.vue`: Main entry component.
- `nuxt.config.ts`: Nuxt configuration.
- `tailwind.config.js`: Tailwind styling configuration.
