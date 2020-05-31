import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
cumData;
dailyData;
stateCode="";
stateGraphView=false;
  constructor(private http:HttpClient) { }

  getIndiaData():Observable<any>{
    return this.http.get('https://covid19.mathdro.id/api/countries/india/confirmed');
  }
  getDetailedData():Observable<any>{
    return this.http.get('https://api.covid19india.org/data.json');
  }
  getStateData():Observable<any>{
    return this.http.get('https://api.covid19india.org/state_district_wise.json');
  }
  getStateDaily(){
    return this.http.get('https://api.covid19india.org/states_daily.json');
  }
  storeCumdata(data){
    this.cumData= data;
  }
  storeDailydata(data){
    this.dailyData= data;
  }
  getCumdata():any[]{
    return this.cumData;
  }
  getDailydata(){
    return this.dailyData;
  }

  getStateCode(){
    return this.stateCode;
  }
  getStateGraphView(){
    return this.stateGraphView;
  }
  setStateCode(stateCode){
    this.stateCode=stateCode;
  }
  setStateGraphView(stateGraphView){
    this.stateGraphView=stateGraphView;
  }
}

