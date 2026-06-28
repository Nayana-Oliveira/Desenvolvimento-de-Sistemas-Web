import connection from "./connection.js";

export async function salvarCliente(cliente) {
  const comando = `
    INSERT INTO cliente (nome, cpf, telefone, email, cep, logradouro, numero, complemento, bairro, cidade, estado, cadastro)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());
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
    SELECT id,
       nome,
       cpf,
       telefone,
       email,
       cep,
       logradouro,
       numero,
       complemento,
       bairro,
       cidade,
       estado,
       cadastro
  FROM cliente;
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
           email = ?,
           cep = ?,
           logradouro = ?,
           numero = ?,
           complemento = ?,
           bairro = ?,
           cidade = ?,
           estado = ?
     WHERE id = ?
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
    cliente.estado,
    id
  ]);
  return resposta.affectedRows;
}

export async function deletarCliente(id) {
  let comando = `
     DELETE 
       from cliente
      WHERE id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}

export async function buscarClientePorId(id) {
  let comando = `
    SELECT id,
       nome,
       cpf,
       telefone,
       email,
       cep,
       logradouro,
       numero,
       complemento,
       bairro,
       cidade,
       estado,
       cadastro
  FROM cliente
  WHERE id = ?;
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}