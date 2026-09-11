"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type KitModule = typeof import("@creit.tech/stellar-wallets-kit");
type Kit = KitModule["StellarWalletsKit"];

// Same wallet set as the escrow app; HOT and Trezor are stubbed out in package.json overrides.
const SUPPORTED_WALLETS = new Set(["freighter", "albedo", "xbull", "hana"]);

// The kit persists the connected address under this key and restores it on load.
const ACTIVE_ADDRESS_KEY = "@StellarWalletsKit/activeAddress";

// Rejection code the kit uses when the user simply closes the wallet picker.
const MODAL_CLOSED_CODE = -1;

let kitPromise: Promise<KitModule> | null = null;

// The kit is large and touches localStorage at import time, so it is only
// loaded in the browser, the first time it is actually needed.
function loadKit(): Promise<KitModule> {
  kitPromise ??= Promise.all([
    import("@creit.tech/stellar-wallets-kit"),
    import("@creit.tech/stellar-wallets-kit/modules/utils"),
  ])
    .then(([mod, { defaultModules }]) => {
      mod.StellarWalletsKit.init({
        modules: defaultModules({
          filterBy: (module) => SUPPORTED_WALLETS.has(module.productId),
        }),
        network: mod.Networks.TESTNET,
        theme: {
          ...mod.SwkAppDarkTheme,
          background: "#0f0f16",
          "background-secondary": "#16161f",
          "foreground-strong": "#ffffff",
          foreground: "#ededf2",
          "foreground-secondary": "#9b9bab",
          primary: "#8b7cff",
          "primary-foreground": "#ffffff",
          border: "#22222e",
          shadow: "0 24px 64px -12px rgba(0, 0, 0, 0.6)",
          "border-radius": "1rem",
          "font-family": "var(--font-geist-sans), system-ui, sans-serif",
        },
        authModal: { showInstallLabel: true, hideUnsupportedWallets: false },
      });
      return mod;
    })
    .catch((error) => {
      kitPromise = null;
      throw error;
    });
  return kitPromise;
}

function errorMessage(error: unknown): string | null {
  if (typeof error === "object" && error !== null) {
    const { code, message } = error as { code?: number; message?: string };
    if (code === MODAL_CLOSED_CODE) return null;
    if (message) return message;
  }
  return "Could not connect to your wallet. Please try again.";
}

type WalletStatus = "disconnected" | "connecting" | "connected";

interface WalletContextValue {
  address: string | null;
  status: WalletStatus;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const unsubscribers = useRef<Array<() => void>>([]);

  // Loads the kit and keeps `address` in sync with it (account switches,
  // disconnects, and the address restored from storage on load).
  const attachKit = useCallback(async (): Promise<Kit> => {
    const { StellarWalletsKit, KitEventType } = await loadKit();
    if (unsubscribers.current.length === 0) {
      unsubscribers.current.push(
        StellarWalletsKit.on(KitEventType.STATE_UPDATED, (event) =>
          setAddress(event.payload.address ?? null),
        ),
        StellarWalletsKit.on(KitEventType.DISCONNECT, () => setAddress(null)),
      );
    }
    return StellarWalletsKit;
  }, []);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(ACTIVE_ADDRESS_KEY);
    } catch {
      // Storage can be unavailable (private mode, blocked site data).
    }
    if (saved) {
      attachKit().catch(() => setAddress(null));
    }

    const subscriptions = unsubscribers.current;
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      subscriptions.length = 0;
    };
  }, [attachKit]);

  useEffect(() => {
    if (!error) return;
    const timer = window.setTimeout(() => setError(null), 6000);
    return () => window.clearTimeout(timer);
  }, [error]);

  const connect = useCallback(async () => {
    setError(null);
    setConnecting(true);
    try {
      const kit = await attachKit();
      const result = await kit.authModal();
      setAddress(result.address);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setConnecting(false);
    }
  }, [attachKit]);

  const disconnect = useCallback(async () => {
    try {
      const kit = await attachKit();
      await kit.disconnect();
    } finally {
      setAddress(null);
    }
  }, [attachKit]);

  const status: WalletStatus = address
    ? "connected"
    : connecting
      ? "connecting"
      : "disconnected";

  return (
    <WalletContext.Provider value={{ address, status, connect, disconnect }}>
      {children}
      {error && (
        <div
          role="alert"
          className="fixed right-4 bottom-4 left-4 z-60 flex items-start gap-3 rounded-2xl border border-border bg-surface-strong/95 p-4 text-sm shadow-2xl backdrop-blur sm:left-auto sm:max-w-sm"
        >
          <span aria-hidden className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" />
          <p className="flex-1 text-foreground">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-muted hover:text-foreground"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used inside <WalletProvider>");
  }
  return context;
}
