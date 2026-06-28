import { Router } from 'express';
import * as adminService from '../service/adminService.js';

const endpoints = Router();


endpoints.post('/admin', async (req, resp) => {
    try {
        let admin = req.body;

        let id = await adminService.criarAdmin(admin);

        resp.status(201).send({
            id: id
        });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


endpoints.post('/admin/login', async (req, resp) => {
    try {
        let admin = req.body;

        let token = await adminService.loginAdmin(admin);

        resp.status(200).send({
            token: token
        });

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});


export default endpoints;