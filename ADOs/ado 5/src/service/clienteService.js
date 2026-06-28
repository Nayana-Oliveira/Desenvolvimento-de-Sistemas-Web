import * as repo from '../repository/clienteRepository.js';

export async function criar(cliente) {
    if (!cliente.nome) {
        throw new Error('Nome obrigatório');
    }

    let existentes = await repo.buscarPorCpfOuEmail(cliente.cpf, cliente.email);

    if (existentes.length > 0) {
        throw new Error('CPF ou email já cadastrado');
    }

    return await repo.inserir(cliente);
}

export async function listar(nome) {
    if (nome) {
        return await repo.filtrarPorNome(nome);
    }
    return await repo.listar();
}

export async function buscar(id) {
    let cliente = await repo.buscar(id);

    if (!cliente) {
        throw new Error('Cliente não encontrado');
    }

    return cliente;
}

export async function atualizar(id, cliente) {
    await buscar(id);
    await repo.atualizar(id, cliente);
}

export async function remover(id) {
    await buscar(id);
    await repo.remover(id);
}