import atorController from './controller/atorController.js'
import filmeAtorController from './controller/filmeAtorController.js'
import filmeController from './controller/filmeController.js'
import filmeGeneroController from './controller/filmeGeneroController.js'
import generoController from './controller/generoController.js' 

export default function adicionarRotas(api) {
    api.use(atorController);
    api.use(filmeController);
    api.use(filmeAtorController);
    api.use(filmeGeneroController);
    api.use(generoController);
}