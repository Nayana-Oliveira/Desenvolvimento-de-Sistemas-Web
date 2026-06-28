import * as service from '../services/vendaItemService.js';
import { Router } from "express";
const endpoints = Router();

endpoints.get('/vendaItem', async (req, resp) => {
  let linhas = await service.listarVendaItens();
  resp.send(linhas);
})

endpoints.post('/vendaItem', async (req, resp) => {
  let vendaItem = req.body;
  let id = await service.adicionarVendaItem(vendaItem);
  
  resp.send({
    id: id
  })
})

endpoints.put('/vendaItem/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let vendaItem = req.body;

  let linhasAfetadas = await service.alterarVendaItem(id, vendaItem);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: 'Item de venda não encontrado!'
    })
  } else {
    resp.send();
  }
})

endpoints.delete('/vendaItem/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linhasAfetadas = await service.deletarVendaItem(id);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: 'Item de venda não encontrado!'
    })
  } else {
    resp.send({
      linhasAfetadas
    });
  }
})

endpoints.get('/vendaItem/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let linha = await service.buscarVendaItemPorId(id);

  if (!linha) {
    resp.status(404).send({
      erro: 'Item de venda não encontrado!'
    })
  } else {
    resp.send(linha);
  }
})

export default endpoints;