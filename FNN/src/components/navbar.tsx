"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";

const links = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it works" },
  { id: "security", label: "Security" },
];

const SECTION_IDS = links.map((link) => link.id);

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );
}

// Highlights the nav link for whichever section sits in the middle of the viewport.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActive(id);
          } else {
            setActive((current) => (current === id ? null : current));
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);
  const raised = scrolled || open;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ${
          raised
            ? "border-border bg-background/70 shadow-lg shadow-black/30 backdrop-blur-xl"
            : "border-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 pr-2 pl-4">
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br from-brand to-accent text-sm font-bold text-white shadow-[0_0_24px_-4px_var(--brand)]">
              A
            </span>
            Armpay
          </Link>

          <ul className="hidden items-center gap-1 text-sm md:flex">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-3.5 py-1.5 transition-colors ${
                      isActive
                        ? "bg-white/[0.07] text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <span className="rounded-full border border-warning/25 bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
              Testnet
            </span>
            <ConnectWalletButton />
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {open && (
          <div id="mobile-menu" className="border-t border-border px-2 pt-2 pb-3 md:hidden">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    className="block rounded-xl px-3 py-3 text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 px-1">
              <ConnectWalletButton fullWidth onAction={() => setOpen(false)} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
