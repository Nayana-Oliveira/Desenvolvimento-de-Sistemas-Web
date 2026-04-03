import nivel1Controller from './controller/nivel1Controller.js'
import nivel2Controller from './controller/nivel2Controller.js'
import calculadoraController from './controller/calculadoraController.js'
import produtoController from './controller/produtoController.js'
import vendaController from './controller/vendaController.js'
import vendaItemController from './controller/vendaItemController.js'
import clienteController from './controller/clienteController.js'

export default function adicionarRotas(api) {
  api.use(nivel1Controller);
  api.use(nivel2Controller);
  api.use(calculadoraController);
  api.use(produtoController);
  api.use(vendaController);
  api.use(vendaItemController);
  api.use(clienteController);
}
