import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environments';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;


  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {

  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid  || '';
  }

  get headers(){
    return {
      headers: {
      'x-token': this.token
      }
    }
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
        tap( (resp: any) => {
        //console.log(resp);
        localStorage.setItem('token', resp.token);
        })
    )
  }

  logout(){
    localStorage.removeItem('token');


    google.accounts.id.revoke(this.usuario.email, () => {

      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });
  }


  validarToken() {
    google.accounts.id.initialize({
      client_id:
        '911957382879-dfskfj5nd5svmni4bsji3o10f9hla5d0.apps.googleusercontent.com',
    });


    return this.http.get(`${ base_url }/login/renew`, {
        headers: { 'x-token': this.token },
      }).pipe(
        map ((resp: any) =>{
          const {email, google, nombre, role, img = '', uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email,   '', img, google,  role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),

        catchError(error => of(false))
      );
  }



  crearUsuario ( formData: RegisterForm ) {
    //console.log('Creando usuario');

    return  this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                tap( (resp: any) => {
                    localStorage.setItem('token', resp.token);
                  }
                )
              )


  }

  actualizarPerfil(data: {email:string, nombre: string, role?: string}) {

    data= {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  login( formData: LoginForm ){
    //console.log('Creando usuario');

    return this.http.post(`${base_url}/login`, formData)
               .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token);
                })
              )
  }

  cargarUsuarios(desde: number = 0){
    //http://localhost:3000/api/usuarios?desde=0
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
            .pipe(
              map( (resp) => {
                const usuarios = resp.usuarios
                .map (user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
                );

                return {
                  total: resp.total,
                  usuarios,
                }
              })
            )

  }
  eliminarUsuario(usuario: Usuario){
    //console.log('eliminando');
    // usuarios/66a283c51fcb1cf60ba3aab2
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

}
