import * as repo from '../repository/produtoRepository.js'

export async function adicionarProduto(produto) {
  let id = await repo.salvarProduto(produto);
  return id;
}

export async function listarProdutos() {
  let linhas = await repo.listarProdutos();
  return linhas;
}

export async function alterarProduto(id, produto) {
  let linhasAfetadas = await repo.alterarProduto(id, produto);
  return linhasAfetadas;
}

export async function deletarProduto(id) {
  let linhasAfetadas = await repo.deletarProduto(id);
  return linhasAfetadas;
}

export async function buscarProdutoPorId(id) {
  let linha = await repo.buscarProdutoPorId(id);
  return linha;
}
