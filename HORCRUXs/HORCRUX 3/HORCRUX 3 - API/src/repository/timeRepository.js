import connection from './connection.js';

export async function salvarTime(time) {
  const comando = `
    insert into time (nome, sigla, qtd_copas, ranking_fifa, ativo, data_fundacao)
    values (?, ?, ?, ?, ?, ?)
  `;

  const [resposta] = await connection.query(comando, [
    time.nome,
    time.sigla,
    time.qtd_copas,
    time.ranking_fifa,
    time.ativo,
    time.data_fundacao
  ]);

  return resposta.insertId;
}

export async function listarTimes() {
  const comando = `select * from time`;
  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarTimePorId(id) {
  const comando = `select * from time where id = ?`;
  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}

export async function alterarTime(id, time) {
  const comando = `
    update time
       set nome = ?,
           sigla = ?,
           qtd_copas = ?,
           ranking_fifa = ?,
           ativo = ?,
           data_fundacao = ?
     where id = ?
  `;

  const [resposta] = await connection.query(comando, [
    time.nome,
    time.sigla,
    time.qtd_copas,
    time.ranking_fifa,
    time.ativo,
    time.data_fundacao,
    id
  ]);

  return resposta.affectedRows;
}

export async function deletarTime(id) {
  const comando = `delete from time where id = ?`;
  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}