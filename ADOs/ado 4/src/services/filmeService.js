import * as repo from '../repository/filmeRepository.js'

export async function adicionarFilme(filme) {
    let id = await repo.adicionarFilme(filme);
    return id;
}

export async function listarFilme() {
    let linhas = await repo.mostrarFilme();
    return linhas;
}

export async function alterarFilme(id, filme) {
    let linhasAfetadas = await repo.alterarFilme(id, filme);
    return linhasAfetadas;
}

export async function deletarFilme(id) {
    let linhasAfetadas = await repo.deletarFilme(id);
    return linhasAfetadas;
}

export async function buscarPorId(id) {
    let linha = await repo.buscarPorId(id);
    return linha;
}