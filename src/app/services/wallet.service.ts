import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Wallet } from '../shared/Interfaces/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private url: string = `${environment.misFinanzasAPI}wallet`;

  constructor(
    private http: HttpClient,
  ) {}

  createWallet(id: string, wallet: Wallet) {
    return this.http.post<Wallet>(`${this.url}`, wallet);
  }

  getWallet(id: string) {
    return this.http.get<Wallet>(`${this.url}/${id}`);
  }

  updateWallet(id: string, partialWallet: Partial<Wallet>): Observable<string> {
    return this.http.patch<string>(`${this.url}/${id}`, partialWallet);
  }
}
