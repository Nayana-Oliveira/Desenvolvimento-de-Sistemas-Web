import * as repo from '../repository/vendaItemRepository.js';

export async function adicionarItem(item) {
  let id = await repo.salvarItem(item);
  return id;
}

export async function listarItens() {
  let linhas = await repo.listarItens();
  return linhas;
}
export async function alterarItem(id, item) {
  let linhasAfetadas = await repo.alterarItem(id, item);
  return linhasAfetadas;
}

export async function deletarItem(id) {
  let linhasAfetadas = await repo.deletarItem(id);
  return linhasAfetadas;
}

export async function buscarItemPorId(id) {
  let linha = await repo.buscarItemPorId(id);
  return linha;
}