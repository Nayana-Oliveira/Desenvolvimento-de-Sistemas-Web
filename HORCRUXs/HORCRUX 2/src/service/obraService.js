import * as repo from '../repository/obraRepository.js';

export async function criar(obra) {
    if (!obra.titulo) {
        throw new Error('Título obrigatório');
    }

    return await repo.inserir(obra);
}

export async function listar() {
    return await repo.listar();
}

export async function buscar(id) {
    let obra = await repo.buscarPorId(id);
    if (!obra){ 
        throw new Error('Obra não encontrada');
    }
    return obra;
}

export async function atualizar(id, obra) {
    await buscar(id);
    await repo.atualizar(id, obra);
}

export async function remover(id) {
    await buscar(id);
    await repo.remover(id);
}