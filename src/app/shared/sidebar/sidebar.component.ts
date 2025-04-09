import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  public usuario: Usuario;
  public imgUrl = '';

  public menuItems: any[];


  constructor(private sideService: SidebarService,
              private usuarioService: UsuarioService){
    this.menuItems = sideService.menu;
    this.usuario = usuarioService.usuario;
    this.imgUrl = usuarioService.usuario.imagenUrl;

  }
  logout(){
    this.usuarioService.logout();
  }


}
