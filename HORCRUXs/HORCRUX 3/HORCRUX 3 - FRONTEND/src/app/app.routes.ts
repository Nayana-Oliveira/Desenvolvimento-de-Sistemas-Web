import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { CadastroTime } from './pages/cadastro-time/cadastro-time';
import { ConsultaTime } from './pages/consulta-time/consulta-time';
import { CadastroJogo } from './pages/cadastro-jogo/cadastro-jogo';
import { ConsultaJogo } from './pages/consulta-jogo/consulta-jogo';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'cadastro-time', component: CadastroTime },
    { path: 'cadastro-time/:id', component: CadastroTime },
    { path: 'consulta-time', component: ConsultaTime },
    { path: 'cadastro-jogo', component: CadastroJogo },
    { path: 'cadastro-jogo/:id', component: CadastroJogo },
    { path: 'consulta-jogo', component: ConsultaJogo }
  ];