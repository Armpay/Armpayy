"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  LogOutIcon,
  WalletIcon,
} from "@/components/icons";
import { useWallet } from "./wallet-provider";

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

interface ConnectWalletButtonProps {
  /** Stretch to the container width (mobile menu). */
  fullWidth?: boolean;
  onAction?: () => void;
}

export function ConnectWalletButton({ fullWidth = false, onAction }: ConnectWalletButtonProps) {
  const { address, status, connect, disconnect } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const width = fullWidth ? "w-full justify-center" : "";

  if (!address) {
    const connecting = status === "connecting";
    return (
      <button
        type="button"
        onClick={() => void connect()}
        disabled={connecting}
        className={`group relative inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset,0_8px_24px_-8px_var(--brand)] transition hover:bg-brand-strong disabled:cursor-wait disabled:opacity-80 ${width}`}
      >
        {connecting ? (
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
          />
        ) : (
          <WalletIcon width={16} height={16} />
        )}
        {connecting ? "Connecting…" : "Connect wallet"}
      </button>
    );
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the full address is shown in the menu.
    }
  };

  const itemClass =
    "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground";

  return (
    <div ref={containerRef} className={`relative ${fullWidth ? "w-full" : ""}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm transition-colors hover:border-white/15 hover:bg-surface-strong ${width}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="font-mono">{shortenAddress(address)}</span>
        <ChevronDownIcon
          width={16}
          height={16}
          className={`text-muted transition-transform ${menuOpen ? "rotate-180" : ""}`}
        />
      </button>

      {menuOpen && (
        <div
          role="menu"
          className={`absolute z-50 mt-2 rounded-2xl border border-border bg-surface/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl ${
            fullWidth ? "inset-x-0" : "right-0 w-64"
          }`}
        >
          <div className="px-3 pt-2 pb-3">
            <p className="text-xs text-muted">Connected · Stellar Testnet</p>
            <p className="mt-1 font-mono text-xs break-all text-foreground">{address}</p>
          </div>
          <div className="h-px bg-border" />
          <div className="pt-1.5">
            <button type="button" role="menuitem" onClick={copyAddress} className={itemClass}>
              {copied ? (
                <CheckIcon width={16} height={16} className="text-success" />
              ) : (
                <CopyIcon width={16} height={16} />
              )}
              {copied ? "Copied" : "Copy address"}
            </button>
            <a
              role="menuitem"
              href={`https://stellar.expert/explorer/testnet/account/${address}`}
              target="_blank"
              rel="noreferrer"
              className={itemClass}
            >
              <ExternalLinkIcon width={16} height={16} />
              View on Stellar Expert
            </a>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onAction?.();
                void disconnect();
              }}
              className={`${itemClass} hover:text-red-300`}
            >
              <LogOutIcon width={16} height={16} />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
