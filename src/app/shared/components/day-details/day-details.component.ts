import { AfterViewInit, Component, Input, OnInit, effect } from '@angular/core';
import { Router } from '@angular/router';
import { DayStoreService, WalletStoreService } from 'src/app/store/signals.service';
import { URL } from '../../enums/routes.enum';
import { Movement } from '../../Interfaces/interface';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnInit, AfterViewInit {
  readonly walletSignal = this.walletSiganlService.state.asReadonly();

  @Input() daySelected!: Date; // FIXME Cambiar el modo de mostrar la fecha por signal.

  nameDay!: number;
  movements!: Movement[]
  effect = effect(() => {
    this.getMovementByDay();
  });

  constructor(
    private router: Router,
    private walletSiganlService: WalletStoreService,
  ) { }
  ngAfterViewInit(): void {
    this.getMovementByDay();
  }

  ngOnInit(): void {

  }

  getMovementByDay() {
    this.movements = this.walletSignal().movement.filter(
      movement =>  movement.day.toString().slice(0, 10) === this.daySelected.toString()
    )
  }

  addMove() {
    this.router.navigate([URL.DESCRIPTION_DAY, this.daySelected]);
  }
}
