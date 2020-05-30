import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
token=null;
  constructor(private http:HttpClient,private router:Router) { }

  register(userData):Observable<any>{
      return this.http.post<any>("https://zen-user-api.herokuapp.com/users/register",userData);
  }


  login(userData):Observable<any>{
      return this.http.post<any>("https://zen-user-api.herokuapp.com/users/authenticate",userData);
  }

  storeToken(token){
    localStorage.setItem('token',token);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(["/"]);
  }
}
