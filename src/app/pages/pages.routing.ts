import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../guards/admin.guard';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate:[ authGuard ],
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Account Settings'}},
      { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busquedas'}},
      { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráficas'}},
      { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},
      { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
      { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
      //{ path: '', redirectTo:'/dashboard', pathMatch: 'full'},

      //Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Mantenimiento de Medico'}},

      //Rutas de Administrador
      { path: 'usuarios',  canActivate: [adminGuard], component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}},

    ]
  },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
