import connection from "./connection.js";

export async function adicionarGeneroFilme(generoFilme) {
    const comando = `
    INSERT INTO filmeGenero (filme_id, genero_id)
    VALUES (?, ?);
    `;

    const [resposta] = await connection.query(comando, [
        generoFilme.filme_id,
        generoFilme.genero_id
    ]);

    return resposta.insertId;
}

export async function listarGeneroFilme() {
    const comando = `
    SELECT * FROM filmeGenero;
    `;

    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function alterarGeneroFilme(id, generoFilme) {
    const comando = `
    UPDATE filmeGenero 
    SET filme_id = ?, genero_id = ?
    WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [
        generoFilme.filme_id,
        generoFilme.genero_id,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarGeneroFilme(id) {
    const comando = `
    DELETE FROM filmeGenero WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [id]);
    return resposta.affectedRows;
}

export async function buscarPorId(id) {
    const comando = `
    SELECT * FROM filmeGenero WHERE id = ?;
    `;

    const [linhas] = await connection.query(comando, [id]);
    return linhas[0];
}