import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  api = 'http://localhost:5010/categoria';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get(this.api);
  }
}
