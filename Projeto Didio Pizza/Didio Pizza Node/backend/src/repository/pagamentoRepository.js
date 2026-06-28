import connection from './connection.js';


export async function inserirPagamento(conn, clienteId, pedidoId, tipo, valor) {
    let comando = `
        INSERT INTO pagamento (cliente_id, pedido_id, tipo, status, valor)
        VALUES (?, ?, ?, 'PAGO', ?)
    `;

    const [resposta] = await conn.query(comando, [
        clienteId,
        pedidoId,
        tipo,
        valor
    ]);

    return resposta.insertId;
}


export async function buscarPagamentoPorPedido(pedidoId) {
    let comando = `
        SELECT * FROM pagamento
        WHERE pedido_id = ?
    `;

    const [linhas] = await connection.query(comando, [pedidoId]);

    return linhas[0];
}