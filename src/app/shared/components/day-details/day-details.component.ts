import { Component, Input, OnChanges, effect } from '@angular/core';
import { Router } from '@angular/router';

import { URL } from '../../enums/routes.enum';
import { Movement } from '../../Interfaces/interface';
import { WalletStoreService } from 'src/app/store/signals.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnChanges {
  readonly walletSignal = this.walletSignalService.state.asReadonly();

  @Input() daySelected!: Date; // FIXME Cambiar el modo de mostrar la fecha por signal.

  nameDay!: number;
  movements: Movement[] = [];
  totalPriceOfMovements: number = 0;
  effect = effect(() => {
    this.getMovementByDay();
  });

  constructor(
    private router: Router,
    private walletService: WalletService,
    private walletSignalService: WalletStoreService,
  ) {}

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
    this.totalPriceOfMovements = 0;
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

  public deleteMovement(index: number) {
    if ( confirm('¿Estas seguro de querer eliminar el movimiento?') ) {
      const removedMovement: Movement[] = this.movements.splice(index, 1);
      this.getTotalPriceOfMovements();


      let newMovementArray = this.walletSignal().movement.filter(
        movement =>  movement.id != removedMovement[0].id
      )

      const id = localStorage.getItem("id");
      this.walletService.updateWallet( id!, { movement: newMovementArray })
        .subscribe({
          next: _ => {
            this.walletSignalService.setState({ movement: newMovementArray });
          },
          error: _ => {
            console.log("NO SE PUDO GRABAR EL MOVIMIENTO")
          }
        });
    }
    else 
      return;
  }

}
