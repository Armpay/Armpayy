#![no_std]

mod errors;
mod events;
mod storage;
mod types;

pub use errors::Error;
pub use types::{Invoice, InvoiceStatus};

use soroban_sdk::{contract, contractimpl};

#[contract]
pub struct ArmpayContract;

#[contractimpl]
impl ArmpayContract {}
