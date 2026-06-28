import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-detalhe-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalhe-pedido.html',
  styleUrl: './detalhe-pedido.css',
})
export class DetalhePedido implements OnInit {
  produto: any;

  quantidade = 1;

  obs = '';

  tamanhoSelecionado = 'G';

  bordaSelecionada = 'Simples';

  tamanhos = [
    {
      nome: 'P',
      label: 'Brotinho',
      fatias: 4,
      multiplicador: 0.7,
    },

    {
      nome: 'M',
      label: 'Média',
      fatias: 6,
      multiplicador: 0.85,
    },

    {
      nome: 'G',
      label: 'Grande',
      fatias: 8,
      multiplicador: 1,
    },
  ];

  bordas = [
    {
      nome: 'Simples',
      descricao: 'Tradicional sem recheio',
      preco: 0,
    },

    {
      nome: 'Catupiry',
      descricao: 'Borda generosa de requeijão',
      preco: 12,
    },

    {
      nome: 'Cheddar',
      descricao: 'Borda cremosa de cheddar',
      preco: 12,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private service: ProdutoService,
    private carrinhoService: CarrinhoService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.service.buscarPorId(id).subscribe({
        next: (res: any) => {
          this.produto = {
            ...res,

            imagem: `http://localhost:5010/${res.imagem.replace('public/', '')}`,
          };
        },

        error: (err: any) => {
          console.error(err);
        },
      });
    });
  }

  selecionarTamanho(tamanho: string) {
    this.tamanhoSelecionado = tamanho;
  }

  selecionarBorda(nome: string) {
    this.bordaSelecionada = nome;
  }

  aumentar() {
    this.quantidade++;
  }

  diminuir() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  get precoTamanho() {
    const tamanho = this.tamanhos.find((t) => t.nome === this.tamanhoSelecionado);

    return Number(this.produto?.preco || 0) * (tamanho?.multiplicador || 1);
  }

  get precoBorda() {
    const borda = this.bordas.find((b) => b.nome === this.bordaSelecionada);

    return borda?.preco || 0;
  }

  get total() {
    return (this.precoTamanho + this.precoBorda) * this.quantidade;
  }

  adicionarCarrinho() {
    this.carrinhoService.adicionar(this.produto.id).subscribe({
      next: () => {
        alert('Produto adicionado ao carrinho');
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
