# ZerShizGiven

A digital manuscript and thought gallery. This project blends classical aesthetics with modern, highly immersive web technologies like 3D WebGL backgrounds, glassmorphism UI, and momentum scrolling.

## 🛠 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **Content Management**: [Nuxt Content 3](https://content.nuxt.com/) (File-based Markdown CMS)
- **Styling & UI**: 
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - Custom Glassmorphism UI tokens
- **3D Immersion**:
  - [TresJS](https://tresjs.org/) (Vue wrapper for Three.js)
  - Custom WebGL mathematical geometries (Pyramids, Cubes, Paper Planes with particle trails)
- **Interactivity & Motion**:
  - [Lenis](https://lenis.studiofreight.com/) (Buttery smooth momentum scrolling)
  - [@vueuse/core](https://vueuse.org/) (Mouse-tracking for 3D card tilt effects)
- **Typography**: Google Fonts (Cinzel, Cinzel Decorative, Lora)

## 🎨 Key Features
- **Dynamic 3D Background**: Floating geometric shapes and paper planes powered by WebGL that scale and react to perspective.
- **Cinematic Parallax**: Background imagery tied to scroll velocity for massive physical depth.
- **Fluid UI**: Custom "Liquid Scrollbar" that elastically stretches based on scroll speed, and sliding pill highlight tabs.

## 🚀 Setup & Development

This project uses `pnpm` for package management.

### Install Dependencies
```bash
pnpm install
```

### Run Local Dev Server
```bash
pnpm run dev
```
Start the development server on `http://localhost:3000`.

### Build for Production
```bash
pnpm run build
```

## 🗺️ Future Roadmap

- **Admin Dashboard & Authentication**: Implement a secure login system and a protected dashboard route.
- **In-App Content Editor**: Transition from manual markdown file editing to an in-app WYSIWYG/markdown editor that allows creating, editing, and deleting quotes and posts directly from the browser.
