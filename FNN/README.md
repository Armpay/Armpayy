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

## Wallet connection

The **Connect wallet** button in the nav uses [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit) on **Stellar testnet**, with Freighter, xBull, Albedo and Hana enabled. The kit is loaded lazily the first time it is needed, and it remembers the connected address between visits.

Use `useWallet()` from `src/components/wallet/wallet-provider.tsx` to read the connected `address` and `status`, or to call `connect()` / `disconnect()`.

The HOT and Trezor wallet SDKs are replaced with an empty package in `package.json` `overrides` (as in the escrow app — see `../docs/dependency-overrides.md`), which keeps their unpatched `elliptic` advisories out of the install.

## Structure

```text
src/
├── app/
│   ├── layout.tsx            # Root layout: fonts, metadata, wallet provider, navbar, footer
│   ├── page.tsx              # Home page
│   └── globals.css           # Dark theme tokens, animations, background grid
└── components/
    ├── navbar.tsx            # Sticky glass nav with active-section links + connect wallet
    ├── footer.tsx
    ├── icons.tsx             # Inline SVG icon set
    ├── wallet/
    │   ├── wallet-provider.tsx       # Wallet context (Stellar Wallets Kit)
    │   └── connect-wallet-button.tsx # Connect button + connected account menu
    └── home/                 # Hero, invoice preview, stats, features, how it works, security, CTA
```
