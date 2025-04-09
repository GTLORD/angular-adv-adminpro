import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  public imgUrl = '';

  public usuario: Usuario;


  constructor( private usuarioService: UsuarioService ) {
    this.usuario = usuarioService.usuario;
    this.imgUrl = this.usuarioService.usuario.imagenUrl;

  }


  logout(){
    this.usuarioService.logout();
  }

}
