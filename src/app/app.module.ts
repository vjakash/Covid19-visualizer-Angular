import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component'
import { AuthGuard } from './guard/auth.guard';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountsComponent } from './counts/counts.component';
import { NgChartjsModule } from 'ng-chartjs';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import { EachStateComponent } from './each-state/each-state.component';
import { StateGraphComponent } from './state-graph/state-graph.component';
import {SearchStatePipe} from './pipe/search.pipe';
import { ToastComponent } from './toast/toast.component';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CountsComponent,
    LineChartComponent,
    TableComponent,
    MainDashComponent,
    EachStateComponent,
    StateGraphComponent,
    SearchStatePipe,
    ToastComponent,
    ToastContainerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgChartjsModule,
    NgbModule,
    GoogleChartsModule,
    BrowserAnimationsModule,
    MatSortModule
  ],
  providers: [AuthGuard,LoginGuardGuard,{provide: LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
