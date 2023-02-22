import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-card',
  templateUrl: './config-card.component.html',
  styleUrls: ['./config-card.component.scss']
})
export class ConfigCardComponent implements OnInit {
  @Input() label!: string;
  // label: string = 'Libre por día';

  constructor() { }

  ngOnInit(): void {
  }

}
