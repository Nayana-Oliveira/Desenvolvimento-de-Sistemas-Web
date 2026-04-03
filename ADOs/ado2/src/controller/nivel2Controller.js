import { Router } from "express";
const endpoints = Router();

endpoints.get('/nivel2/ping', (req, resp) => {
    resp.send('Olá');
})

endpoints.post('/nivel2/ordenacao', (req, resp) => {
    let { numeros } = req.body;

    let crescente = true;
    let decrescente = true;

    for (let i = 0; i < numeros.length - 1; i++) {
        if (numeros[i] > numeros[i + 1]) {
            crescente = false;
        }
        if (numeros[i] < numeros[i + 1]) {
            decrescente = false;
        }
    }

    let ordem = '';

    if (crescente) {
        ordem = "crescente";
    }
    else if (decrescente) {
        ordem = "decrescente";
    }
    else {
        ordem = "desordenado";
    }

    resp.send({ 
        ordem: ordem
    });
});

endpoints.get('/nivel2/candidato', (req, resp) => {
    let { nota, corte, minimo } = req.query;

    nota = Number(nota);
    corte = Number(corte);
    minimo = Number(minimo);

    let situacao = '';

    if (nota < corte) {
        situacao = "Candidato não passou";
    }
    else if (nota >= minimo) {
        situacao = "Candidato aprovado";
    }
    else if (nota >= corte && nota < minimo) {
        situacao = "Candidato está na lista de espera";
    }

    resp.send({ 
        situacao: situacao
    });
});

export default endpoints;