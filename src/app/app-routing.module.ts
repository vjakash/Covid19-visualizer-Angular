import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import { EachStateComponent } from './each-state/each-state.component';
import { LoginGuardGuard } from './guard/login-guard.guard';


const routes: Routes = [{
  path:"",
  component:LoginComponent,
  canActivate:[LoginGuardGuard]
},{
  path:"register",
  component:RegisterComponent
},{
  path:"dashboard",
  component:DashboardComponent,
  children:[{
    path:"",
    component:MainDashComponent
  },{
    path:"state/:id",
    component:EachStateComponent
  }],
  canActivate:[AuthGuard]
 }
//  ,
// {
//   path:"chart",
//   component:LineChartComponent
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
