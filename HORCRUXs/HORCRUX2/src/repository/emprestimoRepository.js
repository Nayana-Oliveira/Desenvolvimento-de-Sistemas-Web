import connection from './connection.js';

export async function buscarCliente(id) {
    let [resposta] = await connection.query(`SELECT * FROM cliente WHERE id=?`, [id]);
    return resposta[0];
}

export async function buscarObra(id) {
    let [resposta] = await connection.query(`SELECT * FROM obra WHERE id=?`, [id]);
    return resposta[0];
}

export async function inserir(emp) {
    let comando = `
        INSERT INTO emprestimo (cliente_id, obra_id, dataRetirada, dataPrevista, status, cadastro)
        VALUES (?, ?, ?, ?, 'em_andamento', NOW())
    `;
    let [resposta] = await connection.query(comando, [
        emp.cliente_id, 
        emp.obra_id, 
        emp.dataRetirada,
        emp.dataPrevista
    ]);
    return resposta.insertId;
}

export async function diminuirEstoque(id) {
    await connection.query(`UPDATE obra SET estoque = estoque - 1 WHERE id=?`, [id]);
}

export async function aumentarEstoque(id) {
    await connection.query(`UPDATE obra SET estoque = estoque + 1 WHERE id=?`, [id]);
}

export async function listar() {
    let [resposta] = await connection.query(`
        SELECT e.*, c.nome cliente, o.titulo obra
        FROM emprestimo e
        INNER JOIN cliente c ON e.cliente_id = c.id
        INNER JOIN obra o ON e.obra_id = o.id
    `);
    return resposta;
}

export async function buscar(id) {
    let [resposta] = await connection.query(`SELECT * FROM emprestimo WHERE id=?`, [id]);
    return resposta[0];
}

export async function atualizarDevolucao(id, dados) {
    let comando = `
        UPDATE emprestimo
        SET dataDevolucao=?, diasAtraso=?, status=?, observacao=?
        WHERE id=?
    `;
    await connection.query(comando, [
        dados.dataDevolucao, 
        dados.diasAtraso,
        dados.status, 
        dados.observacao, 
        id
    ]);
}