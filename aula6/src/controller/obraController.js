import { Router } from 'express';
import * as service from '../service/obraService.js';

const endpoints = Router();

endpoints.post('/obras', async (req, resp) => {
    try {
        let id = await service.criar(req.body);
        resp.status(201).send({ id });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.post('/obras/massa', async (req, resp) => {
    try {
        let obras = req.body;
        let ids = await service.inserirEmMassa(obras);
        resp.status(201).send({ ids });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.get('/obras', async (req, resp) => {
    try {
        let filtros = req.query;
        let obras = await service.listar(filtros);
        resp.send(obras);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/obras', async (req, resp) => {
    resp.send(await service.listar());
});

endpoints.get('/obras/:id', async (req, resp) => {
    try {
        resp.send(await service.buscar(req.params.id));
    } catch (err) {
        resp.status(404).send({ erro: err.message });
    }
});

endpoints.put('/obras/:id', async (req, resp) => {
    try {
        await service.atualizar(req.params.id, req.body);
        resp.send();
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.delete('/obras/:id', async (req, resp) => {
    try {
        await service.remover(req.params.id);
        resp.status(204).send();
    } catch (err) {
        resp.status(404).send({ erro: err.message });
    }
});

export default endpoints;