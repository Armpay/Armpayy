import Link from "next/link";

export function Cta() {
  return (
    <section id="get-started" className="scroll-mt-20 border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-brand px-6 py-14 text-center text-brand-foreground sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Split your next payment the trustless way
          </h2>
          <p className="mx-auto mt-4 max-w-xl opacity-80">
            Passkey sign-in, sponsored fees, and USDC settlement. No seed
            phrases, no XLM required.
          </p>
          <Link
            href="/#get-started"
            className="mt-8 inline-block rounded-full bg-brand-foreground px-6 py-3 text-sm font-medium text-brand transition-opacity hover:opacity-90"
          >
            Create an invoice
          </Link>
        </div>
      </div>
    </section>
  );
}
