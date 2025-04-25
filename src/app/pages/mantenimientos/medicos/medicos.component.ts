import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent implements OnInit, OnDestroy {


  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public hospitalesTemp: any[] = []
  public cargando: boolean = true;
  public imgSubs: Subscription;
  public desde: number = 0;
  public totalMedicos: number = 0;

  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService
  ){}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs= this.modalImagenService.nuevaImagen
            .pipe(
              delay(1000)
            )
            .subscribe( img => {
              this.cargarMedicos()
              //console.log(img);

            });
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde)
    .subscribe( ({total, medicos}) => {
      //console.log(medicos);
      this.totalMedicos = total;
      this.medicos = medicos;
      this.medicosTemp = medicos;
      this.cargando = false;

    })
  }



  cambiarPagina(valor: number){
    this.desde += valor;

    if( this.desde < 0){
      this.desde = 0;
    }else if(this.desde >= this.totalMedicos){
      this.desde -= valor;
    }
    this.cargarMedicos();
  }

  abrirModalImg(medico: Medico){
      console.log(medico);

      this.modalImagenService.abrirModalImg('medicos', medico._id, medico.img);

  }

  buscar(termino: string){
    //console.log(termino);
    if( termino.length === 0){
      return this.cargarMedicos();
    }
    this.busquedasService.buscar('medicos', termino)
    .subscribe(resultado => {
      console.log(resultado);
      this.medicos = resultado;
      }
    )

  }
  eliminarMedico(medico:Medico){
      //console.log(hospital);
      Swal.fire({
        title: "¿Borrar Medico ?",
        text:  `Esta a Punto de Borrar a ${medico.nombre}!`,
        icon: "question",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "SI, Borrarlo!",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText:'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.medicoService.borrarMedico( medico._id)
          .subscribe( {
            next: (resp) =>{
              //console.log( resp);
            this.cargarMedicos();
            Swal.fire('Borrado', `${medico.nombre} Eliminado Correctamente!`, 'success');
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


}
