import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/store/signals.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @ViewChild('menuNav') menuNav!: ElementRef;

  readonly user = this.userSignal.state.asReadonly()
  userImg: string = '../../../../assets/img-perfil.png';

  constructor(
    private router: Router,
    private render: Renderer2,
    private userSignal: UserStoreService,
  ) {}

  openMenu(): void {
    const menuNav = this.menuNav.nativeElement;
    this.render.addClass(menuNav, 'show-menu');
  }

  closeMenu(){
    const menuNav = this.menuNav.nativeElement;
    this.render.removeClass(menuNav, 'show-menu');
    this.router.navigateByUrl('/misfinanzas/home');
  }

}
