import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.html',
  styleUrls: ['./order-details.css'],
})
export class OrderDetails implements OnInit, OnDestroy {
  pedido: any[] = [];
  pedidoDetalhe: any = null;

  subtotal = 0;
  entrega = 8;
  total = 0;
  status = 'REGISTRADO';

  codigoSeguranca = '';
  numeroPedido = '';

  private statusInterval: any;

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    const pedidoId = localStorage.getItem('pedidoFinalizadoId');
    const dados = localStorage.getItem('pedidoFinalizado');

    if (dados) {
      this.pedido = JSON.parse(dados);
      this.calcularTotal();
    }

    this.gerarCodigo();

    if (pedidoId) {
      this.numeroPedido = pedidoId;
      this.carregarPedido(Number(pedidoId));

      this.statusInterval = setInterval(() => {
        this.carregarPedido(Number(pedidoId));
      }, 3000);
    } else {
      this.gerarNumeroPedido();
    }
  }

  ngOnDestroy(): void {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }
  }

  carregarPedido(id: number) {
    this.pedidoService.detalhar(id).subscribe({
      next: (res: any) => {
        this.pedidoDetalhe = res;
        this.status = res.status;
        this.total = Number(res.total) + this.entrega;
        this.subtotal = Number(res.total);

        if (res.itens?.length) {
          this.pedido = res.itens.map((item: any) => ({
            ...item,
            nome: item.produto,
          }));
        }
      },
      error: (err: any) => console.error(err),
    });
  }

  calcularTotal() {
    this.subtotal = this.pedido.reduce((acc, item) => {
      return acc + Number(item.preco) * Number(item.quantidade);
    }, 0);

    this.total = this.subtotal + this.entrega;
  }

  etapaAtiva(etapa: string) {
    const ordem: any = {
      REGISTRADO: 1,
      PREPARANDO: 2,
      EM_ROTA: 3,
      ENTREGUE: 4,
    };

    return ordem[this.status] >= ordem[etapa];
  }

  gerarCodigo() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';

    for (let i = 0; i < 6; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.codigoSeguranca = codigo;
  }

  gerarNumeroPedido() {
    this.numeroPedido = String(Math.floor(1000 + Math.random() * 9000));
  }

  cancelarPedido() {
    localStorage.removeItem('pedidoFinalizado');
    localStorage.removeItem('pedidoFinalizadoId');
    this.router.navigate(['/']);
  }

  pedirNovamente() {
    localStorage.setItem('carrinho', JSON.stringify(this.pedido));
    this.router.navigate(['/checkout']);
  }
}
