#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, Map};

#[contract]
pub struct AccessPass;

#[contractimpl]
impl AccessPass {
    pub fn initialize(e: Env, admin: Address, name: String, symbol: String) {
        if e.storage().instance().has(&soroban_sdk::symbol_short!("admin")) {
            panic!("already initialized");
        }
        e.storage().instance().set(&soroban_sdk::symbol_short!("admin"), &admin);
        e.storage().instance().set(&soroban_sdk::symbol_short!("name"), &name);
        e.storage().instance().set(&soroban_sdk::symbol_short!("symbol"), &symbol);
        e.storage().instance().set(&soroban_sdk::symbol_short!("counter"), &0u32);
    }

    pub fn mint(e: Env, to: Address, plan_id: String) -> u32 {
        let admin: Address = e.storage().instance().get(&soroban_sdk::symbol_short!("admin")).unwrap();
        admin.require_auth();

        let mut counter: u32 = e.storage().instance().get(&soroban_sdk::symbol_short!("counter")).unwrap();
        counter += 1;
        
        e.storage().persistent().set(&counter, &to);
        e.storage().persistent().set(&soroban_sdk::symbol_short!("meta"), &plan_id);
        e.storage().instance().set(&soroban_sdk::symbol_short!("counter"), &counter);
        
        counter
    }

    pub fn owner_of(e: Env, token_id: u32) -> Address {
        e.storage().persistent().get(&token_id).unwrap()
    }
}
