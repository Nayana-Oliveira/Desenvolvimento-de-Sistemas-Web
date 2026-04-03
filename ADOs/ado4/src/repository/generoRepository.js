import connection from "./connection.js";

export async function adicionarGenero(genero) {
    const comando = `
    INSERT INTO genero (nome, ativo, cadastro) VALUES (?, ?, NOW());
    `;

    const [resposta] = await connection.query(comando, [
        genero.nome,
        genero.ativo,
    ]);

    return resposta.insertId;
}

export async function mostrarGeneros() {
    let comando = `
    SELECT * FROM genero 
    `;

    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function alterarGeneros(id, genero) {
    let comando = `
    UPDATE genero SET 
        nome = ?,
        ativo = ?
    WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [
        genero.nome,
        genero.ativo,
        id
    ]);

    return resposta.affectedRows;
}

export async function deletarGenero(id) {
    let comando = `
    DELETE FROM genero WHERE id = ?;
    `;

    const [resposta] = await connection.query(comando, [id]);
    return resposta.affectedRows;
}

export async function buscarPorId(id) {
    let comando = `
    SELECT id, nome, ativo FROM genero WHERE id = ?;
    `;

    const [linhas] = await connection.query(comando, [id]);
    return linhas[0];
}