import obraController from './controller/obraController.js';
import clienteController from './controller/clienteController.js';
import emprestimoController from './controller/emprestimoController.js';


export default function adicionarRotas(api) {
  api.use(obraController);
  api.use(clienteController);
  api.use(emprestimoController);
}

