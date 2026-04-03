import { Router } from "express";
const endpoints = Router();

endpoints.get('/nivel2/ping', (req, resp) => {
    resp.send('Olá')
})

endpoints.get('/nivel3/compra', (req, resp) => {
    let { cliente, valor, desconto } = req.query;

    valor = Number(valor);
    desconto = Number(desconto);

    let valorDesconto = (valor * desconto) / 100;
    let total = valor - valorDesconto;

    resp.send({
        cliente: cliente,
        valor: valor,
        desconto: Number(valorDesconto.toFixed(2)),
        total: Number(total.toFixed(2))
    });
});

endpoints.post('/nivel3/kart', (req, resp) => {
    let { tamanhoPista, qtdVoltas, tempoVolta } = req.body;

    tamanhoPista = Number(tamanhoPista);
    qtdVoltas = Number(qtdVoltas);
    tempoVolta = Number(tempoVolta);

    let distanciaTotal = (tamanhoPista * qtdVoltas) / 1000;
    let previsaoConclusao = (tempoVolta * qtdVoltas) / 60;

    resp.send({
        distanciaTotal: Number(distanciaTotal.toFixed(2)),
        previsaoConclusao: Number(previsaoConclusao.toFixed(2))
    });
});

endpoints.post('/nivel3/metapessoal', (req, resp) => {
    let { meta, valorMeta, salarioLiquido, despesasMensais } = req.body;

    valorMeta = Number(valorMeta);
    salarioLiquido = Number(salarioLiquido);
    despesasMensais = Number(despesasMensais);

    let lucroMensal = salarioLiquido - despesasMensais;
    let reservaFixa = lucroMensal * 0.30;
    let reservaMeta = lucroMensal - reservaFixa;
    let prazo = Math.ceil(valorMeta / reservaMeta);

    resp.send({
        lucroMensal: Number(lucroMensal.toFixed(2)),
        reservaFixa: Number(reservaFixa.toFixed(2)),
        reservaMeta: Number(reservaMeta.toFixed(2)),
        prazo: prazo
    });
});


export default endpoints;