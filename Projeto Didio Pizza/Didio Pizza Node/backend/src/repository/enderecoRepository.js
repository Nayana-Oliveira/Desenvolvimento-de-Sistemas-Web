import connection from './connection.js';


export async function inserirEndereco(clienteId, endereco) {
    let comando = `
        INSERT INTO endereco (cliente_id, rua, numero, bairro, cidade, cep, complemento)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [resposta] = await connection.query(comando, [
        clienteId,
        endereco.rua,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.cep,
        endereco.complemento
    ]);

    return resposta.insertId;
}


export async function listarEnderecos(clienteId) {
    let comando = `
        SELECT * FROM endereco
        WHERE cliente_id = ?
    `;

    const [linhas] = await connection.query(comando, [clienteId]);

    return linhas;
}


export async function buscarEnderecoPorId(clienteId, enderecoId) {
    let comando = `
        SELECT * FROM endereco
        WHERE id = ? AND cliente_id = ?
    `;

    const [linhas] = await connection.query(comando, [enderecoId, clienteId]);

    return linhas[0];
}


export async function atualizarEndereco(clienteId, enderecoId, endereco) {
    let comando = `
        UPDATE endereco
        SET rua = ?, numero = ?, bairro = ?, cidade = ?, cep = ?, complemento = ?
        WHERE id = ? AND cliente_id = ?
    `;

    const [resposta] = await connection.query(comando, [
        endereco.rua,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.cep,
        endereco.complemento,
        enderecoId,
        clienteId
    ]);

    return resposta.affectedRows;
}


export async function deletarEndereco(clienteId, enderecoId) {
    let comando = `
        DELETE FROM endereco
        WHERE id = ? AND cliente_id = ?
    `;

    const [resposta] = await connection.query(comando, [enderecoId, clienteId]);

    return resposta.affectedRows;
}