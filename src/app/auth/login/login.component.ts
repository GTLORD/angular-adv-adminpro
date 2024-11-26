import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare const google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formEnviado = false;


  public loginForm: FormGroup = this.fb.group({

    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    remember : [false]

  });


  constructor(private router: Router,
          private fb: FormBuilder,
          private usuarioService: UsuarioService,
          private ngZone: NgZone
  ) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }
  googleInit(){
    google.accounts.id.initialize({
      client_id: '911957382879-dfskfj5nd5svmni4bsji3o10f9hla5d0.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
    .subscribe( resp => {
      console.log({login: resp})
      this.ngZone.run( () => {
        this.router.navigateByUrl('/');
      })
    })
  };


  login(){
    //this.router.navigateByUrl('/')
    this.usuarioService.login( this.loginForm.value)
    .subscribe(  {
      next: (resp) =>{

        this.router.navigateByUrl('/');
        console.log('usuario logueado');
        console.log(resp)
        this.router.navigateByUrl('/')
        if ( this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')!.value);
        }else{
          localStorage.removeItem('email');
        }
      },error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }


    });



  }


}
