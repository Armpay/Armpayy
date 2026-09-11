import type { ReactNode } from "react";
import {
  ArrowDownToLineIcon,
  ArrowRightIcon,
  DollarIcon,
  LayersIcon,
  RefundIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";
import { SectionHeading } from "./section-heading";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  body: string;
  className?: string;
  children?: ReactNode;
}

function FeatureCard({ icon, title, body, className = "", children }: FeatureCardProps) {
  return (
    <li
      className={`group relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-6 transition-colors duration-300 hover:border-white/15 sm:p-7 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/4 text-brand">
        {icon}
      </span>
      <h3 className="mt-5 font-medium">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{body}</p>
      {children}
    </li>
  );
}

// Tokens for the contract snippet: [text, className].
const snippet: Array<Array<[string, string]>> = [
  [["// release only when fully funded", "text-muted"]],
  [["if ", "text-brand"], ["funded == invoice.amount {", ""]],
  [["    token.", ""], ["transfer", "text-accent"], ["(&escrow, &recipient, &amount);", ""]],
  [["}", ""]],
];

const avatars = [
  "from-violet-400 to-fuchsia-400",
  "from-sky-400 to-cyan-300",
  "from-emerald-400 to-teal-300",
  "from-amber-400 to-orange-400",
];

const ramps = ["NGN", "KES", "BRL", "EUR"];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Features"
          title="Everything a shared payment needs"
          description="Freelance teams, friends splitting a trip, DAOs paying contributors, families pooling a remittance — one contract handles it all."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            className="md:col-span-2"
            icon={<ShieldIcon />}
            title="Non-custodial escrow"
            body="Funds sit in a Soroban contract and move only under rules anyone can read — not even the invoice creator can touch the pot."
          >
            <pre className="mt-6 overflow-x-auto rounded-2xl border border-border bg-background/80 p-4 font-mono text-xs leading-relaxed">
              <code>
                {snippet.map((line, i) => (
                  <span key={i} className="block">
                    {line.map(([text, color], j) => (
                      <span key={j} className={color}>
                        {text}
                      </span>
                    ))}
                  </span>
                ))}
              </code>
            </pre>
          </FeatureCard>

          <FeatureCard
            icon={<UsersIcon />}
            title="Multi-payer invoices"
            body="Split one invoice across many payers. Each funds their own share and tracks progress in real time."
          >
            <div className="mt-6 flex items-center">
              <div className="flex -space-x-2">
                {avatars.map((gradient) => (
                  <span
                    key={gradient}
                    aria-hidden
                    className={`h-9 w-9 rounded-full border-2 border-surface bg-linear-to-br ${gradient}`}
                  />
                ))}
              </div>
              <span className="ml-3 text-xs text-muted">+ anyone with a Stellar wallet</span>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={<ArrowDownToLineIcon />}
            title="Instant payout"
            body="The moment the last share lands, the contract pays the recipient in the same transaction. No invoicing platform in between."
          />

          <FeatureCard
            icon={<RefundIcon />}
            title="Automatic refunds"
            body="If the deadline passes unfunded, every payer reclaims their exact contribution — no admin needed."
          />

          <FeatureCard
            icon={<LayersIcon />}
            title="Advanced release modes"
            body="Coming next: N-of-M multi-sig approvals, staged time-locked tranches, oracle-gated and scheduled release."
          />

          <FeatureCard
            className="md:col-span-2 lg:col-span-3"
            icon={<DollarIcon />}
            title="Dollar-denominated, local-currency friendly"
            body="Settle in USDC as a hedge against local-currency swings, and cash in or out through Stellar anchors (SEP-24)."
          >
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
              {ramps.map((currency) => (
                <span
                  key={currency}
                  className="rounded-full border border-border bg-background/60 px-3 py-1.5 font-mono text-muted"
                >
                  {currency}
                </span>
              ))}
              <ArrowRightIcon width={16} height={16} className="mx-1 text-muted" />
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-accent">
                USDC
              </span>
            </div>
          </FeatureCard>
        </ul>
      </div>
    </section>
  );
}
