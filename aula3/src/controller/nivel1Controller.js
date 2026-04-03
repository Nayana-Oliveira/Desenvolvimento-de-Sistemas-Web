import { Router } from 'express'
const endpoints = Router()

endpoints.get("/nivel1/ping", (req, resp) => {
    resp.send({
        message: 'oi'
    });
})

export default endpoints