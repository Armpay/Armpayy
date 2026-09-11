use soroban_sdk::{contractevent, Address};

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InvoiceCreated {
    #[topic]
    pub id: u64,
    pub creator: Address,
    pub recipient: Address,
    pub amount: i128,
    pub deadline: u64,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Contributed {
    #[topic]
    pub id: u64,
    #[topic]
    pub payer: Address,
    pub amount: i128,
    pub funded: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InvoicePaid {
    #[topic]
    pub id: u64,
    pub recipient: Address,
    pub amount: i128,
}
