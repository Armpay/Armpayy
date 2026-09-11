#![no_std]

mod errors;
mod types;

pub use errors::Error;
pub use types::InvoiceStatus;

use soroban_sdk::{contract, contractimpl};

#[contract]
pub struct ArmpayContract;

#[contractimpl]
impl ArmpayContract {}
