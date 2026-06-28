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
  pedidoInfo: any = null;

  subtotal = 0;
  entrega = 8;
  total = 0;
  codigoSeguranca = '';
  numeroPedido = '';
  status = 'REGISTRADO';

  private intervalo?: any;

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    const dados = localStorage.getItem('pedidoFinalizado');

    if (dados) {
      const salvo = JSON.parse(dados);

      if (Array.isArray(salvo)) {
        this.pedido = salvo;
        this.numeroPedido = String(Math.floor(1000 + Math.random() * 9000));
      } else {
        this.pedidoInfo = salvo;
        this.pedido = salvo.itens || [];
        this.numeroPedido = String(salvo.id || '');
        this.status = salvo.status || 'REGISTRADO';
        this.total = Number(salvo.total || 0);
      }

      this.calcularTotal();
      this.gerarCodigo();
      this.atualizarDoBackend();
      this.intervalo = setInterval(() => this.atualizarDoBackend(), 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  atualizarDoBackend() {
    if (!this.numeroPedido) {
      return;
    }

    // Atualiza sempre o status direto do banco.
    // Assim, quando o admin muda para PREPARANDO / EM_ROTA / ENTREGUE,
    // a página do cliente muda mesmo que o localStorage ainda tenha o status antigo.
    this.pedidoService.buscarStatus(this.numeroPedido).subscribe({
      next: (res: any) => {
        this.status = res.status || this.status;
        this.atualizarPedidoLocal();
      },
      error: () => {},
    });

    if (!localStorage.getItem('token')) {
      return;
    }

    this.pedidoService.detalhe(this.numeroPedido).subscribe({
      next: (res: any) => {
        this.pedidoInfo = { ...(this.pedidoInfo || {}), ...res };
        this.status = res.status || this.status;
        this.pedido = res.itens || this.pedido;
        this.total = Number(res.total || this.total);
        this.calcularTotal(false);
        this.atualizarPedidoLocal();
      },
      error: () => {},
    });
  }

  private atualizarPedidoLocal() {
    const atualizado = {
      ...(this.pedidoInfo || {}),
      id: this.numeroPedido,
      status: this.status,
      itens: this.pedido,
      total: this.total,
    };

    this.pedidoInfo = atualizado;
    localStorage.setItem('pedidoFinalizado', JSON.stringify(atualizado));

    const historico = JSON.parse(localStorage.getItem('pedidosRecentes') || '[]');
    const indice = historico.findIndex((p: any) => String(p.id) === String(this.numeroPedido));

    if (indice >= 0) {
      historico[indice] = { ...historico[indice], status: this.status };
      localStorage.setItem('pedidosRecentes', JSON.stringify(historico));
    }
  }

  calcularTotal(somarEntrega = true) {
    this.subtotal = this.pedido.reduce((acc, item) => {
      return acc + Number(item.preco) * Number(item.quantidade);
    }, 0);

    this.total = somarEntrega ? this.subtotal + this.entrega : Number(this.total || this.subtotal);
  }

  statusAtivo(...status: string[]) {
    return status.includes(this.status);
  }

  formatarStatus(status: string) {
    return String(status || '').replace(/_/g, ' ').toLowerCase();
  }

  gerarCodigo() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';

    for (let i = 0; i < 6; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.codigoSeguranca = codigo;
  }

  cancelarPedido() {
    localStorage.removeItem('pedidoFinalizado');
    this.router.navigate(['/']);
  }

  pedirNovamente() {
    localStorage.setItem('carrinho', JSON.stringify(this.pedido));
    localStorage.setItem('abrirCarrinhoCardapio', 'true');
    this.router.navigate(['/cardapio']);
  }

  iconeStatus(tipo: string) {
    const icones: any = {
      confirmado: '✓',
      preparando: '🍕',
      rota: '🛵',
      entregue: '🏠',
    };

    return icones[tipo] || '•';
  }
}
