import * as service from '../services/produtoService.js';
import { Router } from "express";
const endpoints = Router();


endpoints.get('/produto', async (req, resp) => {
  let linhas = await service.listarProdutos();
  resp.send(linhas);
})

endpoints.post('/produto', async (req, resp) => {
  let produto = req.body;
  let id = await service.adicionarProduto(produto);
  
  resp.send({
    id: id
  })
})

export default endpoints;