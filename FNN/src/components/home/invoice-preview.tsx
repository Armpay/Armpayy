import { CheckIcon, ClockIcon, ShieldIcon } from "@/components/icons";

const TOTAL = 1200;

const payers = [
  { name: "Ada", amount: 300, paid: true, avatar: "from-violet-400 to-fuchsia-400" },
  { name: "Kofi", amount: 300, paid: true, avatar: "from-sky-400 to-cyan-300" },
  { name: "Maya", amount: 300, paid: true, avatar: "from-emerald-400 to-teal-300" },
  { name: "Leo", amount: 300, paid: false, avatar: "from-amber-400 to-orange-400" },
];

const funded = payers.filter((payer) => payer.paid).reduce((sum, payer) => sum + payer.amount, 0);
const percent = Math.round((funded / TOTAL) * 100);

const usdc = new Intl.NumberFormat("en-US");

/** Illustrative invoice showing what payers see while an invoice is being funded. */
export function InvoicePreview() {
  return (
    <figure
      aria-label="Example Armpay invoice"
      className="animate-fade-up relative mx-auto w-full max-w-md [animation-delay:200ms]"
    >
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-full bg-linear-to-tr from-brand/25 via-transparent to-accent/20 blur-3xl"
      />

      <div className="rounded-3xl border border-white/10 bg-surface/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-muted">INV-0042</p>
            <p className="mt-1 font-medium">Team offsite · Lisbon</p>
          </div>
          <span className="rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand">
            Funding
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted">Funded</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {usdc.format(funded)}{" "}
              <span className="text-base font-normal text-muted">/ {usdc.format(TOTAL)} USDC</span>
            </p>
          </div>
          <p className="font-mono text-sm font-medium text-accent">{percent}%</p>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="relative h-full overflow-hidden rounded-full bg-linear-to-r from-brand to-accent"
            style={{ width: `${percent}%` }}
          >
            <div className="animate-shimmer absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent" />
          </div>
        </div>

        <ul className="mt-6 space-y-1">
          {payers.map((payer) => (
            <li
              key={payer.name}
              className="flex items-center justify-between rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={`grid h-8 w-8 place-items-center rounded-full bg-linear-to-br ${payer.avatar} text-xs font-semibold text-black/70`}
                >
                  {payer.name[0]}
                </span>
                <span className="text-sm">{payer.name}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-mono text-muted">{payer.amount} USDC</span>
                {payer.paid ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-success">
                    <CheckIcon width={14} height={14} /> Paid
                  </span>
                ) : (
                  <span className="text-xs font-medium text-muted">Pending</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted">
          <ClockIcon width={14} height={14} />
          Refunds unlock if it isn&apos;t funded by Sep 30
        </div>
      </div>

      <div className="animate-float absolute -top-4 -right-2 hidden items-center gap-2 rounded-2xl border border-white/10 bg-surface-strong/90 px-3 py-2 text-xs shadow-xl backdrop-blur sm:flex">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-success/15 text-success">
          <CheckIcon width={12} height={12} />
        </span>
        +300 USDC from Maya
      </div>

      <div className="animate-float absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-2xl border border-white/10 bg-surface-strong/90 px-3 py-2 text-xs shadow-xl backdrop-blur [animation-delay:-3s] sm:flex">
        <ShieldIcon width={14} height={14} className="text-brand" />
        Held by a Soroban contract
      </div>
    </figure>
  );
}
