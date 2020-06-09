import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {Sort} from '@angular/material/sort';
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
  display=false;
  faArrowUp = faArrowUp;
  faSearch = faSearch;
  StateData;
  districtData;
  districtDataStorage;
  stateCode;
  searchTerm;
  chart: any = [];
  topFiveValue = [];
  topFiveConfirm=[];
  topFiveRec=[];
  topFiveDec=[];
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
      this.data.getStateData().subscribe((data) => {
      //  console.log( data[this.StateData[this.ind].state]['districtData']);
        this.districtData = Object.entries(
          data[this.StateData[this.ind].state]['districtData']
        );
        // console.log(this.districtData);
        this.districtDataStorage=[...this.districtData];
        this.districtData.forEach((data) => {
          // console.log(this.topFiveValue, this.topFiveName);
          if (this.topFiveValue.length == 0) {
            this.topFiveValue.push(data[1].active);
            this.topFiveConfirm.push(data[1].confirmed);
            this.topFiveRec.push(data[1].confirmed);
            this.topFiveDec.push(data[1].confirmed);
            this.topFiveName.push(data[0]);
          } else {
            for (let item of this.topFiveValue) {
              if (data[1].active > item) {
                this.topFiveValue.push(data[1].active);
                this.topFiveConfirm.push(data[1].confirmed);
                this.topFiveRec.push(data[1].recovered);
                this.topFiveDec.push(data[1].deceased);
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
              this.topFiveConfirm.splice(index,1);
              this.topFiveRec.splice(index,1);
              this.topFiveDec.splice(index,1);
              this.topFiveName.splice(index, 1);
            }
          }
        });
        this.load();
      });
      // console.log(this.StateData);
    });

    
    this.display=true;
  }

  ngOnInit(): void {}
  load() {
   
    let color = '#007BFF';
    let fill= true;
    let label=this.topFiveName;
    let dataActive=this.topFiveValue;
    let dataConfirm=this.topFiveConfirm;
    let dataRec=this.topFiveRec;
    let dataDec=this.topFiveDec;
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
            label: ' Active Cases',
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
            data: dataActive,
            backgroundColor: color,
            borderColor: color,
            fill: fill,
          },{
            type: 'bar',
            label: ' Confirmed Cases',
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
            data: dataConfirm,
            backgroundColor: "#FF073A",
            borderColor: "#FF073A",
            fill: fill,
          },{
            type: 'bar',
            label: ' Recovered Cases',
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
            data: dataRec,
            backgroundColor: "#28A745",
            borderColor: "#28A745",
            fill: fill,
          },{
            type: 'bar',
            label: ' Deceased Cases',
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
            data: dataDec,
            backgroundColor: "#6C757D",
            borderColor: "#6C757D",
            fill: fill,
          }
        ],
      },
    });
  }
  sortData(sort: Sort) {
    const data = [...this.districtData];
    // console.log(sort.direction)
    if (!sort.active || sort.direction === '') {
      this.districtDataStorage = data;
      return;
    }

    this.districtDataStorage = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'District': return compare(a[0], b[0], isAsc);
        case 'Confirmed': return compare(a[1].confirmed, b[1].confirmed, isAsc);
        case 'Active': return compare(a[1].active, b[1].active, isAsc);
        case 'Recovered': return compare(a[1].recovered, b[1].recovered, isAsc);
        case 'Deceased': return compare(a[1].deceased, b[1].deceased, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}