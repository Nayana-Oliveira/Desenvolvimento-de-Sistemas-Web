import * as repo from '../repository/produtoRepository.js'

export async function adicionarProduto(produto) {
  let id = await repo.salvarProduto(produto);
  return id;
}

export async function listarProdutos() {
  let linhas = await repo.listarProdutos();
  return linhas;
}
