import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor ( private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private fileUploadService: FileUploadService
              ){

    this.usuario = this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email:  [this.usuario.email, [Validators.required, Validators.email]]
    });

  }

  actualizarPerfil(){
    //console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe( {
      next: () => {
      const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        //console.log(resp);
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      error: (err) => {
        //  console.log( err);
        //  console.log(err.error.mensaje);
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    });
  }

  cambiarImagen(event){
    //console.log(event.target.files[0].name);
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(event.target.files[0].name.split(".").pop())) {
      Swal.fire('Error',`El fichero no contiene una extension valida ( ${extensionesValidas} )`,'error');
      return this.imgTemp = null;
    }


    if(!event.target.files[0]){
      this.imagenSubir = null;
      return this.imgTemp = null;
    } else {
      const file = event.target.files[0];
      this.imagenSubir = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
         this.imgTemp = reader.result;
      }
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid )
    .then( img => {
      this.usuario.img = img;
    Swal.fire('Guardado', 'La imagen fue guardada', 'success');
    }, (err) => {
      //  console.log( err);
      //  console.log(err.error.mensaje);
      Swal.fire('Error', err.error.mensaje, 'error');
    });
  }
}
