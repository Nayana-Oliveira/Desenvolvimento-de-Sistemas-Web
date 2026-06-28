import connection from './connection.js';


export async function criarPedido(conn, clienteId, enderecoId, total) {
    let comando = `
        INSERT INTO pedido (cliente_id, endereco_id, status, total)
        VALUES (?, ?, 'REGISTRADO', ?)
    `;

    const [resposta] = await conn.query(comando, [
        clienteId,
        enderecoId,
        total
    ]);

    return resposta.insertId;
}


export async function inserirItensPedido(conn, pedidoId, itens) {
    for (let item of itens) {
        let comando = `
            INSERT INTO pedido_item (pedido_id, produto_id, quantidade, preco)
            VALUES (?, ?, ?, ?)
        `;

        await conn.query(comando, [
            pedidoId,
            item.produto_id,
            item.quantidade,
            item.preco
        ]);
    }
}


export async function limparCarrinho(conn, carrinhoId) {
    let comando = `
        DELETE FROM carrinho_item
        WHERE carrinho_id = ?
    `;

    await conn.query(comando, [carrinhoId]);
}


export async function listarPedidosPorCliente(clienteId) {
    let comando = `
        SELECT 
            pedido.id,
            pedido.data,
            pedido.status,
            pedido.total,
            endereco.rua,
            endereco.numero,
            endereco.bairro,
            endereco.cidade,
            endereco.cep,
            endereco.complemento
        FROM pedido 
        INNER JOIN endereco ON pedido.endereco_id = endereco.id
        WHERE pedido.cliente_id = ?
        ORDER BY pedido.data DESC
    `;

    const [linhas] = await connection.query(comando, [clienteId]);

    return linhas;
}


export async function buscarPedidoPorId(pedidoId, clienteId) {
    let comando = `
        SELECT 
            id,
            data,
            status,
            total
        FROM pedido
        WHERE id = ? AND cliente_id = ?
    `;

    const [linhas] = await connection.query(comando, [pedidoId, clienteId]);

    return linhas[0];
}


export async function listarItensPedido(pedidoId) {
    let comando = `
        SELECT 
            produto.nome AS produto,
            pedido_item.quantidade,
            pedido_item.preco
        FROM pedido_item
        LEFT JOIN produto ON pedido_item.produto_id = produto.id
        WHERE pedido_item.pedido_id = ?
        `;

    const [linhas] = await connection.query(comando, [pedidoId]);

    return linhas;
}



export async function atualizarStatus(conn, pedidoId, status) {
    let comando = `
        UPDATE pedido
        SET status = ?
        WHERE id = ?
    `;

    const [resposta] = await conn.query(comando, [status, pedidoId]);

    return resposta.affectedRows;
}


export async function inserirHistorico(conn, pedidoId, status) {
    let comando = `
        INSERT INTO pedido_status_historico (pedido_id, status, data)
        VALUES (?, ?, NOW())
    `;

    await conn.query(comando, [pedidoId, status]);
}


export async function listarPedidosAdmin() {
    let comando = `
        SELECT 
            pedido.id,
            pedido.data,
            pedido.status,
            pedido.total,
            endereco.rua,
            endereco.numero,
            endereco.bairro,
            endereco.cidade,
            endereco.cep,
            endereco.complemento
        FROM pedido 
        INNER JOIN endereco ON pedido.endereco_id = endereco.id
        WHERE 
            status != 'ENTREGUE'
            OR pedido.data >= NOW() - INTERVAL 2 HOUR
        ORDER BY data DESC
    `;

    const [linhas] = await connection.query(comando);

    return linhas;
}