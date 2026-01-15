# Muhammed Najeeb's Portfolio

## Description
This is the personal portfolio of Muhammed Najeeb, a Flutter developer specializing in building exceptional digital experiences for 
mobile platforms. The site itself is a showcase of modern web engineering, featuring a modular architecture, cinematic animations, and a unique terminal-themed narrative.

## Features
* **Dynamic Content**: Data is centralized in `assets/content.json` for easy updates and maintenance.
* **Modular Architecture**: Built with a "Clean Architecture" inspired JavaScript structure for scalability.
* **Terminal Interface**: Interactive, developer-narrative themed sections for skills and projects.
* **Immersive Design**: Includes a theme-aware splash screen, cursor-following effects, and a modular CSS system.
* **Batman Mode**: A hidden easter egg theme that transforms the entire portfolio.
* **Responsive & PWA**: Fully responsive design with PWA support for a native-like experience.

## Project Structure
```
najeeb_portfolio/
├─ assets/
│  ├─ content.json          # Centralized data source for the site
│  ├─ character-frames/     # Assets for cinematic scroll animations
│  ├─ icon/                 # Favicons and PWA assets
│  └─ *.svg                 # Logos and brand assets (najeeb_logo, bat_logo)
├─ fonts/                   # Custom typography (Array, Silkscreen, VT323)
├─ src/                     # Modular JavaScript
│  ├─ application/           # App initialization and orchestration
│  ├─ infrastructure/        # Data fetching and external services
│  ├─ presentation/          # Domain-specific UI logic
│  │  └─ controllers/        # Logical controllers (theme, splash, blog, etc.)
│  └─ projects-terminal.js   # Specialized logic for terminal interaction
├─ styles/                  # Modular CSS system
│  ├─ main.css               # Main bundle/entry point
│  ├─ base.css               # Reset and core variables
│  ├─ theme-batman.css       # Gotham-inspired alternate theme
│  └─ *.css                  # Component-specific styles (hero, projects, etc.)
├─ index.html               # Semantic HTML foundation
├─ manifest.json            # PWA configuration
└─ README.md
```

## Design Strategy
- **Modular CSS**: Styles are split by component for better maintainability and performance.
- **Motion as Narrative**: Uses directional motion (`fadeInUp`), scale transforms, and perspective lines to create a cinematic feel.
- **Glassmorphism & Gradients**: Premium aesthetics with subtle blurs, HSL-tailored colors, and smooth transitions.
- **Accessibility**: Semantic HTML structure, ARIA labels for interactive elements, and optimized font scaling.

## JavaScript Architecture
The project follows a modular, decoupled approach to handle complexity:
- **`initApp.js`**: Orchestrates the sequential loading of themes, splash screens, and data-driven components.
- **Controllers**: Each major area (Theme, Splash, Background, Blog, Projects) has a dedicated controller in `src/presentation/controllers/`.
- **Infrastructure Layer**: Handles data retrieval from the local `content.json` or external APIs (e.g., Medium RSS via storage).
- **Interactivity**: Custom implementation of cursor followers, smooth scrolling, and scroll-driven reveal animations.

## Technical Deep Dive

### Terminal System (`src/projects-terminal.js`)
The specialized `ProjectsTerminal` module handles the interactive developer narrative:
- **Asynchronous Typing**: Uses a custom `Promise`-based typing engine (`typeText`) to simulate real-time command execution.
- **Dynamic Context**: Intercepts content from `content.json` to generate real-time "system logs" for each project.
- **Scroll Orchestration**: Automatically manages focus and scrolling during project expansion and contraction.

### Advanced Theme Engine (`src/presentation/controllers/themeController.js`)
The theme system goes beyond simple class toggling:
- **Block-Spread Transition**: On toggle, a custom JavaScript engine generates a 20x20 grid of physical DOM elements that spread across the screen in a staggered pattern based on distance from the origin button.
- **SVG Morphing**: Hero SVGs use `stroke-dashoffset` path-drawing animations synchronized with CSS transitions.
- **Easter Egg (Batman Mode)**: A specialized state that overrides global variables, swaps brand assets (`bat_logo.svg`), and triggers custom typing overrides ("I AM BATMAN").

### UI Orchestration (`src/application/initApp.js`)
- **Splash Progress Tracking**: Uses a sophisticated loading controller that tracks asynchronous data fetching (`initPortfolio`, `initBlog`) to provide real-time percentage feedback.
- **Theme Persistence**: Themes are managed via the Infrastructure layer and persisted in `localStorage`, with fallback to `prefers-color-scheme` media queries.

## Data Management
The portfolio is designed to be "headless" — content is decoupled from the UI.

### `assets/content.json` Schema
The centralized data source follows a strict schema:
- **`hero`**: Controls the greeting, typing string, and social links.
- **`experience`**: Array of job objects with `tabId` matching the HTML structure.
- **`skillCategories`**: Defines the categorization used in the terminal-style skills display.
- **`projects`**: Schema including `title`, `status`, `tech` (tags), and `links` objects (github, live, pub).

## Usage

### Run Locally
1. Clone the repository.
2. Open `index.html` in a browser, or use a static server for the best experience:
   - Node: `npx -y serve .`
   - Python: `python -m http.server 8080`

### Customize
- **Content**: Update `assets/content.json` to change personal info, experience, skills, or projects.
- **Design system**: Edit variables in `styles/base.css` or `styles/theme-batman.css`.
- **Behavior**: Tweak controller logic in `src/presentation/controllers/`.

## Assets, SEO and PWA
- **SEO Ready**: Proper meta tags, JSON-LD structured data, and descriptive headings.
- **PWA Support**: Installable on mobile and desktop via `manifest.json`.
- **Assets**: Optimized SVGs and a dedicated social share preview (`assets/preview.png`).

## Notes
- **Minimal Dependencies**: The site is written in vanilla JS and CSS to ensure maximum performance and low footprint.
- **Performance**: Designed for 60fps animations even on mobile devices.
- **Deployment**: Optimized for static hosting on platforms like Netlify or GitHub Pages.

