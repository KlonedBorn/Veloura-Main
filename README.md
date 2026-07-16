# Veloura Collection — Static Showcase

Static showcase website for **Veloura Collection**, a chic boutique at Heritage Quay, St. John's, Antigua, offering designer handbags (Coach, Michael Kors), wallets, sandals, and Stanley cups. Built with raw HTML, CSS, and JavaScript — no frameworks, no build step. Hosted via GitHub Pages.

> **Status:** semi-functional customer demo. Catalog, cart, checkout (simulated), appointment booking, and a mock admin dashboard all run client-side. No backend — all data lives in the visitor's browser (localStorage).

## Live Demo

<!-- Update after enabling GitHub Pages -->
`https://<username>.github.io/<repo-name>/`

## Project Structure

```
Veloura/                    # Repo root = deployed site root
├── index.html              # SPA shell — header, footer, #app mount point
├── 404.html                # GitHub Pages SPA redirect (clean URL support)
├── hroot/                  # Site assets (css/js/data/images)
│   ├── css/styles.css      # Full theme per context/ui-frontend/THEME.md
│   ├── data/
│   │   └── products.json   # Client-maintained catalog (source of truth)
│   ├── js/
│   │   ├── data.js         # Catalog loader/transform + default settings
│   │   ├── store.js        # localStorage layer: cart, orders, appointments…
│   │   ├── router.js       # History API router with base-path handling
│   │   ├── views.js        # Public showroom pages
│   │   ├── admin.js        # Mock admin dashboard (demo login)
│   │   └── main.js         # Route registration + bootstrap
│   └── assets/
│       ├── images/         # Logos + product photography (assets/images/Veloura/)
│       ├── fonts/          # Self-hosted webfonts (currently Google Fonts CDN)
│       └── icons/          # Favicons
├── context/                # Client reference material — local only, gitignored
│   ├── prototype/          # Original single-file HTML draft (superseded)
│   ├── brand-identity/     # Brand overview, products, UX strategy, art direction
│   ├── ui-frontend/        # Component, layout, navigation, theme specs
│   ├── blueprints/         # Page-by-page storefront blueprints (.docx)
│   └── notes/              # Raw client/meeting notes and screenshots
├── .github/workflows/      # Pages deploy workflow (publishes repo root)
├── LICENSE.txt
└── README.md
```

## Routes

Clean URLs via the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) 404 redirect. Public: `/`, `/browse` (`?category=`, `?search=`), `/product/:id`, `/cart`, `/checkout`, `/thank-you`, `/exclusives`, `/contact`. Mock admin: `/admin` (dashboard), `/admin/products` (+ new/edit), `/admin/orders` (+ detail/status), `/admin/appointments`, `/admin/settings`.

**Admin demo login:** username `demo`, password `veloura2026` (mock gate, shown on the login page — this is a showcase, not real authentication).

## How the Demo Works (no backend)

- **Catalog** is fetched from `data/products.json` at load and seeded into localStorage; the admin dashboard edits that copy ("Reset to Default Catalog" restores the JSON state). Bumping the JSON's `generated` date re-seeds returning visitors with the updated catalog.
- **Pricing**: the catalog JSON carries no prices, so items show **"Price on request"** — customers can still cart and order them (totals flag "+ items on request" for boutique follow-up). A price set via the admin dashboard (or a `price` field added to the JSON) displays normally.
- **Checkout** records the order to localStorage and shows the `/thank-you` confirmation with EFT payment instructions. Nothing is transmitted.
- **Personal shopping form** stores appointment requests, visible under `/admin/appointments`.
- **Admin settings** (delivery fee, hours, contact info) feed the announcement bar, contact page, and checkout totals.
- WhatsApp buttons open real `wa.me` chats to the boutique number.

## Local Development

No build step. Serve the repo root:

```bash
python -m http.server 8000
# or: npx serve .
```

Visit `http://localhost:8000`. Note: refreshing on a deep link (e.g. `/browse`) only works on GitHub Pages, where `404.html` handles the redirect — locally, start from `/` and navigate in-app (or use a server with SPA fallback, e.g. `npx serve -s .`). The local server will also expose `context/` — that folder is gitignored and never reaches GitHub.

## Deploying to GitHub Pages

1. Push the repository to GitHub (`main` + `demo` branches).
2. Repo **Settings → Pages** → Source: **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy-pages.yml`) publishes the repo root on every push to **`demo`** touching site files.
4. Site publishes at `https://<username>.github.io/<repo-name>/`. The router auto-detects the repo base path — no config needed.
5. If deploying to a **custom domain or user site** (served at `/`), set `pathSegmentsToKeep = 0` in `404.html`.

## Customization Checklist

- [x] Product images use client photography from `assets/images/Veloura/` (consider converting PNG → WebP per art-direction spec)
- [ ] Add prices to `data/products.json` (or via admin) to replace "Price on request"
- [ ] Replace the hero background image (only remaining stock photo, in `css/styles.css`)
- [ ] Add favicon to `assets/icons/` and link it in `index.html`
- [ ] Confirm exact Heritage Quay unit number on contact page
- [ ] Self-host fonts in `assets/fonts/` if CDN independence is desired
- [ ] Update the Live Demo URL above
- [ ] Replace LICENSE placeholder terms per client agreement

## License

See [LICENSE.txt](LICENSE.txt). Client work — all rights reserved.
