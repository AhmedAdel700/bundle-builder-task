# Bundle Builder

A React prototype of Wyze’s multi-step **security bundle builder**: a four-step accordion on the left walks the shopper through assembling a system, while a live **“Your security system”** review panel on the right stays in sync with selections, pricing, and quantities.

**Design reference:** [Frontend Test Figma](https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=68-8088&t=eItHIh0U1JjjJF8d-1)

---

## Quick start

Requires **Node.js 18+** and npm.

```bash
git clone <your-repo-url>
cd bundle-builder
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## What’s implemented

### Layout & styling

- Two-column desktop layout: builder (`2/3`) + sticky review panel (`1/3`)
- Responsive down to mobile: single-column stack on smaller viewports
- Tailwind CSS v4 with a custom theme (colors, spacing, radii) aligned to the Figma
- Gilroy typography via local font files

### Builder (left column)

- **4-step accordion** with icons, “STEP X OF 4” labels, expand/collapse chevrons, and per-step “N selected” counts
- **Step 1 — Choose your cameras** is fully wired and open by default
- **Product cards** driven from JSON: discount badges, images, descriptions, “Learn More” links, optional color chips, quantity steppers, and compare-at / sale pricing
- Cards enter a **selected state** (highlighted border) when quantity is greater than zero
- **“Next: Choose your plan”** button is present in Step 1 (UI only; see limitations below)

### Review panel (right column)

- Live summary titled **“Your security system”**
- Selected cameras listed under a **Cameras** heading with thumbnail, name (including color), quantity steppers, and line pricing
- Quantity steppers in the panel stay **in sync** with the builder cards
- Shipping row, satisfaction badge, financing callout, struck-through subtotal, savings message, **Checkout** button, and **Save my system for later** link
- Totals recalculate as quantities change

### Interactions

- **Accordion:** click a step header to expand/collapse; Step 1 starts open
- **Quantity steppers:** on product cards and review lines; both update shared state
- **Color selection:** switches the card image and active color label; changing color in the review panel name reflects the currently selected variant
- **Checkout:** opens a confirmation modal (placeholder — no real checkout flow)
- **Save my system for later:** persists the current configuration to `localStorage` under the key `bundle-builder-saved`; reload the page after saving to restore quantities and selected colors

---

## Project structure

```
src/
├── components/
│   ├── Checkout.tsx        # Review panel (summary, totals, actions)
│   ├── ProductCard.tsx     # Builder product card
│   ├── ProductItem.tsx     # Review panel line item
│   ├── ProductsArea.tsx    # 4-step accordion + Step 1 content
│   ├── ReviewHeader.tsx
│   └── SectionLabel.tsx
├── data/
│   └── data.json           # Camera catalog (seed data)
├── pages/
│   └── BundleBuilder.tsx   # Top-level state, persistence, modals
├── assets/                 # Badge, delivery icon, product images used in imports
├── fonts/                  # Gilroy (regular, medium, semibold)
├── App.tsx
├── main.tsx
└── index.css               # Tailwind theme tokens + font faces

public/assets/              # Static SVG/PNG assets referenced by JSON paths
```

---

## Data model

Products are defined in `src/data/data.json`. Each camera entry includes:

- `id`, `name`, `description`, `learnMoreUrl`
- `image`, `discount`, `originalPrice`, `salePrice`
- `quantity` (initial count)
- `colorOptions` (optional array of `{ label, image }`)
- `selectedColor` (active variant label, or `null`)

The UI renders from this data rather than hardcoding per-product markup. There is **no backend/API** — JSON is imported directly at build time.

---

## Architecture notes

- **State:** `BundleBuilder` holds the product list in React state. Quantity and color changes bubble up via callbacks and flow down to both the accordion and review panel.
- **Persistence:** On save, the full product array is serialized to `localStorage`. On load, saved entries are merged with `data.json` so new catalog fields stay up to date while restoring shopper choices.
- **Styling:** Design tokens live in `index.css` under `@theme` and are consumed as Tailwind utilities (e.g. `text-primary`, `bg-bg-light`).

---

## Decisions & tradeoffs

1. **Single-page, no router** — The take-home is one screen; React state is enough without routing overhead.
2. **Lifted state over context** — Only two main areas share data (builder + checkout). Prop drilling keeps the data flow explicit for a small app.
3. **Modal for checkout/save feedback** — Lightweight confirmation instead of a separate route or toast library.
4. **Local JSON over API** — Faster to clone and run; an API would be a nice bonus but wasn’t required.
5. **ProductCard local UI state** — Cards mirror parent quantity/color props for responsive UI (selected border, image swap) while treating the parent as the source of truth.

---

## Known limitations / not finished

These are gaps relative to the full take-home spec:

| Area | Status |
|------|--------|
| **Steps 2–4** (plan, sensors, extra protection) | Placeholder copy only — accordion shells exist but no product UI or data |
| **“Next: …” buttons** | Do not advance the accordion to the next step yet |
| **Per-variant quantities** | Quantity is tracked **per product**, not per color. Switching colors does not give each variant its own count or separate review-panel lines |
| **Pre-populated review panel** | Design shows default sensors, accessory, and plan in the summary without builder controls; only user-selected cameras appear today |
| **Review categories** | Sensors, Accessories, and Plan section headings are not rendered yet |
| **Color chip selected styling** | Basic active styling exists; full Figma fidelity for chip states was deprioritized per spec guidance |
| **`PlanItem.tsx`** | Unused duplicate of `ProductItem.tsx` — candidate for removal |

If continuing this project, the highest-impact next steps would be: per-variant quantity map in state, seed/default line items for plan/sensors/accessories, and wiring Steps 2–4 from extended JSON.

---

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (review panel stepper icons)

---

## License

Take-home submission — see repository owner for terms.
