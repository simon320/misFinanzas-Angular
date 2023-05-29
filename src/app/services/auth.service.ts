import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../shared/Interfaces/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = `${environment.misFinanzasAPI}auth/login`;

  constructor(
    private http: HttpClient,
  ) {}

  login(payload: { mail: string, password: string }): Observable<{user: User, token: string}> {
    return this.http.post<{user: User, token: string}>(`${this.url}`, payload);
  }
}
