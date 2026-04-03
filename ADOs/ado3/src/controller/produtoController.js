import * as service from '../services/produtoService.js';
import { Router } from "express";

const endpoints = Router();

endpoints.get('/produto', async (req, resp) => {
  let linhas = await service.listarProdutos();
  resp.send(linhas);
});

endpoints.post('/produto', async (req, resp) => {
  let produto = req.body;

  let id = await service.adicionarProduto(produto);

  resp.send({
    id: id
  });
});

endpoints.put('/produto/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let produto = req.body;

  let linhasAfetadas = await service.alterarProduto(id, produto);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: 'Produto não encontrado!'
    })
  }
  else {
    resp.send();
  }
})

endpoints.delete('/produto/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linhasAfetadas = await service.deletarProduto(id);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: 'Produto não encontrado!'
    })
  }
  else {
    resp.send({
      linhasAfetadas
    });
  }
})

endpoints.get('/produto/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let linha = await service.buscarProdutoPorId(id);

  if (!linha) {
    resp.status(404).send({
      erro: 'Produto não encontrado!'
    })
  }
  else {
    resp.send(linha);
  }
})

export default endpoints;