import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletStoreService } from 'src/app/store/signals.service';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnInit {
  readonly wallet = this.walletStoreService.state.asReadonly();

  @Input() daySelected: Date = new Date();

  nameDay!: number;

  constructor(
    private router: Router,
    private walletStoreService: WalletStoreService,
  ) { }

  ngOnInit(): void {
  }

  addMove() {
    this.router.navigateByUrl('/misfinanzas/day');
  }
}
