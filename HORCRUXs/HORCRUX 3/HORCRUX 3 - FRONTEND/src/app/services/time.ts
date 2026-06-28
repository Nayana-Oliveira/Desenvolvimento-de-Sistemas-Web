import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Time {
  private api = 'http://localhost:3000/times';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get(this.api);
  }

  buscarPorId(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  cadastrar(time: any) {
    return this.http.post(this.api, time);
  }

  atualizar(id: number, time: any) {
    return this.http.put(`${this.api}/${id}`, time);
  }

  deletar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}