import * as service from '../service/jogoService.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.get('/jogos', async (req, resp) => {
  let dados = await service.listarJogos();
  resp.send(dados);
});

endpoints.get('/jogos/:id', async (req, resp) => {
  let id = Number(req.params.id);
  let jogo = await service.buscarJogoPorId(id);

  if (!jogo) {
    resp.status(404).send({ erro: 'Jogo não encontrado' });
  } else {
    resp.send(jogo);
  }
});

endpoints.post('/jogos', async (req, resp) => {
  let jogo = req.body;
  let id = await service.salvarJogo(jogo);

  resp.status(201).send({ id });
});

endpoints.put('/jogos/:id', async (req, resp) => {
  try {
    let id = Number(req.params.id);
    let jogo = req.body;

    let linhas = await service.alterarJogo(id, jogo);

    if (linhas == 0) {
      resp.status(404).send({ erro: 'Jogo não encontrado' });
    } else {
      resp.send();
    }

  } catch {
    resp.status(500).send({ erro: 'Erro interno no servidor' });
  }
});

endpoints.delete('/jogos/:id', async (req, resp) => {
  let id = Number(req.params.id);

  let linhas = await service.deletarJogo(id);

  if (linhas == 0) {
    resp.status(404).send({ erro: 'Jogo não encontrado' });
  } else {
    resp.status(204).send();
  }
});

export default endpoints;