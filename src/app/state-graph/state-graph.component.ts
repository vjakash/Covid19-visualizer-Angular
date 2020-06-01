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
  selector: 'app-state-graph',
  templateUrl: './state-graph.component.html',
  styleUrls: ['./state-graph.component.css'],
})
export class StateGraphComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  @Input('code') code;
  @Input('cato') cato;
  @Input('model') model;
  state;
  chart: any = [];

  constructor(private data: DataService, private elementRef: ElementRef) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    let state;
    let section = 'kg';
    let type = 'hvj';
    let cato: string = this.cato;
    let chartData: any = [];
    let chartLabel: any = [];
    let color;
    let fill=false;
    this.data.getDetailedData().subscribe((data)=>{
      // console.log(data);
      for(let item of data["statewise"]){
        if(item.statecode.toLowerCase()==this.code){
          this.state=item.state;
          this.data.setState(item.state);
        }
      }
    })
    if (this.model == 'cumulative') {

      if (cato == 'Confirmed') 
      {
        color = 'rgba(255, 94, 126,1)';
        this.data.getStateDaily().subscribe((data) => {
          // console.log(data)
          let sum=0;
          data['states_daily'].forEach((item, index) => {
            if (index % 3 == 0) {
              chartLabel.push(item['date'].substring(0, 6));
              sum+=parseInt(item[this.code])
              chartData.push(sum);
            }
          });
          this.load(cato, color, chartLabel, chartData,fill);
          // console.log(chartData,chartLabel);
        });
      } 
      else if (cato == 'Recovered') 
      {
        color = '#28A745';
        this.data.getStateDaily().subscribe((data) => {
          // console.log(data["states_daily"])
          let check = 1;
          let sum=0;
          data['states_daily'].forEach((item, index) => {
            if (index == check) {
              chartLabel.push(item['date'].substring(0, 6));
              sum+=parseInt(item[this.code])
              chartData.push(sum);
              check += 3;
            }
          });
          this.load(cato, color, chartLabel, chartData,fill);
          // console.log(chartData,chartLabel);
        });
      } else if ((cato = 'Deceased')) {
        color = '#6C757D';
        this.data.getStateDaily().subscribe((data) => {
          // console.log(data["states_daily"])
          let check = 2;
          let sum=0;
          data['states_daily'].forEach((item, index) => {
            if (index == check) {
              chartLabel.push(item['date'].substring(0, 6));
              sum+=parseInt(item[this.code])
              chartData.push(sum);
              check += 3;
            }
          });
          this.load(cato, color, chartLabel, chartData,fill);
          // console.log(chartData,chartLabel);
        });
      }

    } else {
      fill=true;
      if (cato == 'Confirmed') {
        color = 'rgba(255, 94, 126,1)';
        this.data.getStateDaily().subscribe((data) => {
          // console.log(data["states_daily"])
          data['states_daily'].forEach((item, index) => {
            if (index % 3 == 0) {
              chartLabel.push(item['date'].substring(0, 6));
              chartData.push(parseInt(item[this.code]));
            }
          });
          this.load(cato, color, chartLabel, chartData,fill);
          // console.log(chartData,chartLabel);
        });
      } else if (cato == 'Recovered') {
        color = '#28A745';
        this.data.getStateDaily().subscribe((data) => {
          // console.log(data["states_daily"])
          let check = 1;
          data['states_daily'].forEach((item, index) => {
            if (index == check) {
              chartLabel.push(item['date'].substring(0, 6));
              chartData.push(parseInt(item[this.code]));
              check += 3;
            }
          });
          this.load(cato, color, chartLabel, chartData,fill);
          // console.log(chartData,chartLabel);
        });
      } else if ((cato = 'Deceased')) {
        color = '#6C757D';
        this.data.getStateDaily().subscribe((data) => {
          // console.log(data["states_daily"])
          let check = 2;
          data['states_daily'].forEach((item, index) => {
            if (index == check) {
              chartLabel.push(item['date'].substring(0, 6));
              chartData.push(parseInt(item[this.code]));
              check += 3;
            }
          });
          this.load(cato, color, chartLabel, chartData,fill);
          // console.log(chartData,chartLabel);
        });
      }
    }

    // console.log(chartData);

    // console.log(chartData.map((item) => {
    //   return item[section];
    // }),chartData.map((item) => {
    //   return item['date'];
    // }))
  }
  load(cato, color, chartLabel, chartData,fill) {
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'line',
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          // text: 'Combo Bar and line Chart'
        },
      },
      data: {
        labels: chartLabel,
        datasets: [
          {
            type: 'line',
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
            data: chartData,
            backgroundColor: color,
            borderColor: color,
            fill: fill,
          },
        ],
      },
    });
  }
}
