import { Component, Input, OnInit, SimpleChanges, } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Grafica } from '../graficas.interface';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: ``
})
export class DonaComponent {
  // @Input() datosGrafica!:Grafica
  // @Input() title:string = '';
  // @Input('data') arrData:number[] = [];
  // @Input('labels') arrLabels:string[] = [];
  // @Input('colors') arrColors:string[] = [] ;

  // public doughnutChartData: ChartData<'doughnut'> ={datasets:[]};
  // public doughnutChartType: ChartType = 'doughnut';


  // ngOnInit(){
  //   this.doughnutChartData =  {
  //     labels: this.arrLabels,
  //     datasets: [
  //       {
  //         data: this.arrData,
  //         backgroundColor:this.arrColors
  //       },
  //     ]
  //   }
  // }
  // pintaGrafico(datos:Grafica){
  //   this.doughnutChartData = {
  //     labels: datos.labels,
  //     datasets: [
  //       { data: datos.data,
  //       backgroundColor:datos.colores}
  //     ],
  //   };

  // }

  @Input() title:string = '';
  public doughnutChartLabels: string[] = ['label1', 'label2', 'label3'];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
   labels: this.doughnutChartLabels,
   datasets: [
      {  data: [ 350, 450, 100 ],
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBackgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBorderColor:['#000000','#000000','#00000003']
      },
    ]
  };
 public doughnutChartType: ChartType = 'doughnut';

 // events
 public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
   console.log(event, active);
 }

 public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
   console.log(event, active);
 }
}


