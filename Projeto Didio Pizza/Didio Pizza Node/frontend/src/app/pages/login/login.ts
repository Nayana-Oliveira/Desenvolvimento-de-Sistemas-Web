import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { ClienteService } from '../../services/cliente';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';

  senha = '';

  erro = '';

  carregando = false;

  constructor(
    private clienteService: ClienteService,
    private adminService: AdminService,
    private router: Router,
  ) {}

  entrar() {
    this.erro = '';

    this.carregando = true;

    const dados = {
      email: this.email,

      senha: this.senha,
    };

    this.adminService.login(dados).subscribe({
      next: (response: any) => {
        this.carregando = false;

        localStorage.setItem('token', response.token);

        localStorage.setItem('usuario_nome', response.nome);

        localStorage.setItem('tipo_usuario', 'admin');

        this.router.navigate(['/admin/dashboard']);
      },

      error: () => {
        this.loginCliente(dados);
      },
    });
  }

  loginCliente(dados: any) {
    this.clienteService.login(dados).subscribe({
      next: (response: any) => {
        this.carregando = false;

        localStorage.setItem('token', response.token);

        localStorage.setItem('usuario_nome', response.nome);

        localStorage.setItem('tipo_usuario', 'cliente');

        this.router.navigate(['/painel']);
      },

      error: () => {
        this.carregando = false;

        this.erro = 'Email ou senha inválidos';
      },
    });
  }
}
