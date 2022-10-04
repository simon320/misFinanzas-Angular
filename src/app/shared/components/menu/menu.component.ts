import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  userImg: string = '/src/assets/Img-Perfil.png';

  @ViewChild('menuNav') menuNav!: ElementRef;

  constructor( private render: Renderer2) {}

  openMenu(): void {
    const menuNav = this.menuNav.nativeElement;
    this.render.addClass(menuNav, 'show-menu');
  }

  closeMenu(){
    const menuNav = this.menuNav.nativeElement;
    this.render.removeClass(menuNav, 'show-menu');
  }

}
