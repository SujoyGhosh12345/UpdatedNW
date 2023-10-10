import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavService } from 'src/app/services/fav.service';
import { News } from 'src/app/News';
@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.css']
})
export class RecomendationComponent implements OnInit{

  news: any[] = [];

  constructor(private http: HttpClient, private favService: FavService) {}

  ngOnInit() {
    this.getmostlikedNews();
  }

  getmostlikedNews() {
    // Replace 'http://localhost:5292/api/News/GetNews' with the actual URL of your backend API.
    const apiUrl = 'http://localhost:5292/api/News';

    this.http.get(apiUrl).subscribe((data: any) => {
      this.news = data;
    });
  }
  newsobj:News=new News();

  addToFavorites(news:any){
    console.log("Adding to favourite");          
      this.newsobj.author=news.author;  
      this.newsobj.description=news.description;     
      this.newsobj.title=news.title;
      this.newsobj.urlToImage=news.urlToImage;
      if(localStorage.getItem("username") !=null)
      {
      this.newsobj.username=localStorage.getItem("username")?.toString();
      }
    console.log(this.newsobj);  
    this.favService.addfav(this.newsobj).subscribe({
      next:(res=>{
        console.log(res);        
      }),
      error:(err=>{
        console.log(err?.error.message)
      })
    })    
  }
}
