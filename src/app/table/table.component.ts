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
  todayTotalConfirm=0;
  // todayTotalActive;
  todayTotalRecovered=0;
  todayTotalDeceased=0;
  constructor(private data: DataService) {
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

}
