import * as repo from '../repository/jogoRepository.js';

export async function adicionarJogo(jogo) {
  return await repo.salvarJogo(jogo);
}

export async function listarJogos() {
  return await repo.listarJogos();
}

export async function buscarJogoPorId(id) {
  return await repo.buscarJogoPorId(id);
}

export async function alterarJogo(id, jogo) {
  return await repo.alterarJogo(id, jogo);
}

export async function deletarJogo(id) {
  return await repo.deletarJogo(id);
}