import connection from "./connection.js";

export async function salvarCliente(cliente) {
  const comando = `
    insert into cliente (nome, cpf, email, telefone, cadastro)
    values (?, ?, ?, ?, now());
  `;

  const [resposta] = await connection.query(comando, [
    cliente.nome,
    cliente.cpf,
    cliente.email,
    cliente.telefone
  ]);

  return resposta.insertId;
}

export async function listarClientes() {
  let comando = `
    select id,
           nome,
           cpf,
           email,
           telefone,
           bloqueadoAte,
           cadastro
      from cliente
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function alterarCliente(id, cliente) {
  let comando = `
    update cliente
       set nome = ?,
           cpf = ?,
           email = ?,
           telefone = ?
     where id = ?
  `;

  const [resposta] = await connection.query(comando, [
    cliente.nome,
    cliente.cpf,
    cliente.email,
    cliente.telefone,
    id
  ]);

  return resposta.affectedRows;
}

export async function deletarCliente(id) {
  let comando = `
     delete from cliente
      where id = ?
  `;

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}

export async function buscarClientePorId(id) {
  let comando = `
    select id,
           nome,
           cpf,
           email,
           telefone,
           bloqueadoAte,
           cadastro
      from cliente
     where id = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}

export async function atualizarBloqueio(id, data) {
  const comando = `
    update cliente
       set bloqueadoAte = ?
     where id = ?
  `;

  await connection.query(comando, [data, id]);
}