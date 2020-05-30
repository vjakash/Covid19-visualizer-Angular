import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, Validators} from '@angular/forms'
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerDetails;
valid=false;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { 
    this.registerDetails=this.fb.group({
      firstName:this.fb.control("",[Validators.required]),
      lastName:this.fb.control("",[Validators.required]),
      email:this.fb.control("",[Validators.required,Validators.email]),
      password:this.fb.control("",[Validators.required])
    })
  }

  ngOnInit(): void {
  }
register(){
  if(this.registerDetails.valid){
    // console.log(this.registerDetails.value);
    this.auth.register(this.registerDetails.value).subscribe(
      data=>{
      alert("Registration successfull");
      this.router.navigate(["/"]);
    },
      error=>{
        // console.log(error);
      alert(error.error.message);
    }
      )
  }else{
    this.valid=true;
  }
}

}
