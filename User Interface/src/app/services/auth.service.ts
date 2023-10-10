// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   // private baseUrl: string = "https://localhost:7275/api/User/";
//   private baseUrl: string = "https://localhost:7204/api/User/";
//   private userPayLoad: any;

//   constructor(private http: HttpClient, private router: Router) {
//     this.userPayLoad = this.decodedToken;
//   }

//   signUp(userObj: any): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}register`, userObj);
//   }

//   login(loginObj: any): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
//   }

//   logout() {
//     localStorage.clear();
//     this.router.navigate(['home']);
//   }

//   storeToken(tokenValue: string) {
//     localStorage.setItem(`token`, tokenValue);
//   }

//   getToken() {
//     return localStorage.getItem(`token`);
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem(`token`);
//   }

//   decodedToken() {
//     const jwtHelper = new JwtHelperService();
//     const token = this.getToken()!;
//     console.log('Token to decode:', token); // Add this line for debugging
//     return jwtHelper.decodeToken(token);
//   }
  

//   getFullNameFromToken() {
//     if (this.userPayLoad)
//       return this.userPayLoad.name;
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7204/api/User/";
  
  private userPayLoad: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayLoad = this.decodedToken();
  }

  signUp(userObj: any): Observable<any> {

    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any): Observable<any> {
    localStorage.setItem("username",loginObj.username);
    // localStorage.setItem("firstname",loginObj.firstname);
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  logout() {
    console.log('Logging out...');
  
    localStorage.clear();
  
    console.log('Token after logout:', this.getToken());
  
    this.router.navigate(['home']);
  }
  

  storeToken(tokenValue: string) {
    localStorage.setItem(`token`, tokenValue);
  }

  getToken() {
    return localStorage.getItem(`token`);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(`token`);
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log('Token to decode:', token); // Add this line for debugging
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.userPayLoad)
      return this.userPayLoad.name;
  }
}
