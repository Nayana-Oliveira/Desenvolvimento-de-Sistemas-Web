import * as service from '../services/vendaService.js';
import { Router } from "express";

const endpoints = Router();

endpoints.get('/venda', async (req, resp) => {
  let linhas = await service.listarVenda();
  resp.send(linhas);
});

endpoints.get('/venda/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linha = await service.buscarVendaPorId(id);

  if (!linha) {
    resp.status(404).send({ erro: 'Venda não encontrada!' });
  }
  else {
    resp.send(linha);
  }
});

endpoints.post('/venda', async (req, resp) => {

  let venda = req.body;

  let id = await service.adicionarVenda(venda);

  resp.send({ id });
});

endpoints.put('/venda/:id', async (req, resp) => {

  let id = Number(req.params.id);
  let venda = req.body;

  let linhas = await service.alterarVenda(id, venda);

  if (linhas == 0) {
    resp.status(404).send({ erro: 'Venda não encontrada!' });
  }
  else {
    resp.send();
  }
});

endpoints.delete('/venda/:id', async (req, resp) => {

  let id = Number(req.params.id);

  let linhas = await service.deletarVenda(id);

  if (linhas == 0) {
    resp.status(404).send({ erro: 'Venda não encontrada!' });
  }
  else {
    resp.send({ linhas });
  }
});

export default endpoints;