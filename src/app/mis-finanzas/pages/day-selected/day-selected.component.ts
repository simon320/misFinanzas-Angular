import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletStoreService } from '../../../store/signals.service';
import { Movement } from 'src/app/shared/Interfaces/interface';
import { URL } from 'src/app/shared/enums/routes.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';

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

  effect = effect(() => {
    this.getMovementByDay();
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activitedRoute: ActivatedRoute,
    private walletSignal: WalletStoreService,
    private walletService: WalletService,
  ) { }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  ngOnInit(): void {
    this.createForm();
    this.getDayFormatted()
    this.getMovementByDay();
  }

  getDayFormatted() {
    this.subcription = this.activitedRoute.url.subscribe(
      date => {
        this.day = date[1].path;
        this.selectedDayTitlte = new Date(this.day);
      })
  }

  getMovementByDay() {
    this.movements = this.wallet().movement.filter( movement =>  movement.day.toString().slice(0, 10) === this.day)
  }

  createForm() {
    this.movementForm = this.fb.group({
      description: ["", Validators.required],
      amount: [0, Validators.required],
      character: false,
    })
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
