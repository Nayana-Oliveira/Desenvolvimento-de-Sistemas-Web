import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  usuarioNome = 'Login';

  logado = false;

  isAdmin = false;

  ngOnInit(): void {
    const nome = localStorage.getItem('usuario_nome');

    const tipo = localStorage.getItem('tipo_usuario');

    const token = localStorage.getItem('token');

    if (!token) {
      this.usuarioNome = 'Login';

      this.logado = false;

      return;
    }

    this.logado = true;

    if (tipo === 'admin') {
      this.usuarioNome = 'Admin';

      this.isAdmin = true;

      return;
    }

    if (nome && nome !== 'undefined') {
      this.usuarioNome = nome;
    } else {
      this.usuarioNome = 'Login';
    }
  }
}
