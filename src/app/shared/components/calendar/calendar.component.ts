import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { daysShort } from '../../enums/calendar.enum';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
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
export class CalendarComponent implements OnInit {
  @Input() startDay!: Date | string;
  @Input() endDay!: Date | string; 
  @Output() dayDetails = new EventEmitter<Date>();

  calendarRows: any;
  selectedDate: Date;
  todayFormatted!: string;

  daysShort = [
    daysShort.LUNES, daysShort.MARTES, daysShort.MIERCOLES,
    daysShort.JUEVES, daysShort.VIERNES, daysShort.SABADO, daysShort.DOMINGO,
  ];

  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor() {
    this.selectedDate = new Date();
  }

  ngOnInit(): void {
    this.calendar();
  }

  dateClickHandle(date: Date){
    this.dayDetails.emit(date)
  };

  getPrevMonth() {
    this.selectedDate = (new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1, 1));
    this.calendar();
  }

  getNextMonth() {
    this.selectedDate = (new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 1));
    this.calendar();
  }

  calendar(startDay?: string, endDay?: string) {
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    const daysInWeek = [1, 2, 3, 4, 5, 6, 0];
    const selectedMonthLastDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0);
    const prevMonthLastDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 0);
    const daysInMonth = selectedMonthLastDate.getDate();
    const firstDayInMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1).getDay();
    const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
    let prevMonthStartingPoint = prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
    let currentMonthCounter = 1;
    let nextMonthCounter = 1;
    const rows = 6;
    const cols = 7;
    const calendarRows = [];

    for(let i = 1; i < rows + 1; i++){
        for(let j = 1; j < cols + 1; j++){
            if(!calendarRows[i]){
                calendarRows[i] = [];
            }

            if(i === 1){
                if(j < startingPoint){
                    calendarRows[i] = [...calendarRows[i],{
                        classes: 'in-prev-month',
                        date: this.getDate('prevMonthStartingPoint', prevMonthStartingPoint, this.selectedDate),
                        value: `${prevMonthStartingPoint}`
                    }];
                    prevMonthStartingPoint++;
                } else {
                    const date = this.getDate('currentMonthCounter', currentMonthCounter, this.selectedDate);
                    calendarRows[i] = [...calendarRows[i],{
                        date,
                        value: currentMonthCounter,
                        classes: (date >= startDay! && date < endDay!) ? 'in-month-selected' : 'in-month',
                    }];
                    currentMonthCounter++;
                }
            } else if(i > 1 && currentMonthCounter < daysInMonth + 1){
                const date = this.getDate('currentMonthCounter', currentMonthCounter, this.selectedDate);
                calendarRows[i] = [...calendarRows[i],{
                    date,
                    value: currentMonthCounter,
                    classes: (date >= startDay! && date < endDay!) ? 'in-month-selected' : 'in-month',
                }];
                currentMonthCounter++;
            } else {
                calendarRows[i] = [...calendarRows[i],{
                    classes: 'in-next-month',
                    date: this.getDate('nextMonthCounter', nextMonthCounter, this.selectedDate),
                    value: nextMonthCounter
                }];
                nextMonthCounter++;
            }
        }
    }
    this.calendarRows = calendarRows;
    this.todayFormatted = todayFormatted;
  }

  getDate(configMonth: string, numberMonth: number, selectedDate: Date): string {
    if(configMonth === 'prevMonthStartingPoint') return `${selectedDate.getMonth() === 0 ? 
        selectedDate.getFullYear() - 1 : selectedDate.getFullYear()}/${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}/${numberMonth}`

    else if(configMonth === 'currentMonthCounter') return `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${numberMonth}`
    
    else return `${this.selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}/${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}/${numberMonth}`
  }

}
