import { SectionHeading } from "./section-heading";

const steps = [
  {
    title: "Create the invoice",
    body: "Set the total, the recipient, the token and a funding deadline. The contract locks those rules in.",
    call: "create_invoice(creator, recipient, token, amount, deadline)",
  },
  {
    title: "Payers fund their shares",
    body: "Each payer contributes their share in USDC straight into escrow — progress is visible to everyone.",
    call: "contribute(invoice_id, payer, amount)",
  },
  {
    title: "Settle or refund",
    body: "The final share pays the recipient automatically. Deadline missed? Every payer pulls back exactly what they put in.",
    call: "refund(invoice_id, payer)",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Three contract calls, zero middlemen"
          description="The whole flow runs on the Armpay Soroban contract. Here is every function it exposes."
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute top-5 right-[16.66%] left-[16.66%] hidden h-px bg-linear-to-r from-brand/0 via-brand/60 to-accent/0 md:block"
          />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex min-w-0 flex-col md:items-center md:text-center">
                <span className="relative grid h-10 w-10 place-items-center rounded-full border border-brand/40 bg-background font-mono text-sm font-semibold text-brand shadow-[0_0_24px_-6px_var(--brand)]">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-medium">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.body}</p>
                <code className="mt-5 max-w-full self-start rounded-xl border border-border bg-surface/80 px-3 py-2 font-mono text-xs leading-relaxed text-accent md:self-auto">
                  {step.call}
                </code>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
