import connection from './connection.js';

export async function salvarObra(obra) {
  const comando = `
    insert into obra (titulo, autor, editora, isbn, anoPublicacao, estoque, ativo, cadastro)
    values (?, ?, ?, ?, ?, ?, true, now())
  `;

  const [res] = await connection.query(comando, [
    obra.titulo,
    obra.autor,
    obra.editora,
    obra.isbn,
    obra.anoPublicacao,
    obra.estoque
  ]);

  return res.insertId;
}

export async function listarObras() {
  const comando = `
    select * from obra where ativo = true
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarObraPorId(id) {
  const comando = `
    select * from obra where id = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}

export async function alterarObra(id, obra) {
  const comando = `
    update obra
       set titulo = ?, autor = ?, editora = ?, isbn = ?, anoPublicacao = ?, estoque = ?
     where id = ?
  `;

  const [res] = await connection.query(comando, [
    obra.titulo,
    obra.autor,
    obra.editora,
    obra.isbn,
    obra.anoPublicacao,
    obra.estoque,
    id
  ]);

  return res.affectedRows;
}

export async function deletarObra(id) {
  const comando = `
    update obra
       set ativo = false
    where id = ?
  `;

  const [res] = await connection.query(comando, [id]);
  return res.affectedRows;
}

export async function incrementarEstoque(id, novoValor) {
  const comando = `
    update obra
       set estoque = estoque + ?
     where id = ?
  `

  await connection.query(comando, [novoValor, id]);
}