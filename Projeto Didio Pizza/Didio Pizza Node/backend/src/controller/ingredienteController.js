import { Router } from "express";

import * as service from "../service/ingredienteService.js";

import { getAuthentication, onlyAdmin } from "../utils/jwt.js";

const endpoints = Router();

const auth = getAuthentication();

const adm = onlyAdmin();

endpoints.post(
  "/ingrediente",
  auth,
  adm,

  async (req, resp) => {
    try {
      let id = await service.criar(req.body);

      resp.status(201).send({
        id: id,
      });
    } catch (err) {
      resp.status(400).send({
        erro: err.message,
      });
    }
  },
);

endpoints.get(
  "/ingrediente",
  auth,
  adm,

  async (req, resp) => {
    try {
      let lista = await service.listar();

      resp.send(lista);
    } catch (err) {
      resp.status(400).send({
        erro: err.message,
      });
    }
  },
);

endpoints.put(
  "/ingrediente/:id",
  auth,
  adm,

  async (req, resp) => {
    try {
      let id = Number(req.params.id);

      await service.atualizar(id, req.body);

      resp.status(204).send();
    } catch (err) {
      resp.status(400).send({
        erro: err.message,
      });
    }
  },
);

endpoints.delete(
  "/ingrediente/:id",
  auth,
  adm,

  async (req, resp) => {
    try {
      let id = Number(req.params.id);

      await service.remover(id);

      resp.status(204).send();
    } catch (err) {
      resp.status(400).send({
        erro: err.message,
      });
    }
  },
);

export default endpoints;
