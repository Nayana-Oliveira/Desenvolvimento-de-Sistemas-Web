import * as service from '../services/clienteService.js';
import { Router } from "express";

const endpoints = Router();

endpoints.get('/cliente', async (req, resp) => {
  let linhas = await service.listarClientes();
  resp.send(linhas);
});

endpoints.get('/cliente/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linha = await service.buscarClientePorId(id);

  if (!linha) {
    resp.status(404).send({ erro: 'Cliente não encontrado!' });
  }
  else {
    resp.send(linha);
  }
});

endpoints.post('/cliente', async (req, resp) => {
  let cliente = req.body;

  let id = await service.adicionarCliente(cliente);

  resp.send({ id: id });
});

endpoints.put('/cliente/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let cliente = req.body;

  let linhasAfetadas = await service.alterarCliente(id, cliente);

  if (linhasAfetadas == 0) {
    resp.status(404).send({ erro: 'Cliente não encontrado!' });
  }
  else {
    resp.send();
  }
});

endpoints.delete('/cliente/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linhasAfetadas = await service.deletarCliente(id);

  if (linhasAfetadas == 0) {
    resp.status(404).send({ erro: 'Cliente não encontrado!' });
  }
  else {
    resp.send({ linhasAfetadas });
  }
});

export default endpoints;