import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor( private router: Router ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.router.navigate(['/', 'login'])
      return false;
    } else {
      return true;
    }
  }

  canLoad(): boolean {
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.router.navigate(['/', 'login'])
      return false;
    } else {
      return true;
    }
  }
}
