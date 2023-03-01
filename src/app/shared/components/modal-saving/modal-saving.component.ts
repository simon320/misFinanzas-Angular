import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SavingsMovement } from '../../Interfaces/interface';

@Component({
  selector: 'app-modal-saving',
  templateUrl: './modal-saving.component.html',
  styleUrls: ['./modal-saving.component.scss'],
})
export class ModalSavingComponent implements OnInit {
  @Output() showModal = new EventEmitter<boolean>();
  @Input() savingMode!:SavingsMovement;

  ngOnInit(): void {
  }

  closeModal() {
    this.showModal.emit(false);
  }

}
