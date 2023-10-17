import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { URL } from 'src/app/shared/enums/routes.enum';
import { Movement } from 'src/app/shared/Interfaces/interface';
import { WalletService } from 'src/app/services/wallet.service';
import { WalletStoreService } from '../../../store/signals.service';

@Component({
  selector: 'app-day-selected',
  templateUrl: './day-selected.component.html',
  styleUrls: ['./day-selected.component.scss']
})
export class DaySelectedComponent implements OnInit, OnDestroy {
  readonly wallet = this.walletSignal.state.asReadonly();

  selectedDayTitlte!: Date;
  subcription!: Subscription;
  movements: Movement[] = [];
  addMovement: boolean = false;
  closeDay: boolean = false;
  movementForm!: FormGroup;
  day!: string;
  totalPriceOfMovements: number = 0;

  effect = effect(() => {
    this.getMovementByDay();
    this.getTotalPriceOfMovements();
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activitedRoute: ActivatedRoute,
    private walletSignal: WalletStoreService,
    private walletService: WalletService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getDayFormatted()
    this.getMovementByDay();
    this.getTotalPriceOfMovements();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  private getDayFormatted(): void {
    this.subcription = this.activitedRoute.url.subscribe(
      date => {
        this.day = date[1].path;
        this.selectedDayTitlte = new Date(this.day);
      })
  }

  private getMovementByDay(): void {
    if(this.wallet().movement) {
      this.movements = this.wallet().movement.filter( 
        movement =>  movement.day.toString().slice(0, 10) === this.day
      )
    }
  }

  private getTotalPriceOfMovements(): void {
    this.movements.forEach( movement => {
      if(movement.character === 'expense') 
        this.totalPriceOfMovements -= movement.amount;
      else 
        this.totalPriceOfMovements += movement.amount;
    })
  }

  private createForm(): void {
    this.movementForm = this.fb.group({
      description: ["", Validators.required],
      amount: [0, Validators.required],
      character: false,
    })
  }

  public openAddMovement(condition: boolean): void {
    this.addMovement = condition;
  }

  public openCloseDay(condition: boolean): void {
    this.closeDay = condition;
  }

  public saveForm(): void {
    if(this.movementForm.invalid) {
      this.movementForm.markAllAsTouched();
      return;
    }

    const { description, amount, character } = this.movementForm.value;
    const newMovement = {
      id: new Date().getTime().toString(),
      description,
      amount,
      character: character === false ? 'expense' : 'income',
      day: this.day as unknown as Date
    }

    let newMovementArray = this.wallet().movement;
    newMovementArray.push(newMovement)

    const id = localStorage.getItem("id");
    this.walletService.updateWallet( id!, { movement: newMovementArray })
      .subscribe({
        next: _ => {
          this.walletSignal.setState({ movement: newMovementArray });
          this.openAddMovement(false)
          this.movementForm.reset();
        },
        error: _ => {
          console.log("NO SE PUDO GRABAR EL MOVIMIENTO")
        }
      });
  }

  public saveDay(): void {
    setTimeout(
      ()=> { this.router.navigateByUrl(URL.HOME) },
      500
    );
  }

}
