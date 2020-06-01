import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.css']
})
export class MainDashComponent implements OnInit {

  constructor(private data:DataService) { }

  ngOnInit(): void {
  }

  changeGraph(){
    // console.log(stateCode);
    // let code=stateCode.toLowerCase();
  this.data.setStateCode("");
  this.data.setStateGraphView(false);
  }
}
