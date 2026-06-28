import express from 'express';
import adminController from './controller/adminController.js';
import clienteController from './controller/clienteController.js';
import enderecoController from './controller/enderecoController.js';
import categoriaController from './controller/categoriaController.js';
import produtoController from './controller/produtoController.js';
import carrinhoController from './controller/carrinhoController.js';
import pedidoController from './controller/pedidoController.js';
import pagamentoController from './controller/pagamentoController.js';
import estoqueController from './controller/estoqueController.js';
import lojaController from './controller/lojaController.js';
import ingredienteController from './controller/ingredienteController.js'

export default function adicionarRotas(api) {
    api.use(adminController);
    api.use(clienteController);
    api.use(enderecoController);
    api.use(categoriaController);
    api.use(produtoController);
    api.use(carrinhoController);
    api.use(pedidoController);
    api.use(pagamentoController);
    api.use(estoqueController);
    api.use(lojaController);
    api.use(ingredienteController);

    api.use('/public/storage/produto', express.static('public/storage/produto'));
}