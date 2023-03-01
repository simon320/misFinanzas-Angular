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

  day!: Date;

  constructor( private reder: Renderer2 ) {

  }
  ngAfterViewInit(): void {
    const asPanel = this.panel.nativeElement;
    this.reder.addClass(asPanel, 'hidden-y');
  }

  ngOnInit(): void {}



  change(): void {
    const asPanel = this.panel.nativeElement;
    this.reder.setStyle(asPanel, 'padding-top', '1rem');
    this.reder.removeClass(asPanel, 'hidden-y');
    this.reder.setStyle(asPanel, 'animation', 'showPanel .5s ease-in-out forwards');

    const asDaySelected = this.daySelected.nativeElement;
    this.reder.setStyle(asDaySelected, 'animation', 'backgroundShine .5s ease-in-out forwards');

    const asHeader = this.header.nativeElement;
    this.reder.setStyle(asHeader, 'animation', 'moveHeader .2s forwards');

    if (this.configCard) {
      const asConfigCard = this.configCard.nativeElement;
      this.reder.setStyle(asConfigCard, 'animation', 'minHeight .2s forwards');
      setTimeout(() => { this.configModal = true; }, 1000);
    }
  }

  removeChange(): void {
    const asPanel = this.panel.nativeElement;
    const asHeader = this.header.nativeElement;
    this.reder.setStyle(asPanel, 'padding-top', '0');
    this.reder.addClass(asPanel, 'hidden-y');
    this.reder.setStyle(asHeader, 'animation', 'downHeader .2s forwards');
    this.reder.setStyle(asPanel, 'animation', 'closePanel .5s ease-in-out forwards');

    const asDaySelected = this.daySelected.nativeElement;
    this.reder.setStyle(asDaySelected, 'animation', 'closePanel .5s ease-in-out forwards');
    this.configModal = false;
  }


  showAmountPerDayModal(event: boolean) {
    this.configModal = event;
    this.amountPerDayModal = event;
  }

  closeAmountPerDayModal(event: boolean) {
    this.configModal = event;
    this.amountPerDayModal = event;
  }

  showSavingModal(event: boolean) {
    this.configModal = event;
    this.savingModal = event;
  }

  closeSavingModal(event: boolean) {
    this.configModal = event;
    this.savingModal = event;
  }

  showDayDetails(event: Date) {
    this.day = event;
    this.change()
  }


}
