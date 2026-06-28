import * as repository from '../repository/estoqueRepository.js';


export async function criar(item) {

    if (!item.nome || !item.quantidade || !item.unidade) {
        throw new Error('Todos os campos são obrigatórios.');
    }

    if (item.quantidade < 0) {
        throw new Error('Quantidade inválida.');
    }

    return await repository.inserir(item);
}


export async function listar() {
    return await repository.listar();
}


export async function atualizar(id, item) {

    if (!item.nome || !item.quantidade || !item.unidade) {
        throw new Error('Campos obrigatórios.');
    }

    let linhas = await repository.atualizar(id, item);

    if (linhas == 0) {
        throw new Error('Item não encontrado.');
    }
}


export async function remover(id) {

    let linhas = await repository.deletar(id);

    if (linhas == 0) {
        throw new Error('Item não encontrado.');
    }
}