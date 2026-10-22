# Teeplay

Teeplay is a single-page streetwear T-shirt e-commerce demo with a customer storefront and a protected admin dashboard. There is no backend: mock data is seeded into the browser's `localStorage` on first load.

## Tech Stack

- React 18 + TypeScript (strict)
- Vite
- Tailwind CSS (PostCSS + Autoprefixer)
- React Router DOM v6
- ESLint, Prettier, Husky, lint-staged

## Getting Started

Prerequisites: Node.js 18+ and npm.

```bash
npm install     # also runs `prepare`, which installs the Husky git hooks
npm run dev     # http://localhost:3000
```

Build and preview a production bundle:

```bash
npm run build
npm run preview
```

## Scripts

| Script                 | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server on port 3000                        |
| `npm run build`        | Type-check with `tsc` and build with Vite                     |
| `npm run preview`      | Preview the production build                                  |
| `npm run lint`         | Lint `.ts`/`.tsx` files (fails on any warning)                |
| `npm run lint:fix`     | Lint and auto-fix                                             |
| `npm run format`       | Format `src/**/*.{ts,tsx,css}` with Prettier                  |
| `npm run format:check` | Check formatting without writing                              |
| `npm run prepare`      | Install Husky git hooks (runs automatically on `npm install`) |

## Code Quality

### ESLint

Configured in `.eslintrc.json` with `eslint:recommended`, `@typescript-eslint`, `react`, `react-hooks`, and `prettier` (via `plugin:prettier/recommended`, so formatting issues are reported as lint errors).

Notable rules:

- `react/react-in-jsx-scope` and `react/prop-types` are off
- `@typescript-eslint/no-explicit-any` is a warning
- `@typescript-eslint/no-unused-vars` is a warning; arguments prefixed with `_` are ignored

`node_modules`, `dist`, and `.husky` are excluded via `eslintIgnore` in `package.json`.

### Prettier

Configured in `.prettierrc`: single quotes, semicolons, 2-space indentation, `printWidth` 100, `trailingComma: "es5"`, LF line endings.

### Pre-commit Hook

Husky runs `lint-staged` on every commit (`.husky/pre-commit`). Staged files are processed as follows:

| Files        | Commands                                |
| ------------ | --------------------------------------- |
| `*.{ts,tsx}` | `eslint --fix`, then `prettier --write` |
| `*.{css,md}` | `prettier --write`                      |

If lint-staged fails (e.g. an ESLint error that can't be auto-fixed), the hook exits with a non-zero status and the commit is aborted. Fix the reported issues and commit again.

## Features

### Customer

- Home page with hero banner, featured products, and collections
- Product listing with search, category filters, and sorting
- Product details with sizes, colors, and pricing
- Cart, mock checkout, and order confirmation
- Profile with order history

### Admin

- Dashboard with sales and order statistics
- Product management (add, edit, delete)
- Order management with status updates
- Admin management: add or revoke administrators (super-admin only)

## Routes

| Path                                                          | Access     |
| ------------------------------------------------------------- | ---------- |
| `/`, `/products`, `/products/:id`, `/login`                   | Public     |
| `/cart`, `/checkout`, `/order-confirmation`, `/profile`       | Signed in  |
| `/admin`, `/admin/products`, `/admin/orders`, `/admin/admins` | Admin only |

Unauthenticated users are redirected to `/login`; non-admins visiting admin routes are redirected to `/`.

## Roles and Demo Accounts

Roles: `1 = ADMIN`, `2 = CLIENT`.

| Role        | Email                        | Password      |
| ----------- | ---------------------------- | ------------- |
| Super-admin | `ashutoshkhajuria@gmail.com` | `ashutosh`    |
| Admin       | `admin@example.com`          | `admin123`    |
| Customer    | `customer@example.com`       | `customer123` |

The super-admin cannot be removed or demoted through the UI. Only the super-admin can add or revoke other administrators.

> Authentication is a client-side demo only. Credentials and data live in `localStorage`; clear it in your browser to reset the demo data.

## Project Structure

```
src/
├── App.tsx          # Routing and protected routes
├── main.tsx         # Entry point
├── index.css        # Tailwind directives
├── components/      # Navigation, ProductCard
├── context/         # AuthContext, CartContext
├── data/            # Mock seed data
├── pages/           # Customer pages
│   └── admin/       # Admin pages
├── types/           # Shared TypeScript types
└── utils/           # localStorage helpers
```
