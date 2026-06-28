import * as repo from '../repository/timeRepository.js';

export async function adicionarTime(time) {
  return await repo.salvarTime(time);
}

export async function listarTimes() {
  return await repo.listarTimes();
}

export async function buscarTimePorId(id) {
  return await repo.buscarTimePorId(id);
}

export async function alterarTime(id, time) {
  return await repo.alterarTime(id, time);
}

export async function deletarTime(id) {
  return await repo.deletarTime(id);
}