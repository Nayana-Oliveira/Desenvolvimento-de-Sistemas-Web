import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IngredienteService } from '../../services/ingrediente';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './estoque-admin.html',
  styleUrls: ['./estoque-admin.css'],
})
export class Estoque implements OnInit {
  ingredientes: any[] = [];

  modalAberto = false;

  editando = false;

  ingredienteId = 0;

  nome = '';

  quantidade = 0;

  unidade = 'kg';

  estoqueMinimo = 0;

  vencimento = '';

  constructor(private ingredienteService: IngredienteService) {}

  ngOnInit(): void {
    this.listarIngredientes();
  }

  listarIngredientes() {
    this.ingredienteService.listar().subscribe({
      next: (res: any) => {
        this.ingredientes = res;
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  abrirModal() {
    this.editando = false;

    this.limparCampos();

    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  editarIngrediente(item: any) {
    this.editando = true;

    this.ingredienteId = item.id;

    this.nome = item.nome;

    this.quantidade = item.quantidade;

    this.unidade = item.unidade;

    this.estoqueMinimo = item.estoque_minimo;

    this.vencimento = item.vencimento;

    this.modalAberto = true;
  }

  salvarIngrediente() {
    const item = {
      nome: this.nome,

      quantidade: this.quantidade,

      unidade: this.unidade,

      estoqueMinimo: this.estoqueMinimo,

      vencimento: this.vencimento,
    };

    if (this.editando) {
      this.ingredienteService.atualizar(this.ingredienteId, item).subscribe({
        next: () => {
          this.listarIngredientes();

          this.fecharModal();

          this.limparCampos();
        },

        error: (err: any) => {
          console.error(err);
        },
      });
    } else {
      this.ingredienteService.criar(item).subscribe({
        next: () => {
          this.listarIngredientes();

          this.fecharModal();

          this.limparCampos();
        },

        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

  removerIngrediente(id: number) {
    const confirmar = confirm('Deseja remover este ingrediente?');

    if (!confirmar) {
      return;
    }

    this.ingredienteService.deletar(id).subscribe({
      next: () => {
        this.listarIngredientes();
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  limparCampos() {
    this.nome = '';

    this.quantidade = 0;

    this.unidade = 'kg';

    this.estoqueMinimo = 0;

    this.vencimento = '';
  }

  getStatus(item: any) {
    if (item.quantidade <= 5) {
      return 'Crítico';
    }

    if (item.quantidade <= 10) {
      return 'Atenção';
    }

    return 'Ótimo';
  }

  get totalItens() {
    return this.ingredientes.length;
  }

  get estoqueTotal() {
    return this.ingredientes.reduce(
      (acc, item) => {
        return acc + Number(item.quantidade);
      },

      0,
    );
  }

  get itensBaixos() {
    return this.ingredientes.filter((item) => item.quantidade <= 10).length;
  }

  get proximosVencimento() {
    return this.ingredientes.filter((item: any) => {
      if (!item.vencimento) {
        return false;
      }

      const hoje = new Date();

      const vencimento = new Date(item.vencimento);

      const diferenca = vencimento.getTime() - hoje.getTime();

      const dias = diferenca / (1000 * 60 * 60 * 24);

      return dias <= 7;
    }).length;
  }

  getIcone(nome: string) {
    const icons: any = {
      Mussarela: '🧀',

      Calabresa: '🍖',

      Pepperoni: '🍕',

      Molho: '🍅',

      Cebola: '🧅',

      Farinha: '🌾',

      Refrigerante: '🥤',

      Bacon: '🥓',

      Chocolate: '🍫',

      Frango: '🍗',
    };

    return icons[nome] || '📦';
  }
}
