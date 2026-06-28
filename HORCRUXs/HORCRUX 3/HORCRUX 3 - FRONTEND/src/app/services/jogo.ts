import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Jogo {
  private api = 'http://localhost:3000/jogos';

  constructor(private http: HttpClient) {}
  listar() {
    return this.http.get(this.api);
  }

  buscarPorId(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  cadastrar(jogo: any) {
    return this.http.post(this.api, jogo);
  }

  atualizar(id: number, jogo: any) {
    return this.http.put(`${this.api}/${id}`, jogo);
  }

  deletar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}