import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private baseUrl:string="https://localhost:7204/api/User/";

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }
}
