import produtoController from './controller/produtoController.js';
import clienteController from './controller/clienteController.js';
import vendaController from './controller/vendaController.js';
import vendaItemController from './controller/vendaItemController.js';

export default function adicionarRotas(api) {
  api.use(produtoController);
  api.use(clienteController);
  api.use(vendaController);
  api.use(vendaItemController);
}