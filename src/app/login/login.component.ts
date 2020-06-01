import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails;
  loader=false;
  valid=false;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private toastService:ToastService) { 
    this.loginDetails=this.fb.group({
      email:this.fb.control("",[Validators.required,Validators.email]),
      password:this.fb.control("",[Validators.required])
    })
  }

  ngOnInit(): void {
  }

  login(){
    
    let count=1;
    if(this.loginDetails.valid){
      this.loader=true;
      // console.log(this.loginDetails.value);
      this.auth.login(this.loginDetails.value).subscribe(
        data=>{
        // alert("login successfull");
        this.auth.storeToken(data.token);
        this.loader=false;
        // console.log(data);
          if(count==1){
            this.showSuccess();
            count++;
          }
        this.router.navigate(["/dashboard"]);
      },
        error=>{
          this.loader=false;
          if(count==1){
            this.showDanger(error.error.message);
            count++;
          }
        // alert(error.error.message);
      }
      );
    }else{
      this.valid=true;
    }
  }
  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('Login Successful', { classname: 'bg-success text-light', delay: 2000 });
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 4000 });
  }
}
