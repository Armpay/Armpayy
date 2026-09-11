use soroban_sdk::{contracttype, Address};

#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum InvoiceStatus {
    Open,
    Paid,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Invoice {
    pub creator: Address,
    pub recipient: Address,
    pub token: Address,
    pub amount: i128,
    pub funded: i128,
    pub deadline: u64,
    pub status: InvoiceStatus,
}
