import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CurrencyPipe } from '@angular/common';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  faArrowUp=faArrowUp;
StateData;
  constructor(private data:DataService) {

    this.data.getDetailedData().subscribe((data)=>{
      this.StateData = data['statewise'].filter((item,index) => {
        if(index!=0){
          return item;
        }
      });
    })
   }

  ngOnInit(): void {
  }
changeGraph(stateCode){
  console.log(stateCode);
this.data.setStateCode(stateCode.toLowerCase());
this.data.setStateGraphView("true");
}
}
