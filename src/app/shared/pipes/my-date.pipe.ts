import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDate'
})
export class MyDatePipe implements PipeTransform {

  transform(value: Date): string {
      const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado","Domingo"];
      const date  = new Date(value);
      const monthDayNumber = date.getUTCDate();
      let weekDayNumber = date.getDay() === 0 ? 6 : (date.getDay() -1)

      return days[weekDayNumber] + " " + monthDayNumber;
  }

}
