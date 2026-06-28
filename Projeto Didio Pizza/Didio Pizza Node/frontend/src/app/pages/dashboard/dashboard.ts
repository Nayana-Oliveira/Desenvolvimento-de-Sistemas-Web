import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { IngredienteService } from '../../services/ingrediente';
import { LojaService } from '../../services/loja';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit, OnDestroy {
  ingredientes: any[] = [];
  pedidos: any[] = [];
  lojaAberta = false;
  faturamento = 2840;
  statusDisponiveis = ['REGISTRADO', 'PREPARANDO', 'EM_ROTA', 'ENTREGUE'];

  private pedidosInterval: any;

  constructor(
    private ingredienteService: IngredienteService,
    private lojaService: LojaService,
    private pedidoService: PedidoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.validarAdmin();
    this.carregarIngredientes();
    this.carregarPedidos();
    this.buscarStatusLoja();

    this.pedidosInterval = setInterval(() => {
      this.carregarPedidos();
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.pedidosInterval) {
      clearInterval(this.pedidosInterval);
    }
  }

  validarAdmin() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  carregarIngredientes() {
    this.ingredienteService.listar().subscribe({
      next: (res: any) => {
        this.ingredientes = res;
      },
      error: (err: any) => console.error(err),
    });
  }

  carregarPedidos() {
    this.pedidoService.listarAdmin().subscribe({
      next: (res: any[]) => {
        this.pedidos = res;
      },
      error: (err: any) => console.error(err),
    });
  }

  alterarStatusPedido(pedido: any, status: string) {
    this.pedidoService.atualizarStatus(pedido.id, status).subscribe({
      next: () => {
        pedido.status = status;
        this.carregarPedidos();
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.erro || 'Erro ao atualizar status do pedido');
        this.carregarPedidos();
      },
    });
  }

  buscarStatusLoja() {
    this.lojaService.status().subscribe({
      next: (res: any) => {
        this.lojaAberta = res.aberta;
      },
      error: (err: any) => console.error(err),
    });
  }

  abrirLoja() {
    this.lojaService.abrir().subscribe({
      next: () => {
        this.lojaAberta = true;
      },
      error: (err: any) => console.error(err),
    });
  }

  fecharLoja() {
    this.lojaService.fechar().subscribe({
      next: () => {
        this.lojaAberta = false;
      },
      error: (err: any) => console.error(err),
    });
  }

  getIcone(nome: string) {
    const icons: any = {
      Mussarela: '🧀',
      Calabresa: '🍖',
      Pepperoni: '🍕',
      Molho: '🍅',
      Cebola: '🧅',
      Farinha: '🌾',
      Refrigerante: '🥤',
      Bacon: '🥓',
      Chocolate: '🍫',
      Frango: '🍗',
    };

    return icons[nome] || '📦';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get estoqueBaixo() {
    return this.ingredientes.filter((item) => item.quantidade <= 10);
  }
}
