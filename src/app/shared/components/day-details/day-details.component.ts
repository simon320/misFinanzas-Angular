import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DayStoreService, WalletStoreService } from 'src/app/store/signals.service';
import { URL } from '../../enums/routes.enum';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnInit {
  readonly wallet = this.walletStoreService.state.asReadonly();

  @Input() daySelected!: Date;

  nameDay!: number;

  constructor(
    private router: Router,
    private walletStoreService: WalletStoreService,
    private dayStoreService: DayStoreService
  ) { }

  ngOnInit(): void {    
  }

  addMove() {
    this.router.navigate([URL.DESCRIPTION_DAY]);
  }
}
