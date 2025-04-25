import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})
export class MedicoComponent implements OnInit{

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => this.cargarMedicoId( id ));


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
    .subscribe(hospitalId =>{
      //console.log(hospitalId);
      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId);
      //console.log(this.hospitalSeleccionado);
    })
  }

  cargarMedicoId( id: string ){
    if( id === 'nuevo'){
      return;
    }
    this.medicoService.obtenerMedicoById( id )
    .pipe(
      delay(500)
    )
    .subscribe({
      next: (medico)  => {

        //console.log(medico);
        const nombreMedico = medico.nombre;
        const hospitalId = medico.hospital[0]._id;
        // console.log("Nombre del médico:", nombreMedico);
        // console.log("ID del hospital:", hospitalId);
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue(
          {nombre: nombreMedico,
          hospital: hospitalId});
      },error:(err) => {
        Swal.fire('Error', 'Ese Medico no Existe', 'error');

        return this.router.navigateByUrl('/dashboard/medicos');
      }
    });
  }


  cargarHospitales(){

    this.hospitalService.cargarHospitales()
    .subscribe( (hospitales: Hospital[]) =>{
      //console.log(hospitales);
      this.hospitales = hospitales;
    })
  }

  guardarMedico(){
    console.log(this.medicoSeleccionado);
    const {nombre} = this.medicoForm.value;
    if(this.medicoSeleccionado){

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
      .subscribe( {
        next: (resp: any) => {
          console.log(resp);
          Swal.fire('Actualizado', `${nombre} Actualizado Correctamente`, 'success');
          },
        error:(err) => {
          //console.log( err);
          //  console.log(err.error.mensaje);
          Swal.fire('Error', err.error.mensaje, 'error');
        }
      })
    }else {
      this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe( {
        next: (resp: any) => {
          //console.log(resp);
          Swal.fire('Creado', `${nombre} Creado Correctamente`, 'success');
          this.router.navigate(['/dashboard','medico', `${resp.medico._id}`]);
        },
        error:(err) => {
          //console.log( err);
          //  console.log(err.error.mensaje);
          Swal.fire('Error', err.error.mensaje, 'error');
        }
      })
    }
    //console.log(this.medicoForm.value);
  }
}

