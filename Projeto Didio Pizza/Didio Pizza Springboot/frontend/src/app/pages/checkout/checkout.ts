import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit {
  metodo = 'pix';

  pedido: any[] = [];

  subtotal = 0;

  entrega = 8;

  total = 0;

  cpfPix = '';

  nomeCartao = '';
  numeroCartao = '';
  validade = '';
  cvv = '';

  troco = '';

  constructor(
    private change: ChangeDetectorRef,
    private router: Router,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    const dados = localStorage.getItem('carrinho');

    console.log('LOCAL STORAGE:', dados);

    if (dados) {
      this.pedido = JSON.parse(dados);

      console.log('PEDIDOS:', this.pedido);

      this.calcularTotal();
    }
  }

  calcularTotal() {
    this.subtotal = this.pedido.reduce(
      (acc, item) => {
        return acc + Number(item.preco) * Number(item.quantidade);
      },

      0,
    );

    this.total = this.subtotal + this.entrega;
  }

  limitarCpfPix() {
    this.cpfPix = this.cpfPix.replace(/\D/g, '').slice(0, 10);
  }

  finalizarPedido() {
    this.limitarCpfPix();

    if (this.metodo === 'pix' && !this.cpfPix.trim()) {
      alert('Informe o CPF do titular do Pix.');
      return;
    }

    if (this.metodo === 'pix' && this.cpfPix.length > 10) {
      alert('O CPF deve ter no máximo 10 dígitos.');
      return;
    }

    const salvarLocal = (id: string | number, status = 'REGISTRADO') => {
      const pedidoFinalizado = {
        id,
        status,
        pagamento: this.metodo,
        cpfPix: this.cpfPix,
        itens: this.pedido,
        total: this.total,
        data: new Date().toISOString(),
      };

      const historico = JSON.parse(localStorage.getItem('pedidosRecentes') || '[]');
      historico.unshift(pedidoFinalizado);

      localStorage.setItem('pedidoFinalizado', JSON.stringify(pedidoFinalizado));
      localStorage.setItem('pedidosRecentes', JSON.stringify(historico));
      localStorage.removeItem('carrinho');

      this.router.navigate(['/order-details']);
    };

    if (localStorage.getItem('token')) {
      const itensParaBackend = this.pedido.map((item: any) => ({
        produto_id: item.produto_id || item.id,
        id: item.produto_id || item.id,
        nome: item.nome,
        quantidade: Number(item.quantidade || 1),
        preco: Number(item.preco || 0),
        tamanho: item.tamanho || '',
        borda: item.borda || '',
        observacao: `Tamanho: ${item.tamanho || 'não informado'} | Borda: ${item.borda || 'não informada'}`,
      }));

      this.pedidoService.criar(1, itensParaBackend).subscribe({
        next: (res: any) => salvarLocal(res.id),
        error: (err: any) => {
          console.error('Erro ao enviar pedido para o painel do admin:', err);
          alert(err?.error?.erro || err?.error?.message || 'Não foi possível finalizar o pedido. Verifique se a loja está aberta.');
        },
      });

      return;
    }

    salvarLocal(String(Math.floor(1000 + Math.random() * 9000)));
  }
}
