import { Router } from 'express';
import * as service from '../service/clienteService.js';

const endpoints = Router();

endpoints.post('/clientes', async (req, resp) => {
    try {
        let id = await service.criar(req.body);
        resp.status(201).send({ 
            id 
        });
    } catch (err) {
        resp.status(400).send({ 
            erro: err.message 
        });
    }
});

endpoints.get('/clientes', async (req, resp) => {
    resp.send(await service.listar());
});

endpoints.get('/clientes/:id', async (req, resp) => {
    try {
        resp.send(await service.buscar(req.params.id));
    } catch {
        resp.status(404).send();
    }
});

endpoints.put('/clientes/:id', async (req, resp) => {
    try {
        await service.atualizar(req.params.id, req.body);
        resp.send();
    } catch (err) {
        resp.status(400).send({ 
            erro: err.message 
        });
    }
});

endpoints.delete('/clientes/:id', async (req, resp) => {
    try {
        await service.remover(req.params.id);
        resp.status(204).send();
    } catch {
        resp.status(404).send();
    }
});

export default endpoints;