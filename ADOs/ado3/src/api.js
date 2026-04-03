import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import adicionarRotas from './routes.js';

const api = express();
api.use(express.json());
api.use(cors());

adicionarRotas(api);

const porta = process.env.PORTA;
api.listen(porta, () => {
    console.log()
});