import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  faPowerOff = faPowerOff;
  constructor(
    private router: Router,
    private auth: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  signout() {
    this.auth.logout();
    this.showDanger('Signed Out');
  }
  showStandard() {
    this.toastService.show('Signed Out');
  }

  showSuccess() {
    this.toastService.show('Login Successful', {
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
