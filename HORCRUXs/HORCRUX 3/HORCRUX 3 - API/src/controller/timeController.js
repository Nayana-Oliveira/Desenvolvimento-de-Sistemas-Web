import * as service from '../service/timeService.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.get('/times', async (req, resp) => {
  let dados = await service.listarTimes();
  resp.send(dados);
});

endpoints.get('/times/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let time = await service.buscarTimePorId(id);

  if (!time) {
    resp.status(404).send({ erro: 'Time não encontrado' });
  } else {
    resp.send(time);
  }
});

endpoints.post('/times', async (req, resp) => {
  let time = req.body;
  let id = await service.adicionarTime(time);

  resp.status(201).send({ id });
});

endpoints.put('/times/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let time = req.body;

  let linhas = await service.alterarTime(id, time);

  if (linhas === 0) {
    resp.status(404).send({ erro: 'Time não encontrado!' });
  } else {
    resp.send();
  }
});

endpoints.delete('/times/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linhas = await service.deletarTime(id);

  if (linhas === 0) {
    resp.status(404).send({ erro: 'Time não encontrado!' });
  } else {
    resp.status(204).send();
  }
});

export default endpoints;