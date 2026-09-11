import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Built on Stellar · Soroban smart contracts
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Shared invoices, without the middleman.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted text-pretty">
          Many payers each fund a share. When the invoice is fully funded, the
          contract pays every recipient in USDC — and if it isn&apos;t, every
          payer gets their money back. Automatically, on-chain.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/#get-started"
            className="w-full rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            Create an invoice
          </Link>
          <Link
            href="/#how-it-works"
            className="w-full rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium transition-colors hover:bg-background sm:w-auto"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
