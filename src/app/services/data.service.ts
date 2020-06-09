import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable,of, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
geoChartCato=new Subject();
geoChartColor=[];
cumData;
dailyData;
state;
stateCode:Observable<any>=of("");
stateGraphView:Observable<any>=of(false);
changeState:Observable<any>=of(true);
  constructor(private http:HttpClient) { }
getGeoChartColor(){
  return this.geoChartColor;
}
updateGeoChartColor(color1,color2){
  this.geoChartColor=[];
  this.geoChartColor.push(color1);
  this.geoChartColor.push(color2);
}
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
  getChangeState(){
    return this.changeState;
  }
  getState(){
    return this.state;
  }
  setState(data){
     this.state=data;
  }
  setStateCode(stateCode){
    this.stateCode=stateCode;
    // console.log(this.stateCode);
  }
  setStateGraphView(stateGraphView){
    this.stateGraphView=stateGraphView;
    // console.log(this.stateGraphView);
  }
  setChangeState(data){
    // console.log(false);
    this.changeState=data;
  }
  
}

