import * as service from '../services/emprestimoService.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.post('/emprestimos', async (req, resp) => {
  let emprestimo = req.body;

  let id = await service.registrarEmprestimo(emprestimo);

  resp.status(201).send({ id });
});

endpoints.get('/emprestimos', async (req, resp) => {
  let status = req.query.status;

  let lista = await service.listarEmprestimos(status);

  resp.send(lista);
});

endpoints.put('/emprestimos/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let dados = req.body;

  let linhas = await service.devolverEmprestimo(id, dados);

  if (linhas == 0) {
    resp.status(404).send({ erro: 'Empréstimo não encontrado!' });
  } else {
    resp.send();
  }
});

export default endpoints;