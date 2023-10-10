import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../News';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  private baseUrl: string = "https://localhost:7035/api/News";
  private BaseUrl: string = "https://localhost:7035";
  bookobj:News=new News();
  username!:string|null;
  constructor(private http: HttpClient) {}
  addfav(newsObj: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, newsObj);
  }
  getFavorites(): Observable<News[]> {
    if(localStorage.getItem("username") !=null)
    {
      this.username=localStorage.getItem("username");
    }
    return this.http.get<News[]>("https://localhost:7035/api/News/"+this.username);
  }
  deletefav(newsobj:any)
  {
    console.log(newsobj);
    return this.http.delete<any>("http://localhost:7035/api/News?username="+newsobj.username+"&title="+newsobj.title);
  } 

  // deletefav(news: any): Observable<any> {
  //   const url = `${this.BaseUrl}/api/News?username=${news.username}&title=${news.title}`;
  //   return this.http.delete<any>(url);
  // }
  
}
