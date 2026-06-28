import * as repository from "../repository/ingredienteRepository.js";

export async function criar(item) {
  if (!item.nome) {
    throw new Error("Nome obrigatório.");
  }

  if (!item.quantidade) {
    throw new Error("Quantidade obrigatória.");
  }

  if (!item.unidade) {
    throw new Error("Unidade obrigatória.");
  }

  return await repository.inserir(item);
}

export async function listar() {
  return await repository.listar();
}

export async function atualizar(id, item) {
  if (!item.nome) {
    throw new Error("Nome obrigatório.");
  }

  let linhas = await repository.atualizar(id, item);

  if (linhas == 0) {
    throw new Error("Ingrediente não encontrado.");
  }
}

export async function remover(id) {
  let linhas = await repository.deletar(id);

  if (linhas == 0) {
    throw new Error("Ingrediente não encontrado.");
  }
}
