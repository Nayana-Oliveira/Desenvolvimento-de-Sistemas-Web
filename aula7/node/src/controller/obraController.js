import * as service from '../services/obraService.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.post('/obras', async (req, resp) => {
  let obra = req.body;

  let id = await service.adicionarObra(obra);

  resp.status(201).send({ id });
});

endpoints.get('/obras', async (req, resp) => {
  let obras = await service.listarObras();
  resp.send(obras);
});

endpoints.get('/obras/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let obra = await service.buscarObraPorId(id);

  if (!obra) {
    resp.status(404).send({ erro: 'Obra não encontrada!' });
  } else {
    resp.send(obra);
  }
});

endpoints.put('/obras/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let obra = req.body;

  let linhas = await service.alterarObra(id, obra);

  if (linhas == 0) {
    resp.status(404).send({ erro: 'Obra não encontrada!' });
  } else {
    resp.send();
  }
});

endpoints.delete('/obras/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linhas = await service.deletarObra(id);

  if (linhas == 0) {
    resp.status(404).send({ erro: 'Obra não encontrada!' });
  } else {
    resp.status(204).send();
  }
});

export default endpoints;