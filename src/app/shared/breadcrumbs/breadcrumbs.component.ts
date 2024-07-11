import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Event, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo : string = '';
  public tituloSubs$: Subscription;


  constructor (private router: Router){
    this.tituloSubs$ = this.getDataRuta()
                        .subscribe( ({titulo}) => {
                          //console.log(titulo);
                          this.titulo = titulo;
                          document.title = `AdminPro - ${ titulo }`;
                        } );

  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getDataRuta(){
    return this.router.events
    .pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
      map((event:ActivationEnd) => event.snapshot.data)

  );
  }
}
