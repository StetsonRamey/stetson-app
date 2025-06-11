# Stetson App - Eleventy + WebC + BasecoatUI Project

## Tech Stack
- **Eleventy 3.0+** with WebC components
- **Tailwind CSS** for utility styling
- **BasecoatUI** component library with Sourcegraph color theme
- **Alpine.js** for interactive components
- **Eleventy Image** plugin for responsive images

## Commands
```bash
# Development (builds CSS and starts dev server)
npm run serve

# Production build
npm run build

# Debug mode
npm run debug
```

## Project Structure
```
src/
├── _includes/          # WebC components (*.webc)
├── _layouts/           # Page layouts (*.webc)
│   ├── base.webc      # Main layout template
│   └── styles.css     # Main CSS with Tailwind + BasecoatUI + Sourcegraph theme
├── index.webc         # Homepage
└── ...

_site/                 # Built output
```

## WebC Component Setup
- Components in `src/_includes/**/*.webc` are auto-discovered
- Use semantic HTML: `<header>`, `<section>`, `<footer>` within `.card` elements
- CSS styles in components are bundled inline via `getBundle('css')`

## Sourcegraph Theme Colors
Custom CSS variables override BasecoatUI defaults:
- `--primary`: #da251b (vermilion-6)
- `--accent`: #914bdc (violet-6) 
- `--background`: #060000 (vermilion-0)
- `--foreground`: #fff3f0 (vermilion-11)
- Font: "Poly Sans", Arial, sans-serif

## BasecoatUI Extensions
- Added custom `btn-accent` class for accent color buttons
- Uses semantic HTML structure for components

## Notes
- Tailwind CSS processes `src/_layouts/styles.css` → `_site/styles.css`
- External scripts/styles need `webc:keep` attribute
- BasecoatUI components expect specific HTML structure (not just CSS classes)
