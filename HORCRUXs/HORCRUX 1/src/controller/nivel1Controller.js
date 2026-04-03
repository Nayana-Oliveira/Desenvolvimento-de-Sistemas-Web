import { Router } from "express";
const endpoints = Router();

endpoints.get('/nivel1/ping', (req, resp) => {
    resp.send('ola');
})

endpoints.get('/nivel1/media/:aluno/:n1/:n2/:n3', (req, resp) => {
    let nome = req.params.nome;
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let n3 = Number(req.params.n3);
    let media = (n1 + n2 + n3) / 3;

    if (!n1 < 0 || n2 < 0 || n3< 0) {
        resp.send('Nota Invalida!')
    }

   let situacao = media >= 6 ? 'Aprovado' : "DP"

    resp.send({
        media: media.toFixed(2),
        situacao: situacao
    })
})

endpoints.post('/nivel1/leituraLivro', (req, resp) => {
    let {livro, pagina, tempoPorPagina } = req.body
    let tempoTotalSegundos = pagina * tempoPorPagina
    let tempoLeitura = tempoTotalSegundos / 3600;

    resp.send({
        tempoLeitura: tempoLeitura.toFixed(2)
    })
})

export default endpoints;