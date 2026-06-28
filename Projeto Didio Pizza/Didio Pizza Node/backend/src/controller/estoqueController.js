import { Router } from 'express';
import * as service from '../service/estoqueService.js';
import { getAuthentication, onlyAdmin } from '../utils/jwt.js';

const endpoints = Router();
const auth = getAuthentication();
const adm = onlyAdmin();


endpoints.post('/estoque', auth, adm, async (req, resp) => {
    try {
        let id = await service.criar(req.body);

        resp.status(201).send({ 
            id: id
         });

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.get('/estoque', auth, adm, async (req, resp) => {
    let lista = await service.listar();
    resp.send(lista);
});


endpoints.put('/estoque/:id', auth, adm, async (req, resp) => {
    try {
        let id = Number(req.params.id);

        await service.atualizar(id, req.body);

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.delete('/estoque/:id', auth, adm, async (req, resp) => {
    try {
        let id = Number(req.params.id);

        await service.remover(id);

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


export default endpoints;