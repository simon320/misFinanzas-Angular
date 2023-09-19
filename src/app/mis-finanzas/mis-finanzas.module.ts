import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisFinanzasRoutingModule } from './mis-finanzas-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DaySelectedComponent } from './pages/day-selected/day-selected.component';
import { SvgButtonDelete } from "../shared/components/svg/svg-button-delete/svg-button-delete.component";


@NgModule({
    declarations: [
        HomeComponent,
        DaySelectedComponent,
    ],
    imports: [
        CommonModule,
        MisFinanzasRoutingModule,
        SharedModule,
        SvgButtonDelete
    ]
})
export class MisFinanzasModule { }
