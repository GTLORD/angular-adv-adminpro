import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pipe } from 'rxjs';

import { environment } from '../../environments/environments';

import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }

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

  private transformarUsuarios( resultado: any[]): Usuario[]{
    return resultado.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    )
  }

  private transformarHospitales(resultados: any): Hospital[]{
    return resultados
  }

    private transformarMedicos(resultados: any): Medico[]{
    return resultados
  }
  busquedaGlobal(termino: string){
    const url = `${base_url}/todo/${termino}`;
    return this.http.get(url, this.headers)

  }


  buscar(
          tipo: 'usuarios'|'medicos'|'hospitales',
          termino : string
  ){
    //http://localhost:3000/api/todo/coleccion/
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
          .pipe(
            map((resp: any ) => {
              switch (tipo) {
                case 'usuarios':
                  return this.transformarUsuarios( resp.resultado )
                case 'hospitales':
                  return this.transformarHospitales( resp.resultado )
                case 'medicos':
                  return this.transformarMedicos( resp.resultado )
                default:
                  return [];
              }
            }
          )
        );
  }

}

