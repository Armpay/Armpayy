import { ArrowRightIcon } from "@/components/icons";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";

const CONTRACT_URL = "https://github.com/Armpay/Armpayy/tree/main/contract";

export function Cta() {
  return (
    <section id="get-started" className="scroll-mt-24 px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-linear-to-br from-brand/60 via-white/10 to-accent/50 p-px">
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[min(40rem,100%)] -translate-x-1/2 rounded-full bg-brand/25 blur-[100px]"
          />
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Split your next payment <span className="text-gradient">the trustless way</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-muted">
              Connect a Stellar wallet — Freighter, xBull, Albedo or Hana — and try Armpay on testnet.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ConnectWalletButton />
              <a
                href={CONTRACT_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                Read the contract
                <ArrowRightIcon
                  width={16}
                  height={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
