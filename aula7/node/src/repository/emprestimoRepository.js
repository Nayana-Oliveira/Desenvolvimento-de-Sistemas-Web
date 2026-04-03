import connection from './connection.js';

export async function salvarEmprestimo(emp) {
  const comando = `
    insert into emprestimo (cliente_id, obra_id, dataRetirada, dataPrevista, status, cadastro)
    values (?, ?, ?, ?, 'em_andamento', now())
  `;

  const [res] = await connection.query(comando, [
    emp.cliente_id,
    emp.obra_id,
    emp.dataRetirada,
    emp.dataPrevista
  ]);

  return res.insertId;
}

export async function listarEmprestimos(status) {
  let comando = `
    select e.*, c.nome cliente, o.titulo obra
      from emprestimo   e
      join cliente      c on c.id = e.cliente_id
      join obra         o on o.id = e.obra_id
     where e.status     like ?
  `;

  const [linhas] = await connection.query(comando, [`%${status??''}%`]);
  return linhas;
}

export async function buscarEmprestimoPorId(id) {
  const [linhas] = await connection.query(
    'select * from emprestimo where id = ?',
    [id]
  );
  return linhas[0];
}

export async function devolverEmprestimo(id, atraso, status, dados) {
  const comando = `
    update emprestimo
       set dataDevolucao = ?,
           diasAtraso = ?,
           status = ?,
           observacao = ?
     where id = ?
  `;

  const [res] = await connection.query(comando, [
    dados.dataDevolucao,
    atraso,
    status,
    dados.observacao,
    id
  ]);

  return res.affectedRows;
}