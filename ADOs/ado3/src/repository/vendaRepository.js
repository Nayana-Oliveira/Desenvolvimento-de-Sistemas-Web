import connection from "./connection.js";

export async function salvarVenda(venda) {

  let comando = `
    INSERT INTO venda
      (cliente, status, tipoPagamento, parcelas,
       desconto, frete, total, observacao, cadastro)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const [resposta] = await connection.query(comando, [
    venda.cliente,
    venda.status,
    venda.tipoPagamento,
    venda.parcelas,
    venda.desconto,
    venda.frete,
    venda.total,
    venda.observacao
  ]);

  return resposta.insertId;
}

export async function listarVendas() {

  let comando = `
    SELECT *
      FROM venda
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function alterarVenda(id, venda) {

  let comando = `
    UPDATE venda
       SET status = ?,
           total = ?
     WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [
    venda.status,
    venda.total,
    id
  ]);

  return resposta.affectedRows;
}

export async function deletarVenda(id) {

  let comando = `
     DELETE FROM venda
      WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}

export async function buscarVendaPorId(id) {

  let comando = `
    SELECT *
      FROM venda
     WHERE id = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}