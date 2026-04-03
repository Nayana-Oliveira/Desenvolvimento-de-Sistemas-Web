import * as service from '../services/filmeAtorService.js';
import { Router } from 'express'

const endpoints = Router();

endpoints.get('/filmeator', async (req, resp) => {
    let linhas = await service.listarFilmeAtor();
    resp.send(linhas);
});

endpoints.post('/filmeator', async (req, resp) => {
    let filmeAtor = req.body;
    let id = await service.adicionarFilmeAtor(filmeAtor);

    resp.send({
        id: id
    });
});

endpoints.put('/filmeator/:id', async (req, resp) => {
    let id = Number(req.params.id);
    let filmeAtor = req.body;

    let linhasAfetadas = await service.alterarFilmeAtor(id, filmeAtor);

    if(linhasAfetadas == 0) {
        resp.status(404).send({
            erro: "Ator não encontrado."
        })
    } else {
        resp.send({
            linhasAfetadas
        })
    }
});

endpoints.get('/filmeator/:id', async (req, resp) => {
    let id = Number(req.params.id);
    let filmeAtor = await service.buscarPorId(id);

    if(!filmeAtor) {
        resp.status(404).send({
            erro: "Ator não encontrado."
        })
    } else {
        resp.send(filmeAtor)
    }
});

endpoints.delete('/filmeator/:id', async (req, resp) => {
    let id = Number(req.params.id);
    let linhasAfetadas = await service.deletarFilmeAtor(id);

    if (linhasAfetadas == 0) {
        resp.status(404).send({
            erro: "Ator não encontrado."
        })
    } else {
        resp.send({
            linhasAfetadas
        })
    }
});

export default endpoints;