import * as repo from '../repository/vendaItemRepository.js';

export async function adicionarVendaItem(vendaItem) {
  let id = await repo.salvarVendaItem(vendaItem);
  return id;
}

export async function listarVendaItens() {
  let linhas = await repo.listarVendaItens();
  return linhas;
}

export async function alterarVendaItem(id, vendaItem) {
  let linhasAfetadas = await repo.alterarVendaItem(id, vendaItem);
  return linhasAfetadas;
}

export async function deletarVendaItem(id) {
  let linhasAfetadas = await repo.deletarVendaItem(id);
  return linhasAfetadas;
}

export async function buscarVendaItemPorId(id) {
  let linha = await repo.buscarVendaItemPorId(id);
  return linha;
}