import { Router } from "express";
const endpoints = Router();


endpoints.get('/nivel2/ping', (req, resp) => {
  resp.send({
    message: 'pong2'
  })
})


export default endpoints;