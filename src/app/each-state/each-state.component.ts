import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-each-state',
  templateUrl: './each-state.component.html',
  styleUrls: ['./each-state.component.css'],
})
export class EachStateComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  ind;
  faArrowUp = faArrowUp;
  faSearch = faSearch;
  StateData;
  districtData;
  stateCode;
  searchTerm;
  chart: any = [];
  topFiveValue = [];
  topFiveName = [];
  model = 'cumulative';
  columnNames = ['District', 'Cases'];
  geoOptions = {
    region: 'IN-TN',
    displayMode: 'regions',
    resolution: 'provinces',
    width: 640,
    height: 480,
    datalessRegionColor: 'transparent',
    enableRegionInteractivity: true,
    colorAxis: { colors: ['#FFDFDF', '#ff0000'] },
  };
  geoData = [
    ['Madurai', 500],
    ['Chennai', 499],
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private elementRef: ElementRef
  ) {
    this.ind = this.activatedRoute.snapshot.params.id;
    this.data.getDetailedData().subscribe((data) => {
      this.StateData = data['statewise'].filter((item, index) => {
        if (index != 0) {
          return item;
        }
      });
      this.stateCode = this.StateData[this.ind]['statecode'].toLowerCase();
      // console.log(this.StateData);
    });

    this.data.getStateData().subscribe((data) => {
      this.districtData = Object.entries(
        data[this.StateData[this.ind].state]['districtData']
      );
      // console.log(this.districtData);
      this.districtData.forEach((data) => {
        // console.log(this.topFiveValue, this.topFiveName);
        if (this.topFiveValue.length == 0) {
          this.topFiveValue.push(data[1].active);
          this.topFiveName.push(data[0]);
        } else {
          for (let item of this.topFiveValue) {
            if (data[1].active > item) {
              this.topFiveValue.push(data[1].active);
              this.topFiveName.push(data[0]);
              break;
            }
          }
        }
        if (this.topFiveValue.length == 6) {
          let min = Math.min(...this.topFiveValue);
          // console.log(min);
          let index = this.topFiveValue.indexOf(min);
          if (index !== -1) {
            this.topFiveValue.splice(index, 1);
            this.topFiveName.splice(index, 1);
          }
        }
      });
      this.load();
    });
  }

  ngOnInit(): void {}
  load() {
   
    let color = 'rgba(255, 94, 126,1)';
    let fill= true;
    let label=this.topFiveName;
    let data=this.topFiveValue;
    // console.log(chartData);
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'bar',
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
        labels: label,
        datasets: [
          {
            type: 'bar',
            label: ' ACTIVE CASES',
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
            data: data,
            backgroundColor: color,
            borderColor: color,
            fill: fill,
          },
        ],
      },
    });
  }
}
