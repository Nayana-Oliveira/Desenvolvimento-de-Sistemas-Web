import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
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

  listar() {
    return this.http.get<any[]>(`${this.api}/carrinho`, this.getHeaders());
  }

  adicionar(produtoId: number) {
    return this.http.post(
      `${this.api}/carrinho`,
      {
        produto_id: produtoId,
        quantidade: 1,
      },
      this.getHeaders(),
    );
  }

  remover(itemId: number) {
    return this.http.delete(`${this.api}/carrinho/${itemId}`, this.getHeaders());
  }
}
