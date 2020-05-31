import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-each-state',
  templateUrl: './each-state.component.html',
  styleUrls: ['./each-state.component.css']
})
export class EachStateComponent implements OnInit {
ind;
faArrowUp=faArrowUp;
StateData;
districtData;
stateCode;
model = 'cumulative';
  constructor(private activatedRoute:ActivatedRoute,private data:DataService) {

    this.ind=this.activatedRoute.snapshot.params.id;
    this.data.getDetailedData().subscribe((data)=>{
      this.StateData = data['statewise'].filter((item,index) => {
        if(index!=0){
          return item;
        }
      });
      this.stateCode=this.StateData[this.ind]["statecode"].toLowerCase();
      // console.log(this.StateData);
    })
    
    this.data.getStateData().subscribe((data)=>{
     this.districtData=Object.entries(data[this.StateData[this.ind].state]["districtData"]);
    //  console.log(this.districtData)
    })
   }

  ngOnInit(): void {
  }

}
