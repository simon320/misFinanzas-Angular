import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FirstAdmissionComponent } from './pages/first-admission/first-admission.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FirstAdmissionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
