import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { daysShort } from '../../enums/calendar.enum';
import { WalletStoreService } from 'src/app/store/signals.service';
import { getDateFormatt } from '../../utils/utils';

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
  readonly wallet = this.walletSignal.state.asReadonly();

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

  constructor( private walletSignal: WalletStoreService ) {
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
                    const date = this.getDate('prevMonthStartingPoint', prevMonthStartingPoint, this.selectedDate);
                    calendarRows[i] = [...calendarRows[i],{
                      date,
                      value: `${prevMonthStartingPoint}`,
                      classes: this.getStylesClass(date, 'prev')
                    }];
                    prevMonthStartingPoint++;
                } else {
                    const date = this.getDate('currentMonthCounter', currentMonthCounter, this.selectedDate);
                    calendarRows[i] = [...calendarRows[i],{
                        date,
                        value: currentMonthCounter,
                        classes: this.getStylesClass(date)
                    }];
                    currentMonthCounter++;
                }
            } else if(i > 1 && currentMonthCounter < daysInMonth + 1){
                const date = this.getDate('currentMonthCounter', currentMonthCounter, this.selectedDate);
                calendarRows[i] = [...calendarRows[i],{
                    date,
                    value: currentMonthCounter,
                    classes: this.getStylesClass(date)
                  }];
                currentMonthCounter++;
            } else {
              const date = this.getDate('nextMonthCounter', nextMonthCounter, this.selectedDate);
              calendarRows[i] = [...calendarRows[i],{
                date,
                value: nextMonthCounter,
                classes: this.getStylesClass(date, 'next')
              }];
              nextMonthCounter++;
            }
        }
    }
    this.calendarRows = calendarRows;
    this.todayFormatted = getDateFormatt(todayFormatted);;
  }



  private getDate(configMonth: string, numberMonth: number, selectedDate: Date): string {
    let dateFormatt: string;
    if(configMonth === 'prevMonthStartingPoint') {
      dateFormatt = `${selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()}/${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}/${numberMonth}`;
      return getDateFormatt(dateFormatt)
    }

    else if(configMonth === 'currentMonthCounter') {
      dateFormatt = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${numberMonth}`;
      return getDateFormatt(dateFormatt);
    }

    else {
      dateFormatt = `${this.selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}/${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}/${numberMonth}`;
      return getDateFormatt(dateFormatt);
    }
  }

  private getStylesClass(date: string, monthPosition?: string): string {
    if(date === this.wallet().start_selected_day) return 'in-start-day'

    if(date === this.wallet().end_selected_day) return 'in-end-day'

    if(monthPosition)
      return date >= this.wallet().start_selected_day && date <= this.wallet().end_selected_day ? 'in-selected' : `in-${monthPosition}-month`
    else
      return 'in-month'

    // if(monthPosition === 'prev') {
    //   switch (column) {
    //     case 1:
    //     case 7:
    //       return date >= this.wallet().start_selected_day && date <= this.wallet().end_selected_day ? 'in-selected' : 'in-prev-month'
    //     default:
    //       return date >= this.wallet().start_selected_day && date <= this.wallet().end_selected_day ? 'in-selected' : 'in-prev-month'
    //     }
    //   }

    // else if(monthPosition === 'next') {
    //   switch (column) {
    //     case 1:
    //       return date >= this.wallet().start_selected_day && date <= this.wallet().end_selected_day ? 'in-selected' : 'in-next-month'
    //     case 7:
    //       return date >= this.wallet().start_selected_day && date <= this.wallet().end_selected_day ? 'in-selected' : 'in-next-month'
    //     default:
    //       return date >= this.wallet().start_selected_day && date <= this.wallet().end_selected_day ? 'in-selected' : 'in-next-month'
    //     }
    //   }

    // else {
    //   switch (column) {
    //     case 1:
    //       return date >= this.wallet().start_selected_day && date <= this.wallet().end_selected_day ? 'in-selected' : 'in-month'
    //     case 7:
    //       return date >= this.wallet().start_selected_day && date <= this.wallet().end_selected_day ? 'in-selected' : 'in-month'
    //     default:
    //       return date >= this.wallet().start_selected_day && date <= this.wallet().end_selected_day ? 'in-selected' : 'in-month'
    //     }
    //   }
  }

}
