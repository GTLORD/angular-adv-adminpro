import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  // Aquí puedes implementar la lógica para verificar si el usuario es administrador
  // Por ejemplo, podrías verificar un rol en el token de autenticación o en el estado de la aplicación




  // Inyectar el servicio de usuario y el router

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  // Verificar si el usuario tiene el rol de administrador
  if (usuarioService.role === 'ADMIN_ROLE') {
    return true; // Permitir el acceso si es administrador
  }else { // Si no es administrador, sacarlo de la aplicación y bloquear acceso por 24 horas
    usuarioService.logout();
    router.navigateByUrl('/login');

    return false; // Bloquear el acceso si no es administrador
  }
}


 //
 // otra forma de condicionar con operador terciario
 // return (usuarioService.role === 'ADMIN_ROLE')? true : false;
