import { AlertIcon, CheckIcon, LayersIcon, ShieldIcon } from "@/components/icons";
import { SectionHeading } from "./section-heading";

const enforced = [
  "Escrowed funds only move per the invoice's on-chain rules.",
  "Refunds after an unfunded deadline need no admin.",
  "Nobody — not even the creator — can withdraw the pot early.",
  "Every rule is public and verifiable on Stellar.",
];

const trusted = [
  "Oracle-gated release trusts the named oracle adapter.",
  "Cross-chain contributions trust the bridge attestation set.",
  "Fee tiers and analytics are conveniences, not guarantees.",
];

export function Security() {
  return (
    <section id="security" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Security"
          title="Minimally trusted, and honest about it"
          description="We spell out exactly what the contract enforces and what is an opt-in trust assumption."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-success/20 bg-linear-to-b from-success/6 to-transparent p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/10 text-success">
                <ShieldIcon />
              </span>
              <h3 className="font-medium">Enforced by the contract</h3>
            </div>
            <ul className="mt-6 space-y-4 text-sm">
              {enforced.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon width={18} height={18} className="mt-px shrink-0 text-success" />
                  <span className="text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-muted">
                <LayersIcon />
              </span>
              <h3 className="font-medium">Explicitly trusted (opt-in)</h3>
            </div>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              {trusted.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          role="note"
          className="mt-4 flex items-start gap-3 rounded-2xl border border-warning/20 bg-warning/6 p-4 text-sm"
        >
          <AlertIcon width={18} height={18} className="mt-px shrink-0 text-warning" />
          <p className="text-foreground/85">
            <span className="font-medium text-warning">Not yet audited.</span> Don&apos;t use
            Armpay on mainnet with real funds until the external audit lands.
          </p>
        </div>
      </div>
    </section>
  );
}
