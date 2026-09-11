import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#security", label: "Security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "https://developers.stellar.org/docs/build/smart-contracts", label: "Soroban docs" },
      { href: "https://developers.stellar.org/docs/learn/fundamentals/anchors", label: "Stellar anchors" },
      { href: "https://github.com/stellar/passkey-kit", label: "Passkey kit" },
    ],
  },
  {
    title: "Build",
    links: [
      { href: "https://github.com/Armpay/Armpayy", label: "GitHub" },
      { href: "https://github.com/Armpay/Armpayy/tree/main/contract", label: "Contract" },
      { href: "https://github.com/Armpay/Armpayy/blob/main/CONTRIBUTING.md", label: "Contributing" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-brand to-accent text-sm font-bold text-white">
              A
            </span>
            Armpay
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Trustless multi-payer invoices on Stellar, settled by Soroban smart contracts.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-medium">{column.title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className="text-muted transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Armpay · MIT License</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-warning" />
            Stellar testnet · not yet audited
          </p>
        </div>
      </div>
    </footer>
  );
}
