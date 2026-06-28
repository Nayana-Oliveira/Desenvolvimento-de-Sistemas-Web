import { Router } from 'express';
import * as enderecoService from '../service/enderecoService.js';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const auth = getAuthentication();


endpoints.post('/endereco', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;
        let endereco = req.body;

        let id = await enderecoService.adicionarEndereco(clienteId, endereco);

        resp.status(201).send({
            id: id
        });

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.get('/endereco', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;

        let lista = await enderecoService.listarEnderecos(clienteId);

        resp.send(lista);

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.get('/endereco/:id', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;
        let enderecoId = Number(req.params.id);

        let endereco = await enderecoService.buscarEndereco(clienteId, enderecoId);

        resp.send(endereco);

    } catch (err) {
        resp.status(404).send({ erro: err.message });
    }
});


endpoints.put('/endereco/:id', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;
        let enderecoId = Number(req.params.id);
        let endereco = req.body;

        await enderecoService.atualizarEndereco(clienteId, enderecoId, endereco);

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.delete('/endereco/:id', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;
        let enderecoId = Number(req.params.id);

        await enderecoService.removerEndereco(clienteId, enderecoId);

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


export default endpoints;