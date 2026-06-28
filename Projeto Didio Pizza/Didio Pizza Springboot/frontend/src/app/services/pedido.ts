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

  listarAdmin() {
    return this.http.get<any[]>(`${this.api}/pedidos/admin`, this.getHeaders());
  }

  criar(enderecoId: number, itens: any[] = []) {
    return this.http.post<any>(
      `${this.api}/pedido`,
      { endereco_id: enderecoId, itens },
      this.getHeaders()
    );
  }

  atualizarStatus(id: number | string, status: string) {
    return this.http.put(`${this.api}/pedido/${id}/status`, { status }, this.getHeaders());
  }

  listarCliente() {
    return this.http.get<any[]>(`${this.api}/pedido`, this.getHeaders());
  }

  detalhe(id: number | string) {
    return this.http.get<any>(`${this.api}/pedido/${id}`, this.getHeaders());
  }

  buscarStatus(id: number | string) {
    return this.http.get<any>(`${this.api}/pedido/${id}/status`);
  }
}
