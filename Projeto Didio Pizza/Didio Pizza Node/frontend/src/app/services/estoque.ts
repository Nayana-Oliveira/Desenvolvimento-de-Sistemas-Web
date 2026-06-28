import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class EstoqueService {
  api = 'http://localhost:5010/estoque';

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
    return this.http.get(this.api, this.getHeaders());
  }

  criar(item: any) {
    return this.http.post(this.api, item, this.getHeaders());
  }

  atualizar(id: number, item: any) {
    return this.http.put(`${this.api}/${id}`, item, this.getHeaders());
  }

  deletar(id: number) {
    return this.http.delete(`${this.api}/${id}`, this.getHeaders());
  }
}
