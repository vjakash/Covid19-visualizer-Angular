import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CurrencyPipe } from '@angular/common';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  faArrowUp = faArrowUp;
  faSearch=faSearch;
  StateData;
  count=1;
  searchTerm;
  display = false;
  totalData;
  lastUpdatedHours;
  lastUpdatedMins;
  todayTotalConfirm=0;
  // todayTotalActive;
  todayTotalRecovered=0;
  todayTotalDeceased=0;
  constructor(private data: DataService) {
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
    this.data.getDetailedData().subscribe((data) => {
      this.StateData = data['statewise'].filter((item, index) => {
        if (index != 0) {
          item["position"]=index;
          return item;
        }
      });
      this.StateData.forEach((item)=>{
        // console.log(item);
        this.todayTotalConfirm+=parseInt(item.deltaconfirmed);
        // this.todayTotalActive+=item.deltaconfirmed;
        this.todayTotalRecovered+=parseInt(item.deltarecovered);
        this.todayTotalDeceased+=parseInt(item.deltadeaths);
      })
      // console.log(this.StateData);
    });
  }

  ngOnInit(): void {}
  changeGraph(stateCode) {
    // console.log(stateCode);
    // this.data.setChangeState(false);
    if(this.count==1){
      this.data.setChangeState(true);
      this.count=2;
    }
    else{
      this.data.setChangeState(false);
      this.count=1;
    }
    let code = stateCode.toLowerCase();
    this.data.setStateCode(code);
    this.data.setStateGraphView('true');
  }
  changeGraph1(){
    // console.log(stateCode);
    // let code=stateCode.toLowerCase();
  this.data.setStateCode("");
  this.data.setStateGraphView(false);
  }
  updateGeoChart(cato,color1,color2){
    this.data.updateGeoChartColor(color1,color2);
    this.data.geoChartCato.next(cato);
  }
}
