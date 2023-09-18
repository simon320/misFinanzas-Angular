import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-config-card',
  templateUrl: './config-card.component.html',
  styleUrls: ['./config-card.component.scss'],
  animations: [
    trigger('enterState', [
      state('void', style({
        opacity: 0,
      })),
      transition(':enter', [
        animate('.8s', style({
          // // transform: 'translateX(-100%)',
          opacity: 1
        }))
      ]),
    ]),
  ],
})
export class ConfigCardComponent implements OnInit {
  @Input() title!: string | number;
  @Input() label!: string;
  @Output() showModal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.showModal.emit(true);
  }

}
