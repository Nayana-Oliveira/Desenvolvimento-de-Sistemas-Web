import connection from "./connection.js";

export async function inserir(item) {
  let comando = `
        INSERT INTO ingrediente
        (
            nome,
            quantidade,
            unidade,
            estoque_minimo,
            vencimento
        )
        VALUES (?, ?, ?, ?, ?)
    `;

  const [resposta] = await connection.query(comando, [
    item.nome,
    item.quantidade,
    item.unidade,
    item.estoqueMinimo,
    item.vencimento,
  ]);

  return resposta.insertId;
}

export async function listar() {
  let comando = `
        SELECT *
        FROM ingrediente
    `;

  const [linhas] = await connection.query(comando);

  return linhas;
}

export async function atualizar(id, item) {
  let comando = `
        UPDATE ingrediente
        SET
            nome = ?,
            quantidade = ?,
            unidade = ?,
            estoque_minimo = ?,
            vencimento = ?
        WHERE id = ?
    `;

  const [resposta] = await connection.query(comando, [
    item.nome,
    item.quantidade,
    item.unidade,
    item.estoqueMinimo,
    item.vencimento,
    id,
  ]);

  return resposta.affectedRows;
}

export async function deletar(id) {
  let comando = `
        DELETE FROM ingrediente
        WHERE id = ?
    `;

  const [resposta] = await connection.query(comando, [id]);

  return resposta.affectedRows;
}
