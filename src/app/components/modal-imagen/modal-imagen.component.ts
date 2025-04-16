import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService,
               private fileUploadService: FileUploadService
   ){}

  cerrarModalImg(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModalImg();
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
    const id= this.modalImagenService.id;
    const tipo= this.modalImagenService.tipo;

    this.fileUploadService
    .actualizarFoto(this.imagenSubir, tipo, id )
    .then( img => {
      Swal.fire('Guardado', 'La imagen fue guardada', 'success');
      this.modalImagenService.nuevaImagen.emit(img);

      this.cerrarModalImg();
    }, (err) => {
      //  console.log( err);
      //  console.log(err.error.mensaje);
      Swal.fire('Error', err.error.mensaje, 'error');
    });
  }

}
