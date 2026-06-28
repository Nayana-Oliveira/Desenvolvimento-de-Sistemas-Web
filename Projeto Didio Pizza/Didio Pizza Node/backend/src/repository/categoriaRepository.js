import connection from "./connection.js";


export async function listarCategorias() {
    let comando = `
    SELECT * FROM categoria
    `

    const [linhas] = await connection.query(comando);

    return linhas;
}