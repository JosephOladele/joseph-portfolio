# Joseph Oladele — Portfolio

An editorial, dark, single-accent portfolio built with Vite + React, React Three Fiber, and Framer Motion. The hero is an interactive filament-swirl animation (recreated from the reference video): dozens of glowing strands flowing around a loop that bend and curl around your cursor.

## Run locally

```bash
npm install
npm run dev
```

## Build / deploy

```bash
npm run build   # outputs to dist/
```

Deploy to **Vercel**: import the repo, framework preset "Vite" — no extra config needed (build command `npm run build`, output `dist`).

## Editing content

Everything editable — name, role, tagline, bio, stats, skills, projects, socials, email, Formspree endpoint — lives in the single `CONFIG` object at the top of `src/App.jsx`.

## Structure

```
src/
  App.jsx                  ← CONFIG + page assembly
  index.css                ← design tokens & all styling
  components/
    Hero3D.jsx             ← interactive R3F filament swirl (the centerpiece)
    ScrollSpine.jsx        ← scroll-drawn SVG thread between sections
    Nav.jsx  About.jsx  Skills.jsx  Work.jsx  Contact.jsx  Footer.jsx
    Reveal.jsx             ← shared scroll-reveal animation
```

## Performance & accessibility notes

- Device pixel ratio capped at 2; filament/point counts scale down on mobile
- The 3D loop pauses when the hero scrolls offscreen or the tab is hidden
- All Three.js geometries/materials are disposed on unmount
- `prefers-reduced-motion` renders the swirl and the spine statically
- Labeled form fields, keyboard-navigable nav, focus-visible styles
