import { Injectable } from "@angular/core";
import { SignalStore } from "./signal.store";
import { User, Wallet } from "../shared/Interfaces/interface";

@Injectable({ providedIn: 'root' })
export class UserStoreService extends SignalStore<User> {
  constructor() {
    super();
  }
}


@Injectable({ providedIn: 'root' })
export class WalletStoreService extends SignalStore<Wallet> {
  constructor() { 
    super();
  }
}