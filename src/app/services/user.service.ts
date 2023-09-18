import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../shared/Interfaces/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = `${environment.misFinanzasAPI}`;

  constructor(
    private http: HttpClient,
  ) {}

  createUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.url}auth/register`, user);
  }

  getUserWithId(id: string): Observable<{user: User, token: string}> {
    return this.http.get<{user: User, token: string}>(`${this.url}auth/get/${id}`);
  }

  setFirstLogin(id: string) {
    return this.http.patch<User>(`${this.url}user/first/${id}`, {});
  }

  updateUser(id: string, user: User) {
    return this.http.patch<User>(`${this.url}user/${id}`, user);
  }
}
