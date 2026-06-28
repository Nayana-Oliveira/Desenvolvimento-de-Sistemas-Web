import connection from './connection.js';

export async function buscarStatusLoja() {
    let comando = `
        SELECT aberta
        FROM loja
        WHERE id = 1
    `;

    const [linhas] = await connection.query(comando);

    return linhas[0];
}

export async function alterarStatusLoja(status) {
    let comando = `
        UPDATE loja
        SET aberta = ?
        WHERE id = 1
    `;

    const [resposta] = await connection.query(comando, [status]);

    return resposta.affectedRows;
}