#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String};

#[contract]
pub struct SubToken;

#[contractimpl]
impl SubToken {
    pub fn initialize(e: Env, admin: Address, decimal: u32, name: String, symbol: String) {
        if e.storage().instance().has(&soroban_sdk::symbol_short!("admin")) {
            panic!("already initialized");
        }
        e.storage().instance().set(&soroban_sdk::symbol_short!("admin"), &admin);
        e.storage().instance().set(&soroban_sdk::symbol_short!("decimal"), &decimal);
        e.storage().instance().set(&soroban_sdk::symbol_short!("name"), &name);
        e.storage().instance().set(&soroban_sdk::symbol_short!("symbol"), &symbol);
    }

    pub fn mint(e: Env, to: Address, amount: i128) {
        let admin: Address = e.storage().instance().get(&soroban_sdk::symbol_short!("admin")).unwrap();
        admin.require_auth();
        
        let balance: i128 = e.storage().persistent().get(&to).unwrap_or(0);
        e.storage().persistent().set(&to, &(balance + amount));
    }

    pub fn balance(e: Env, id: Address) -> i128 {
        e.storage().persistent().get(&id).unwrap_or(0)
    }

    pub fn transfer(e: Env, from: Address, to: Address, amount: i128) {
        from.require_auth();
        let balance_from: i128 = e.storage().persistent().get(&from).unwrap_or(0);
        if balance_from < amount {
            panic!("insufficient balance");
        }
        let balance_to: i128 = e.storage().persistent().get(&to).unwrap_or(0);
        e.storage().persistent().set(&from, &(balance_from - amount));
        e.storage().persistent().set(&to, &(balance_to + amount));
    }
}
