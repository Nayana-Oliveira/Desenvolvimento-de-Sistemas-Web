import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produto-admin.html',
  styleUrl: './produto-admin.css',
})
export class ProdutoAdmin implements OnInit {
  produtoId: number | null = null;
  editando = false;

  nome = '';
  descricao = '';
  preco = 0;
  precoP: number | null = null;
  precoM: number | null = null;
  precoG: number | null = null;
  categoria_id = '';
  tamanho = 'M';
  imagem?: File;
  imagemAtual = '';
  previewImagem = '';

  categorias: any[] = [];
  produtos: any[] = [];

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.produtoId = Number(this.route.snapshot.paramMap.get('id')) || null;
    this.editando = !!this.produtoId;

    this.carregarCategorias();
    this.carregarProdutos();

    if (this.produtoId) {
      this.carregarProduto(this.produtoId);
    }
  }

  carregarCategorias() {
    this.produtoService.listarCategorias().subscribe({
      next: (res: any) => (this.categorias = res),
      error: (err: any) => console.error(err),
    });
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe({
      next: (res: any) => (this.produtos = Array.isArray(res) ? res : []),
      error: (err: any) => console.error(err),
    });
  }

  carregarProduto(id: number) {
    this.produtoService.buscarPorId(id).subscribe({
      next: (p: any) => {
        this.nome = p.nome || '';
        this.descricao = p.descricao || '';
        this.preco = Number(p.preco || 0);
        this.tamanho = p.tamanho || 'M';
        this.categoria_id = String(p.categoria_id || '');
        this.imagemAtual = p.imagem || '';
        this.previewImagem = this.imagemAtual ? `http://localhost:5010/${this.imagemAtual}` : '';
      },
      error: (err: any) => {
        console.error(err);
        alert('Produto não encontrado.');
        this.router.navigate(['/admin/produto']);
      },
    });
  }

  selecionarImagem(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.imagem = file;
    const reader = new FileReader();
    reader.onload = () => (this.previewImagem = reader.result as string);
    reader.readAsDataURL(file);
  }

  selecionarTamanho(tamanho: string) {
    this.tamanho = tamanho;
  }

  private montarFormData(tamanho: string, preco: number) {
    const formData = new FormData();
    formData.append('nome', this.nome);
    formData.append('descricao', this.descricao);
    formData.append('preco', String(preco));
    formData.append('categoria_id', this.categoria_id);
    formData.append('tamanho', tamanho);
    if (this.imagem) formData.append('imagem', this.imagem);
    return formData;
  }

  private dadosProduto() {
    return {
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      categoria_id: Number(this.categoria_id),
      tamanho: this.tamanho,
    };
  }

  salvarProduto() {
    if (!this.nome || !this.descricao || !this.categoria_id) {
      alert('Preencha nome, descrição e categoria.');
      return;
    }

    if (this.editando && this.produtoId) {
      if (!this.preco || !this.tamanho) {
        alert('Preencha preço e tamanho.');
        return;
      }

      this.produtoService.atualizar(this.produtoId, this.dadosProduto()).subscribe({
        next: () => {
          if (this.imagem && this.produtoId) {
            const fd = new FormData();
            fd.append('imagem', this.imagem);
            this.produtoService.atualizarImagem(this.produtoId, fd).subscribe({
              next: () => this.finalizarSalvamento('Produto atualizado!'),
              error: (err: any) => {
                console.error(err);
                alert('Produto atualizado, mas a imagem não foi alterada.');
                this.finalizarSalvamento('Produto atualizado!');
              },
            });
          } else {
            this.finalizarSalvamento('Produto atualizado!');
          }
        },
        error: (err: any) => {
          console.error(err);
          alert('Erro ao atualizar produto.');
        },
      });
      return;
    }

    if (!this.imagem) {
      alert('Selecione uma imagem.');
      return;
    }

    const variacoes = [
      { tamanho: 'P', preco: this.precoP },
      { tamanho: 'M', preco: this.precoM },
      { tamanho: 'G', preco: this.precoG },
    ].filter((v) => Number(v.preco) > 0);

    if (variacoes.length === 0) {
      alert('Informe pelo menos um preço para P, M ou G.');
      return;
    }

    const requisicoes = variacoes.map((v) =>
      this.produtoService.salvar(this.montarFormData(v.tamanho, Number(v.preco))),
    );

    forkJoin(requisicoes).subscribe({
      next: () => this.finalizarSalvamento('Produto cadastrado!'),
      error: (err: any) => {
        console.error(err);
        alert('Produto cadastrado!');
      },
    });
  }

  finalizarSalvamento(mensagem: string) {
    alert(mensagem);
    this.router.navigate(['/admin/dashboard']);
  }

  editarProduto(produto: any) {
    this.router.navigate(['/admin/produto', produto.id]);
  }

  excluirProduto(produto: any) {
    const confirmar = confirm(`Tem certeza que deseja excluir "${produto.nome}"?`);

    if (!confirmar) {
      return;
    }

    this.produtoService.deletar(produto.id).subscribe({
      next: () => {
        alert('Produto excluído!');
        this.produtos = this.produtos.filter((p) => p.id !== produto.id);
      },
      error: (err: any) => {
        console.error(err);
        alert(err?.error?.erro || 'Erro ao excluir produto.');
      },
    });
  }
}

