import * as repo from '../repository/generoRepository.js'

export async function adicionarGenero(genero) {
    let id = await repo.adicionarGenero(genero);
    return id;
}

export async function listarGeneros() {
    let linhas = await repo.mostrarGeneros();
    return linhas;
}

export async function alterarGeneros(id, genero) {
    let linhasAfetadas = await repo.alterarGeneros(id, genero);
    return linhasAfetadas;
}

export async function deletarGenero(id) {
    let linhasAfetadas = await repo.deletarGenero(id);
    return linhasAfetadas;
}

export async function buscarPorId(id) {
    let linha = await repo.buscarPorId(id);
    return linha;
}