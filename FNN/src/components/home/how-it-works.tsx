const steps = [
  {
    title: "Create the invoice",
    body: "Set the total, the recipients and their split, and a funding deadline. The contract locks those rules in.",
  },
  {
    title: "Payers fund their shares",
    body: "Each payer contributes their share in USDC — or any Stellar asset via path payments — straight into escrow.",
  },
  {
    title: "Contract settles",
    body: "Fully funded? Recipients withdraw their payouts. Deadline missed? Every payer pulls back exactly what they put in.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-mono text-sm font-semibold text-brand-foreground">
                {i + 1}
              </span>
              <h3 className="mt-5 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
