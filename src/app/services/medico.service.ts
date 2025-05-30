import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


import { environment } from '../../environments/environments';
import { Medico } from '../models/medico.model';
import { CargarMedico } from '../interfaces/cargar-medicos.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class MedicoService {

  constructor(private http: HttpClient

  ) { }


  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
      'x-token': this.token
      }
    }
  }

  cargarMedicos(desde: number = 0){
    //http://localhost:3000/api/medicos
    const url = `${base_url}/medicos?desde=${desde}`;
    return this.http.get<CargarMedico>(url, this.headers)
    .pipe(
      map( (resp) => {
        const medicos = resp.medicos
        .map(medic => new Medico(medic.nombre, medic._id, medic.img,medic.usuario, medic.hospital)
        );

            return {
            total: resp.total,
            medicos,
          }
        }
      )
    )
  }

  obtenerMedicoById(id: string){
    //http://localhost:3000/api/medicos/:id
    const url = `${base_url}/medicos/${ id }`;
    return this.http.get<any>(url, this.headers)
            .pipe(
              map( (resp: {ok:boolean, medico: Medico }) => resp.medico)
            );

  }

  crearMedico(medico: {nombre: string, hospital: string}){
    //http://localhost:3000/api/medicos
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers)

  }

  actualizarMedico(medico: Medico ){
    ///http://localhost:3000/api/medicos
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers)

  }

  borrarMedico(_id: string){
    //http://localhost:3000/api/medicos
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers)

  }
}
