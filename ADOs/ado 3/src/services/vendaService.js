import * as repo from '../repository/vendaRepository.js';

export async function adicionarVenda(venda) {
  let id = await repo.salvarVenda(venda);
  return id;
}

export async function listarVendas() {
  let linhas = await repo.listarVendas();
  return linhas;
}

export async function alterarVenda(id, venda) {
  let linhasAfetadas = await repo.alterarVenda(id, venda);
  return linhasAfetadas;
}

export async function deletarVenda(id) {
  let linhasAfetadas = await repo.deletarVenda(id);
  return linhasAfetadas;
}

export async function buscarVendaPorId(id) {
  let linha = await repo.buscarVendaPorId(id);
  return linha;
}