import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]= [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu:[
        {titulo: 'Main', url: '/'},
        {titulo: 'Gráficas', url: '/dashboard/grafica1'},
        {titulo: 'ProgressBar', url: '/dashboard/progress'},
        {titulo: 'Promesas', url: '/dashboard/promesas'},
        {titulo: 'Rxjs', url: '/dashboard/rxjs'},
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-wrench',
      submenu:[
        {titulo: 'Usuarios', url: 'usuarios'},
        {titulo: 'Medicos', url: 'medicos'},
        {titulo: 'Hospitales', url: 'hospitales'},
      ]
    },
  ];

  constructor() { }
}
