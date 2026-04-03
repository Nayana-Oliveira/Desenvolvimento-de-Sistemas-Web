import * as funcoes from '../services/calculadora.js'

import { Router } from 'express'
const endpoints = Router()

endpoints.get("/calculadora/somar/:n1/:n2", (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);

    let soma = funcoes.somar(n1, n2);

    resp.send({
        soma: soma
    })
})

endpoints.post("/calculadora/subtrair", (req, resp) => {
    let n1 = Number(req.body.n1);
    let n2 = Number(req.body.n2);

    let subtrair = funcoes.subtrair(n1, n2);

    resp.send({
        subtrair: subtrair
    })
})

export default endpoints