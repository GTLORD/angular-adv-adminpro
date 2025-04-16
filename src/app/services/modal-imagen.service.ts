import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModalImg: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModalImg(){
    return this._ocultarModalImg;
  }

  abrirModalImg(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no_img'
  ){
    this._ocultarModalImg = false;
    this.tipo = tipo;
    this.id = id;
    if (img.includes('https')){
      this.img = img;
    }else{
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }

    console.log(this.img);

  }

  cerrarModalImg(){
    this._ocultarModalImg = true;
  }

  constructor() { }


}
