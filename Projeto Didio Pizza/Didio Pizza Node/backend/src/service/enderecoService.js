import * as enderecoRepository from '../repository/enderecoRepository.js';


export async function adicionarEndereco(clienteId, endereco) {

    if (!endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.cep) {
        throw new Error('Campos obrigatórios não preenchidos.');
    }

    let id = await enderecoRepository.inserirEndereco(clienteId, endereco);

    return id;
}


export async function listarEnderecos(clienteId) {
    return await enderecoRepository.listarEnderecos(clienteId);
}


export async function buscarEndereco(clienteId, enderecoId) {

    let endereco = await enderecoRepository.buscarEnderecoPorId(clienteId, enderecoId);

    if (!endereco) {
        throw new Error('Endereço não encontrado.');
    }

    return endereco;
}


export async function atualizarEndereco(clienteId, enderecoId, endereco) {

    if (!endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.cep) {
        throw new Error('Campos obrigatórios não preenchidos.');
    }

    let linhas = await enderecoRepository.atualizarEndereco(clienteId, enderecoId, endereco);

    if (linhas == 0) {
        throw new Error('Endereço não encontrado.');
    }
}


export async function removerEndereco(clienteId, enderecoId) {

    let linhas = await enderecoRepository.deletarEndereco(clienteId, enderecoId);

    if (linhas == 0) {
        throw new Error('Endereço não encontrado.');
    }
}