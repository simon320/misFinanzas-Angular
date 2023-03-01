import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { SavingsMovement } from '../../Interfaces/interface';

@Component({
  selector: 'app-modal-config-saving',
  templateUrl: './modal-config-saving.component.html',
  styleUrls: ['./modal-config-saving.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ModalConfigSavingComponent implements OnInit {
  @Output() showModal = new EventEmitter<boolean>();
  wasOptionChosen: boolean = false;
  selectedOpt!: SavingsMovement;

  savingsMovementA: SavingsMovement = {
    descriptionA: "En tu cuenta hay $ 88.000",
    descriptionB: "¿Cuánto dinero quieres ahorrar?"
  }
  savingsMovementB: SavingsMovement = {
    descriptionB: "¿Cuánto dinero quieres agregar a ahorros?"
  }
  savingsMovementC: SavingsMovement = {
    descriptionA: "En tu cuenta hay $ 88.000",
    descriptionB: "¿Cssssssssssssssssss"
  }

  constructor() { this.selectedOpt = this.savingsMovementB }

  ngOnInit(): void {
  }

  closeModal() {
    this.showModal.emit(false);
  }

  openSelectedModal(option: string) {
    this.wasOptionChosen = true;
    switch (option) {
      case "a":
          this.selectedOpt = this.savingsMovementA;
          return this.selectedOpt;
      case "b":
        return this.selectedOpt = this.savingsMovementB;
      case "c":
        return this.selectedOpt = this.savingsMovementC;
      default:
        return;
    }
  }

}
