import { CanActivateFn, Router } from '@angular/router';


import { inject  } from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);


  return usuarioService.validarToken()

  .pipe(
    tap( estaAutenticado =>{

        if (!estaAutenticado) {
            router.navigateByUrl('/login');
        }

    })
  );
}
