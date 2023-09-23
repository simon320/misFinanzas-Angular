import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DayStoreService, WalletStoreService } from '../../../store/signals.service';
import { DescriptionDay, Movement } from 'src/app/shared/Interfaces/interface';
import { URL } from 'src/app/shared/enums/routes.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';
import { getDateFormatt } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-day-selected',
  templateUrl: './day-selected.component.html',
  styleUrls: ['./day-selected.component.scss']
})
export class DaySelectedComponent implements OnInit, OnDestroy {
  readonly wallet = this.walletSignal.state.asReadonly();
  readonly daySignal = this.dayStoreService.state.asReadonly();

  selectedDay!: DescriptionDay | undefined;
  selectedDayTitlte!: Date;
  subcription!: Subscription;
  movements: Movement[] = [];
  addMovement: boolean = false;
  closeDay: boolean = false;
  movementForm!: FormGroup;

  effect = effect(() => {
    // TODO: REFACTOR
    // if(this.wallet().days)
    //   if(this.wallet()?.days.length > 0)
    //   this.wallet().days.map( ({ day }) => console.log(day))

      this.movements = this.wallet().movement
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activitedRoute: ActivatedRoute,
    private dayStoreService: DayStoreService,
    private walletSignal: WalletStoreService,
    private walletService: WalletService,
  ) { }

  ngOnDestroy(): void {
    this.effect.destroy();
    this.subcription.unsubscribe();
  }

  ngOnInit(): void {
    this.createForm();
    this.subcription = this.activitedRoute.url.subscribe(
      date => { this.selectedDayTitlte = new Date(date[1].path) })
    this.movements = this.wallet().movement

    let x = getDateFormatt(this.movements[1].day.toString().slice(0, 10));
    console.log(x);
    // TODO: Crear logica para que muestre los movimientos del dia ( modificar la prop day )
  }

  createForm() {
    this.movementForm = this.fb.group({
      description: ["", Validators.required],
      amount: [0, Validators.required],
      character: false,
    })
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

  saveForm() {
    if(this.movementForm.invalid) {
      this.movementForm.markAllAsTouched();
      return;
    }

    const { description, amount, character } = this.movementForm.value;
    const newMovement = {
      description,
      amount,
      character: character === false ? 'expense' : 'income',
      day: new Date() // TODO: MODIFICAR ESTA PROPIEDAD POR EL DIA SELECCIONADO.
    }
    let newMovementArray = this.wallet().movement;
    newMovementArray.push(newMovement)
    this.walletSignal.setState({ movement: newMovementArray });
    console.log(this.wallet().movement);

    const id = localStorage.getItem("id");
    this.walletService.updateWallet( id!, { movement: newMovementArray })
      .subscribe({
        next: _ => {
          this.walletSignal.setState({ movement: newMovementArray });
          this.openAddMovement(false)
        },
        error: _ => {
          console.log("NO SE PUDO GRABAR EL MOVIMIENTO")
        }
      });
  }

  saveDay() {
    setTimeout(
      ()=> { this.router.navigateByUrl(URL.HOME) },
      500
    );
  }

}
