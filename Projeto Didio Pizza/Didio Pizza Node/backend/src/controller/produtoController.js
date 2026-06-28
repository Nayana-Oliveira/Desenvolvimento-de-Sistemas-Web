import { Router } from 'express';
import multer from 'multer';
import * as produtoService from '../service/produtoService.js';
import { getAuthentication, onlyAdmin } from '../utils/jwt.js';

const auth = getAuthentication();
const adm = onlyAdmin();

const endpoints = Router();

const uploadFoto = multer({ dest: 'public/storage/produto' });


endpoints.post('/produto', auth, adm, uploadFoto.single('imagem'), async (req, resp) => {
    try {
        let produto = req.body;

        if (!req.file) {
            return resp.status(400).send({
                erro: 'Nenhuma foto enviada. Por favor, selecione uma foto para upload.'
            });
        }

        produto.imagem = req.file.path;

        let id = await produtoService.salvarProduto(produto);

        resp.status(201).send({
            id: id
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.get('/produto', async (req, resp) => {
    let linhas = await produtoService.listarProduto();
    resp.status(200).send(linhas);
});


endpoints.get('/produto/:id', async (req, resp) => {
    let id = Number(req.params.id);

    let linha = await produtoService.buscarProdutoPorId(id);

    if (!linha) {
        resp.status(404).send({
            erro: 'Produto não encontrado.'
        });
    } else {
        resp.status(200).send(linha);
    }
});


endpoints.put('/produto/:id', auth, adm, async (req, resp) => {
    try {
        let id = Number(req.params.id);
        let produto = req.body;

        let linhasAfetadas = await produtoService.alterarProduto(id, produto);

        if (linhasAfetadas == 0) {
            resp.status(404).send({
                erro: 'Produto não encontrado.'
            });
        } else {
            resp.status(200).send(linhasAfetadas);
        }
    } catch (err) { 
        resp.status(400).send({
            erro: err.message
        })
    }
});


endpoints.delete('/produto/:id', auth, adm, async (req, resp) => {
    let id = Number(req.params.id);

    let linhasAfetadas = await produtoService.deletarProduto(id);

    if (linhasAfetadas == 0) {
        resp.status(404).send({
            erro: 'Produto não encontrado.'
        });
    } else {
        resp.status(204).send();
    }
});


endpoints.put("/produto/:id/imagem", auth, adm, uploadFoto.single('imagem'), async (req, resp) => {
    try {
        let id = Number(req.params.id);

        if (!req.file) {
            return resp.status(400).send({
                erro: 'Nenhuma imagem enviada. Por favor, selecione uma foto para upload.'
            });
        }

        let caminho = req.file.path;

        let linhasAfetadas = await produtoService.atualizarFotoPizza(id, caminho);

        if (linhasAfetadas == 0) {
            resp.status(404).send({
                erro: "Produto não encontrada"
            });
        } else {
            resp.status(204).send();
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
})


export default endpoints;