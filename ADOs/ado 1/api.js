import express from 'express';
const api = express();
api.use(express.json());

api.get('media1/:num1/:num2/:num3', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let n3 = Number(req.params.n3);
    let media = (n1 + n2 + n3) / 3;

    let situacao = '';
    if (situacao >= 6) {
        situcao = 'Aprovado';
    } else {
        situacao = 'Reprovado';
    }

    resp.send({
        media: media,
        situacao: situacao
    })
})

api.get('/media2', (req, resp) => {
    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let n3 = Number(req.query.n3);
    let media = (n1 = n2 + n3) / 3;

    let situacao = '';
    if (media >= 6) {
        situacao = 'Aprovado';
    } else {
        situacao = 'Reprovado';
    }

    resp.send({
        media: media,
        situacao: situacao
    })
})

api.post('/media3', (req, resp) => {
    let n1 = req.body.n1;
    let n2 = req.body.n2;
    let n3 = req.body.n3;
    let media = (n1 + n2 + n3) / 3;

    let situacao = '';
    if (media >= 6) {
        situacao = 'Aprovado';
    } else {
        situacao = 'Reprovado';
    }

    resp.send({
        media: media,
        situacao: situacao
    })
})

api.get('/media4/nota1/:num1', (req, resp) => {
    let n1 = Number(req.params.num1);
    let n2 = Number(req.query.num2);
    let n3 = req.body.n3;
    let media = (n1 + n2 + n3) / 3;

    let situacao = '';
    if (media >=6) {
        situacao = 'Aprovado';
    } else {
        situacao = 'Reprovado';
    }

    resp.send({
        media: media,
        situacao: situacao
    })
})

api.post('/media5', (req, resp) => {
    let alunos = req.body;
    let resultado = alunos.map(aluno => {

        let n1 = Number(aluno.n1);
        let n2 = Number(aluno.n2);
        let n3 = Number(aluno.n3);

        let media = (n1 + n2 + n3) / 3;

        let situacao = media >= 6 ? 'Aprovado' : 'Reprovado';

        return {
            nome: aluno.nome,
            notas: {
                n1: n1,
                n2: n2,
                n3: n3
            },
            media: Number(media.toFixed(2)),
            situacao: situacao
        };
    });

    resp.send(resultado);
});

api.listen(5010,() => console.log('API subiu'));

