import { Router } from 'express';
import * as service from '../service/emprestimoService.js';

const endpoints = Router();

endpoints.post('/emprestimos', async (req, resp) => {
    try {
        let id = await service.criar(req.body);
        resp.status(201).send({ id });
    } catch (err) {
        resp.status(400).send({ 
            erro: err.message 
        });
    }
});

endpoints.get('/emprestimos', async (req, resp) => {
    try {
        resp.send(await service.listar());
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.get('/emprestimos/:id', async (req, resp) => {
    try {
        let lista = await service.listar();
        let item = lista.find(x => x.id == req.params.id);

        if (!item) {
            return resp.status(404).send();
        }

        resp.send(item);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.put('/emprestimos/:id', async (req, resp) => {
    try {
        let result = await service.devolver(
            req.params.id, 
            req.body
        );

        resp.send(result);

    } catch (err) {
        resp.status(400).send({ 
            erro: err.message 
        });
    }
});

export default endpoints;