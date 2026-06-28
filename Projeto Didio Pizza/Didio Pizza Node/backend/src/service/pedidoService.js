import * as carrinhoRepository from '../repository/carrinhoRepository.js';
import * as pedidoRepository from '../repository/pedidoRepository.js';
import * as enderecoRepository from '../repository/enderecoRepository.js';
import * as lojaService from './lojaService.js';
import connection from '../repository/connection.js';


export async function fecharPedido(clienteId, enderecoId) {

    await lojaService.verificarLojaAberta();

    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        let endereco = await enderecoRepository.buscarEnderecoPorId(clienteId, enderecoId);

        if (!endereco) {
            throw new Error('Endereço não encontrado.');
        }

        let carrinho = await carrinhoRepository.buscarCarrinhoAtivo(clienteId);

        if (!carrinho) {
            throw new Error('Carrinho vazio.');
        }

        let itens = await carrinhoRepository.listarItens(carrinho.id);

        if (itens.length == 0) {
            throw new Error('Carrinho sem itens.');
        }

        let total = 0;

        for (let item of itens) {
            total += item.preco * item.quantidade;
        }

        let pedidoId = await pedidoRepository.criarPedido(conn, clienteId, enderecoId, total);

        await pedidoRepository.inserirHistorico(conn, pedidoId, 'REGISTRADO');

        await pedidoRepository.inserirItensPedido(conn, pedidoId, itens);

        await pedidoRepository.limparCarrinho(conn, carrinho.id);

        await conn.commit();

        return pedidoId;

    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}


export async function listarPedidos(clienteId) {

    let pedidos = await pedidoRepository.listarPedidosPorCliente(clienteId);
    return pedidos;
}


export async function detalharPedido(clienteId, pedidoId) {

    let pedido = await pedidoRepository.buscarPedidoPorId(pedidoId, clienteId);

    if (!pedido) {
        throw new Error('Pedido não encontrado.');
    }

    let itens = await pedidoRepository.listarItensPedido(pedidoId);

    pedido.itens = itens;

    return pedido;
}


export async function atualizarStatusPedido(pedidoId, status) {

    const statusValidos = ['REGISTRADO', 'PREPARANDO', 'EM_ROTA', 'ENTREGUE'];
    status = String(status).toUpperCase();

    if (!statusValidos.includes(status)) {
        throw new Error('Status inválido.');
    }

    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        let linhas = await pedidoRepository.atualizarStatus(conn, pedidoId, status);

        if (linhas === 0) {
            throw new Error('Pedido não encontrado.');
        }

        await pedidoRepository.inserirHistorico(conn, pedidoId, status);

        await conn.commit();

    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}


export async function listarPedidosAdmin() {

    let pedidos = await pedidoRepository.listarPedidosAdmin();

    return pedidos;
}