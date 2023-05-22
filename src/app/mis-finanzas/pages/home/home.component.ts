import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('enterState', [
      state('void', style({
        opacity: 0,
      })),
      transition(':enter', [
        animate('.5s', style({
          opacity: 1,
        }))
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('asPanel') panel!: ElementRef;
  @ViewChild('asHeader') header!: ElementRef;
  @ViewChild('asConfigCard') configCard!: ElementRef;
  @ViewChild('asDaySelected') daySelected!: ElementRef;

  configModal: boolean = false;
  savingModal: boolean = false;
  amountPerDayModal: boolean = false;
  calendarModal: boolean = true;

  day!: Date;

  constructor( private render: Renderer2 ) {

  }
  ngAfterViewInit(): void {
    const asPanel = this.panel.nativeElement;
    this.render.addClass(asPanel, 'hidden-y');
  }

  ngOnInit(): void {}



  change(): void {
    const asPanel = this.panel.nativeElement;
    this.render.setStyle(asPanel, 'padding-top', '1rem');
    this.render.removeClass(asPanel, 'hidden-y');
    this.render.setStyle(asPanel, 'animation', 'showPanel .5s ease-in-out forwards');

    const asDaySelected = this.daySelected.nativeElement;
    this.render.setStyle(asDaySelected, 'animation', 'backgroundShine .5s ease-in-out forwards');

    const asHeader = this.header.nativeElement;
    this.render.setStyle(asHeader, 'animation', 'moveHeader .2s forwards');

    if (this.configCard) {
      const asConfigCard = this.configCard.nativeElement;
      this.render.setStyle(asConfigCard, 'animation', 'minHeight .2s forwards');
      setTimeout(() => { this.configModal = true; }, 1000);
    }
  }

  removeChange(): void {
    const asPanel = this.panel.nativeElement;
    const asHeader = this.header.nativeElement;
    this.render.setStyle(asPanel, 'padding-top', '0');
    this.render.addClass(asPanel, 'hidden-y');
    this.render.setStyle(asHeader, 'animation', 'downHeader .2s forwards');
    this.render.setStyle(asPanel, 'animation', 'closePanel .5s ease-in-out forwards');

    const asDaySelected = this.daySelected.nativeElement;
    this.render.setStyle(asDaySelected, 'animation', 'closePanel .5s ease-in-out forwards');
    this.configModal = false;
  }


  showAmountPerDayModal(event: boolean) {
    this.configModal = event;
    this.amountPerDayModal = event;
    this.calendarModal = false;
  }

  closeAmountPerDayModal(event: boolean) {
    this.configModal = event;
    this.amountPerDayModal = event;
    this.calendarModal = true;
  }

  showSavingModal(event: boolean) {
    this.configModal = event;
    this.savingModal = event;
    this.calendarModal = false;
  }

  closeSavingModal(event: boolean) {
    this.configModal = event;
    this.savingModal = event;
    this.calendarModal = true;
  }

  showDayDetails(event: Date) {
    this.day = event;
    this.change()
  }


}
