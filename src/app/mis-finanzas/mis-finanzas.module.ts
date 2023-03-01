import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisFinanzasRoutingModule } from './mis-finanzas-routing.module';
import { AdmissionComponent } from './pages/admission/admission.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DaySelectedComponent } from './pages/day-selected/day-selected.component';


@NgModule({
  declarations: [
    AdmissionComponent,
    HomeComponent,
    DaySelectedComponent,
  ],
  imports: [
    CommonModule,
    MisFinanzasRoutingModule,
    SharedModule
  ]
})
export class MisFinanzasModule { }
