import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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
  @Output() showModal = new EventEmitter<boolean>();
  label: string = 'Libre por día';

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.showModal.emit(false);
  }

}
