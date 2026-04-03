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

  const [linhas] = await connection.query(comando);
  return linhas;
}