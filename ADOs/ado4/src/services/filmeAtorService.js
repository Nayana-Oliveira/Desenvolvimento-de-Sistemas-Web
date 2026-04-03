import * as repo from '../repository/filmeAtorRepository.js'

export async function adicionarFilmeAtor(filmeAtor) {
    let id = await repo.salvarFilmeAtor(filmeAtor);
    return id;
}

export async function listarFilmeAtor() {
    let linhas = await repo.mostrarFilmeAtor();
    return linhas;
}

export async function alterarFilmeAtor(id, filmeAtor) {
    let linhasAfetadas = await repo.alterarFilmeAtor(id, filmeAtor);
    return linhasAfetadas;
}

export async function deletarFilmeAtor(id) {
    let linhasAfetadas = await repo.deletarFilmeAtor(id);
    return linhasAfetadas;
}

export async function buscarPorId(id) {
    let linha = await repo.buscarPorId(id);
    return linha;
}