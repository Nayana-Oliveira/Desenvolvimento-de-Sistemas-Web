import emprestimoController from './controller/emprestimoController.js'
import obraController from './controller/obraController.js'
import clienteController from './controller/clienteController.js'

export default function adicionarRotas(api) {
    api.use(emprestimoController);
    api.use(obraController);
    api.use(clienteController);
}