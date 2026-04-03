import * as repo from '../repository/clienteRepository.js';

export async function adicionarCliente(cliente) {
  let id = await repo.salvarCliente(cliente);
  return id;
}

export async function listarClientes() {
  let linhas = await repo.listarClientes();
  return linhas;
}

export async function alterarCliente(id, cliente) {
  let linhasAfetadas = await repo.alterarCliente(id, cliente);
  return linhasAfetadas;
}

export async function deletarCliente(id) {
  let linhasAfetadas = await repo.deletarCliente(id);
  return linhasAfetadas;
}

export async function buscarClientePorId(id) {
  let linha = await repo.buscarClientePorId(id);
  return linha;
}