import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

const highlights = ["Non-custodial", "USDC settlement", "Automatic refunds"];

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[28rem] w-[min(56rem,100%)] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
      />

      <div className="max-w-2xl">
        <Link
          href="/#how-it-works"
          className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 py-1 pr-3 pl-1.5 text-xs text-muted backdrop-blur transition-colors hover:border-white/15 hover:text-foreground"
        >
          <span className="rounded-full bg-brand/15 px-2 py-0.5 font-medium text-brand">New</span>
          Soroban escrow is live on Stellar testnet
          <ArrowRightIcon width={14} height={14} />
        </Link>

        <h1 className="animate-fade-up mt-6 text-4xl font-semibold tracking-tight text-balance [animation-delay:80ms] sm:text-6xl sm:leading-[1.05]">
          Shared invoices, <span className="text-gradient">without the middleman.</span>
        </h1>

        <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted [animation-delay:160ms]">
          Many payers each fund a share. When the invoice is fully funded, the
          contract pays the recipient in USDC — and if it isn&apos;t, every
          payer gets their money back. Automatically, on-chain.
        </p>

        <div className="animate-fade-up mt-9 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
          <Link
            href="/#get-started"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-white"
          >
            Create an invoice
            <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/#how-it-works"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-white/15 hover:bg-surface-strong"
          >
            See how it works
          </Link>
        </div>

        <ul className="animate-fade-up mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted [animation-delay:320ms]">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon width={16} height={16} className="text-success" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
