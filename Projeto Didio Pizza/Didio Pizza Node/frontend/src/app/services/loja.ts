import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LojaService {
  api = 'http://localhost:5010';

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  status() {
    return this.http.get(`${this.api}/loja/status`);
  }

  abrir() {
    return this.http.put(`${this.api}/admin/loja/abrir`, {}, this.getHeaders());
  }

  fechar() {
    return this.http.put(`${this.api}/admin/loja/fechar`, {}, this.getHeaders());
  }
}
