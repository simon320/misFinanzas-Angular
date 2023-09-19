import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild, effect, signal } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { DayStoreService, UserStoreService, WalletStoreService } from 'src/app/store/signals.service';


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
export class HomeComponent implements AfterViewInit, OnDestroy {
  readonly user = this.userSignal.state.asReadonly();
  readonly wallet = this.walletSignal.state.asReadonly();

  @ViewChild('asPanel') panel!: ElementRef;
  @ViewChild('asHeader') header!: ElementRef;
  @ViewChild('asConfigCard') configCard!: ElementRef;
  @ViewChild('asDaySelected') daySelected!: ElementRef;

  pepe = signal(true)
  configModal: boolean = false;
  savingModal: boolean = false;
  amountPerDayModal: boolean = false;
  calendarModal: boolean = true;
  amountPerDay: string | number = "CONFIGURAR";
  amountSaving: string | number = "CONFIGURAR";

  day!: Date;

  effect = effect( _ => {
    if(this.wallet().money_per_day !== 0)
      this.amountPerDay = this.wallet().money_per_day;
  })

  constructor(
    private render: Renderer2,
    private userSignal: UserStoreService,
    private walletSignal: WalletStoreService,
    private daySignal: DayStoreService,
  ) {}

  ngAfterViewInit(): void {
    const asPanel = this.panel.nativeElement;
    this.render.addClass(asPanel, 'hidden-y');
  }

  ngOnDestroy(): void  {
    this.effect.destroy();
  }

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


  toggleModal(event: boolean, modal: 'PER_DAY' | 'SAVING') {
    this.configModal = event;
    this.calendarModal = !event;
    if (modal === 'PER_DAY')
      this.amountPerDayModal = event;
    else
      this.savingModal = event;
  }

  showDayDetails(event: Date) {
    this.daySignal.setState(event)
    this.day = event;
    this.change()
  }

}