import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Obra {
  id?: number;
  titulo: string;
  autor: string;
  editora: string;
  isbn: string;
  anoPublicacao: number;
  estoque: number;
  ativo?: boolean;
  cadastro?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ObraService {
  private API = 'http://localhost:5010/obras';

  constructor(private http: HttpClient) {}

  listar(): Observable<Obra[]> {
    return this.http.get<Obra[]>(this.API);
  }

  cadastrar(obra: Obra): Observable<any> {
    return this.http.post(this.API, obra);
  }

  buscarPorId(id: number) {
    return this.http.get<Obra>(`${this.API}/${id}`);
  }

  atualizar(id: number, obra: Obra) {
    return this.http.put(`${this.API}/${id}`, obra);
  }

  remover(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

}