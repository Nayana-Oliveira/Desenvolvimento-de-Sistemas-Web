import * as service from '../services/clienteService.js';
import { Router } from "express";

const endpoints = Router();

endpoints.get('/clientes', async (req, resp) => {
  let linhas = await service.listarClientes();
  resp.send(linhas);
});

endpoints.post('/clientes', async (req, resp) => {
  let cliente = req.body;

  let id = await service.adicionarCliente(cliente);

  resp.status(201).send({
    id: id
  });
});

endpoints.put('/clientes/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let cliente = req.body;

  let linhasAfetadas = await service.alterarCliente(id, cliente);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: 'Cliente não encontrado!'
    });
  } else {
    resp.send();
  }
});

endpoints.delete('/clientes/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linhasAfetadas = await service.deletarCliente(id);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: 'Cliente não encontrado!'
    });
  } else {
    resp.status(204).send();
  }
});

endpoints.get('/clientes/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linha = await service.buscarClientePorId(id);

  if (!linha) {
    resp.status(404).send({
      erro: 'Cliente não encontrado!'
    });
  } else {
    resp.send(linha);
  }
});

export default endpoints;