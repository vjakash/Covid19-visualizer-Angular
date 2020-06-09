import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.css'],
})
export class CountsComponent implements OnInit, DoCheck {
  model = 'cumulative';
  columnNames = ['State', 'Cases'];
  geoOptions = {
    region: 'IN',
    displayMode: 'regions',
    resolution: 'provinces',
    width: 640,
    height: 480,
    datalessRegionColor: 'transparent',
    enableRegionInteractivity: true,
    colorAxis: { colors: ['#FFDFDF', '#ff0000'] },
  };
  geoData = [
    ['Kerala', 500],
    ['IN-Tn', 499],
  ];
  category = 'Confirmed';
  totalData;
  tempTotalData;
  lastUpdatedHours;
  lastUpdatedMins;
  display = false;
  displayCumChart = false;
  cumulative;
  dailyData;
  stateCode = '';
  stateGraphView = false;
  changeState = false;
  state;
  prev;
  geoChartCato = 'confirmed';
  typeCum = {
    type: 'cumulative',
    section: ['totalconfirmed', 'totalrecovered', 'totaldeceased'],
    cato: ['Confirmed', 'Recovered', 'Deceased'],
  };
  typeDaily = {
    type: 'daily',
    section: ['dailyconfirmed', 'dailyrecovered', 'dailydeceased'],
    cato: ['Confirmed', 'Recovered', 'Deceased'],
  };

  constructor(private data: DataService, private router: Router) {
    this.data.getDetailedData().subscribe(
      (data) => {
        // console.log(data);
        this.tempTotalData = data.statewise;
        data.statewise.map((item, index) => {
          let state = item.state;
          if (index != 0) {
            if (item.state == 'Odisha') {
              state = 'Orissa';
            }
            if (item.state == 'Uttarakhand') {
              state = 'IN-UT';
            }
            this.geoData.push([state, item[String('confirmed')]]);
          }
        });
        this.data.geoChartCato.subscribe((cato) => {
          this.geoData = [
            ['Kerala', 500],
            ['IN-Tn', 499]
          ];
          // console.log(cato,this.geoData);
          data.statewise.map((item, index) => {
            // console.log(item,index);
            let state=item.state;
            if (index != 0) {
              if (item.state == 'Odisha') {
                state = 'Orissa';
              }
              if (item.state == 'Uttarakhand') {
                state = 'IN-UT';
              }
              this.geoData.push([state, item[String(cato)]]);
              let color = this.data.getGeoChartColor();
              // console.log(color);
              this.geoOptions.colorAxis.colors = color;
            }
          });
          if (String(cato) == 'deaths') {
            cato = 'deseased';
          }
          this.category =
            String(cato)[0].toUpperCase() +
            String(cato).substring(1, String(cato).length);
        });
        // this.data.geoChartCato.next("confirmed");
        this.totalData = data['statewise'][0];
        this.totalData.name = 'India';
        this.display = true;
        let arr = this.totalData.lastupdatedtime.split(/[\s,/,:]+/);
        arr = arr.map((data) => parseInt(data));
        // console.log(arr);
        let date: any = new Date(
          arr[2],
          arr[1] - 1,
          arr[0],
          arr[3],
          arr[4],
          arr[5]
        );
        let diff = Math.abs(Date.now() - date);
        // console.log(date,diff);
        this.lastUpdatedMins = Math.floor((diff / (1000 * 60)) % 60);
        this.lastUpdatedHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        // console.log(this.totalData,this.lastUpdatedHours,this.lastUpdatedMins,diff);
      },
      (err) => {
        alert(
          'An Error Ocuured while loading data! please try again after some time'
        );
      }
    );

    this.data.getDetailedData().subscribe(
      (data) => {
        // console.log(data);
        this.cumulative = data['cases_time_series'].map((item) => {
          return {
            date: item.date,
            totalconfirmed: item.totalconfirmed,
            totaldeceased: item.totaldeceased,
            totalrecovered: item.totalrecovered,
          };
        });
        this.data.storeCumdata(this.cumulative);

        this.dailyData = data['cases_time_series'].map((item) => {
          return {
            date: item.date,
            dailyconfirmed: item.dailyconfirmed,
            dailydeceased: item.dailydeceased,
            dailyrecovered: item.dailyrecovered,
          };
        });
        this.data.storeDailydata(this.dailyData);
        this.displayCumChart = true;
        // console.log(this.cumulative,this.dailyData);
      },
      (err) => {
        alert(
          'An Error Ocuured while loading data! please try again after some time'
        );
      }
    );
  }

  ngOnInit(): void {}
  ngDoCheck(): void {
    this.state = this.data.getState();
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // console.log("From counts",this.data.getStateCode(),this.data.getStateGraphView())
    if (
      typeof this.data.getStateCode() != 'object' &&
      typeof this.data.getStateGraphView() != 'object' &&
      String(this.data.getStateCode()) != this.prev
    ) {
      // console.log(this.data.getStateCode(),this.data.getStateGraphView());
      this.prev = String(this.data.getStateCode());
      this.stateCode = String(this.data.getStateCode());
      this.stateGraphView = Boolean(this.data.getStateGraphView());
      this.changeState = Boolean(this.data.getChangeState());
      // console.log(this.stateCode,this.stateGraphView,this.changeState);
    }
  }

  emitEvent(evnt) {
    // console.log(evnt);
    let data = this.tempTotalData[evnt['selection'][0]['row'] - 1];
    // console.log(data);
    this.totalData = {
      name: data.state,
      confirmed: data.confirmed,
      active: data.active,
      recovered: data.recovered,
      deaths: data.deaths,
    };
  }
}
