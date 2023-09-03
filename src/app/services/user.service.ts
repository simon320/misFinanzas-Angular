import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../shared/Interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = `${environment.misFinanzasAPI}`;

  constructor(
    private http: HttpClient,
  ) {}

  createUser(user: User) {
    return this.http.post<User>(`${this.url}auth/register`, user);
  }

  setFirstLogin(id: string, first: boolean) {
    return this.http.patch<User>(`${this.url}user/first/${id}`, first);
  }

  updateUser(id: string, user: User) {
    return this.http.patch<User>(`${this.url}user/${id}`, user);
  }
}
