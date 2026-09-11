use soroban_sdk::{contracttype, Address, Env};

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
