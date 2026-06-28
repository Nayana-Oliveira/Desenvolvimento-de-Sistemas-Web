import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho';

import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './cardapio.html',
  styleUrls: ['./cardapio.css'],
})
export class Cardapio implements OnInit {

  produtos: any[] = [];

  carrinho: any[] = [];

  categorias: any[] = [];

  busca = '';

  categoriaSelecionada = '';

  taxaEntrega = 8;

  loading = true;

  carrinhoAberto = false;

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.carregarProdutos();

    this.carregarCarrinho();

    this.carregarCategorias();

    if (localStorage.getItem('abrirCarrinhoCardapio') === 'true') {
      this.carrinhoAberto = true;
      localStorage.removeItem('abrirCarrinhoCardapio');
    }
  }

  carregarProdutos(): void {

    this.loading = true;

    this.produtoService.listar().subscribe({

      next: (res: any[]) => {

        console.log('PRODUTOS:', res);

        this.produtos = [...res].map((produto: any) => ({

          ...produto,

          imagem: `http://localhost:5010/${produto.imagem}`,
        }));

        this.loading = false;
      },

      error: (err: any) => {

        if (err?.status !== 401) {
          console.error(err);
        }

        this.loading = false;
      },
    });
  }

  carregarCategorias(): void {

    this.produtoService.listarCategorias().subscribe({

      next: (res: any[]) => {

        setTimeout(() => {
          this.categorias = res;
        });
      },

      error: (err: any) => {

        console.error(err);
      },
    });
  }

  carregarCarrinho(): void {

    const carrinhoLocal = JSON.parse(localStorage.getItem('carrinho') || '[]');

    if (carrinhoLocal.length > 0 || !localStorage.getItem('token')) {
      this.carrinho = carrinhoLocal;
      return;
    }

    this.carrinhoService.listar().subscribe({

      next: (res: any[]) => {

        this.carrinho = res;
      },

      error: (err: any) => {

        if (err?.status !== 401) {
          console.error(err);
        }

        this.carrinho = carrinhoLocal;
      },
    });
  }

  adicionarCarrinho(produto: any): void {

    const id = produto.produto_id || produto.id;

    const item = { ...produto, produto_id: id, quantidade: 1, tamanho: produto.tamanho || 'G', borda: produto.borda || 'Simples' };
    const index = this.carrinho.findIndex((i: any) => (i.produto_id || i.id) === id && !i.observacao && i.tamanho === item.tamanho && i.borda === item.borda);

    if (index >= 0) {
      this.carrinho[index].quantidade = Number(this.carrinho[index].quantidade || 1) + 1;
    } else {
      this.carrinho.push(item);
    }

    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    this.carrinhoAberto = true;

    return;
  }

  removerCarrinho(item: any): void {

    const index = this.carrinho.indexOf(item);

    if (index >= 0) {
      this.carrinho.splice(index, 1);
      this.carrinho = [...this.carrinho];
      localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    }

    if (!localStorage.getItem('token')) {
      return;
    }

    if (localStorage.getItem('carrinho')) {
      return;
    }

    this.carrinhoService.remover(item.produto_id).subscribe({

      next: () => {

        this.carregarCarrinho();
      },

      error: (err: any) => {

        console.error(err);
      },
    });
  }

  selecionarCategoria(categoria: string): void {

    this.categoriaSelecionada = categoria;
  }

  formatarCategoria(nome: string): string {

    return nome.replace(/_/g, ' ').toUpperCase();
  }

  abrirCarrinho(): void {
    this.carrinhoAberto = true;
  }

  fecharCarrinho(): void {
    this.carrinhoAberto = false;
  }

  finalizarPedido(): void {

    if (this.carrinho.length === 0) {

      alert('Adicione itens ao carrinho');

      return;
    }

    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));

    this.router.navigate(['/checkout']);
  }

  get produtosFiltrados() {

    return this.produtos.filter((produto: any) => {

      const buscaMatch = produto.nome
        .toLowerCase()
        .includes(this.busca.toLowerCase());

      if (!this.categoriaSelecionada) {

        return buscaMatch;
      }

      return (
        buscaMatch &&
        produto.categoria === this.categoriaSelecionada
      );
    });
  }

  get subtotal(): number {

    return this.carrinho.reduce(

      (acc: number, item: any) => {

        return (
          acc +
          Number(item.preco) *
          Number(item.quantidade)
        );
      },

      0
    );
  }

get total(): number {

  return this.subtotal + this.taxaEntrega;
}

trackByProduto(index: number, item: any): number {

  return item.produto_id || item.id || index;
}
}