import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-selected',
  templateUrl: './day-selected.component.html',
  styleUrls: ['./day-selected.component.scss']
})
export class DaySelectedComponent implements OnInit {

  gasto = [
    {
      description: 'Luz',
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

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {}

  checkboxChange(event: any) {
    console.log(event.target.checked)
  }

}
