import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletStoreService } from '../../../store/signals.service';

@Component({
  selector: 'app-day-selected',
  templateUrl: './day-selected.component.html',
  styleUrls: ['./day-selected.component.scss']
})
export class DaySelectedComponent implements OnInit {
  readonly wallet = this.walletStoreService.state.asReadonly();

  addMovement: boolean = false;
  closeDay: boolean = false;

  gasto = [
    {
      description: 'Luz electrica',
      tipe: 'expense',
      amount: '4.500'
    },
    {
      description: 'Gas',
      tipe: 'expense',
      amount: '1.500'
    },
    {
      description: 'Regalo',
      tipe: 'income',
      amount: '1.530'
    },
    {
      description: 'Internet',
      tipe: 'expense',
      amount: '3.600'
    },
    {
      description: 'Venta',
      tipe: 'income',
      amount: '4.500'
    },
  ]

  constructor(
    private router: Router,
    private walletStoreService: WalletStoreService,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {}

  checkboxChange(event: any) {
    console.log(event.target.checked)
  }

  openAddMovement(condition: boolean) {
    this.addMovement = condition;
  }

  openCloseDay(condition: boolean) {
    this.closeDay = condition;
  }

  saveDay() {
    setTimeout(
      ()=> { this.router.navigateByUrl('/misfinanzas/home') },
      500
    );
  }

}
