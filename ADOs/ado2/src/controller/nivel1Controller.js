import { Router } from "express";
const endpoints = Router();

endpoints.get('/nivel1/ping', (req, resp) => {
    resp.send('Olá');
})

endpoints.post('/nivel1/validacao', (req, resp) => {
    let { idadePessoa1, idadePessoa2, classificacao } = req.body;
    idadePessoa1 = Number(idadePessoa1);
    idadePessoa2 = Number(idadePessoa2);
    let idadeMinima = 0;

    if (classificacao === 'livre') {
        idadeMinima = 0;
    } else {
        idadeMinima = Number(classificacao);
    }

    let podemAssistir = idadePessoa1 >= idadeMinima && idadePessoa2 >= idadeMinima;

    resp.send({ 
        podemAssistir: podemAssistir
    });
});

endpoints.get('/nivel1/combinacaoCores', (req, resp) => {
    let { cor1, cor2 } = req.query;
    let corResultante = '';

    if (
        (cor1 === 'vermelho' && cor2 === 'azul') ||
        (cor1 === 'azul' && cor2 === 'vermelho')
    ) {
        corResultante = 'roxo';
    } 
    else if (
        (cor1 === 'azul' && cor2 === 'amarelo') ||
        (cor1 === 'amarelo' && cor2 === 'azul')
    ) {
        corResultante = 'verde';
    } 
    else if (
        (cor1 === 'vermelho' && cor2 === 'amarelo') ||
        (cor1 === 'amarelo' && cor2 === 'vermelho')
    ) {
        corResultante = 'laranja';
    }

    resp.send({ 
        corResultante: corResultante
    });
});

export default endpoints;