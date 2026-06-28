import * as pagamentoRepository from '../repository/pagamentoRepository.js';
import connection from '../repository/connection.js';
import * as pedidoRepository from '../repository/pedidoRepository.js';


export async function realizarPagamento(clienteId, pedidoId, tipo) {

    if (!pedidoId || typeof tipo !== 'string') {
        throw new Error('Pedido e tipo são obrigatórios.');
    }

    tipo = String(tipo).toUpperCase();

    if (!['DINHEIRO', 'CARTAO', 'PIX'].includes(tipo)) {
        throw new Error('Tipo inválido.');
    }

    let pedido = await pedidoRepository.buscarPedidoPorId(pedidoId, clienteId);

    if (!pedido) {
        throw new Error('Pedido não encontrado.');
    }

    if (pedido.status !== 'REGISTRADO') {
        throw new Error('Pedido não está disponível para pagamento.');
    }

    if (pedido.total <= 0) {
        throw new Error('Valor do pedido inválido.');
    }

    let pagamentoExistente = await pagamentoRepository.buscarPagamentoPorPedido(pedidoId);

    if (pagamentoExistente) {
        throw new Error('Pedido já pago.');
    }

    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        let pagamentoId = await pagamentoRepository.inserirPagamento(conn, clienteId, pedidoId, tipo, pedido.total);

        let linhas = await pedidoRepository.atualizarStatus(conn, pedidoId, 'PREPARANDO');

        if (linhas === 0) {
            throw new Error('Erro ao atualizar status do pedido.');
        }

        await pedidoRepository.inserirHistorico(conn, pedidoId, 'PREPARANDO');

        await conn.commit();

        return pagamentoId;

    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}
