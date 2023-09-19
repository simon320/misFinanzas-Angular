import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WalletService } from '../../../services/wallet.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Wallet } from '../../../shared/Interfaces/interface';
import { UserStoreService, WalletStoreService } from 'src/app/store/signals.service';
import { User } from 'src/app/shared/enums/user.enum';
import { URL } from 'src/app/shared/enums/routes.enum';

@Component({
  selector: 'app-first-admission',
  templateUrl: './first-admission.component.html',
  styleUrls: ['./first-admission.component.scss'],
})
export class FirstAdmissionComponent implements OnInit {
  wallet: Wallet = {
    userId: '',
    money_acount: 0,
    money_saved: [],
    money_per_day: 0,
    start_selected_day: '',
    end_selected_day: '',
    days: [],
    movement: [],
  };
  amountForm!: FormGroup;
  user = { id: '', name: ''};


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private walletService: WalletService,
    private userService: UserService,
    private userSignal: UserStoreService,
    private walletSignal: WalletStoreService,
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.getUserId();
    this.getAmount();
  }

  getUserId() {
    this.route.queryParams
      .subscribe({
        next: ( params ) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
      }}
    );
  }

  getAmount() {
    this.amountForm = this.fb.group({ amount: [] });
  }

  setAmountAccount() {
    const amount = this.amountForm.get('amount')?.value;
    if (amount != 0) {
      this.wallet.money_acount = amount;
      this.wallet.userId = this.user.id;
    }

    this.walletService.createWallet(this.user.id, this.wallet).subscribe({
      next: () => {
        this.userService.setFirstLogin(this.user.id)
          .subscribe({
            next: _ => {
              this.userSignal.set(User.FIRST, false);
              this.walletSignal.setState(this.wallet);
              this.router.navigate([URL.HOME]);
            }
          })
        this.router.navigate([URL.FIRST_ADMISSION]);
      },
      error: console.error,
    });
  }
}
