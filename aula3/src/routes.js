import nivel1Controller from './controller/nivel1Controller.js'
import nivel2Controller from './controller/nivel2Controller.js'
import calculadoraController from './controller/calculadoraController.js'
import produtoController from './controller/produtoController.js'

export default function adicionarRotas(api) {
  api.use(nivel1Controller);
  api.use(nivel2Controller);
  api.use(calculadoraController);
  api.use(produtoController);
}
