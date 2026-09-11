#![no_std]

mod errors;
mod events;
mod storage;
mod types;

pub use errors::Error;
pub use types::{Invoice, InvoiceStatus};

use soroban_sdk::{contract, contractimpl, token, Address, Env};

#[contract]
pub struct ArmpayContract;

#[contractimpl]
impl ArmpayContract {
    /// Creates a new invoice that pays `amount` of `token` to `recipient`
    /// once fully funded before `deadline` (a ledger timestamp).
    /// Returns the new invoice id.
    pub fn create_invoice(
        env: Env,
        creator: Address,
        recipient: Address,
        token: Address,
        amount: i128,
        deadline: u64,
    ) -> Result<u64, Error> {
        creator.require_auth();

        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }
        if deadline <= env.ledger().timestamp() {
            return Err(Error::InvalidDeadline);
        }

        let id = storage::next_invoice_id(&env);
        let invoice = Invoice {
            creator: creator.clone(),
            recipient: recipient.clone(),
            token,
            amount,
            funded: 0,
            deadline,
            status: InvoiceStatus::Open,
        };
        storage::write_invoice(&env, id, &invoice);
        storage::extend_instance(&env);

        events::InvoiceCreated {
            id,
            creator,
            recipient,
            amount,
            deadline,
        }
        .publish(&env);

        Ok(id)
    }

    /// Moves `amount` from `payer` into escrow for the invoice. When the
    /// invoice becomes fully funded, the full amount is paid to the
    /// recipient. Returns the invoice's total funded amount.
    pub fn contribute(
        env: Env,
        invoice_id: u64,
        payer: Address,
        amount: i128,
    ) -> Result<i128, Error> {
        payer.require_auth();

        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }
        let mut invoice = storage::read_invoice(&env, invoice_id).ok_or(Error::InvoiceNotFound)?;
        if invoice.status != InvoiceStatus::Open {
            return Err(Error::InvoiceNotOpen);
        }
        if env.ledger().timestamp() >= invoice.deadline {
            return Err(Error::DeadlinePassed);
        }
        let funded = invoice.funded + amount;
        if funded > invoice.amount {
            return Err(Error::Overfunded);
        }

        let token = token::Client::new(&env, &invoice.token);
        let escrow = env.current_contract_address();
        token.transfer(&payer, &escrow, &amount);

        let contributed = storage::read_contribution(&env, invoice_id, &payer);
        storage::write_contribution(&env, invoice_id, &payer, contributed + amount);
        invoice.funded = funded;

        events::Contributed {
            id: invoice_id,
            payer,
            amount,
            funded,
        }
        .publish(&env);

        if funded == invoice.amount {
            token.transfer(&escrow, &invoice.recipient, &invoice.amount);
            invoice.status = InvoiceStatus::Paid;

            events::InvoicePaid {
                id: invoice_id,
                recipient: invoice.recipient.clone(),
                amount: invoice.amount,
            }
            .publish(&env);
        }

        storage::write_invoice(&env, invoice_id, &invoice);
        storage::extend_instance(&env);

        Ok(funded)
    }
}
