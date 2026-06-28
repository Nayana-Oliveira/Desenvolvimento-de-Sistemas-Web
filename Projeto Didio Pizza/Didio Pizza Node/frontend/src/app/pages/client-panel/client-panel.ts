import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './client-panel.html',
  styleUrls: ['./client-panel.css'],
})

export class ClientPanel implements OnInit {
  usuario: any = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  };

  pedidosRecentes: any[] = [];

  progresso = 0;

  mostrarModal = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const cliente = localStorage.getItem('clienteLogado');

    if (cliente) {
      this.usuario = JSON.parse(cliente);
    }

    const pedidos = localStorage.getItem('pedidoFinalizado');

    if (pedidos) {
      this.pedidosRecentes = JSON.parse(pedidos);
    }

    this.calcularProgresso();
  }

  calcularProgresso() {
    let preenchidos = 0;

    const total = 4;

    if (this.usuario.nome) {
      preenchidos++;
    }

    if (this.usuario.email) {
      preenchidos++;
    }

    if (this.usuario.telefone) {
      preenchidos++;
    }

    if (this.usuario.endereco) {
      preenchidos++;
    }

    this.progresso = Math.floor((preenchidos / total) * 100);
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarDados() {
    localStorage.setItem('clienteLogado', JSON.stringify(this.usuario));

    this.calcularProgresso();

    this.fecharModal();
  }

  sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('clienteLogado');

    this.router.navigate(['/login']);
  }
}
