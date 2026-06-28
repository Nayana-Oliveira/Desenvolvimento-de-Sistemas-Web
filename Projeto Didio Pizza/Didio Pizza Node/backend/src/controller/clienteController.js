import { Router } from 'express';
import * as clienteService from '../service/clienteService.js';
import { getAuthentication } from '../utils/jwt.js';

const auth = getAuthentication();

const endpoints = Router();


endpoints.post('/cliente', async (req, resp) => {
    try {
        let cliente = req.body;

        let id = await clienteService.criarCliente(cliente);

        resp.status(201).send({
            id: id
        });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.post('/cliente/login', async (req, resp) => {
    try {
        let cliente = req.body;

        let token = await clienteService.loginCliente(cliente);

        resp.send({
            token: token
        });

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        });
    }
});


endpoints.get('/cliente/me', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;

        let dados = await clienteService.buscarPerfil(clienteId);

        resp.send(dados);

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.put('/cliente/me', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;

        let { nome, email, telefone } = req.body;

        await clienteService.atualizarPerfil(clienteId, nome, email, telefone);

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});



export default endpoints;