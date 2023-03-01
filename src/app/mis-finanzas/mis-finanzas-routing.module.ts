import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionComponent } from './pages/admission/admission.component';
import { DaySelectedComponent } from './pages/day-selected/day-selected.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'admission', component: AdmissionComponent },
      { path: 'home', component: HomeComponent },
      { path: 'day', component: DaySelectedComponent },
      { path: '**', redirectTo: '404' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisFinanzasRoutingModule { }
