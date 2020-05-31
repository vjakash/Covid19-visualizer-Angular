import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.css'],
})
export class CountsComponent implements OnInit {
  model = 'cumulative';
  totalData;
  lastUpdatedHours;
  lastUpdatedMins;
  display = false;
  displayCumChart = false;
  cumulative;
  dailyData;
  stateCode="";
  stateGraphView=false;
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
    this.stateCode=this.data.getStateCode();
    this.stateGraphView=this.data.getStateGraphView();
    this.data.getDetailedData().subscribe(
      (data) => {
        this.totalData = data["statewise"][0];
        this.display = true;
        let arr=this.totalData.lastupdatedtime.split(/[\s,/,:]+/);
        arr=arr.map(data=>parseInt(data));
        // console.log(arr);
        let date: any = new Date(arr[2],arr[1]-1,arr[0],arr[3],arr[4],arr[5]);
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
}
