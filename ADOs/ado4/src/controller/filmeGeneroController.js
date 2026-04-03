import * as service from '../services/filmeGeneroService.js';
import { Router } from 'express'

const endpoints = Router();

endpoints.get('/filmegenero', async (req, resp) => {
    let linhas = await service.listarGeneroFilme();
    resp.send(linhas);
});

endpoints.post('/filmegenero', async(req, resp) => {
    let generoFilme = req.body;
    let id = await service.adicionarGeneroFilme(generoFilme);

    resp.send({
        id: id
    });
});

endpoints.put('/filmegenero/:id', async (req, resp) => {
    let id = Number(req.params.id);
    let generoFilme = req.body;
    let linhasAfetadas = await service.alterarGeneroFilme(id, generoFilme);

    if(linhasAfetadas == 0) {
        resp.status(404).send({
            error: 'Não encontrado.'
        })
    } else {
        resp.send({
            linhasAfetadas
        })
    }
});

endpoints.get('/filmegenero/:id', async (req, resp) => {
    let id = Number(req.params.id);
    let filmeGenero = await service.buscarPorId(id);

    if(!filmeGenero) {
        resp.status(404).send({
            error: 'Não encontrado.'
        })
    } else {
        resp.send(filmeGenero)
    }
});

endpoints.delete('/filmegenero/:id', async (req, resp) => {
    let id = Number(req.params.id);
    let linhasAfetadas = await service.deletarGeneroFilme(id);

    if(linhasAfetadas == 0) {
        resp.status(404).send({
            error: 'Não encontrado.'
        })
    } else {
        resp.send({
            linhasAfetadas
        })
    }
});

export default endpoints;