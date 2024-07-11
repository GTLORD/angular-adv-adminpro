import { Component, OnDestroy } from '@angular/core';
import {  filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor(){

    // this.retornaObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.warn('Error:', error),
    //   ()    => console.info('Obs terminado')

    // );
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
  retornaIntervalo(): Observable<number>{

    //const intervalo$ = interval(1000)
    return interval(10000)
            .pipe(
              take(5),
              map (valor => valor + 1),     //map(valor => { return valor + 1; })
              filter(valor => ( valor % 2 === 0 ) ? true : false), //filter(valor => { return valor % 2 === 0; })
              );

    //return intervalo$

  }

  retornaObservable(): Observable<number>{
    let i = -1;

    return new Observable<number>( observer => {

      const intervalo = setInterval( () => {

        //console.log('tick');
        i++
        observer.next(i);
        if (i === 4 ){
          clearInterval( intervalo );
          observer.complete();
        }
        if (i === 2 ){
          observer.error('i llego al valor de 2');

        }


      }, 1000 )


    });


  }
}
