import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PfxService } from '../../../services/pfx.service';
import { UserService } from '../../../services/user.service';
import { Pfx } from 'src/app/shared/Interfaces/interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-first-admission',
  templateUrl: './first-admission.component.html',
  styleUrls: ['./first-admission.component.scss'],
})
export class FirstAdmissionComponent implements OnInit {
  wallet: Pfx = {
    userId: '',
    money_acount: 0,
    money_saved: [],
    money_per_day: 0,
    start_selected_day: '',
    end_selected_day: '',
    days: [],
  };
  amountForm!: FormGroup;
  user = { id: '', name: ''};


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pfxService: PfxService,
    private userService: UserService,
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

    this.pfxService.createWallet(this.user.id, this.wallet).subscribe({
      next: (_) => {
        this.userService.setFirstLogin(this.user.id, false)
          .subscribe( data => console.log(data) )
        console.log(this.wallet)
        this.router.navigate(['misfinanzas/home']);
      },
      error: console.error,
    });
  }
}
