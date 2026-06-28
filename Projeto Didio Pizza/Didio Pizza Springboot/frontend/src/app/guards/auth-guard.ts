import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  const tipoUsuario = localStorage.getItem('tipo_usuario');

  const router = inject(Router);

  if (token && tipoUsuario === 'cliente') {
    return true;
  }

  router.navigate(['/login']);

  return false;
};
