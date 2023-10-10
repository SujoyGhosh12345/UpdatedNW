import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {

  constructor(private http:HttpClient) { }
  

  getNews():Observable<any>{
    return this.http.get<any>("https://newsapi.org/v2/everything?q=all&language=en&apiKey=c1ceb7c1ee5f4b3480fde05b5a47b242")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  searchNews(searchTerm: string): Observable<any> {
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&language=en&apiKey=c1ceb7c1ee5f4b3480fde05b5a47b242`;
    console.log('API URL:', apiUrl); // Add this line for debugging
    return this.http.get(apiUrl)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}