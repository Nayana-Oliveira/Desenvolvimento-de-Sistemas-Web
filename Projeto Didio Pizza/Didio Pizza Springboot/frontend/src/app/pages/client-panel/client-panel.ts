import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido';

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

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    const cliente = localStorage.getItem('clienteLogado');

    if (cliente) {
      this.usuario = JSON.parse(cliente);
    }

    this.carregarPedidosRecentes();

    this.calcularProgresso();
  }

  carregarPedidosRecentes() {
    const locais = JSON.parse(localStorage.getItem('pedidosRecentes') || '[]');
    this.pedidosRecentes = Array.isArray(locais) ? locais.slice(0, 4) : [];

    if (localStorage.getItem('token')) {
      this.pedidoService.listarCliente().subscribe({
        next: (res: any[]) => {
          this.pedidosRecentes = Array.isArray(res) ? res.slice(0, 4) : [];
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

  repetirPedido(pedido: any) {
    const itens = pedido.itens || [];

    if (itens.length === 0) {
      alert('Esse pedido não possui itens para repetir.');
      return;
    }

    const carrinho = itens.map((item: any) => ({
      ...item,
      nome: item.nome || item.produto,
      produto_id: item.produto_id || item.id,
      quantidade: item.quantidade || 1,
    }));

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('abrirCarrinhoCardapio', 'true');
    this.router.navigate(['/cardapio']);
  }

  formatarStatus(status: string) {
    return String(status || '').replace(/_/g, ' ').toLowerCase();
  }

  valorPedido(pedido: any) {
    return Number(pedido?.total || 0);
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
