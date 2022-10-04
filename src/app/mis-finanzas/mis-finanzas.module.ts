import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisFinanzasRoutingModule } from './mis-finanzas-routing.module';
import { AdmissionComponent } from './pages/admission/admission.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    AdmissionComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MisFinanzasRoutingModule
  ]
})
export class MisFinanzasModule { }
