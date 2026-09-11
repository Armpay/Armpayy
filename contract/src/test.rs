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
