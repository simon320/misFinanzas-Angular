import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { UserStoreService, WalletStoreService } from './store/signals.service';
import { WalletService } from './services/wallet.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'misFinanzas';

  constructor(
    private userService: UserService,
    private walletService: WalletService,
    private userSignal: UserStoreService,
    private walletSignal: WalletStoreService,
  ) {
    this.getUserRefresh();
  }

  getUserRefresh() {
    const id = localStorage.getItem("id");
    if(!id) return

    this.userService.getUserWithId( id! )
      .subscribe({
        next: ({ user }) => this.userSignal.setState(user)
      })

    this.walletService.getWallet( id! )
      .subscribe({
        next: wallet => this.walletSignal.setState(wallet)
      })
  }
}
