import connection from './connection.js';


export async function buscarCarrinhoAtivo(clienteId) {
    let comando = `
        SELECT * FROM carrinho
        WHERE cliente_id = ? AND ativo = TRUE
    `;

    const [linhas] = await connection.query(comando, [clienteId]);

    return linhas[0];
}


export async function criarCarrinho(clienteId) {
    let comando = `
        INSERT INTO carrinho (cliente_id, ativo)
        VALUES (?, TRUE)
    `;

    const [resposta] = await connection.query(comando, [clienteId]);

    return resposta.insertId;
}


export async function adicionarItem(carrinhoId, produtoId, quantidade) {
    let comando = `
        INSERT INTO carrinho_item (carrinho_id, produto_id, quantidade)
        VALUES (?, ?, ?)
    `;

    await connection.query(comando, [carrinhoId, produtoId, quantidade]);
}


export async function buscarItem(carrinhoId, produtoId) {
    let comando = `
        SELECT * FROM carrinho_item
        WHERE carrinho_id = ? AND produto_id = ?
    `;

    const [linhas] = await connection.query(comando, [carrinhoId, produtoId]);

    return linhas[0];
}


export async function atualizarQuantidade(itemId, quantidade) {
    let comando = `
        UPDATE carrinho_item
        SET quantidade = quantidade + ?
        WHERE id = ?
    `;

    await connection.query(comando, [quantidade, itemId]);
}


export async function listarItens(carrinhoId) {
    let comando = `
        SELECT 
            carrinho_item.id,
            carrinho_item.produto_id,
            produto.nome,
            produto.preco,
            carrinho_item.quantidade
        FROM carrinho_item
        INNER JOIN produto ON carrinho_item.produto_id = produto.id
        WHERE carrinho_item.carrinho_id = ?
    `;

    const [linhas] = await connection.query(comando, [carrinhoId]);

    return linhas;
}


export async function removerItem(carrinhoId, produtoId) {
    let comando = `
        DELETE FROM carrinho_item
        WHERE carrinho_id = ? AND produto_id = ?
    `;

    const [resposta] = await connection.query(comando, [carrinhoId, produtoId]);

    return resposta.affectedRows;
}