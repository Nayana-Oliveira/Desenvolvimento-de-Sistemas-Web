import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  api = 'http://localhost:5010/cliente';

  constructor(private http: HttpClient) {}

  login(dados: any) {
    return this.http.post(`${this.api}/login`, dados);
  }

  cadastrar(dados: any) {
    return this.http.post(`${this.api}`, dados);
  }
}
