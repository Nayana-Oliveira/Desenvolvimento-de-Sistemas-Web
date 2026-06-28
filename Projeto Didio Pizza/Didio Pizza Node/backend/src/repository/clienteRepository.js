import connection from './connection.js';


export async function criarConta(cliente) {
    let comando = `
        INSERT INTO cliente (nome, email, telefone, senha)
        VALUES (?, ?, ?, MD5(?))
    `;

    const [resposta] = await connection.query(comando, [
        cliente.nome,
        cliente.email,
        cliente.telefone,
        cliente.senha
    ]);

    return resposta.insertId;
}


export async function login(email, senha) {
    let comando = `
        SELECT id, nome, email
        FROM cliente
        WHERE email = ? AND senha = MD5(?)
    `;

    const [linhas] = await connection.query(comando, [email, senha]);

    return linhas[0];
}


export async function buscarPorEmail(email) {
    let comando = `
        SELECT * FROM cliente
        WHERE email = ?
    `;

    const [linhas] = await connection.query(comando, [email]);

    return linhas[0];
}


export async function buscarPerfilCompleto(clienteId) {
    let comando = `
        SELECT
            cliente.nome,
            cliente.email,
            cliente.telefone,
            endereco.rua,
            endereco.numero,
            endereco.bairro,
            endereco.cidade,
            endereco.cep,
            endereco.complemento

        FROM cliente
        LEFT JOIN endereco ON endereco.cliente_id = cliente.id
        WHERE cliente.id = ?
    `;

    const [linhas] = await connection.query(comando, [clienteId]);

    return linhas[0];
}


export async function atualizarCliente(clienteId, nome, email, telefone) {
    let comando = `
        UPDATE cliente
        SET nome = ?, email = ?, telefone = ?
        WHERE id = ?
    `;

    const [resposta] = await connection.query(comando, [
        nome,
        email,
        telefone,
        clienteId
    ]);

    return resposta.affectedRows;
}