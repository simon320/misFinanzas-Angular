import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { ConfigCardComponent } from './components/config-card/config-card.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ModalConfigDayComponent } from './components/modal-config-day/modal-config-day.component';
import { ModalConfigSavingComponent } from './components/modal-config-saving/modal-config-saving.component';
import { ModalSavingComponent } from './components/modal-saving/modal-saving.component';
import { DayDetailsComponent } from './components/day-details/day-details.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgButtonDelete } from "./components/svg/svg-button-delete/svg-button-delete.component";
import { SvgButtonAdd } from "./components/svg/svg-button-add/svg-button-add.component";



@NgModule({
    declarations: [
        CalendarComponent,
        ConfigCardComponent,
        DayDetailsComponent,
        MenuComponent,
        ModalConfigDayComponent,
        ModalConfigSavingComponent,
        ModalSavingComponent,
        SpinnerComponent
    ],
    exports: [
        CalendarComponent,
        ConfigCardComponent,
        DayDetailsComponent,
        MenuComponent,
        ModalConfigDayComponent,
        ModalConfigSavingComponent,
        ModalSavingComponent,
        SpinnerComponent,
        ReactiveFormsModule
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SvgButtonDelete,
        SvgButtonAdd
    ]
})
export class SharedModule { }
