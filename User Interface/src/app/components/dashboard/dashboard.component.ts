import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { NewsServiceService } from 'src/app/news-service.service';
import { FavService } from 'src/app/services/fav.service';
import { News } from 'src/app/News'; // Import the News class
import { map } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
// 
export class DashboardComponent implements OnInit {

  public users:any = [];
  public role!:string;
  username:any;
  public fullName : string = "";
  title = 'Current News';
  news: any[] = [];
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private api : ApiserviceService, private auth: AuthService, private userStore: UserStoreService, private newsservice: NewsServiceService, private favService: FavService) { }

  ngOnInit():void {
    this.newsservice.getNews().subscribe(res => {
      this.news = res.articles;
    });

    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

    this.userStore.getfullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    if(localStorage.getItem("username") !=null)
    {
      this.username=localStorage.getItem("username");
    }

  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.newsservice.searchNews(this.searchTerm).subscribe(
        (data) => {
          this.searchResults = data.articles;
        },
        (error) => {
          console.error('Error fetching search results:', error);
          // Handle the error, e.g., show an error message to the user.
        }
      );
    } else {
      this.searchResults = []; // Clear search results when the search term is empty.
    }
  }
  newsobj:News=new News();
  // addToFavorites
  // addtofav
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
