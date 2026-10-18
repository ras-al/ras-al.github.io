# 👾 Rasal Musthafa | Retro Pixel-Art Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/🎮_Live_Portfolio-ras--al.github.io-5cffc8?style=for-the-badge&logo=googlechrome&logoColor=black)](https://ras-al.github.io)
[![Vite](https://img.shields.io/badge/Vite-6.x-ffd36e?style=for-the-badge&logo=vite&logoColor=black)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=black)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-a7ef9e?style=for-the-badge)](LICENSE)

<br/>

**A retro 8-bit / 16-bit arcade personal portfolio engineered with React, WebGL shaders, and high-performance micro-interactions.**

[Explore Live Site](https://ras-al.github.io) • [Report Bug](https://github.com/ras-al/ras-al.github.io/issues) • [Request Feature](https://github.com/ras-al/ras-al.github.io/issues)

</div>

---

## 🕹️ Overview

This project is the personal developer portfolio of **Rasal Musthafa**, a B.Tech Computer Science student specializing in **Robotics, Computer Vision, Visual SLAM, 3D Scene Reconstruction, and Full-Stack Engineering**.

The site is designed with a **pixel-art visual identity**: strict zero-border-radius geometry, custom CRT scanlines, 8-bit typography, retro sound synthesizers via the Web Audio API, an integrated playable arcade mini-game, interactive pixel NPCs, and seamless integrations of 7 custom WebGL React Bits components.

---

## ✨ Key Features

### 🎛️ 1. Interactive Boot Screen
- Retro CRT power-up sequence with BIOS-style hardware self-tests.
- Audio synthesis via the Web Audio API (synthesizer hums, power surges, and clicks).
- Requires player interaction: press the glowing **`[ PRESS START ]`** arcade button or hit `Enter`/`Space` to enter.

### 🎮 2. Playable "Pixel Bug Hunter" Arcade Game
- Built-in 60 FPS HTML5 Canvas arcade mini-game (`#arcade`).
- Defend the codebase from invasive pixel bugs using keyboard (`A`/`D` or Arrow keys + `Space`) or mobile touch controls.
- Dynamic wave scaling, particle explosions, laser sound effects, high-score tracking, and 3-life retro health system.

### 🤖 3. Interactive Pixel Companions & NPCs
- **`BYTE_BOT`**: Persistent floating pixel companion at the bottom-right with mood cycles, reactive dialogue, and helpful tips.
- **`PATROL_BOT`**: Autonomous patrol droid in the Hero section responding to clicks.
- **`GIGA_CAT`**: Interactive pet in the About section with purr audio synthesis and floating heart particles.

### 📜 4. Sticky Horizontal Scrolling (`Level 02` & `Level 04`)
- **Experience Quest Log (`#experience`)**: Pinned viewport where vertical scrolling translates horizontally through 6 career milestones across a connected timeline rail.
- **Project Cartridges (`#projects`)**: Pinned viewport cycling through retro ROM cartridges with ROM selector HUDs, tech badges, and GitHub links.

### ⚡ 5. Seven Curated React Bits Component Integrations
| Component | Placement | Technology | Function |
|---|---|---|---|
| **ThoughtLine** | BootScreen | React DOM / CSS | ASCII terminal thought stream during system initialization |
| **AeroShards** | Hero Section | WebGL / Canvas | Interactive 3D cursor-reactive polygon shard physics field |
| **SplitFlapText** | Hero Section | CSS Keyframes | Mechanical departure-board text ticker for role transitions |
| **BranchedMenu** | Nav Sidebar | SVG / React DOM | Tree-structured retro directory navigation system |
| **HalftoneReveal** | About Section | WebGL2 Shaders | Interactive cursor halftone particle image reveal |
| **FaultyTerminal** | Research Section | WebGL2 Shaders | CRT phosphor terminal matrix with glitch tear & hover glow |
| **LogoLoop** | Skills & Certifications | CSS Animation | Infinite retro marquee badges for technologies & credentials |

---

## 🛠️ Tech Stack

- **Core Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Pixel-Art CSS Design System
- **Animations & Gestures**: [Framer Motion](https://www.framer.com/motion/)
- **Graphics & Shaders**: WebGL2, Canvas 2D API, [OGL](https://github.com/oframe/ogl), [VGPU](https://github.com/v-gpu/vgpu)
- **Audio**: Web Audio API (real-time synthesizer sound generation without external audio files)
- **Icons**: [HugeIcons](https://hugeicons.com/) + [React Icons](https://react-icons.github.io/react-icons/)
- **Typography**: `Press Start 2P`, `Silkscreen`, `VT323` (Google Fonts)
- **Deployment**: [GitHub Pages](https://pages.github.com/) via [GitHub Actions](https://github.com/features/actions)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** and **npm** installed on your system:
```bash
node -v
npm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ras-al/ras-al.github.io.git
   cd ras-al.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The compiled bundle will be output to `./dist/`.

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions deployment to GitHub Pages
├── public/
│   ├── .nojekyll               # Disables Jekyll processing on GitHub Pages
│   ├── favicon.svg             # Retro pixel robot favicon
│   ├── robots.txt              # SEO crawler directives
│   ├── sitemap.xml             # XML sitemap
│   └── images/                 # Developer photo assets
├── src/
│   ├── components/
│   │   ├── common/             # SkipToContent, LazyMount
│   │   ├── pixel/              # PixelBox, PixelButton, PixelChip, PixelSprite, SectionHeader
│   │   ├── reactbits/          # 7 React Bits WebGL/DOM components
│   │   │   ├── AeroShards.jsx
│   │   │   ├── BranchedMenu.jsx
│   │   │   ├── FaultyTerminal.jsx
│   │   │   ├── HalftoneReveal.jsx
│   │   │   ├── LogoLoop.jsx
│   │   │   ├── SplitFlapText.jsx
│   │   │   └── ThoughtLine.jsx
│   │   └── sections/           # Portfolio levels
│   │       ├── BootScreen.jsx  # Interactive CRT startup & Press Start trigger
│   │       ├── Hero.jsx        # AeroShards + SplitFlap + Patrol Bot
│   │       ├── About.jsx       # HalftoneReveal + Giga Cat
│   │       ├── Experience.jsx  # Level 02: Horizontal scrolling Quest Log
│   │       ├── Research.jsx    # Level 03: IIT Madras SLAM & FaultyTerminal
│   │       ├── Projects.jsx    # Level 04: Horizontal scrolling ROM Cartridges
│   │       ├── Skills.jsx      # Level 05: LogoLoop skill tracks
│   │       ├── EducationCertifications.jsx # Level 06: Academic & Cert badges
│   │       ├── Contact.jsx     # Level 07: Transmit terminal & socials
│   │       ├── ArcadeGame.jsx  # Playable 60 FPS Pixel Bug Hunter mini-game
│   │       └── Footer.jsx      # Retro footer & return-to-top
│   ├── data/
│   │   └── site.js             # Structured portfolio content (Experience, Projects, Skills)
│   ├── utils/
│   │   └── audio.js            # Web Audio API sound synthesizers
│   ├── App.jsx                 # Main layout & scroll spy navigation
│   ├── index.css               # Pixel-art design system & CRT scanline overlays
│   └── main.jsx                # Application root
├── .nojekyll                   # Disables Jekyll in root
├── _config.yml                 # Jekyll exclude configuration
├── index.html                  # HTML entry with SEO metadata & OpenGraph tags
├── package.json
└── vite.config.js              # Vite configuration
```

---

## 🌐 Deployment to GitHub Pages

This repository is configured for automatic continuous deployment using **GitHub Actions**:

1. Pushes to `main` automatically trigger `.github/workflows/deploy.yml`.
2. The action installs dependencies with `npm ci`, compiles the production bundle with `npm run build`, and publishes `./dist` to GitHub Pages using `actions/deploy-pages@v4`.
3. Jekyll processing is disabled via `.nojekyll` to prevent Liquid syntax collisions with React JSX.

To enable GitHub Pages in your repository:
1. Go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.

---

## 👤 Author

**Rasal Musthafa**
- GitHub: [@ras-al](https://github.com/ras-al)
- LinkedIn: [linkedin.com/in/rasalmusthafa](https://linkedin.com/in/rasalmusthafa)
- Portfolio: [ras-al.github.io](https://ras-al.github.io)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
