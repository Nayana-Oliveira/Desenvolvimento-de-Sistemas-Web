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
    SELECT id,
       nome,
       preco,
       estoque,
       ativo,
       cadastro
  FROM produto;
  `

  const [linhas] = await connection.query(comando);
  return linhas;
}


export async function alterarProduto(id, produto) {
  let comando = `
    UPDATE produto
       SET nome = ?,
           preco = ?,
           estoque = ?,
           ativo = ?
     WHERE id = ?
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
     DELETE 
       from produto
      WHERE id = ?
  `

  const [resposta] = await connection.query(comando, [id]);
  return resposta.affectedRows;
}


export async function buscarProdutoPorId(id) {
  let comando = `
    SELECT id,
       nome,
       preco,
       estoque,
       ativo,
       cadastro
  FROM produto
  WHERE id = ?;
  `

  const [linhas] = await connection.query(comando, [id]);
  return linhas[0];
}