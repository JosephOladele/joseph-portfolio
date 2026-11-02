# Joseph Oladele — Portfolio

A warm, lamp-lit portfolio built with Vite + React and Framer Motion, organised around one idea: **magic happens behind the doors**. Each service is a painted door; tap one and the camera flies through it into a room with the details, tools and projects for that area. A pull cord switches the lights between dark and light mode.

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

Everything editable (name, roles, bio, stats, the doors, the timeline, projects, open source, socials, email, Formspree endpoint, photo) lives in the single `CONFIG` object at the top of `src/App.jsx`. Your photo is `public/joseph.jpg`; project previews are in `public/previews/`.

## Structure

```
src/
  App.jsx                  ← CONFIG + page assembly
  index.css                ← design tokens & all styling (light theme under [data-theme="light"])
  lib/theme.js             ← light / dark switch
  components/
    Hero.jsx  FlipRole.jsx ← "Hi, I'm Joseph. I am a" + the flip calendar
    PullCord.jsx           ← the lights switch
    Doors.jsx              ← doors, hover focus, camera flight, rooms
    Timeline.jsx           ← "Let's go back in time"
    Work.jsx  OpenSource.jsx  Contact.jsx  Footer.jsx  Nav.jsx
    RobotHero.jsx          ← Spline robot (falls back quietly if WebGL fails)
vercel.json                ← security headers and caching
```

## Security

`vercel.json` sends a strict Content Security Policy plus the usual hardening headers (no framing, no MIME sniffing, HSTS, locked down permissions). The CSP allows only the outside services the site uses: Google Fonts, Fontshare, Spline, the GitHub API and Formspree. If you add a new outside service, add its origin there.

The small inline script in `index.html` (it applies the saved theme before first paint) is allowed by its sha256 hash. If you change it, regenerate the hash in `vercel.json`.

The contact form has a hidden `_gotcha` field that Formspree uses to drop bot submissions, and length limits on every field.

## Accessibility & performance

- Every animation has a `prefers-reduced-motion` fallback
- Smooth scrolling (Lenis) is desktop only; touch devices keep native scrolling
- The door rooms are real dialogs: focus moves in, Escape leaves
- Checked for horizontal overflow from 320px to 1920px wide
