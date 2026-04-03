import express from 'express';
const api = express();        

api.use(express.json());     

let produtos = [
  { id: 1, nome: 'Caderno', preco: 15, categoria: 'papelaria', estoque: 10 },
  { id: 2, nome: 'Caneta', preco: 5, categoria: 'papelaria', estoque: 50 },
  { id: 3, nome: 'Mochila', preco: 120, categoria: 'acessorios', estoque: 5 },
  { id: 4, nome: 'Lápis', preco: 3, categoria: 'papelaria', estoque: 100 }
];

api.get('/produtos/:id', (req, resp) => {

  let id = Number(req.params.id);

  let produto = produtos.find(p => p.id === id);

  resp.send(produto);
});


api.get('/produtos', (req, resp) => {

  let { categoria } = req.query;

  let resultado = produtos.filter(p => p.categoria === categoria);

  resp.send(resultado);
});

api.post('/produtos/reajuste', (req, resp) => {

  let { percentual } = req.body;

  let novosProdutos = produtos.map(p => {
    return {
      ...p, // copia todas as propriedades do produto
      preco: p.preco + (p.preco * percentual / 100) // reajuste do preço
    };
  });

  resp.send(novosProdutos);
});

api.get('/produtos/nomes', (req, resp) => {

  let { categoria } = req.query;

  let nomes = produtos
    .filter(p => p.categoria === categoria) 
    .map(p => p.nome); 

  resp.send(nomes);
});

api.get('/produtos/total-estoque', (req, resp) => {

  let total = produtos.reduce((soma, p) => {

    return soma + (p.preco * p.estoque);

  }, 0); 

  resp.send({ total });
});

api.post('/produto/buscar', (req, resp) => {

  let { id } = req.body;

  let produto = produtos.find(p => p.id === id);

  resp.send(produto);
});

api.get('/estoque/:categoria', (req, resp) => {

  let categoria = req.params.categoria;

  let total = produtos
    .filter(p => p.categoria === categoria) 
    .reduce((soma, p) => soma + p.estoque, 0); 

  resp.send({ categoria, total });
});

api.listen(3000, () => {
  console.log('API rodando na porta 3000');
});