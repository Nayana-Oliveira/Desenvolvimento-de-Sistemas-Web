import connection from "./connection.js";

export async function salvarVendaItem(vendaItem) {
  const comando = `
    INSERT INTO vendaItem (produto_id, venda_id, quantidade, preco)
      VALUES (?, ?, ?, ?);
  `;

  const [resposta] = await connection.query(comando, [
    vendaItem.produto_id,
    vendaItem.venda_id,
    vendaItem.quantidade,
    vendaItem.preco
  ]);

  return resposta.insertId;
}

export async function listarVendaItens() {
  let comando = `
    SELECT id,
       produto_id,
       venda_id,
       quantidade,
       preco
  FROM vendaItem;
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function alterarVendaItem(id, vendaItem) {
  let comando = `
    UPDATE vendaItem
       SET produto_id = ?,
           venda_id = ?,
           quantidade = ?,
           preco = ?
     WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [
    vendaItem.produto_id,
    vendaItem.venda_id,
    vendaItem.quantidade,
    vendaItem.preco,
    id
  ]);
  return resposta.affectedRows;
}

export async function deletarVendaItem(id) {
  let comando = `
     DELETE 
       from vendaItem
      WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}

export async function buscarVendaItemPorId(id) {
  let comando = `
    SELECT id,
       produto_id,
       venda_id,
       quantidade,
       preco
  FROM vendaItem
  WHERE id = ?;
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}