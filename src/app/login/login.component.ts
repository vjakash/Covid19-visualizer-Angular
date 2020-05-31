import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails;
  valid=false;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { 
    this.loginDetails=this.fb.group({
      email:this.fb.control("",[Validators.required,Validators.email]),
      password:this.fb.control("",[Validators.required])
    })
  }

  ngOnInit(): void {
  }

  login(){
    if(this.loginDetails.valid){
      // console.log(this.loginDetails.value);
      this.auth.login(this.loginDetails.value).subscribe(
        data=>{
        // alert("login successfull");
        this.auth.storeToken(data.token);
        // console.log(data);
        this.router.navigate(["/dashboard"]);
      },
        error=>{
          // console.log(error);
        alert(error.error.message);
      }
      );
    }else{
      this.valid=true;
    }
  }
}
