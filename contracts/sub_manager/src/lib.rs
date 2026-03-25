#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, Map, symbol_short};

#[contract]
pub struct SubscriptionManager;

#[contractimpl]
impl SubscriptionManager {
    pub fn initialize(e: Env, subtoken: Address, accesspass: Address, admin: Address) {
        if e.storage().instance().has(&soroban_sdk::symbol_short!("admin")) {
            panic!("already initialized");
        }
        e.storage().instance().set(&soroban_sdk::symbol_short!("admin"), &admin);
        e.storage().instance().set(&soroban_sdk::symbol_short!("subtoken"), &subtoken);
        e.storage().instance().set(&soroban_sdk::symbol_short!("accesspass"), &accesspass);
    }

    pub fn subscribe(e: Env, user: Address, creator: Address, plan_id: String, amount: i128) {
        user.require_auth();
        
        let subtoken: Address = e.storage().instance().get(&soroban_sdk::symbol_short!("subtoken")).unwrap();
        let accesspass: Address = e.storage().instance().get(&soroban_sdk::symbol_short!("accesspass")).unwrap();

        // 1. Transfer Payment (Inter-contract call)
        // Note: Real Soroban would use the token interface. This is a simplified logic.
        e.invoke_contract::<()>(
            &subtoken,
            &soroban_sdk::Symbol::new(&e, "transfer"),
            soroban_sdk::vec![&e, user.clone().into_val(&e), creator.into_val(&e), amount.into_val(&e)],
        );

        // 2. Mint Access Pass (Inter-contract call)
        e.invoke_contract::<u32>(
            &accesspass,
            &soroban_sdk::Symbol::new(&e, "mint"),
            soroban_sdk::vec![&e, user.into_val(&e), plan_id.into_val(&e)],
        );
    }
}
