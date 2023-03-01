import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnInit {
  @Input() daySelected: Date = new Date();
  nameDay!: number;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  addMove() {
    this.router.navigateByUrl('/misfinanzas/day');
  }
}
