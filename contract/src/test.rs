use super::*;
use soroban_sdk::{
    testutils::{Address as _, Ledger},
    token::{StellarAssetClient, TokenClient},
    Address, Env,
};

const START: u64 = 1_000;
const DEADLINE: u64 = 2_000;

struct Setup<'a> {
    env: Env,
    client: ArmpayContractClient<'a>,
    token: TokenClient<'a>,
    creator: Address,
    recipient: Address,
    alice: Address,
    bob: Address,
}

fn setup<'a>() -> Setup<'a> {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().set_timestamp(START);

    let admin = Address::generate(&env);
    let token_address = env.register_stellar_asset_contract_v2(admin).address();
    let asset = StellarAssetClient::new(&env, &token_address);

    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    asset.mint(&alice, &1_000);
    asset.mint(&bob, &1_000);

    let contract_id = env.register(ArmpayContract, ());

    Setup {
        client: ArmpayContractClient::new(&env, &contract_id),
        token: TokenClient::new(&env, &token_address),
        creator: Address::generate(&env),
        recipient: Address::generate(&env),
        alice,
        bob,
        env,
    }
}

fn create_invoice(s: &Setup, amount: i128) -> u64 {
    s.client.create_invoice(
        &s.creator,
        &s.recipient,
        &s.token.address,
        &amount,
        &DEADLINE,
    )
}

#[test]
fn test_create_invoice_assigns_sequential_ids() {
    let s = setup();

    assert_eq!(create_invoice(&s, 500), 0);
    assert_eq!(create_invoice(&s, 250), 1);
}

#[test]
fn test_create_invoice_rejects_invalid_input() {
    let s = setup();
    let token = s.token.address.clone();

    let zero_amount = s
        .client
        .try_create_invoice(&s.creator, &s.recipient, &token, &0, &DEADLINE);
    assert_eq!(zero_amount, Err(Ok(Error::InvalidAmount)));

    let past_deadline = s
        .client
        .try_create_invoice(&s.creator, &s.recipient, &token, &500, &START);
    assert_eq!(past_deadline, Err(Ok(Error::InvalidDeadline)));
}

#[test]
fn test_partial_contribution_is_held_in_escrow() {
    let s = setup();
    let id = create_invoice(&s, 500);

    assert_eq!(s.client.contribute(&id, &s.alice, &300), 300);

    assert_eq!(s.token.balance(&s.client.address), 300);
    assert_eq!(s.token.balance(&s.alice), 700);
    assert_eq!(s.token.balance(&s.recipient), 0);
}

#[test]
fn test_full_funding_pays_recipient() {
    let s = setup();
    let id = create_invoice(&s, 500);

    s.client.contribute(&id, &s.alice, &300);
    assert_eq!(s.client.contribute(&id, &s.bob, &200), 500);

    assert_eq!(s.token.balance(&s.recipient), 500);
    assert_eq!(s.token.balance(&s.client.address), 0);

    let late = s.client.try_contribute(&id, &s.bob, &1);
    assert_eq!(late, Err(Ok(Error::InvoiceNotOpen)));
}
