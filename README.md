# 3D Portfolio Website

Interactive personal portfolio for **Ritika Lama** — a React + Vite app with a terminal-style landing screen, a navigable 3D island home, content pages on animated gradient waves, and a WebGL art gallery.

---

## Features

| Area | What you get |
|------|----------------|
| **Landing (`/`)** | Fake terminal boot sequence; **Start** navigates to the 3D home |
| **Home (`/home`)** | Three.js island scene (island, sky, bird, plane); drag to rotate; stage popups link to About / Projects / Contact; optional background music |
| **About** | Skills grid + vertical experience timeline |
| **Projects** | Card grid of projects & research with external links |
| **Arts / Gallery** | Curved WebGL carousel (`CircularGallery`); click an artwork to open a modal (centered image + info box with title, year, description) |
| **Contact** | EmailJS form + animated Fox model; success/error alerts |
| **Navigation** | Bubble menu (GSAP) on all routes except landing |
| **Backgrounds** | `GradientWaves` shader backdrop on About, Projects, Gallery, and Contact |

---

## Tech stack

- **React 18** + **Vite 4**
- **React Router** — client-side routes
- **Three.js** + **@react-three/fiber** + **@react-three/drei** + **@react-spring/three** — 3D home & contact fox
- **ogl** — WebGL for `CircularGallery` and `GradientWaves`
- **Framer Motion** — page/modal motion
- **GSAP** — bubble menu + typing cursor
- **Tailwind CSS** — layout & styling
- **EmailJS** — contact form delivery
- **Lucide React** — icons

---

## Project structure

```
src/
├── App.jsx                 # Router + lazy-loaded Gallery
├── main.jsx                # React entry
├── index.css               # Global styles (fonts, utilities, gallery skeleton)
├── assets/
│   ├── icons/              # Skill / UI icons
│   ├── images/             # Photos, artworks, experience icons
│   └── sakura.mp3          # Home page ambient music
├── components/
│   ├── Alert.jsx           # Toast for contact form
│   ├── BubbleMenu.jsx      # Animated nav overlay
│   ├── CircularGallery.jsx # ogl curved image carousel
│   ├── GlitchPageLayout.jsx# Wave background page wrapper
│   ├── GradientWaves.jsx   # Full-screen wave shader
│   ├── IC.jsx              # Social links (GitHub, Instagram, LinkedIn)
│   ├── Information.jsx     # Home island stage callouts
│   ├── Loader.jsx          # 3D canvas loading spinner
│   ├── Navbar.jsx          # BubbleMenu config (hidden on `/`)
│   └── TextType.jsx        # Typing / deleting text effect
├── constants/
│   └── index.js            # skills, experiences, projects data
├── hooks/
│   └── useAlert.js         # Contact alert state
├── models/                 # 3D models (Island, Sky, Bird, Plane, Fox) — GLB/GLTF
├── pages/
│   ├── Landing.jsx         # Terminal boot
│   ├── Home.jsx            # 3D island
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Gallery.jsx         # Arts + modal
│   ├── Contact.jsx
│   └── index.js            # Page re-exports
└── utils/
    └── imageCache.js       # Preload / downscale gallery images
```

---

## Getting started

### Prerequisites

- **Node.js** 18+ (recommended)
- npm (comes with Node)

### Install & run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint on JS/JSX |

### Docker (optional)

See [README.Docker.md](./README.Docker.md). Typical flow:

```bash
docker compose up --build
```

App may be available at `http://localhost:5174` depending on compose config.

---

## Environment variables

Contact form needs EmailJS. Create a `.env` (or `.env.local`) in the project root:

```env
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [EmailJS](https://www.emailjs.com/). Vite only exposes variables prefixed with `VITE_`.

Without these, the contact page still loads, but sending mail will fail.

---

## Routes

| Path | Page | Notes |
|------|------|--------|
| `/` | Landing | No navbar |
| `/home` | 3D island | Music toggle; drag island to change stages |
| `/about` | About | Skills + experience |
| `/projects` | Projects | Linked cards |
| `/gallery` | Arts | Carousel + expand modal |
| `/contact` | Contact | Form + Fox |

Gallery is **lazy-loaded** to keep the initial bundle smaller.

---

## Key components (quick reference)

### `GlitchPageLayout`

Wraps content pages with a fixed `GradientWaves` background and a centered content column. Pass `fullWidth` for wider layouts (Gallery, Contact).

### `CircularGallery`

Props include `items` (`{ image, text }[]`), `bend`, `scrollSpeed`, `onItemClick(index)`. Images are downscaled (max 1024px) for GPU textures.

### `Gallery` / `GalleryModal`

- Artwork list lives in `src/pages/Gallery.jsx` as `ARTWORKS`.
- Modal: centered image (not fullscreen) + white info box on the right (`Title (year)` + description).
- Uses `imageCache` for preload, neighbor prefetch, and load progress.

### `BubbleMenu` / `Navbar`

`Navbar` defines labels, routes, and hover colors, then renders `BubbleMenu`. Hidden on `/`.

### `TextType`

Cycles through strings with type/delete animation (used on the Gallery subtitle).

### `imageCache` utilities

- `getCachedDisplayUrl(src, maxSize, { onProgress })` — fetch + optional JPEG downscale, memoized
- `preloadGalleryImages(urls)` — warm the cache
- `preloadGalleryNeighbors(urls, centerIndex)` — prefetch nearby slides

---

## Customizing content

| What | Where |
|------|--------|
| Skills / experience / projects | `src/constants/index.js` |
| Artworks | `ARTWORKS` in `src/pages/Gallery.jsx` + images under `src/assets/images/` |
| Nav labels & routes | `src/components/Navbar.jsx` |
| Home stage copy | `src/components/Information.jsx` |
| Social links | `src/components/IC.jsx` |
| Wave look | `WAVE_PROPS` in `src/components/GlitchPageLayout.jsx` |
| Landing boot lines | `BOOT_LINES` in `src/pages/Landing.jsx` |

Add a new artwork:

1. Put the image in `src/assets/images/` and export it from `src/assets/images/index.js`.
2. Append an object to `ARTWORKS` with `id`, `title`, `image`, `text` (carousel label), `description`, `year`.

---

## 3D home behavior

- Drag (or touch) the island to rotate.
- Rotation updates `currentStage` (1–4); `Information` shows welcome or links to About / Projects / Contact.
- Bottom-left sound icon toggles looping `sakura.mp3`.

3D model components live under `src/models/` (not heavily documented here).

---

## Deployment

- Build with `npm run build` and host the `dist/` folder (Vercel, Netlify, static hosting, etc.).
- `vercel.json` may already be present for Vercel.
- Ensure EmailJS env vars are set in the host’s environment for production contact.

CI (if configured) typically runs `npm ci`, lint, and build only — no deploy step required in Actions if you use the host’s Git integration.

---

## Credits & assets

- **Music:** [Sakura track](https://youtu.be/Kk60F8a7-Jw?si=j3ImUH62dr8mDKt4)
- **Animated UI patterns:** inspired by / adapted from [React Bits](https://reactbits.dev/)
- **Icons:** [SVG Repo](https://www.svgrepo.com/) and Lucide
- Artworks drawn in **Procreate**

---

## License

Private / personal portfolio (`"private": true` in `package.json`). Ask the author before reusing substantial assets or branding.
