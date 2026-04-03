import * as repo from '../repository/atorRepository.js'

export async function adicionarAtor(ator) {
    let id = await repo.adicionarAtor(ator);
    return id;
}

export async function listarAtor() {
    let linhas = await repo.listarAtor();
    return linhas;
}

export async function alterarAtor(id, ator) {
    let linhasAfetadas = await repo.alterarAtor(id, ator);
    return linhasAfetadas;
}

export async function deletarAtor(id) {
    let linhasAfetadas = await repo.deletarAtor(id);
    return linhasAfetadas;
}

export async function buscarPorId(id) {
    let linha = await repo.buscarPorId(id);
    return linha;
}