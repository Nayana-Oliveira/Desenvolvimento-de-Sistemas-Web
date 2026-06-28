import express from 'express'
import adicionaRotas from './routes.js'

const api = express();
api.use(express.json())

api.get('/ping', (req, resp) => {
    resp.send('pong')
})

adicionaRotas(api);

api.listen(5010, () => console.log('API subiu!'))