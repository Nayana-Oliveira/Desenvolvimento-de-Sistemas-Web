import connection from "./connection.js";

export async function salvarCliente(cliente) {

  let comando = `
    INSERT INTO cliente
      (nome, cpf, telefone, email, cep, logradouro, numero,
       complemento, bairro, cidade, estado, cadastro)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  const [resposta] = await connection.query(comando, [
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
    cliente.estado
  ]);

  return resposta.insertId;
}

export async function listarClientes() {

  let comando = `
    SELECT *
      FROM cliente
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function alterarCliente(id, cliente) {

  let comando = `
    UPDATE cliente
       SET nome = ?,
           cpf = ?,
           telefone = ?,
           email = ?
     WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [
    cliente.nome,
    cliente.cpf,
    cliente.telefone,
    cliente.email,
    id
  ]);

  return resposta.affectedRows;
}

export async function deletarCliente(id) {

  let comando = `
     DELETE FROM cliente
      WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}

export async function buscarClientePorId(id) {

  let comando = `
    SELECT *
      FROM cliente
     WHERE id = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}