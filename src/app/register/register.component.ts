import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerDetails;
  valid = false;
  loader=false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerDetails = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  register() {
    this.loader=true;
    if (this.registerDetails.valid) {
      // console.log(this.registerDetails.value);
      this.auth.register(this.registerDetails.value).subscribe(
        (data) => {
          this.loader=false;
          // alert('Registration successfull');
          this.showSuccess();
          this.router.navigate(['/']);
        },
        (error) => {
          this.loader=false;
          // console.log(error);
          this.showDanger(error.error.message)
          // alert(error.error.message);
        }
      );
    } else {
      this.valid = true;
    }
  }
  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('Registration Successfull', {
      classname: 'bg-success text-light',
      delay: 2000,
    });
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 5000,
    });
  }
}
