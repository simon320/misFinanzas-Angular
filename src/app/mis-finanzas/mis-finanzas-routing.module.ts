import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaySelectedComponent } from './pages/day-selected/day-selected.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'day/:date', component: DaySelectedComponent },
      { path: '**', redirectTo: '404' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisFinanzasRoutingModule { }
