import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
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

  criar(enderecoId: number) {
    return this.http.post<any>(
      `${this.api}/pedido`,
      { endereco_id: enderecoId },
      this.getHeaders(),
    );
  }

  listar() {
    return this.http.get<any[]>(`${this.api}/pedido`, this.getHeaders());
  }

  detalhar(id: number) {
    return this.http.get<any>(`${this.api}/pedido/${id}`, this.getHeaders());
  }

  listarAdmin() {
    return this.http.get<any[]>(`${this.api}/pedidos/admin`, this.getHeaders());
  }

  atualizarStatus(id: number, status: string) {
    return this.http.put(
      `${this.api}/pedido/${id}/status`,
      { status },
      this.getHeaders(),
    );
  }
}
