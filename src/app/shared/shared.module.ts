import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { ConfigCardComponent } from './components/config-card/config-card.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ModalConfigDayComponent } from './components/modal-config-day/modal-config-day.component';
import { ModalConfigSavingComponent } from './components/modal-config-saving/modal-config-saving.component';
import { ModalSavingComponent } from './components/modal-saving/modal-saving.component';
import { DayDetailsComponent } from './components/day-details/day-details.component';



@NgModule({
  declarations: [
    CalendarComponent,
    ConfigCardComponent,
    DayDetailsComponent,
    MenuComponent,
    ModalConfigDayComponent,
    ModalConfigSavingComponent,
    ModalSavingComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalendarComponent,
    ConfigCardComponent,
    DayDetailsComponent,
    MenuComponent,
    ModalConfigDayComponent,
    ModalConfigSavingComponent,
    ModalSavingComponent,
  ]
})
export class SharedModule { }
