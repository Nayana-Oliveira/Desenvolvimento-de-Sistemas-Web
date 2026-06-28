import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { DetalhePedido } from './pages/detalhe-pedido/detalhe-pedido';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProdutoAdmin } from './pages/produto-admin/produto-admin';
import { Estoque } from './pages/estoque-admin/estoque-admin';
import { ClientPanel } from './pages/client-panel/client-panel';
import { authGuard } from './guards/auth-guard';
import { Cardapio } from './pages/cardapio/cardapio';
import { Checkout } from './pages/checkout/checkout';
import { OrderDetails } from './pages/order-details/order-details';

export const routes: Routes = [

  {
    path: '',
    component: Home,
  },

  {
    path: 'produto/:id',
    component: DetalhePedido,
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'cadastro',
    component: Cadastro,
  },

  {
    path: 'admin/dashboard',
    component: Dashboard,
  },

  {
    path: 'admin/produto',
    component: ProdutoAdmin,
  },

  {
    path: 'admin/estoque',
    component: Estoque,
  },

  {
    path: 'painel',
    component: ClientPanel,
    canActivate: [authGuard],
  },

  {
    path: 'cardapio',
    component: Cardapio,
  },

  {
    path: 'checkout',
    component: Checkout,
  },

  {
    path: 'order-details',
    component: OrderDetails,
  },

];