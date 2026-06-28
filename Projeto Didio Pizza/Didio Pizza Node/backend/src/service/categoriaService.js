import * as categoriaRepository from '../repository/categoriaRepository.js';


export async function listarCategorias() {
    let linhas = await categoriaRepository.listarCategorias();

    return linhas;
}