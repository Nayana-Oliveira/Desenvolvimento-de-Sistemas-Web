import connection from './connection.js';

export async function inserir(cliente) {
    let comando = `
        INSERT INTO cliente (nome, cpf, email, telefone, cadastro)
        VALUES (?, ?, ?, ?, NOW())
    `;
    let [resposta] = await connection.query(comando, [
        cliente.nome, 
        cliente.cpf, 
        cliente.email, 
        cliente.telefone
    ]);
    return resposta.insertId;
}

export async function listar() {
    let [resposta] = await connection.query(`SELECT * FROM cliente`);
    return resposta;
}

export async function filtrarPorNome(nome) {
    let comando = `
        SELECT * FROM cliente
        WHERE nome LIKE ?
    `;
    let [resposta] = await connection.query(comando, [`%${nome}%`]);
    return resposta;
}

export async function buscar(id) {
    let [resposta] = await connection.query(
        `SELECT * FROM cliente WHERE id=?`, 
        [id]
    );
    return resposta[0];
}

export async function atualizar(id, cliente) {
    let comando = `
        UPDATE cliente 
        SET nome=?, cpf=?, email=?, telefone=?, bloqueadoAte=?
        WHERE id=?
    `;
    await connection.query(comando, [
        cliente.nome, 
        cliente.cpf, 
        cliente.email,
        cliente.telefone, 
        cliente.bloqueadoAte, 
        id
    ]);
}

export async function remover(id) {
    await connection.query(`DELETE FROM cliente WHERE id=?`, [id]);
}

export async function buscarPorCpfOuEmail(cpf, email) {
    let comando = `
        SELECT * FROM cliente
        WHERE cpf = ? OR email = ?
    `;
    let [resposta] = await connection.query(comando, [cpf, email]);
    return resposta;
}