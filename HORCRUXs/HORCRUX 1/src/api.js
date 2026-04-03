import express from 'express'
import adicionarRotas from './routes.js';

const api = express();
api.use(express.json())

api.get('/ping', (req, resp) => {
    resp.send("pong");
})

adicionarRotas(api);

api.listen(5010,() => console.log('API subiu'));