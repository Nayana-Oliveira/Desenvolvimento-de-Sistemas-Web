import { Router } from 'express';
import * as pedidoService from '../service/pedidoService.js';
import { getAuthentication, onlyAdmin } from '../utils/jwt.js';

const endpoints = Router();
const auth = getAuthentication();
const adm = onlyAdmin();


endpoints.post('/pedido', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;
        let enderecoId = req.body.endereco_id;

        if (!enderecoId) {
            return resp.status(400).send({
                erro: 'Endereço é obrigatório.'
            });
        }

        let pedidoId = await pedidoService.fecharPedido(clienteId, enderecoId);

        resp.status(201).send({
            id: pedidoId
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.get('/pedido', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;

        let pedidos = await pedidoService.listarPedidos(clienteId);

        resp.status(200).send(pedidos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.get('/pedido/:id', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;
        let pedidoId = Number(req.params.id);

        let pedido = await pedidoService.detalharPedido(clienteId, pedidoId);

        resp.status(200).send(pedido);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
});


endpoints.put('/pedido/:id/status', auth, adm, async (req, resp) => {
    try {
        let pedidoId = Number(req.params.id);
        let status = req.body.status;

        if (!status) {
            return resp.status(400).send({
                erro: 'Status é obrigatório.'
            });
        }

        await pedidoService.atualizarStatusPedido(pedidoId, status);

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.get('/pedidos/admin', auth, adm, async (req, resp) => {
    try {
        let pedidos = await pedidoService.listarPedidosAdmin();

        resp.status(200).send(pedidos);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});



export default endpoints;