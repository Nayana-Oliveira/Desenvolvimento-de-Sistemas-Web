import * as repo from '../repository/obraRepository.js';

export async function adicionarObra(obra) {
  return await repo.salvarObra(obra);
}

export async function listarObras() {
  return await repo.listarObras();
}

export async function buscarObraPorId(id) {
  return await repo.buscarObraPorId(id);
}

export async function alterarObra(id, obra) {
  return await repo.alterarObra(id, obra);
}

export async function deletarObra(id) {
  return await repo.deletarObra(id);
}