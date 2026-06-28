import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  api = 'http://localhost:5010/endereco';

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  listar() {
    return this.http.get<any[]>(this.api, this.getHeaders());
  }

  cadastrar(dados: any) {
    return this.http.post<any>(this.api, dados, this.getHeaders());
  }
}
