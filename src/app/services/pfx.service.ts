import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pfx } from '../shared/Interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class PfxService {
  private url: string = `${environment.misFinanzasAPI}pfx`;

  constructor(
    private http: HttpClient,
  ) {}

  createWallet(id: string, pfx: Pfx) {
    return this.http.post<Pfx>(`${this.url}`, pfx);
  }
}
