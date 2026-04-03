import express from 'express';
const api = express();
api.use(express.json());

api.get('/media1/:num1/:num2/:num3', (req, resp) => {
    let n1 = Number(req.params.num1);
    let n2 = Number(req.params.num2);
    let n3 = Number(req.params.num3);
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
    });
});

api.get('/media2', (req, resp) => {
    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let n3 = Number(req.query.n3);
    let media = (n1 + n2 + n3) / 3;

    let situacao = '';
    if(media >= 6) {
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
    if(media >= 6) {
        situacao = 'Aprovado';
    } else {
        situacao = 'Reprovado';
    }

    resp.send({
        media: media,
        situacao: situacao
    })
})

api.post('/media4/:n1', (req, resp) => {

    let n1 = Number(req.params.n1);
    let n2 = Number(req.query.n2);
    let n3 = Number(req.body.n3);
    let media = (n1 + n2 + n3) / 3;

    let situacao;

    if (media >= 6) {
        situacao = "Aprovado";
    } else {
        situacao = "Reprovado";
    }

    resp.send({
        media: media,
        situacao: situacao
    });

});

api.post('/media5', (req, resp) => {
    let alunos = req.body;
    let resultado = [];

    for (let i = 0; i < alunos.length; i++) {
        let nome = alunos[i].nome;

        let n1 = Number(alunos[i].notas.n1);
        let n2 = Number(alunos[i].notas.n2);
        let n3 = Number(alunos[i].notas.n3);

        let media = (n1 + n2 + n3) / 3;

            let situacao;

            if (media >= 6) {
            situacao = "Aprovado";
        } else {
        situacao = "Reprovado";
        }

        resultado.push({
            nome: nome,
            media: media,
            situacao: situacao
        });
    }

    resp.send(resultado)
})

api.listen(5010, () => console.log('API subiu'));