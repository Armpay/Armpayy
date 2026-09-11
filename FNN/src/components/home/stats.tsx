const stats = [
  { value: "~5s", label: "to settle on Stellar" },
  { value: "<$0.01", label: "typical network fee" },
  { value: "USDC", label: "settlement, cash out via anchors" },
  { value: "0", label: "custodians holding your funds" },
];

export function Stats() {
  return (
    <section aria-label="Armpay at a glance" className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* The 1px gaps over a border-coloured background draw the dividers. */}
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-1 bg-background p-6 sm:p-8">
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
