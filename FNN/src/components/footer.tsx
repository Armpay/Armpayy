import Link from "next/link";

const resources = [
  { href: "https://developers.stellar.org/docs/build/smart-contracts", label: "Soroban docs" },
  { href: "https://developers.stellar.org/docs/learn/fundamentals/anchors", label: "Stellar anchors" },
  { href: "https://github.com/stellar/passkey-kit", label: "Passkey kit" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Link href="/" className="font-semibold text-foreground">
            Armpay
          </Link>
          <p className="mt-1">Trustless multi-payer invoices on Stellar.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {resources.map((r) => (
            <li key={r.href}>
              <a href={r.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                {r.label}
              </a>
            </li>
          ))}
        </ul>
        <p>© {new Date().getFullYear()} Armpay · MIT License</p>
      </div>
    </footer>
  );
}
