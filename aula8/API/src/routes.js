import timeController from './controller/timeController.js'
import jogoController from './controller/jogoController.js'

export default function adicionarRotas(api) {
    api.use(timeController);
    api.use(jogoController);
}
  