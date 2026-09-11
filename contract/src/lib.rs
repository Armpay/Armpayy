#![no_std]

mod errors;

pub use errors::Error;

use soroban_sdk::{contract, contractimpl};

#[contract]
pub struct ArmpayContract;

#[contractimpl]
impl ArmpayContract {}
