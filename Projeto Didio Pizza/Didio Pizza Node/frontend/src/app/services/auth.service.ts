import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = 'http://localhost:5010';

  constructor(private http: HttpClient) {}

  loginCliente(email: string, senha: string) {
    return this.http.post<any>(
      `${this.api}/cliente/login`,

      {
        email,
        senha,
      },
    );
  }
  
  loginAdmin(email: string, senha: string) {
    return this.http.post<any>(
      `${this.api}/admin/login`,

      {
        email,
        senha,
      },
    );
  }

  cadastrar(cliente: any) {
    return this.http.post(
      `${this.api}/cliente`,

      cliente,
    );
  }
}
