use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    InvalidAmount = 1,
    InvalidDeadline = 2,
    InvoiceNotFound = 3,
    InvoiceNotOpen = 4,
    DeadlinePassed = 5,
    Overfunded = 6,
    DeadlineNotReached = 7,
    NothingToRefund = 8,
}
