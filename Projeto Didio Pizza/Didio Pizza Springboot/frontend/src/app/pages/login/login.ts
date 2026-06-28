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

  private limparSessaoAnterior() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('usuario_nome');
    localStorage.removeItem('clienteLogado');
  }

  private tipoDoToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      return String(payload?.tipo || '').toLowerCase();
    } catch {
      return '';
    }
  }

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

        const token = response.token;
        const tipoToken = this.tipoDoToken(token);

        if (!token || !tipoToken.includes('admin')) {
          this.erro = 'Login de admin inválido. Entre novamente.';
          this.limparSessaoAnterior();
          return;
        }

        this.limparSessaoAnterior();
        localStorage.setItem('token', token);
        localStorage.setItem('usuario_nome', response.nome || 'Admin');
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

        this.limparSessaoAnterior();
        localStorage.setItem('token', response.token);

        const nomeCliente = response.nome || response.cliente?.nome || response.usuario?.nome || this.email;

        localStorage.setItem('usuario_nome', nomeCliente);
        localStorage.setItem('clienteLogado', JSON.stringify(response.cliente || response.usuario || { nome: nomeCliente, email: this.email }));

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
