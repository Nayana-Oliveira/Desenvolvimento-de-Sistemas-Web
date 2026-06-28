import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {

  pizzas: any[] = [];

  recomendados: any[] = [];

  index = 0;

  depoimentos = [
    {
      texto:
        'Cada caixa está repleta de um sabor incrível que melhora qualquer coisa que você coma!',
      autor: 'LAURA',
    },

    {
      texto: 'A melhor pizza que já pedi, simplesmente viciante!',
      autor: 'CARLOS',
    },

    {
      texto: 'Entrega rápida e sabor absurdo, virou minha favorita.',
      autor: 'ANA',
    },
  ];

  constructor(
    private service: ProdutoService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (res: any[]) => {

        const produtos = res.map((produto: any) => ({
          ...produto,
          imagem: `http://localhost:5010/${produto.imagem}`,
        }));

        this.pizzas = produtos.slice(0, 4);

        this.recomendados = produtos.slice(0, 2);

        this.change.detectChanges();
      },

      error: (err: any) => {
        console.error('Erro ao carregar produtos:', err);
      },
    });
  }

  proximo(): void {
    this.index = (this.index + 1) % this.depoimentos.length;
  }

  anterior(): void {
    this.index =
      (this.index - 1 + this.depoimentos.length) %
      this.depoimentos.length;
  }
}
