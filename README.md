# Welinx Multi-Tenant POS — Production Marketing Website

> The ultra-reliable, offline-first cloud POS and FinTech operating system for modern hospitality, high-volume fast-casual (QSR), boutiques, and enterprise multi-unit franchises.

---

## ⚡ Tech Stack & Architecture

- **Framework:** [Vite](https://vitejs.dev/) + React 18 / TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with curated Dark Mode (`#090D16`), Electric Emerald (`#10B981`), and Cyber Cyan (`#06B6D4`) design tokens
- **Component UI:** Modern shadcn-inspired components with `@radix-ui` primitives, glassmorphism, and Lucide React icons
- **Motion & Delight:** [Framer Motion](https://www.framer.com/motion/) layout transitions and `canvas-confetti` celebrations
- **Routing:** [React Router v6](https://reactrouter.com/) with scroll-to-top auto-reset
- **Repository Isolation:** Standalone git repository in `welinx-pos/` independent of API and Desktop apps

---

## 🌐 Full Sitemap & Routes

| Route | Description |
| :--- | :--- |
| `/` | **Homepage**: Hero with Live Offline/Online Register Simulation, Legacy vs Welinx Matrix, Product Suite Tabs, Live ROI Calculator, Hardware Grid, Testimonials, FAQ, and CTA Banner |
| `/solutions` | **Solutions Overview**: Industry verticals hub |
| `/solutions/restaurants-and-bars` | **Full-Service Dining**: Table Floorplans, Course Timing & Kitchen Routing, Split Checks |
| `/solutions/quick-service-qsr` | **QSR & Fast Casual**: 15-Second Counter Flow, Kiosks & Drive-Thru Bump Bars |
| `/solutions/retail-and-boutique` | **Retail & Boutiques**: 100k+ SKUs, Matrix Variants, Barcoding & Reorder Points |
| `/solutions/franchises-and-chains` | **Enterprise Chains**: Multi-Tenant Centralized Controls & Rollup Analytics |
| `/products` | **Products Overview**: The modular platform architecture |
| `/products/pos-register` | **POS Register Terminal**: Cross-platform desktop, web, tablet register |
| `/products/offline-first-engine` | **Zero-Downtime Local SQLite Engine**: Bidirectional delta replication |
| `/products/kitchen-display-system` | **Kitchen Display System (KDS)**: Color-coded prep timers & routing |
| `/products/self-service-kiosk` | **Self-Service Order Kiosks**: AI upselling boosting basket sizes +22% |
| `/products/inventory-and-recipes` | **Recipe-Level Costing**: Gram deductions and automatic supplier POs |
| `/products/analytics-and-cloud` | **Executive Analytics**: Real-time sales telemetry and labor cost tracking |
| `/hardware` | **Hardware Catalog & Configurator**: 3-step interactive custom bundle builder with $0 HaaS leasing |
| `/pricing` | **Transparent Pricing**: Starter ($39), Pro ($89), Enterprise ($249) + Dual-Pricing Engine |
| `/compare` | **Competitor Hub**: Unfiltered head-to-head comparisons |
| `/compare/vs-toast` | **Welinx vs Toast**: Open hardware, zero rate hikes & offline resilience |
| `/compare/vs-square` | **Welinx vs Square**: Restaurant-grade speed, KDS & recipe inventory |
| `/compare/vs-clover` | **Welinx vs Clover**: Zero app-store micro-fee bloat |
| `/demo` | **Live Browser POS Sandbox**: Full simulated register with modifier modal, dual-pricing, and receipt printer |
| `/book-demo` | **15-Min VIP Walkthrough Scheduler**: 4-step lead qualification and calendar selector |
| `/resources/roi-calculator` | **Interactive ROI & Processing Calculator**: Calculate exact fee elimination |
| `/resources/blog` | **Guides & Playbooks**: Dual-pricing compliance, offline SQLite analysis |
| `/resources/docs-and-api` | **Developer Documentation**: GraphQL, REST, Webhooks & ESC/POS SDK |
| `/contact` | **Contact & 24/7 Priority Support**: 15-minute response SLA |

---

## 🚀 Getting Started Locally

```bash
# Navigate to the marketing website directory
cd welinx-pos

# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
