import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProdutoService } from '../../services/produto';
import { CarrinhoService } from '../../services/carrinho';
import { 
  LucideAngularModule, ChevronDown, Search, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css',
})
export class Cardapio implements OnInit {
  produtos: any[] = [];

  carrinho: any[] = [];

  categorias: any[] = [];

  busca = '';

  categoriaSelecionada = '';

  taxaEntrega = 8;

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();

    this.carregarCarrinho();

    this.carregarCategorias();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe({
      next: (res: any[]) => {
        this.produtos = res.map((produto: any) => {
          return {
            ...produto,

            imagem: `http://localhost:5010/${produto.imagem}`,
          };
        });
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  carregarCategorias() {
    this.produtoService.listarCategorias().subscribe({
      next: (res: any[]) => {
        this.categorias = res;
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  carregarCarrinho() {
    this.carrinhoService.listar().subscribe({
      next: (res: any[]) => {
        this.carrinho = res;
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  adicionarCarrinho(produto: any) {
    const id = produto.produto_id || produto.id;

    this.carrinhoService.adicionar(id).subscribe({
      next: () => {
        this.carregarCarrinho();
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  removerCarrinho(item: any) {
    this.carrinhoService.remover(item.id).subscribe({
      next: () => {
        this.carregarCarrinho();
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  selecionarCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
  }

  formatarCategoria(nome: string) {
    return nome.replace(/_/g, ' ').toUpperCase();
  }

  finalizarPedido() {
    if (this.carrinho.length === 0) {
      alert('Adicione itens ao carrinho');

      return;
    }

    this.router.navigate(['/checkout']);
  }

  get produtosFiltrados() {
    return this.produtos.filter((produto: any) => {
      const buscaMatch = produto.nome.toLowerCase().includes(this.busca.toLowerCase());

      if (!this.categoriaSelecionada) {
        return buscaMatch;
      }

      return buscaMatch && produto.categoria === this.categoriaSelecionada;
    });
  }

  get subtotal() {
    return this.carrinho.reduce(
      (acc: number, item: any) => {
        return acc + Number(item.preco) * Number(item.quantidade);
      },

      0,
    );
  }

  get total() {
    return this.subtotal + this.taxaEntrega;
  }
}
