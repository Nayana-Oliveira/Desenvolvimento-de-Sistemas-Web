import { Router } from 'express';
import * as carrinhoService from '../service/carrinhoService.js';
import { getAuthentication } from '../utils/jwt.js';

const endpoints = Router();
const auth = getAuthentication();


endpoints.post('/carrinho', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;
        let produto_id = req.body.produto_id;
        let quantidade = req.body.quantidade;

        if (!produto_id || !quantidade) {
            return resp.status(400).send({
                erro: 'Produto e quantidade são obrigatórios.'
            });
        }

        await carrinhoService.adicionarAoCarrinho(clienteId, produto_id, quantidade);

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


endpoints.get('/carrinho', auth, async (req, resp) => {
    let clienteId = req.user.id;

    let itens = await carrinhoService.verCarrinho(clienteId);

    resp.send(itens);
});


endpoints.delete('/carrinho/:produtoId', auth, async (req, resp) => {
    try {
        let clienteId = req.user.id;
        let produtoId = Number(req.params.produtoId);

        await carrinhoService.removerDoCarrinho(clienteId, produtoId);

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


export default endpoints;