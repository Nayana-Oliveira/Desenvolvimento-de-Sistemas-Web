import { Router } from 'express';
import * as pagamentoService from '../service/pagamentoService.js';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const auth = getAuthentication();


endpoints.post('/pagamento', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;
        let pedidoId = req.body.pedido_id;
        let tipo = req.body.tipo;

        let id = await pagamentoService.realizarPagamento(clienteId, pedidoId, tipo);

        resp.status(201).send({
            id: id
        });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


export default endpoints;