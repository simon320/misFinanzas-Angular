import { Component, Input, OnChanges, OnInit, effect } from '@angular/core';
import { Router } from '@angular/router';

import { URL } from '../../enums/routes.enum';
import { Movement } from '../../Interfaces/interface';
import { WalletStoreService } from 'src/app/store/signals.service';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnInit, OnChanges {
  readonly walletSignal = this.walletSiganlService.state.asReadonly();

  @Input() daySelected!: Date; // FIXME Cambiar el modo de mostrar la fecha por signal.

  nameDay!: number;
  movements: Movement[] = [];
  totalPriceOfMovements: number = 0;
  effect = effect(() => {
    this.getMovementByDay();
  });

  constructor(
    private router: Router,
    private walletSiganlService: WalletStoreService,
  ) {}

  ngOnInit(): void {
    // this.getTotalPriceOfMovements();
  }

  ngOnChanges(): void {
    this.getMovementByDay();
    this.getTotalPriceOfMovements();
  }

  private getMovementByDay(): void {
    if( this.walletSignal().movement ) {
      this.movements = this.walletSignal().movement.filter(
        movement =>  movement.day.toString().slice(0, 10) === this.daySelected?.toString()
      )
    }

    this.movements.reverse();
  }

  private getTotalPriceOfMovements() {
    this.movements.forEach( movement => {
      if(movement.character === 'expense') 
        this.totalPriceOfMovements -= movement.amount;
      else 
        this.totalPriceOfMovements += movement.amount;
    })
  }

  public addMove(): void {
    this.router.navigate([URL.DESCRIPTION_DAY, this.daySelected]);
  }
}
