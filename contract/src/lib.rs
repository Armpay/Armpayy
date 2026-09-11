#![no_std]

mod errors;
mod events;
mod storage;
mod types;

pub use errors::Error;
pub use types::{Invoice, InvoiceStatus};

use soroban_sdk::{contract, contractimpl, Address, Env};

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

        Ok(id)
    }
}
