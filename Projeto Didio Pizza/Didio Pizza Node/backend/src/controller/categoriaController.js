import { Router } from 'express';
import * as categoriaService from '../service/categoriaService.js';

const endpoint = Router();


endpoint.get('/categoria', async (req, resp) => {
    let linhas = await categoriaService.listarCategorias();

    resp.status(200).send(linhas);
});

export default endpoint;