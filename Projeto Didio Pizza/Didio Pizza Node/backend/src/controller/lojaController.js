import { Router } from 'express';
import * as lojaService from '../service/lojaService.js';
import { getAuthentication, onlyAdmin } from '../utils/jwt.js';

const endpoints = Router();
const auth = getAuthentication();
const adm = onlyAdmin();


endpoints.get('/loja/status', async (req, resp) => {
    try {
        let status = await lojaService.verificarStatusLoja();
        resp.status(200).send(status);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.put('/admin/loja/abrir', auth, adm, async (req, resp) => {
    try {
        await lojaService.abrirLoja();
        resp.send({ 
            msg: 'Loja aberta com sucesso' 
        });
    } catch (err) {
        resp.status(400).send({ 
            erro: err.message 
        });
    }
});


endpoints.put('/admin/loja/fechar', auth, adm, async (req, resp) => {
    try {

        await lojaService.fecharLoja();
        
        resp.send({ 
            msg: 'Loja fechada com sucesso' 
        });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

export default endpoints;