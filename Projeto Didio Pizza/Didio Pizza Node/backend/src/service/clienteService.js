import * as clienteRepository from '../repository/clienteRepository.js';
import { generateToken } from '../utils/jwt.js';


export async function criarCliente(cliente) {

    if (!cliente.nome || !cliente.email || !cliente.senha) {
        throw new Error('Dados incompletos. Preencha todos os campos obrigatórios.');
    }

    let existente = await clienteRepository.buscarPorEmail(cliente.email);

    if (existente) {
        throw new Error('Email já cadastrado. Por favor, utilize um email diferente.');
    }

    let id = await clienteRepository.criarConta(cliente);
    return id;
}


export async function loginCliente(cliente) {

    let usuario = await clienteRepository.login(cliente.email, cliente.senha);

    if (!usuario) {
        throw new Error('Email ou senha inválidos. Verifique suas credenciais e tente novamente.');
    }

    let token = generateToken({
        id: usuario.id,
        tipo: 'CLIENTE'
    });

    return token;
}


export async function buscarPerfil(clienteId) {
    let cliente = await clienteRepository.buscarPerfilCompleto(clienteId);

    if (!cliente) {
        throw new Error('Cliente não encontrado.');
    }

    return cliente;
}

export async function atualizarPerfil(clienteId, nome, email, telefone) {

    if (!nome || !email) {
        throw new Error('Nome e email são obrigatórios.');
    }

    let linhas = await clienteRepository.atualizarCliente(
        clienteId,
        nome,
        email,
        telefone
    );

    if (linhas === 0) {
        throw new Error('Erro ao atualizar dados.');
    }
}