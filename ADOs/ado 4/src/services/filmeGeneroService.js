import * as repo from '../repository/filmeGeneroRepository.js'

export async function adicionarGeneroFilme(generoFilme) {
    let id = await repo.adicionarGeneroFilme(generoFilme);
    return id;
}

export async function listarGeneroFilme() {
    let linhas = await repo.listarGeneroFilme();
    return linhas;
}

export async function alterarGeneroFilme(id, generoFilme) {
    let linhasAfetadas = await repo.alterarGeneroFilme(id, generoFilme);
    return linhasAfetadas;
}

export async function deletarGeneroFilme(id) {
    let linhasAfetadas = await repo.deletarGeneroFilme(id);
    return linhasAfetadas;
}

export async function buscarPorId(id) {
    let linha = await repo.buscarPorId(id);
    return linha;
}