import { Router } from "express";
const endpoints = Router();

endpoints.get('/nivel2/ping', (req, resp) => {
    resp.send('oi');
})

endpoints.get('/nivel2/tabuada/:numero', (req, resp) => {
    let numero = Number(req.params.numero);
    let tabuada = []
    for (let i = 0; i <= 10; i++) {
        tabuada.push(numero * i)
    }

    resp.send({tabuada});
})

endpoints.post('/nivel2/analiseNota', (req, resp) => {
    let notas = req.body.notas;
    let soma = notas.reduce((acumulador, n) => acumulador + n, 0);
    let media = soma / notas.length;
    let maior = Math.max(...notas);
    let menor = Math.min(...notas);
    let situacao = media >= 6 ? 'Aprovado' : "DP";

    for (let nota of notas){
        if (notas < 0){
            nota.push('Nota Inválida!')
        }
    }
    resp.send({
        media: media.toFixed(2),
        situacao: situacao,
        maior: maior,
        menor: menor
    })
})

export default endpoints;