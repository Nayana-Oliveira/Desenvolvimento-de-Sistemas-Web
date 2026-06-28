import { Router } from 'express'
import * as service from '../services/atorService.js'

const endpoints = Router();

endpoints.get('/ator', async (req, resp) => {
    let linhas = await service.listarAtor();
    resp.send(linhas);
})

endpoints.post('/ator', async (req, resp) => {
    let ator = req.body;
    let id = await service.adicionarAtor(ator);

    resp.send({
        id: id
    })
})

endpoints.put('/ator/:id', async (req, resp) => {
    let id = Number(req.params.id);
    let ator = req.body;

    let linhasAfetadas = await service.alterarAtor(id, ator);

    if(linhasAfetadas == 0) {
        resp.status(404).send({
            error: 'Ator não encontrado.'
        })
    } else {
        resp.send({
            linhasAfetadas
        })
    }
})

endpoints.get('/ator/:id', async (req, resp) => {
    let id = Number(req.params.id);
    let ator = await service.buscarPorId(id);

    if(!ator) {
        resp.status(404).send({
            error: 'Ator não encontrado.'
        })
    } else {
        resp.send(ator)
    }
})

endpoints.delete('/ator/:id', async (req, resp) => {
    let id = Number(req.params.id);
    let linhasAfetadas = await service.deletarAtor(id);

    if(linhasAfetadas == 0) {
        resp.status(404).send({
            error: 'Ator não encontrado.'
        })
    } else {
        resp.send({
            linhasAfetadas
        })
    }
})

export default endpoints;