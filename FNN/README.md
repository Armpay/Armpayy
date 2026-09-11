# FNN — Armpay Frontend

Next.js (App Router, TypeScript, Tailwind CSS v4) frontend for Armpay, trustless multi-payer invoices on Stellar.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — run ESLint

## Structure

```text
src/
├── app/
│   ├── layout.tsx       # Root layout: fonts, metadata, navbar, footer
│   ├── page.tsx         # Home page
│   └── globals.css      # Theme tokens (light/dark)
└── components/
    ├── navbar.tsx
    ├── footer.tsx
    └── home/            # Home page sections: hero, features, how it works, security, CTA
```
