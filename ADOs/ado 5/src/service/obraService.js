import * as repo from '../repository/obraRepository.js';

export async function criar(obra) {
    if (!obra.titulo) {
        throw new Error('Título obrigatório');
    }
    if (obra.estoque < 0) {
        throw new Error('Estoque não pode ser negativo');
    }
    let existente = await repo.buscarPorIsbn(obra.isbn);

    if (existente) {
        throw new Error('Já existe uma obra com esse ISBN');
    }

    return await repo.inserir(obra);
}

export async function inserirEmMassa(obras) {
    if (!Array.isArray(obras)) {
        throw new Error('Envie uma lista de obras');
    }

    let ids = [];

    for (let obra of obras) {
        if (!obra.titulo) {
            throw new Error('Título obrigatório');
        }
        if (obra.estoque < 0) {
            throw new Error('Estoque não pode ser negativo');
        }
        let existente = await repo.buscarPorIsbn(obra.isbn);
        if (existente) {
            throw new Error(`ISBN já existe: ${obra.isbn}`);
        }
        let id = await repo.inserir(obra);
        ids.push(id);
    }

    return ids;
}

export async function listar(filtros) {
    if (filtros && Object.keys(filtros).length > 0) {
        return await repo.filtrar(filtros);
    }
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

    if (obra.estoque < 0) {
        throw new Error('Estoque não pode ser negativo');
    }

    let existente = await repo.buscarPorIsbn(obra.isbn);

    if (existente && existente.id != id) {
        throw new Error('Já existe uma obra com esse ISBN');
    }

    await repo.atualizar(id, obra);
}

export async function remover(id) {
    await buscar(id);
    await repo.remover(id);
}