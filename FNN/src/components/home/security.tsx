const enforced = [
  "Escrowed funds only move per the invoice's on-chain rules.",
  "Refunds after an unfunded deadline are permissionless.",
  "Pull-based payouts — one recipient can't freeze the rest.",
  "The circuit breaker can pause new activity, never refunds or withdrawals.",
];

const trusted = [
  "Oracle-gated release trusts the named oracle adapter.",
  "Cross-chain contributions trust the bridge attestation set.",
  "Fee tiers and analytics are conveniences, not guarantees.",
];

export function Security() {
  return (
    <section id="security" className="scroll-mt-20 border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Minimally trusted, and honest about it
          </h2>
          <p className="mt-4 text-muted">
            We spell out exactly what the contract enforces and what is an
            opt-in trust assumption.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-medium">Enforced by the contract</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {enforced.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="text-brand">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-medium">Explicitly trusted (opt-in)</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {trusted.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          Not yet audited — don&apos;t use on mainnet with real funds until the
          external audit lands.
        </p>
      </div>
    </section>
  );
}
