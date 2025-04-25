import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public totalUsuarios: number = 0;
  public usuarios: any[] = [];
  public usuariosTemp: any[] = [];
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean= true;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService){}

  ngOnInit(): void {
    this.listarUsuarios();
    this.imgSubs= this.modalImagenService.nuevaImagen
    .pipe(
      delay(1000)
    )
    .subscribe( img => {
      this.listarUsuarios()
      //console.log(img);

    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  listarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total, usuarios}) => {
      //console.log(resp);
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
  }

  cambiarPagina(valor: number){
    this.desde += valor;

    if( this.desde < 0){
      this.desde = 0;
    }else if(this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }
    this.listarUsuarios();
  }

  buscar(termino: string){
    //console.log(termino);
    if( termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.buscar('usuarios', termino)
    .subscribe(resultado => {
      //console.log(resultado);
      this.usuarios = resultado;
      }
    )

  }

  eliminarUsuario(usuario: Usuario){

    if(usuario.uid === this.usuarioService.uid ){
      return Swal.fire ( 'Error', 'No puedes eliminar tu propio usuario', 'error');
    }

    Swal.fire({
      title: "¿Borrar Usuario ?",
      text:  `Esta a Punto de Borrar a ${usuario.nombre}!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, Borrarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario( usuario )
        .subscribe( resp =>{

            this.listarUsuarios();
              Swal.fire (
                "Usuario Eliminado",
                `${usuario.nombre} Eliminado Correctamente!` ,
                "success"
              );
          }
        );
      }
    })
  }
  cambiarRole(usuario:Usuario){
    //console.log(usuario);
    this.usuarioService.guardarUsuario(usuario)
    .subscribe( resp =>{
      //console.log(resp);
    })
  }

  abrirModalImg(usuario: Usuario){
    //console.log(usuario);

    this.modalImagenService.abrirModalImg('usuarios', usuario.uid, usuario.img);

  }
}
