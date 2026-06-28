import connection from './connection.js';


export async function inserir(item) {
    let comando = `
        INSERT INTO estoque (nome, quantidade, unidade)
        VALUES (?, ?, ?)
    `;

    const [resposta] = await connection.query(comando, [
        item.nome,
        item.quantidade,
        item.unidade
    ]);

    return resposta.insertId;
}


export async function listar() {
    let comando = `
        SELECT * FROM estoque
    `;

    const [linhas] = await connection.query(comando);
    return linhas;
}


export async function atualizar(id, item) {
    let comando = `
        UPDATE estoque
        SET nome = ?, quantidade = ?, unidade = ?
        WHERE id = ?
    `;

    const [resposta] = await connection.query(comando, [
        item.nome,
        item.quantidade,
        item.unidade,
        id
    ]);

    return resposta.affectedRows;
}


export async function deletar(id) {
    let comando = `
        DELETE FROM estoque
        WHERE id = ?
    `;

    const [resposta] = await connection.query(comando, [id]);
    return resposta.affectedRows;
}