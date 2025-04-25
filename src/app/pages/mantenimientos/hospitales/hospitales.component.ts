import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit, OnDestroy{

  public hospitales: Hospital[] = [];
  public hospitalesTemp: any[] = []
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService
  ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs= this.modalImagenService.nuevaImagen
        .pipe(
          delay(1000)
        )
        .subscribe( img => {
          this.cargarHospitales()
          //console.log(img);

        });

  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
    .subscribe( hospitales => {
      //console.log(hospitales);
      this.cargando = false;
      this.hospitales = hospitales;

    })
  }

  guardarCambios(hospital:Hospital){
    //console.log(hospital);
    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre)
    .subscribe({
      next: (resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      },
      error:(err) => {
        //console.log( err);
        //  console.log(err.error.mensaje);
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    })

  }

  eliminarHospital(hospital:Hospital){
    //console.log(hospital);
    Swal.fire({
      title: "¿Borrar Hospital ?",
      text:  `Esta a Punto de Borrar a ${hospital.nombre}!`,
      icon: "question",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "SI, Borrarlo!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText:'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital( hospital._id)
        .subscribe( {
          next: (resp) =>{
            //console.log( resp);
          this.cargarHospitales();
          Swal.fire('Borrado', `${hospital.nombre} Eliminado Correctamente!`, 'success');
          },
          error:(err) => {
          //console.log( err);
          //  console.log(err.error.mensaje);
          Swal.fire('Error', err.error.mensaje, 'error');
          }
        })
      }
    })
  }

  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: "Ingrese el Nombre del Hospital",
      inputPlaceholder: "Nombre del Hospital",
      confirmButtonText:'Crear Hospital',
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      cancelButtonColor: "#d33",
    });
    console.log(value);
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital( value )
      .subscribe({
        next: (resp: any) => {
          this.hospitales.push( resp.hospital)
          this.cargarHospitales();
          Swal.fire('Creado', value, 'success');
        },
        error:(err) => {
          //console.log( err);
          //  console.log(err.error.mensaje);
          Swal.fire('Error', err.error.mensaje, 'error');
        }
      })
    }
  }
  abrirModalImg(hospital: Hospital){
      console.log(hospital);

      this.modalImagenService.abrirModalImg('hospitales', hospital._id, hospital.img);

  }

  buscar(termino: string){
    //console.log(termino);
    if( termino.length === 0){
      return this.cargarHospitales();
    }
    this.busquedasService.buscar('hospitales', termino)
    .subscribe(resultado => {
      console.log(resultado);
      this.hospitales = resultado;
      }
    )

  }


}

// next: () => {
//       const { nombre, email } = this.perfilForm.value;
//         this.usuario.nombre = nombre;
//         this.usuario.email = email;
//         //console.log(resp);
//         Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
//       },
//       error: (err) => {
//         //  console.log( err);
//         //  console.log(err.error.mensaje);
//         Swal.fire('Error', err.error.mensaje, 'error');
//       }
