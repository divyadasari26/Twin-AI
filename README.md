# TwinAI - Your AI Employee That Never Sleeps 🤖⚡

![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Modern_Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active_Production-success?style=for-the-badge)

**TwinAI** is an enterprise-grade AI Digital Employee dashboard and landing web application designed to empower businesses 24/7. Built with cutting-edge front-end engineering, rich glassmorphism aesthetics, and dynamic kinetic typography animations, TwinAI allows brands to deploy customized AI agents that answer customer inquiries, place live voice calls, book appointments, collect structured lead data, and calculate instant proposals.

---

## 🌟 Key Features & Capabilities

- 🤖 **Custom AI Digital Twin Fleet**: Configure tone, creativity (temperature), system guidelines, and fallback behaviors for domain-specific customer service agents.
- 📚 **Multi-Tenant Secure Enterprise RAG Engine**: Upload business documentation (PDFs, CSVs, FAQs, web links) to build an isolated, encrypted vector knowledge base.
- 📞 **Omnichannel Voice & Chat AI**: Native text chat playground paired with ultra-low latency browser WebRTC voice calling synthesis.
- 📅 **Integrated Appointment Booking**: Automatic slot conflict detection and seamless calendar synchronization (Google Calendar, Outlook, Zoom).
- 💼 **Lead Generation & Quotation Engine**: Real-time structured field extraction (Name, Email, Phone, Budget) and instant estimate proposal generation.
- 🎨 **Embeddable Customer Widget Customizer**: Real-time live preview panel to customize widget themes, colors, border-radii, position, and JavaScript embed code snippets.
- 📊 **Executive Analytics Dashboard**: Comprehensive performance metric cards with live animated number roll-ups, revenue telemetry, and Chart.js channel distributions.

---

## 🎨 Visual Aesthetics & Motion Animations

TwinAI features state-of-the-art visual design and interactive animations built for maximum user engagement:

### 🔤 Kinetic Typography & Text Motion
- **Live Typewriter Text Rotator**: Continuously cycles key enterprise capabilities (*"answers customer queries 24/7"*, *"books instant appointments"*, *"generates qualified leads"*) with custom blinking cursor physics.
- **Staggered Split-Text Reveal**: Headlines automatically split into character and word elements (`.split-word`, `.split-char`) that cascade into view with cubic-bezier timing.
- **Dynamic Text Shimmer & Glow**: High-contrast pure white hero typography (`#ffffff !important`) enhanced with ambient text glows.

### 🌌 Atmosphere & Micro-Interactions
- **Floating Ambient Light Orbs**: Dual background blurred gradient spheres drifting in smooth 14s-18s trajectory loops (`@keyframes orbTrajectory`).
- **Mouse-Spotlight 3D Card Tilt**: Cards dynamically track cursor coordinates (`--mouse-x`, `--mouse-y`) and tilt in 3D perspective (`rotateX`, `rotateY`) on hover.
- **Multi-Directional Scroll Reveals**: IntersectionObserver triggers directional slide-ins (`.reveal-left`, `.reveal-right`, `.reveal-up`, `.reveal-flip`, `.reveal-scale`) staggered sequentially across grids.
- **Decelerating Number Counters**: Metrics roll up smoothly from zero to target values upon entering the viewport.

---

## 🏗️ System Architecture & Implementation Details

TwinAI is built with a decoupled component-driven architecture for rapid rendering and fluid user experience.

### 📐 High-Level Architecture Overview

```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                           TWINAI FRONTEND LAYER                         │
 ├──────────────────────────────┬──────────────────────────────────────────┤
 │      LANDING MODULE          │           AUTHENTICATION MODULE          │
 │  • Hero & Light Orbs         │  • Multi-factor Verification Mock        │
 │  • Dynamic Typewriter        │  • Business Register & Password Reset    │
 │  • Live Chat Sandbox         │                                          │
 ├──────────────────────────────┴──────────────────────────────────────────┤
 │                           DASHBOARD CORE STATE                          │
 │  • Knowledge Base RAG Engine (PDF/CSV Indexer)                          │
 │  • Conversations Inbox & Sentiment Analyzer                             │
 │  • Appointment Scheduling Timeline                                      │
 │  • Live Widget Customizer & Code Generator                               │
 └────────────────────────────────────┬────────────────────────────────────┘
                                      │
 ┌────────────────────────────────────▼────────────────────────────────────┐
 │                  ANIMATION CONTROLLER & TELEMETRY ENGINE                │
 │  • IntersectionObserver Directional Scroll Reveals                      │
 │  • Mouse-Tracking Spotlight Glow & 3D Tilt Physics                       │
 │  • Decelerating Expo Roll-Up Counters & Chart.js Telemetry               │
 └─────────────────────────────────────────────────────────────────────────┘
```

### 🛠️ Technology Stack
- **Core Engine**: HTML5, Modern Vanilla JavaScript (ES6+ Modular State Controller)
- **Bundler / Dev Server**: [Vite 5.0+](https://vitejs.dev/)
- **Styling**: Vanilla CSS3 Custom Properties (Variables), Flexbox/Grid Layouts, Glassmorphism Backdrop Filters
- **Icons**: Lucide Icons SVG System
- **Graphics Telemetry**: Chart.js for administrative data visualizer

---

## 🛠️ Installation & Local Setup

Follow these simple steps to set up TwinAI locally:

### Prerequisites
Make sure you have Node.js (v18 or higher) installed on your machine.

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/divyadasari26/Twin-AI.git
   cd Twin-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173/` in your browser to inspect the application.

---

## 🚀 Build & Deployment

To generate a production-ready optimized static build:

```bash
npm run build
```

The compiled output will be generated in the `dist/` folder, ready to be deployed to Vercel, Netlify, or GitHub Pages.

---

## 📄 License & Credits

Designed & Developed for Enterprise AI Operations.
© 2026 **TwinAI Technologies, Inc.** All rights reserved.