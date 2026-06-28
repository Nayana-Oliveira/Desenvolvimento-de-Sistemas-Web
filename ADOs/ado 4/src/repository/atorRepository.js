import connection from "./connection.js";

export async function adicionarAtor(ator) {
    const comando = `
    INSERT INTO ator (nome, dataNascimento, nacionalidade)
    VALUES (?, ?, ?);
    `;

    const [resposta] = await connection.query(comando, [
        ator.nome,
        ator.dataNascimento,
        ator.nacionalidade
    ]);

    return resposta.insertId;
}

export async function listarAtor() {
    const comando = `
    SELECT * FROM ator;
    `;

    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function alterarAtor(id, ator) {
    const comando = `
    UPDATE ator SET
        nome = ?,
        dataNascimento = ?,
        nacionalidade = ?
    WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [
        ator.nome,
        ator.dataNascimento,
        ator.nacionalidade,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarAtor(id) {
    const comando = `
    DELETE FROM ator WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [id]);
    return resposta.affectedRows;
}

export async function buscarPorId(id) {
    const comando = `
    SELECT * FROM ator WHERE id = ?;
    `;

    const [linhas] = await connection.query(comando, [id]);
    return linhas[0];
}