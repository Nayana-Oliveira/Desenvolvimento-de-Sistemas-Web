import * as service from '../services/vendaitemService.js';
import { Router } from "express";

const endpoints = Router();

endpoints.get('/vendaitem', async (req, resp) => {
    let linhas = await service.listarItens();
    resp.send(linhas);
});

endpoints.get('/vendaitem/:id', async (req, resp) => {

  let id = Number(req.params.id);

  let linha = await service.buscarItemPorId(id);

  if (!linha) {
    resp.status(404).send({ erro: 'Item não encontrado!' });
  }
  else {
    resp.send(linha);
  }
});

endpoints.post('/vendaitem', async (req, resp) => {

  let item = req.body;

  let id = await service.adicionarItem(item);

  resp.send({ id });
});

endpoints.put('/vendaitem/:id', async (req, resp) => {

  let id = Number(req.params.id);
  let item = req.body;

  let linhas = await service.alterarItem(id, item);

  if (linhas == 0) {
    resp.status(404).send({ erro: 'Item não encontrado!' });
  }
  else {
    resp.send();
  }
});

endpoints.delete('/vendaitem/:id', async (req, resp) => {

  let id = Number(req.params.id);

  let linhas = await service.deletarItem(id);

  if (linhas == 0) {
    resp.status(404).send({ erro: 'Item não encontrado!' });
  }
  else {
    resp.send({ linhas });
  }
});

export default endpoints;