import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisFinanzasRoutingModule } from './mis-finanzas-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DaySelectedComponent } from './pages/day-selected/day-selected.component';
import { SvgButtonDelete } from "../shared/components/svg/svg-button-delete/svg-button-delete.component";
import { SvgButtonAdd } from '../shared/components/svg/svg-button-add/svg-button-add.component';
import { SvgButtonCloseRed } from '../shared/components/svg/svg-button-close-red/svg-button-close-red.component';
import { SvgButtonOk } from '../shared/components/svg/svg-button-ok/svg-button-ok.component';


@NgModule({
    declarations: [
        HomeComponent,
        DaySelectedComponent,
    ],
    imports: [
        CommonModule,
        MisFinanzasRoutingModule,
        SharedModule,
        SvgButtonDelete,
        SvgButtonAdd,
        SvgButtonCloseRed,
        SvgButtonOk
    ]
})
export class MisFinanzasModule { }
