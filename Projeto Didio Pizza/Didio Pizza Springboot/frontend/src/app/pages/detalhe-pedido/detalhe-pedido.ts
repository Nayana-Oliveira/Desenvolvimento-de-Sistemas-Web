import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-detalhe-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './detalhe-pedido.html',
  styleUrl: './detalhe-pedido.css',
})
export class DetalhePedido implements OnInit {
  produto = signal<any>(null);

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
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.service.buscarPorId(id).subscribe({
        next: (res: any) => {
          this.produto.set({
            ...res,
            imagem: `http://localhost:5010/${res.imagem.replace('public/', '')}`,
          });
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

    return Number(this.produto()?.preco || 0) * (tamanho?.multiplicador || 1);
  }

  get precoBorda() {
    const borda = this.bordas.find((b) => b.nome === this.bordaSelecionada);

    return borda?.preco || 0;
  }

  get total() {
    return (this.precoTamanho + this.precoBorda) * this.quantidade;
  }

  adicionarCarrinho() {
    const produto = this.produto();

    if (!produto) {
      return;
    }

    const id = produto.produto_id || produto.id;
    const itemConfigurado = {
      ...produto,
      id,
      produto_id: id,
      nome: produto.nome,
      preco: this.precoTamanho + this.precoBorda,
      precoBase: Number(produto.preco || 0),
      quantidade: this.quantidade,
      tamanho: this.tamanhoSelecionado,
      borda: this.bordaSelecionada,
      observacao: this.obs,
      imagem: produto.imagem,
    };

    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho') || '[]');
    carrinhoAtual.push(itemConfigurado);

    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    localStorage.setItem('abrirCarrinhoCardapio', 'true');

    this.router.navigate(['/cardapio']);
  }
}
