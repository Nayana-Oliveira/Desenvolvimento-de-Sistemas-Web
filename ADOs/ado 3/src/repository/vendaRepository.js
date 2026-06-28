import connection from "./connection.js";

export async function salvarVenda(venda) {
  const comando = `
    INSERT INTO venda (cliente_id, status, tipoPagamento, parcelas, desconto, frete, total, observacao, cadastro)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW());
  `;

  const [resposta] = await connection.query(comando, [
    venda.cliente_id,
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
    SELECT 
       cliente.id         as cliente_id,
       cliente.nome,
       cliente.cpf,
       cliente.telefone,
       cliente.email,
       cliente.cep,
       cliente.logradouro,
       cliente.numero,
       cliente.complemento,
       cliente.bairro,
       cliente.cidade,
       cliente.estado,
       cliente.cadastro   as cliente_cadastro,
       venda.id           as venda_id,
       venda.status,
       venda.tipoPagamento,
       venda.parcelas,
       venda.desconto,
       venda.frete,
       venda.total,
       venda.observacao,
       venda.cadastro     as venda_cadastro
  FROM venda
  JOIN cliente on venda.cliente_id = cliente.id;
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function alterarVenda(id, venda) {
  let comando = `
    UPDATE venda
       SET cliente_id = ?,
           status = ?,
           tipoPagamento = ?,
           parcelas = ?,
           desconto = ?,
           frete = ?,
           total = ?,
           observacao = ?
     WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [
    venda.cliente_id,
    venda.status,
    venda.tipoPagamento,
    venda.parcelas,
    venda.desconto,
    venda.frete,
    venda.total,
    venda.observacao,
    id
  ]);
  return resposta.affectedRows;
}

export async function deletarVenda(id) {
  let comando = `
     DELETE 
       FROM venda
      WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}

export async function buscarVendaPorId(id) {
  let comando = `
    SELECT id,
       cliente_id,
       status,
       tipoPagamento,
       parcelas,
       desconto,
       frete,
       total,
       observacao,
       cadastro
  FROM venda
  WHERE id = ?;
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}