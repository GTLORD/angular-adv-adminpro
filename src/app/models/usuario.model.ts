import { environment } from "../../environments/environments"

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre:      string,
    public email:       string,
    public password?:   string,
    public img?:        string,
    public google?:     boolean,
    public role?:       'USER_ROLE' | 'ADMIN_ROLE',
    public uid?:        string,

  ){}

  get imagenUrl() {

    if(!this.img){
      return `${ base_url }/upload/usuarios/no-image`;
    }else if ( this.img.includes('https') ) {
      return this.img;
    }else if ( this.img ) {
        return `${ base_url }/upload/usuarios/${ this.img }`;
    } else {
        return `${ base_url }/upload/usuarios/no-image`;
    }
  }
}

