import connection from "./connection.js";

export async function salvarProduto(produto) {
  const comando = `
    INSERT INTO produto (nome, preco, estoque, ativo, cadastro)
      VALUES (?, ?, ?, ?, NOW());
  `

  const [resposta] = await connection.query(comando, [
    produto.nome,
    produto.preco,
    produto.estoque,
    produto.ativo
  ])

  return resposta.insertId;
}


export async function listarProdutos() {
  let comando = `
    select id,
       nome,
       preco,
       estoque,
       ativo,
       cadastro
  from produto;
  `

  const [respostas] = await connection.query(comando);
  return respostas.affectedrows;
}

export async function alterarProduto(id, produto) {
  let comando = `
    update produto
       set nome = ?,
           preco = ?,
           estoque = ?,
           ativo = ?
     where id = ?
  `

  const [resposta] = await connection.query(comando, [
    produto.nome,
    produto.preco,
    produto.estoque,
    produto.ativo,
    id
  ]);
  return resposta.affectedRows;
}


export async function deletarProduto(id) {
  let comando = `
     delete 
       from produto
      where id = ?
  `

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}


export async function buscarProdutoPorId(id) {
  let comando = `
    select id,
       nome,
       preco,
       estoque,
       ativo,
       cadastro
  from produto
  where id = ?;
  `

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}