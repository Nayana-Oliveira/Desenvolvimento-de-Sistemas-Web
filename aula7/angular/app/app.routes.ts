import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { Lembrando } from '../pages/lembrando/lembrando';
import { Consulta } from '../pages/consulta/consulta';
import { Cadastro } from '../pages/cadastro/cadastro';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'lembrando', component: Lembrando},
    {path: 'consulta', component: Consulta},
    {path: 'cadastro', component: Cadastro},
    {path: 'cadastro/:id', component: Cadastro},
];
