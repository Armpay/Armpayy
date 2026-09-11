use soroban_sdk::{contracttype, Address, Env};

use crate::types::Invoice;

const DAY_IN_LEDGERS: u32 = 17_280;
const BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;
const BUMP_THRESHOLD: u32 = BUMP_AMOUNT - DAY_IN_LEDGERS;

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    NextId,
    Invoice(u64),
    Contribution(u64, Address),
}

pub fn extend_instance(env: &Env) {
    env.storage()
        .instance()
        .extend_ttl(BUMP_THRESHOLD, BUMP_AMOUNT);
}

pub fn next_invoice_id(env: &Env) -> u64 {
    let id: u64 = env.storage().instance().get(&DataKey::NextId).unwrap_or(0);
    env.storage().instance().set(&DataKey::NextId, &(id + 1));
    id
}

pub fn read_invoice(env: &Env, id: u64) -> Option<Invoice> {
    let key = DataKey::Invoice(id);
    let invoice = env.storage().persistent().get(&key);
    if invoice.is_some() {
        env.storage()
            .persistent()
            .extend_ttl(&key, BUMP_THRESHOLD, BUMP_AMOUNT);
    }
    invoice
}

pub fn write_invoice(env: &Env, id: u64, invoice: &Invoice) {
    let key = DataKey::Invoice(id);
    env.storage().persistent().set(&key, invoice);
    env.storage()
        .persistent()
        .extend_ttl(&key, BUMP_THRESHOLD, BUMP_AMOUNT);
}
