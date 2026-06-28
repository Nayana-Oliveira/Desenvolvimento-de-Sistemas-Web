import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produto-admin.html',
  styleUrl: './produto-admin.css',
})
export class ProdutoAdmin implements OnInit {
  idEditando: number | null = null;

  nome = '';
  descricao = '';
  preco = 0;
  categoria_id = '';
  tamanho = 'M';
  imagem!: File | null;
  previewImagem = '';

  categorias: any[] = [];
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe({
      next: (res: any[]) => {
        this.produtos = res.map((produto: any) => ({
          ...produto,
          imagemUrl: produto.imagem?.startsWith('http')
            ? produto.imagem
            : `http://localhost:5010/${produto.imagem}`,
        }));
      },
      error: (err: any) => console.error(err),
    });
  }

  carregarCategorias() {
    this.produtoService.listarCategorias().subscribe({
      next: (res: any) => {
        this.categorias = res;
      },
      error: (err: any) => console.error(err),
    });
  }

  selecionarImagem(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    this.imagem = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImagem = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  selecionarTamanho(tamanho: string) {
    this.tamanho = tamanho;
  }

  salvarProduto() {
    if (!this.nome || !this.descricao || !this.preco || !this.categoria_id || !this.tamanho) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (this.idEditando) {
      this.atualizarProduto();
      return;
    }

    if (!this.imagem) {
      alert('Selecione uma imagem para cadastrar o produto.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', this.nome);
    formData.append('descricao', this.descricao);
    formData.append('preco', String(this.preco));
    formData.append('categoria_id', this.categoria_id);
    formData.append('tamanho', this.tamanho);
    formData.append('imagem', this.imagem);

    this.produtoService.salvar(formData).subscribe({
      next: () => {
        alert('Produto cadastrado!');
        this.limparFormulario();
        this.carregarProdutos();
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.erro || 'Erro ao cadastrar produto');
      },
    });
  }

  atualizarProduto() {
    if (!this.idEditando) {
      return;
    }

    const dados = {
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      categoria_id: Number(this.categoria_id),
      tamanho: this.tamanho,
    };

    this.produtoService.alterar(this.idEditando, dados).subscribe({
      next: () => {
        if (this.imagem && this.idEditando) {
          const formData = new FormData();
          formData.append('imagem', this.imagem);

          this.produtoService.alterarImagem(this.idEditando, formData).subscribe({
            next: () => this.finalizarEdicao(),
            error: (err: any) => {
              console.error(err);
              alert('Produto editado, mas houve erro ao atualizar a imagem.');
              this.finalizarEdicao();
            },
          });
        } else {
          this.finalizarEdicao();
        }
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.erro || 'Erro ao editar produto');
      },
    });
  }

  finalizarEdicao() {
    alert('Produto atualizado!');
    this.limparFormulario();
    this.carregarProdutos();
  }

  editarProduto(produto: any) {
    this.idEditando = produto.id;
    this.nome = produto.nome;
    this.descricao = produto.descricao;
    this.preco = Number(produto.preco);
    this.categoria_id = String(produto.categoria_id);
    this.tamanho = produto.tamanho;
    this.imagem = null;
    this.previewImagem = produto.imagemUrl;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  excluirProduto(produto: any) {
    const confirmar = confirm(`Deseja excluir o produto "${produto.nome}"?`);

    if (!confirmar) {
      return;
    }

    this.produtoService.deletar(produto.id).subscribe({
      next: () => {
        alert('Produto excluído!');
        if (this.idEditando === produto.id) {
          this.limparFormulario();
        }
        this.carregarProdutos();
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.erro || 'Erro ao excluir produto');
      },
    });
  }

  limparFormulario() {
    this.idEditando = null;
    this.nome = '';
    this.descricao = '';
    this.preco = 0;
    this.categoria_id = '';
    this.tamanho = 'M';
    this.imagem = null;
    this.previewImagem = '';
  }
}
