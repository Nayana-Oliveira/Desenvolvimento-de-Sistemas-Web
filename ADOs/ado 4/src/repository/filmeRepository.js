import connection from "./connection.js";

export async function adicionarFilme(filme) {
    const comando = `
    INSERT INTO filme 
    (titulo, anoLancamento, duracao, sinopse, classificacao, ativo, cadastro) 
    VALUES (?, ?, ?, ?, ?, ?, NOW());
    `;

    const [resposta] = await connection.query(comando, [
        filme.titulo,
        filme.anoLancamento,
        filme.duracao,
        filme.sinopse,
        filme.classificacao,
        filme.ativo
    ]);

    return resposta.insertId;
}

export async function mostrarFilme() {
    const comando = `
    SELECT * FROM filme;
    `;

    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function alterarFilme(id, filme) {
    const comando = `
    UPDATE filme SET
        titulo = ?,
        anoLancamento = ?,
        duracao = ?,
        sinopse = ?,
        classificacao = ?,
        ativo = ?
    WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [
        filme.titulo,
        filme.anoLancamento,
        filme.duracao,
        filme.sinopse,
        filme.classificacao,
        filme.ativo,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarFilme(id) {
    const comando = `
    DELETE FROM filme WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [id]);
    return resposta.affectedRows;
}

export async function buscarPorId(id) {
    const comando = `
    SELECT * FROM filme WHERE id = ?;
    `;

    const [linhas] = await connection.query(comando, [id]);
    return linhas[0];
}