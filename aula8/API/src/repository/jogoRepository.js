import connection from './connection.js';

export async function salvarJogo(jogo) {
  const comando = `
    insert into jogo 
    (id_time_mandante, id_time_visitante, nr_gols_mandante, nr_gols_visitante, publico_pagante, renda_total, realizado, data_jogo)
    values (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [resposta] = await connection.query(comando, [
    jogo.id_time_mandante,
    jogo.id_time_visitante,
    jogo.nr_gols_mandante,
    jogo.nr_gols_visitante,
    jogo.publico_pagante,
    jogo.renda_total,
    jogo.realizado,
    jogo.data_jogo
  ]);

  return resposta.insertId;
}

export async function listarJogos() {
  const comando = `
    select 
      j.id,
      t1.nome as mandante,
      t2.nome as visitante,
      j.nr_gols_mandante,
      j.nr_gols_visitante,
      j.publico_pagante,
      j.renda_total,
      j.data_jogo
    from jogo j
    join time t1 on j.id_time_mandante = t1.id
    join time t2 on j.id_time_visitante = t2.id
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}

export async function buscarJogoPorId(id) {
  const comando = `
    select *
    from jogo
    where id = ?
  `;

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}

export async function alterarJogo(id, jogo) {
  const comando = `
    update jogo
       set id_time_mandante = ?,
           id_time_visitante = ?,
           nr_gols_mandante = ?,
           nr_gols_visitante = ?,
           publico_pagante = ?,
           renda_total = ?,
           realizado = ?,
           data_jogo = ?
     where id = ?
  `;

  const [resposta] = await connection.query(comando, [
    jogo.id_time_mandante,
    jogo.id_time_visitante,
    jogo.nr_gols_mandante,
    jogo.nr_gols_visitante,
    jogo.publico_pagante,
    jogo.renda_total,
    jogo.realizado,
    jogo.data_jogo,
    id
  ]);

  return resposta.affectedRows;
}

export async function deletarJogo(id) {
  const comando = `delete from jogo where id = ?`;
  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}