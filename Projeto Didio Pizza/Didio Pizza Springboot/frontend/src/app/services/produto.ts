import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
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
    return this.http.get<any[]>(`${this.api}/produto`);
  }

  buscarPorId(id: number) {
    return this.http.get<any>(`${this.api}/produto/${id}`);
  }

  listarCategorias() {
    return this.http.get<any[]>(`${this.api}/categoria`);
  }

  salvar(formData: FormData) {
    return this.http.post(`${this.api}/produto`, formData, this.getHeaders());
  }

  atualizar(id: number, produto: any) {
    return this.http.put(`${this.api}/produto/${id}`, produto, this.getHeaders());
  }

  atualizarImagem(id: number, formData: FormData) {
    return this.http.put(`${this.api}/produto/${id}/imagem`, formData, this.getHeaders());
  }

  deletar(id: number) {
    return this.http.delete(`${this.api}/produto/${id}`, this.getHeaders());
  }
}
