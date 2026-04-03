import { Router } from "express";
const endpoints = Router();


endpoints.get('/nivel1/ping', (req, resp) => {
  resp.send({
    message: 'pong'
  })
})


export default endpoints;