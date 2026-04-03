import connection from './connection.js';

export async function inserir(obra) {
    let comando = `
        INSERT INTO obra (titulo, autor, editora, isbn, anoPublicacao, estoque, ativo, cadastro)
        VALUES (?, ?, ?, ?, ?, ?, true, NOW())
    `;
    let [resposta] = await connection.query(comando, [
        obra.titulo, obra.autor, obra.editora,
        obra.isbn, obra.anoPublicacao, obra.estoque
    ]);
    return resposta.insertId;
}

export async function listar() {
    let [resposta] = await connection.query(`SELECT * FROM obra WHERE ativo = true`);
    return resposta;
}

export async function buscarPorId(id) {
    let [resposta] = await connection.query(`SELECT * FROM obra WHERE id = ?`, [id]);
    return resposta[0];
}

export async function atualizar(id, obra) {
    let comando = `
        UPDATE obra SET titulo=?, autor=?, editora=?, isbn=?, anoPublicacao=?, estoque=?
        WHERE id=?
    `;
    await connection.query(comando, [
        obra.titulo, obra.autor, obra.editora,
        obra.isbn, obra.anoPublicacao, obra.estoque, id
    ]);
}

export async function remover(id) {
    await connection.query(`UPDATE obra SET ativo=false WHERE id=?`, [id]);
}