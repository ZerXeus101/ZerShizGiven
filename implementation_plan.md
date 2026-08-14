# Nuxt 4 + Tailwind v4 Website Initialization

This plan outlines the steps to initialize the core project structure, integrate the selected technologies (Nuxt, Nuxt Content, Tailwind v4), and build the foundation of the Renaissance-themed website based on our `context.md`.

## Open Questions
- None at this time. Awaiting the GitHub repository link to link the local repo.

## Proposed Changes

We will scaffold a new Nuxt application and set up the required dependencies directly in this directory.

### Project Setup
- **Initialize Git**: `git init` locally (Completed).
- **Initialize Nuxt**: Scaffold the base Nuxt app in the current directory (`npx nuxi@latest init . --force`).
- **Dependencies**: Install `@nuxt/content`, `@nuxtjs/color-mode`, `tailwindcss`, and `@tailwindcss/nuxt`.
  - *Note*: `@nuxtjs/color-mode` will be used to detect the system's Dark/Light preference while still allowing the user to override it via a manual toggle switch.

### Configuration
#### [NEW] `nuxt.config.ts`
- Configure Nuxt to load the `@nuxt/content`, `@nuxtjs/color-mode`, and `@tailwindcss/nuxt` modules.
- Add configuration to fetch Google Fonts (e.g., *Cinzel* for headings and *Lora* for body text) to match the classical theme.

#### [NEW] `assets/css/main.css`
- Initialize Tailwind v4 (`@import "tailwindcss";`).
- Define the custom CSS variables and theme extensions for our Renaissance Light and Dark modes (Parchment, Sepia, Charcoal, Gold accents).

### Component Architecture
#### [NEW] `app.vue`
- The root layout that applies the global background and text colors, wrapping the whole app in the elegant theme.

#### [NEW] `pages/index.vue`
- The main unified feed.
- Will use `queryContent()` from Nuxt Content to fetch all markdown files and display them chronologically.
- Includes the Filter Bar (All / Posts / Quotes).

#### [NEW] `components/ContentCard.vue`
- A reusable UI component that styles a single piece of content.
- Quotes will feature classic stylized blockquotes, and posts will feature standard elegant typography.

#### [NEW] `components/ThemeToggle.vue`
- A button to manually toggle between Light, Dark, and System mode to give the user ultimate control.

### Data Structure
#### [NEW] `content/`
- Directory for markdown files. We will create two initial sample files to ensure rendering works:
  - `content/posts/first-post.md`
  - `content/quotes/first-quote.md`
- These files will use YAML frontmatter to define the `date` and `type` (post/quote).

## Verification Plan
- Start the development server (`npm run dev`).
- Verify the feed loads both the sample post and quote from the `content` folder.
- Verify the filtering mechanism works correctly.
- Verify the manual Theme Toggle successfully overrides the system preference.
