import * as service from "../services/generoService.js";
import { Router } from "express";

const endpoints = Router();

endpoints.get("/genero", async (req, resp) => {
  let linhas = await service.listarGeneros();
  resp.send(linhas);
});

endpoints.post("/genero", async (req, resp) => {
  let genero = req.body;
  let id = await service.adicionarGenero(genero);

  resp.send({
    id: id,
  });
});

endpoints.put("/genero/:id", async (req, resp) => {
  let id = Number(req.params.id);
  let genero = req.body;

  let linhasAfetadas = await service.alterarGeneros(id, genero);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: "Genero não encontrado.",
    });
  } else {
    resp.send({
      linhasAfetadas,
    });
  }
});

endpoints.get("/genero/:id", async (req, resp) => {
  let id = Number(req.params.id);
  let genero = await service.buscarPorId(id);

  if (!genero) {
    resp.status(404).send({
      erro: "Genero não encontrado",
    });
  } else {
    resp.send(genero);
  }
});

endpoints.delete("/genero/:id", async (req, resp) => {
  let id = Number(req.params.id);
  let linhasAfetadas = await service.deletarGenero(id);

  if (linhasAfetadas == 0) {
    resp.status(404).send({
      erro: "Genero não encontrado",
    });
  } else {
    resp.send({
      linhasAfetadas,
    });
  }
});

export default endpoints;