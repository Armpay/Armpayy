const features = [
  {
    title: "Non-custodial escrow",
    body: "Funds sit in a Soroban contract and move only under rules anyone can read — not even the invoice creator can touch the pot.",
  },
  {
    title: "Multi-payer invoices",
    body: "Split one invoice across many payers. Each funds their own share and tracks progress in real time.",
  },
  {
    title: "Pull-based payouts",
    body: "Recipients withdraw their own share, so one un-receivable recipient can never block everyone else.",
  },
  {
    title: "Automatic refunds",
    body: "If the deadline passes unfunded, every payer reclaims their exact contribution — no admin needed.",
  },
  {
    title: "Advanced release modes",
    body: "N-of-M multi-sig approvals, staged time-locked tranches, oracle-gated and scheduled release.",
  },
  {
    title: "Dollar-denominated",
    body: "Settle in USDC and cash in or out in local currency through Stellar anchors.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything a shared payment needs
          </h2>
          <p className="mt-4 text-muted">
            Freelance teams, friends splitting a trip, DAOs paying contributors,
            families pooling a remittance — one contract handles it all.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
