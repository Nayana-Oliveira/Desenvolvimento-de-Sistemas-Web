import connection from "./connection.js";

export async function salvarItem(item) {

  let comando = `
    INSERT INTO vendaitem
      (venda, produto, quantidade, preco)
    VALUES (?, ?, ?, ?)
  `;

  const [resposta] = await connection.query(comando, [
    item.venda,
    item.produto,
    item.quantidade,
    item.preco
  ]);

  return resposta.insertId;
}

export async function listarItens() {

  let comando = `
    SELECT id,
           venda,
           produto,
           quantidade,
           preco
      FROM vendaitem
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}


export async function alterarItem(id, item) {

  let comando = `
    UPDATE vendaitem
       SET venda = ?,
           produto = ?,
           quantidade = ?,
           preco = ?
     WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [
    item.venda,
    item.produto,
    item.quantidade,
    item.preco,
    id
  ]);

  return resposta.affectedRows;
}


export async function deletarItem(id) {

  let comando = `
     DELETE FROM vendaitem
      WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}


export async function buscarItemPorId(id) {

  let comando = `
    SELECT id,
           venda,
           produto,
           quantidade,
           preco
      FROM vendaitem
     WHERE id = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}