import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { ConfigCardComponent } from './components/config-card/config-card.component';
import { CalendarComponent } from './components/calendar/calendar.component';



@NgModule({
  declarations: [
    CalendarComponent,
    ConfigCardComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarComponent,
    ConfigCardComponent,
    MenuComponent,
  ]
})
export class SharedModule { }
