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
    private walletSignal: WalletStoreService,
    private fb: FormBuilder,
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
    console.log(start_selected_day + ' - ' + end_selected_day)// TODO: remover

    const money_per_day = this.getAmountPerDay(start_selected_day, end_selected_day);

    start_selected_day = getDateFormatt(start_selected_day)
    end_selected_day = getDateFormatt(end_selected_day)

    console.log(start_selected_day + ' - ' + end_selected_day)// TODO: remover
    console.log(start_selected_day > end_selected_day)// TODO: remover
    console.log(start_selected_day < end_selected_day)// TODO: remover

    this.walletSignal.setState({ start_selected_day, end_selected_day, money_per_day });

    this.closeModal();
  }



  getAmountPerDay(startDay: string, endDay: string): number {
    const startDayFormatt = new Date(startDay)
    const endDayFormatt = new Date(endDay)

    const amountDay = ( endDayFormatt.getTime() - startDayFormatt.getTime() ) / 1000 / 60 / 60 / 24;

    const amountPerDay = Math.round( this.wallet().money_acount / amountDay );
    return amountPerDay;
  }



  closeModal() {
    this.showModal.emit(false);
  }

}
