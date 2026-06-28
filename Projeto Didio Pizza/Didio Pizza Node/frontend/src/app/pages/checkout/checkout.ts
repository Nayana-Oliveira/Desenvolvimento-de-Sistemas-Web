import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CarrinhoService } from '../../services/carrinho';
import { EnderecoService } from '../../services/endereco';
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
  enderecos: any[] = [];
  enderecoSelecionado: number | null = null;

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
    private carrinhoService: CarrinhoService,
    private enderecoService: EnderecoService,
    private pedidoService: PedidoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarCarrinho();
    this.carregarEnderecos();
  }

  carregarCarrinho() {
    this.carrinhoService.listar().subscribe({
      next: (res: any[]) => {
        this.pedido = res.map((item: any) => ({
          ...item,
          imagem: item.imagem?.startsWith('http') ? item.imagem : `http://localhost:5010/${item.imagem}`,
        }));
        this.calcularTotal();
      },
      error: (err: any) => {
        console.error(err);
        alert('Faça login para finalizar o pedido.');
        this.router.navigate(['/login']);
      },
    });
  }

  carregarEnderecos() {
    this.enderecoService.listar().subscribe({
      next: (res: any[]) => {
        this.enderecos = res;

        if (this.enderecos.length > 0) {
          this.enderecoSelecionado = this.enderecos[0].id;
        }
      },
      error: (err: any) => console.error(err),
    });
  }

  limitarCpf() {
    this.cpfPix = this.cpfPix.replace(/\D/g, '').slice(0, 10);
  }

  calcularTotal() {
    this.subtotal = this.pedido.reduce((acc, item) => {
      return acc + Number(item.preco) * Number(item.quantidade);
    }, 0);

    this.total = this.subtotal + this.entrega;
  }

  finalizarPedido() {
    if (this.pedido.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    if (this.metodo === 'pix' && this.cpfPix.length !== 10) {
      alert('Digite o CPF Pix com 10 dígitos.');
      return;
    }

    if (this.enderecoSelecionado) {
      this.criarPedido(this.enderecoSelecionado);
      return;
    }

    const enderecoPadrao = {
      rua: 'Av. Paulista',
      numero: '1578',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      cep: '01310-200',
      complemento: 'Endereço padrão',
    };

    this.enderecoService.cadastrar(enderecoPadrao).subscribe({
      next: (res: any) => this.criarPedido(res.id),
      error: (err: any) => {
        console.error(err);
        alert(err.error?.erro || 'Erro ao criar endereço para o pedido');
      },
    });
  }

  criarPedido(enderecoId: number) {
    this.pedidoService.criar(enderecoId).subscribe({
      next: (res: any) => {
        localStorage.setItem('pedidoFinalizadoId', String(res.id));
        localStorage.setItem('pedidoFinalizado', JSON.stringify(this.pedido));
        localStorage.removeItem('carrinho');
        this.router.navigate(['/order-details']);
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.erro || 'Erro ao finalizar pedido');
      },
    });
  }
}
