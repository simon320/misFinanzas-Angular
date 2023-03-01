import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @ViewChild('menuNav') menuNav!: ElementRef;

  userImg: string = '../../../assets/img-perfil.png';
  useName: string = 'Simón Juarez';


  constructor(
    private router: Router,
    private render: Renderer2
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
