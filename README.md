# Muhammed Najeeb's Portfolio

## Description
This is the personal portfolio of Muhammed Najeeb, a Flutter developer specializing in building exceptional digital experiences for 
mobile platforms.

## Features
* A showcase of my skills and experience as a Flutter developer
* A collection of projects demonstrating my expertise in mobile app development
* A contact section for getting in touch with me


## About Project 

A fast, responsive, single‑page portfolio highlighting Flutter development work. Built with semantic HTML, modern CSS, and a small amount of vanilla JavaScript for interactivity and animations.

## Contents
- Overview
- Project structure
- Design strategy
- JavaScript functions and behavior
- Usage (run locally, customize, deploy)
- Assets, SEO and PWA notes

## Overview
This site showcases experience, projects, skills, and contact details with smooth transitions, dark/light theming, mobile navigation, section‑based animations, and subtle background effects.

## Project structure
```
najeeb_portfolio/
├─ assets/
│  ├─ icon/                 # Favicons and webmanifest
│  ├─ ic_cl.svg             # Inline/brand icon
│  └─ preview.png           # Social/share preview
├─ css/                     # (optional) vendor CSS location
├─ fonts/                   # Custom/web fonts live here
├─ script/
│  └─ script.js             # All interactive behavior
├─ styles/
│  └─ styles.css            # Site styles (variables, layout, responsive)
├─ index.html               # Single page app
├─ manifest.json            # PWA metadata
├─ robots.txt               # Crawl directives
├─ sitemap.xml              # Basic sitemap
└─ README.md
```

## Design strategy
- Theme via CSS variables: Colors, spacing, transitions are set on `:root` and toggled with `body.light-mode`.
- Responsive first: Layout adapts across breakpoints with dedicated mobile/landscape rules for the hero and sections.
- Motion as feedback: Keyframe animations (`fadeInUp`, `projectFadeIn`, `pulse`, `float`) cue context rather than distract.
- Accessibility considerations: Reduced text/contrast shifts between themes, readable font sizes, and semantic structure.

### Key CSS areas in `styles/styles.css`
- Variables and base reset
- Header + sticky behavior styling
- Hero section (desktop/mobile reflow, SVG handling)
- Sections: About, Skills, Experience (tabs), Projects (cards), Contact
- Background layers: `.bg-animation`, `.cursor-follower`, `.invert-circle`
- Mobile menu slide‑in and staggered fades

## JavaScript functions and behavior (`script/script.js`)

Theme
- `toggleTheme()`: Toggles `body.light-mode`, updates all theme icons, persists preference in `localStorage`, and updates `<meta name="theme-color">` via `updateThemeColor(isDarkMode)`.
- System preference listener: Applies system dark/light if no saved preference.

Mobile navigation
- Slide‑in menu controlled by `.mobile-menu`, with `closeMobileMenu()` and listeners for button, backdrop click, and `Escape`.

Tabbed experience
- Click handlers on `.tab-button` toggle `.tab-content.active` by `data-tab` id.

Cursor + background animation
- Follower and invert circle track mouse position, grow/shrink on movement pause, and gently nudge floating background icons.
- `createFlutterIcons()`: Creates floating Flutter, Material, GetX, and Dart icons with randomized sizes/positions and continuous `float` animation.

Scroll and intersection animations
- `checkAnimations()`: Adds `appear` class to elements with `.fade-in`, `.slide-in-right`, `.slide-in-left` when in viewport.
- IntersectionObservers for `.projects` (stagger cards) and `.skills` (reveal chips).

Smooth anchor scrolling
- Intercepts in‑page links and scrolls to target with offset for header.

Contact form
- Submits via `fetch(form.action)` (expects a service like Formspree). Shows a snackbar message on success/failure.

Typing effect
- `initTypingAnimation()`: Types the string from `data-text` into `.typing-text` after a short delay.

## Usage

Run locally
1. Clone/download this repository.
2. Open `index.html` directly in a browser, or serve statically:
   - Node: `npx serve .` (or any static server)
   - Python: `python -m http.server 8080`

Customize
- Colors/theme: Edit CSS variables in `styles/styles.css` (see `:root` and `body.light-mode`).
- Sections/content: Update `index.html` copy and project entries.
- Animations: Adjust keyframes/timings in CSS, or JS intervals/durations in `script.js`.
- Icons/background: Tweak `createFlutterIcons()` counts and icon sets.
- Contact: Point the form `action` to your form backend and, if needed, adapt headers/handlers.

Deploy
- Any static hosting works (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Upload the root as is.

## Assets, SEO and PWA
- Favicons and manifest live in `assets/icon/`; `manifest.json` is configured for add‑to‑home‑screen.
- `robots.txt` and `sitemap.xml` help basic SEO/crawling.
- `assets/preview.png` can be used for social previews (set appropriate meta tags in `index.html`).

## Fonts
Place custom webfonts in `fonts/`. If using the Array family (see `Array_Complete/Fonts/WEB/README.md`):
1. Copy the `array/` folder into `fonts/`.
2. Copy `array.css` into `css/` (or merge its `@font-face` into your main stylesheet).
3. Import at the top of your main stylesheet:
   
   ```css
   @import url('array.css');
   ```

4. Then reference font families like `Array-Regular`, `Array-Wide`, etc.

## Notes
- The code intentionally favors minimal dependencies: no frameworks required.
- Keep `theme-color` meta tag id as `theme-color-meta` for runtime updates.

