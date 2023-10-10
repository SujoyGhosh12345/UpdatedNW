// import { Component, OnInit } from '@angular/core';
// import { NewsServiceService } from 'src/app/news-service.service';
// import { FavService } from 'src/app/services/fav.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   title = 'Current News';
//   news: any[] = [];
//   searchTerm: string = '';
//   searchResults: any[] = [];

//   constructor(private newsservice: NewsServiceService) { }

//   ngOnInit(): void {
//     this.newsservice.getNews().subscribe(res => {
//       this.news = res.articles;
//     });
//   }

//   onSearch() {
//     if (this.searchTerm.trim()) {
//       this.newsservice.searchNews(this.searchTerm).subscribe(
//         (data) => {
//           this.searchResults = data.articles;
//         },
//         (error) => {
//           console.error('Error fetching search results:', error);
//           // Handle the error, e.g., show an error message to the user.
//         }
//       );
//     } else {
//       this.searchResults = []; // Clear search results when the search term is empty.
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from 'src/app/news-service.service';
import { FavService } from 'src/app/services/fav.service';
import { News } from 'src/app/News'; // Import the News class
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Current News';
  news: any[] = [];
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private newsservice: NewsServiceService, private favService: FavService) { }

  ngOnInit(): void {
    this.newsservice.getNews().subscribe(res => {
      this.news = res.articles;
    });
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
