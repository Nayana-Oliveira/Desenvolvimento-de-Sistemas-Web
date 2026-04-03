import * as service from "../services/filmeService.js";
import { Router } from "express";

const endpoints = Router();

endpoints.get("/filme", async (req, resp) => {
  let linhas = await service.listarFilme();
  resp.send(linhas);
});

endpoints.post("/filme", async (req, resp) => {
  let filme = req.body;

  let id = await service.adicionarFilme(filme);

  resp.send({
    id: id
  });
});

endpoints.put("/filme/:id", async (req, resp) => {
  let id = Number(req.params.id);
  let filme = req.body;

  let linhasAfetadas = await service.alterarFilme(id, filme);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: "Filme não encontrado."
    });
  } else {
    resp.send({
      linhasAfetadas
    });
  }
});

endpoints.get("/filme/:id", async (req, resp) => {
  let id = Number(req.params.id);

  let filme = await service.buscarPorId(id);

  if (!filme) {
    resp.status(404).send({
      erro: "Filme não encontrado."
    });
  } else {
    resp.send(filme);
  }
});

endpoints.delete("/filme/:id", async (req, resp) => {
  let id = Number(req.params.id);

  let linhasAfetadas = await service.deletarFilme(id);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: "Filme não encontrado."
    });
  } else {
    resp.send({
      linhasAfetadas
    });
  }
});

export default endpoints;