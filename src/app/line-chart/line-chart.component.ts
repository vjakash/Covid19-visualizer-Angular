import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  chartData;
  @Input('type') type;
  @Input('section') section;
  @Input('cato') cato;
  chart: any = [];
  // lineChartData: Chart.ChartDataSets[] = [
  //   {
  //     label: 'My First dataset',
  //     fill: false,
  //     lineTension: 0.1,
  //     backgroundColor: 'rgba(255, 94, 126,0.4)',
  //     borderColor: 'rgba(255, 94, 126,1)',
  //     borderCapStyle: 'butt',
  //     borderDash: [],
  //     borderDashOffset: 0.0,
  //     borderJoinStyle: 'miter',
  //     pointBorderColor: 'rgba(255, 94, 126,1)',
  //     pointBackgroundColor: 'rgba(255, 94, 126,1)',
  //     pointBorderWidth: 1,
  //     pointHoverRadius: 10,
  //     pointHoverBackgroundColor: 'rgba(255, 94, 126,1)',
  //     pointHoverBorderColor: 'rgba(255, 94, 126,1)',
  //     pointHoverBorderWidth: 2,
  //     pointRadius: 1,
  //     pointHitRadius: 10,
  //     data: [24,45,5,54,654,41,5],

  //   },
  // ];
  // lineChartLabels: Array<any> = ["Sfbsg","zfhbsg"];
  // lineChartOptions: any = {
  //   responsive: true
  // };
  //  lineChartLegend = true;
  // lineChartType = 'line';
  // inlinePlugin: any;
  // textPlugin: any;

  constructor(private data: DataService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.load();
  }

  load() {
    // console.log(this.chartData);
    // this.chart.config.data.datasets[0].data= chartData.map((item)=>{
    //   return item[section];
    // });
    // this.chart.labels=chartData.map((item)=>{
    //   return item["date"];
    // });
    // this.chart.config.data.datasets[0].label=cato;
    //  // inline plugin
    //  this.textPlugin = [{
    //   id: 'textPlugin',
    //   beforeDraw(chart: any): any {
    //     const width = chart.chart.width;
    //     const height = chart.chart.height;
    //     const ctx = chart.chart.ctx;
    //     ctx.restore();
    //     const fontSize = (height / 114).toFixed(2);
    //     ctx.font = `${fontSize}em sans-serif`;
    //     ctx.textBaseline = 'middle';
    //     const text = this.cato;
    //     const textX = Math.round((width - ctx.measureText(text).width) / 2);
    //     const textY = height / 2;
    //     ctx.fillText(text, textX, textY);
    //     ctx.save();
    //   }
    // }];
    // this.inlinePlugin = this.textPlugin;
  }
  ngAfterViewInit() {
    let section = this.section;
    let type = this.type;
    let cato: string = this.cato;
    let chartData;
    let color;
    let chartType;
    let fill;
    if(cato=="Confirmed"){
      color='rgba(255, 94, 126,1)';
    }else if(cato=="Recovered"){
      color='#28A745';
    }else if(cato="Deceased"){
      color="#6C757D";
    }
    // console.log(section, type, cato);
    // console.log(this.chart);
    if (type == 'cumulative') {
      chartData = this.data.getCumdata();
      chartType="line";
      fill=false;
    } else {
      chartData = this.data.getDailydata();
      chartType="line";
      fill=true;

    }
    // console.log(chartData);
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: chartType,
      options: {
        responsive: true,
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          // text: 'Combo Bar and line Chart'
        }
       
      },
      data: {
        labels: chartData.map((item) => {
          return item['date'];
        }),
        datasets: [
          {
            type: chartType,
            label: cato,
            lineTension: 0,
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: color,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: color,
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 30,
            data: chartData.map((item) => {
              return item[section];
            }),
            backgroundColor: color,
            borderColor: color,
            fill: fill
          },
        ],
      },
    });
    // console.log(chartData.map((item) => {
    //   return item[section];
    // }),chartData.map((item) => {
    //   return item['date'];
    // }))
  }

}
