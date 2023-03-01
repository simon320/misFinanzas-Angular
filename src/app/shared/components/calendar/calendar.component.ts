import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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
  @Output() dayDetails = new EventEmitter<Date>();

  calendarRows: any;
  selectedDate: Date;
  todayFormatted!: string;

  daysShort = [
    'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'
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

  calendar() {
    const today = new Date();
    const todayFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
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
                        date: `${prevMonthStartingPoint}-${this.selectedDate.getMonth() === 0 ? 12 : this.selectedDate.getMonth()}-${this.selectedDate.getMonth() === 0 ? this.selectedDate.getFullYear() - 1 : this.selectedDate.getFullYear()}`,
                        value: `${prevMonthStartingPoint}`
                    }];
                    prevMonthStartingPoint++;
                } else {
                    calendarRows[i] = [...calendarRows[i],{
                        classes: 'in-month',
                        date: `${currentMonthCounter}-${this.selectedDate.getMonth() + 1}-${this.selectedDate.getFullYear()}`,
                        value: currentMonthCounter
                    }];
                    currentMonthCounter++;
                }
            } else if(i > 1 && currentMonthCounter < daysInMonth + 1){
                calendarRows[i] = [...calendarRows[i],{
                    classes: 'in-month',
                    date: `${currentMonthCounter}-${this.selectedDate.getMonth() + 1}-${this.selectedDate.getFullYear()}`,
                    value: currentMonthCounter
                }];
                currentMonthCounter++;
            } else {
                calendarRows[i] = [...calendarRows[i],{
                    classes: 'in-next-month',
                    date: `${nextMonthCounter}-${this.selectedDate.getMonth() + 2 === 13 ? 1 : this.selectedDate.getMonth() + 2}-${this.selectedDate.getMonth() + 2 === 13 ? this.selectedDate.getFullYear() + 1 : this.selectedDate.getFullYear()}`,
                    value: nextMonthCounter
                }];
                nextMonthCounter++;
            }
        }
    }
    this.calendarRows = calendarRows;
    this.todayFormatted = todayFormatted;
  }

}
