import nivel1Controller from './controller/nivel1Controller.js'
import nivel2Controller from './controller/nivel2Controller.js'
import nivel3Controller from './controller/nivel3Controller.js'

export default function adicionarRotas(api) {
    api.use(nivel1Controller);
    api.use(nivel2Controller);
    api.use(nivel3Controller);
}