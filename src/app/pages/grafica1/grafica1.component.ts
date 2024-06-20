import { Component} from '@angular/core';
import { Grafica } from '../../components/graficas.interface';
import { ChartData } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {
  // dataGrafica1:Grafica=
  // {
  // titulo:"Ventas",
  // labels:[ "Download Sales", "In-Store Sales", "Mail-Order Sales" ],
  // data:[ 300, 200, 50 ],
  // colores:['#9E120E','#FF5800','#FFB414']
  // }

  // dataGrafica2:Grafica=
  // {
  // titulo:"Finanzas",
  // labels:[ "I SEMESTRE", "II SEMESTRE", "III SEMESTRE" ],
  // data:[ 50, 50, 50 ],
  // colores:['red','green','orange']
  // }

  // dataGrafica3:Grafica=
  // {
  // titulo:"Compras",
  // labels:[ "Compras I SEMESTRE", "Compras II SEMESTRE", "Compras III SEMESTRE" ],
  // data:[ 600, 800, 50 ],
  // colores:['purple','pink','blue']
  // }

  // dataGrafica4:Grafica=
  // {
  // titulo:"Compras",
  // labels:[ "Compras I SEMESTRE", "Compras II SEMESTRE", "Compras III SEMESTRE" ],
  // data:[ 600, 800, 50 ],
  // colores:['purple','pink','blue']
  // }
  doughnutChartLabels: string[] = [ 'Pan', 'Refresco', 'Tacos' ];
  public data1:ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {  data: [ 40, 10, 100 ],
          backgroundColor: ['#00821C','#09DB36','#024D0F'],
          hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
          hoverBorderColor:['#000000','#000000','#00000003']
      },
    ]
  };

}


