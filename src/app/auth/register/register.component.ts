import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formEnviado = false;


  public registerForm: FormGroup = this.fb.group({
    nombre: ['Andres', [ Validators.required, Validators.minLength(3)] ],
    email: ['test100@com.com', [Validators.required, Validators.email] ],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.requiredTrue],
  },{
    validators: this.passwordsIguales('password', 'password2')
  } as FormControlOptions);

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router
  ) {}

  crearUsuario(){
    this.formEnviado = true;
    console.log(this.registerForm.value);

    if ( this.registerForm.invalid){
      return;
    }

    //Realizar creación usuario
    this.usuarioService.crearUsuario( this.registerForm.value)
        .subscribe({
          next: (resp) =>{
            Swal.fire('Usuario creado', 'El usuario fue creado con éxito','success');
            this.router.navigateByUrl('/');
          },error: (err) =>{
            Swal.fire('Error', err.error.mensaje, 'error')
          }
        });

  }


  campoNoValido( campo: string ): boolean {
    if( this.registerForm.get(campo)?.invalid && this.formEnviado){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')!.value;
    const pass2 = this.registerForm.get('password2')!.value;

    if( (pass1 !== pass2) && this.formEnviado){
      return true;
    }else{
      return false;
    }

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formEnviado
  }

  passwordsIguales(pass1Name: string, pass2Name: string){

    return (formGroup: FormGroup) => {
      const pass1Control  =  formGroup.get(pass1Name)!;
      const pass2Control =  formGroup.get(pass2Name)!;

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null)
      }else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }
  }
}
