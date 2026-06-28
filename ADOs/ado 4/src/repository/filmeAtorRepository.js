import connection from "./connection.js";

export async function salvarFilmeAtor(filmeAtor) {
    const comando = `
    INSERT INTO filmeAtor (filme_id, ator_id, personagem, protagonista)
    VALUES (?, ?, ?, ?);
    `;

    const [resposta] = await connection.query(comando, [
        filmeAtor.filme_id,
        filmeAtor.ator_id,
        filmeAtor.personagem,
        filmeAtor.protagonista
    ]);

    return resposta.insertId;
}

export async function mostrarFilmeAtor() {
    const comando = `
    SELECT * FROM filmeAtor;
    `;

    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function alterarFilmeAtor(id, filmeAtor) {
    const comando = `
    UPDATE filmeAtor SET
        filme_id = ?,
        ator_id = ?,
        personagem = ?,
        protagonista = ?
    WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [
        filmeAtor.filme_id,
        filmeAtor.ator_id,
        filmeAtor.personagem,
        filmeAtor.protagonista,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarFilmeAtor(id) {
    const comando = `
    DELETE FROM filmeAtor WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [id]);
    return resposta.affectedRows;
}

export async function buscarPorId(id) {
    const comando = `
    SELECT * FROM filmeAtor WHERE id = ?;
    `;

    const [linhas] = await connection.query(comando, [id]);
    return linhas[0];
}