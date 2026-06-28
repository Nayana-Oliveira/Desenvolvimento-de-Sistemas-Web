import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  api = 'http://localhost:5010/admin';

  constructor(private http: HttpClient) {}

  login(dados: any) {
    return this.http.post(`${this.api}/login`, dados);
  }
}
