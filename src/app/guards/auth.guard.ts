import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor( private router: Router ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.router.navigateByUrl('auth/login')
      return false;
    } else {
      return true;
    }
  }

  canLoad(): boolean {
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.router.navigateByUrl('auth/login')
      return false;
    } else {
      return true;
    }
  }
}
