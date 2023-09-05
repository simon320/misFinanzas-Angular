import { Injectable } from "@angular/core";
import { SignalStore } from "./signal.store";
import { User } from "../shared/Interfaces/interface";

@Injectable({
    providedIn: 'root'
  })
  export class UserStoreService extends SignalStore<User> {
    constructor() {
      super();
    }
  }