import { Injectable } from "@angular/core";
import { SignalStore } from "./signal.store";
import { Wallet } from '../shared/Interfaces/interface';

@Injectable({
    providedIn: 'root'
  })
  export class WalletStoreService extends SignalStore<Wallet> {
    constructor() {
      super();
    }
  }
