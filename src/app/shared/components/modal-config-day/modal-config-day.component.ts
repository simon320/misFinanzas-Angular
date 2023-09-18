import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { WalletStoreService } from 'src/app/store/signals.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getDateFormatt } from '../../utils/utils';
import { WalletService } from 'src/app/services/wallet.service';
import { Router } from '@angular/router';
import { URL } from '../../enums/routes.enum';

@Component({
  selector: 'app-modal-config-day',
  templateUrl: './modal-config-day.component.html',
  styleUrls: ['./modal-config-day.component.scss'],
  animations: [
    trigger('enterState', [
      state('void', style({
        opacity: 0,
      })),
      transition(':enter', [
        animate('.5s', style({
          opacity: 1,
        }))
      ]),
    ]),
  ],
})
export class ModalConfigDayComponent implements OnInit {
  readonly wallet = this.walletSignal.state.asReadonly();

  @Output() showModal = new EventEmitter<boolean>();

  label: string = 'Libre por día';
  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private walletService: WalletService,
    private walletSignal: WalletStoreService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }



  createForm() {
    this.form = this.fb.group({
      start_day: [""],
      end_day: [""]
    })
  }



  acceptDayConfig() {
    let start_selected_day: string = this.form.get("start_day")?.value;
    let end_selected_day: string  = this.form.get("end_day")?.value;

    const money_per_day = this.getAmountPerDay(start_selected_day, end_selected_day);

    start_selected_day = getDateFormatt(start_selected_day)
    end_selected_day = getDateFormatt(end_selected_day)

    const id = localStorage.getItem("id");
    this.walletService.updateWallet( id!, { start_selected_day, end_selected_day, money_per_day })
      .subscribe({
        next: _ => {
          this.walletSignal.setState({ start_selected_day, end_selected_day, money_per_day });
          this.closeModal();
        },
        error: _ => {
          localStorage.removeItem("token");
          this.router.navigateByUrl(URL.LOGIN);
        }
      });
  }



  getAmountPerDay(startDay: string, endDay: string): number {
    const startDayFormatt = new Date(startDay)
    const endDayFormatt = new Date(endDay)

    const amountDays = ( endDayFormatt.getTime() - startDayFormatt.getTime() ) / 1000 / 60 / 60 / 24 + 1;

    const amountPerDay = Math.round( this.wallet().money_acount / amountDays );
    return amountPerDay;
  }



  closeModal() {
    this.showModal.emit(false);
  }

}
