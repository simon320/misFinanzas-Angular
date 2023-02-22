import { Component, OnInit } from '@angular/core';
import useCalendar from './calendar.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarRows: any;
  selectedDate: any;
  todayFormatted: any;
  daysShort: any;
  monthNames: any;

  constructor() { }

  ngOnInit(): void {
    this.calendar();
  }

  dateClickHandle(date: Date){
    console.log(date);
  };

  getPrevMonth() {

  }

  getNextMonth() {

  }


  calendar(){
    const {
      daysShort,
      monthNames,
      calendarRows,
      selectedDate,
      todayFormatted,
      // getNextMonth,
      // getPrevMonth,
    } = useCalendar();

    this.daysShort = daysShort;
    this.monthNames = monthNames;
    this.calendarRows = calendarRows;
    this.selectedDate = selectedDate;
    this.todayFormatted = todayFormatted;
  }
}
