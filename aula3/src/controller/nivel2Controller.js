import { Router } from 'express'
const endpoints = Router()

endpoints.get("/calculadora/somar/:n1/:n2", (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);

    let soma = n1 + n2;

    resp.send({
        soma: soma
    })
})

export default endpoints