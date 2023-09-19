import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { Router } from '@angular/router';
import { DayStoreService, WalletStoreService } from '../../../store/signals.service';
import { DescriptionDay, Movement } from 'src/app/shared/Interfaces/interface';
import { URL } from 'src/app/shared/enums/routes.enum';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-day-selected',
  templateUrl: './day-selected.component.html',
  styleUrls: ['./day-selected.component.scss']
})
export class DaySelectedComponent implements OnInit, OnDestroy {
  readonly wallet = this.walletStoreService.state.asReadonly();
  readonly daySignal = this.dayStoreService.state.asReadonly();

  selectedDay!: DescriptionDay | undefined;
  movement: Movement[] = [];
  addMovement: boolean = false;
  closeDay: boolean = false;
  movementForm!: FormGroup;

  effect = effect(() => {
    if(this.wallet().days.length > 0)
     this.wallet().days.map( ({ day }) => console.log(day))
    console.log(this.selectedDay)
      this.movement = this.selectedDay?.movement_day!
  });

  effect2 = effect(() => {
    console.log(this.daySignal());
    // if(this.wallet().days.length > 0)
    //   this.selectedDay = this.wallet().days.find( ({ day }) => day === new Date())
    //   this.movement = this.selectedDay?.movement_day!
  });

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
    private fb: FormBuilder,
    private dayStoreService: DayStoreService,
    private walletStoreService: WalletStoreService,
  ) { }

  ngOnDestroy(): void {
    this.effect.destroy();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.movementForm = this.fb.group({
      description: "",
      amount: 0,
      tipe: 'expense',
      day: new Date()
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

  saveDay() {
    setTimeout(
      ()=> { this.router.navigateByUrl(URL.HOME) },
      500
    );
  }

}
