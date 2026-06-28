import { Router } from 'express';
import * as service from '../service/clienteService.js';

const endpoints = Router();

endpoints.post('/clientes', async (req, resp) => {
    try {
        let id = await service.criar(req.body);
        resp.status(201).send({ id });
    } catch (err) {
        resp.status(400).send({ 
            erro: err.message 
        });
    }
});

endpoints.get('/clientes', async (req, resp) => {
    try {
        let nome = req.query.nome;
        let clientes = await service.listar(nome);
        resp.send(clientes);
    } catch (err) {
        resp.status(400).send({ 
            erro: err.message 
        });
    }
});

endpoints.get('/clientes/:id', async (req, resp) => {
    try {
        let cliente = await service.buscar(req.params.id);
        resp.send(cliente);
    } catch (err) {
        resp.status(404).send({ 
            erro: err.message 
        });
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
    } catch (err) {
        resp.status(404).send({ 
            erro: err.message 
        });
    }
});

export default endpoints;