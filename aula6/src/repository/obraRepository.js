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

export async function buscarPorIsbn(isbn) {
    let comando = `
        SELECT * FROM obra 
        WHERE isbn = ?
    `;
    let [resposta] = await connection.query(comando, [isbn]);
    return resposta[0];
}

export async function listar() {
    let [resposta] = await connection.query(
        `SELECT * FROM obra WHERE ativo = true`
    );
    return resposta;
}

export async function filtrar(filtros) {
    let comando = `SELECT * FROM obra WHERE ativo = true`;
    let params = [];

    if (filtros.tcomandoitulo) {
        comando += ` AND titulo LIKE ?`;
        params.push(`%${filtros.titulo}%`);
    }

    if (filtros.autor) {
        comando += ` AND autor LIKE ?`;
        params.push(`%${filtros.autor}%`);
    }

    if (filtros.estoqueMinimo) {
        comando += ` AND estoque >= ?`;
        params.push(filtros.estoqueMinimo);
    }

    if (filtros.publicacaoInicio) {
        comando += ` AND anoPublicacao >= ?`;
        params.push(filtros.publicacaoInicio);
    }

    if (filtros.publicacaoFim) {
        comando += ` AND anoPublicacao <= ?`;
        params.push(filtros.publicacaoFim);
    }

    let [resposta] = await connection.query(comando, params);
    return resposta;
}