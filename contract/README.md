# Armpay Contract

Soroban smart contract for Armpay multi-payer invoices on Stellar.

## Functions

| Function | Description |
|---|---|
| `create_invoice(creator, recipient, token, amount, deadline) -> u64` | Creates an invoice that pays `amount` of `token` to `recipient` once fully funded before `deadline`. Returns the invoice id. |
| `contribute(invoice_id, payer, amount) -> i128` | Moves `amount` from `payer` into escrow. When the invoice is fully funded, the recipient is paid automatically. Returns the total funded. |
| `refund(invoice_id, payer) -> i128` | After a missed deadline, returns the payer's full contribution. Returns the refunded amount. |

## Errors

| Code | Error |
|---|---|
| 1 | `InvalidAmount` |
| 2 | `InvalidDeadline` |
| 3 | `InvoiceNotFound` |
| 4 | `InvoiceNotOpen` |
| 5 | `DeadlinePassed` |
| 6 | `Overfunded` |
| 7 | `DeadlineNotReached` |
| 8 | `NothingToRefund` |

## Build & test

Requires Rust (stable) and the [Stellar CLI](https://developers.stellar.org/docs/tools/cli).

```bash
cd contract
cargo test             # run the 5 unit tests
stellar contract build # build target/wasm32v1-none/release/armpay.wasm
```

## Deploy (testnet)

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/armpay.wasm \
  --source alice \
  --network testnet
```
