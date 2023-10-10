// import { Component } from '@angular/core';
// import { News } from 'src/app/News';
// import { FavService } from 'src/app/services/fav.service';


// @Component({
//   selector: 'app-favourites',
//   templateUrl: './favourites.component.html',
//   styleUrls: ['./favourites.component.css']
// })
// export class FavouritesComponent {
//   newsobj:News=new News();
//   AddToFav(news:any){
//     console.log("Adding to favourite");  
//       this.newsobj.Title=news.title;        
//       this.newsobj.Author=news.author[0];  
//       this.newsobj.Description=news.description;     
//       this.newsobj.Image=news.urlToImage;
//       if(localStorage.getItem("username") !=null)
//       {
//       this.newsobj.UserName=localStorage.getItem("username")?.toString();
//       }
//     console.log(this.newsobj);  
//     this..addfav(this.newsobj).subscribe({
//       next:(res=>{
//         console.log(res);        
//       }),
//       error:(err=>{
//         console.log(err?.error.message)
//       })
//     })    
//   }
// }

// import { Book } from 'src/app/book';
// import { FavService } from 'src/app/service/fav.service';
// bookobj:Book=new Book();
// AddToFav(book:any){
//     console.log("Adding to favourite");          
//       this.bookobj.authors=book.authors[0];  
//       this.bookobj.description=book.description;     
//       this.bookobj.title=book.title;
//       this.bookobj.publishedDate=book.publishedDate;
//       if(localStorage.getItem("username") !=null)
//       {
//       this.bookobj.username=localStorage.getItem("username")?.toString();
//       }
//     console.log(this.bookobj);  
//     this.fservice.addfav(this.bookobj).subscribe({
//       next:(res=>{
//         console.log(res);        
//       }),
//       error:(err=>{
//         console.log(err?.error.message)
//       })
//     })    
//   }

// export class FavoritesComponent implements OnInit {
//   favoriteNews: any[] = [];

//   constructor(private favService: FavService) {}

//   ngOnInit() {
//     this.loadFavoriteNews();
//   }

//   loadFavoriteNews() {
//     this.favService.getFavoriteNews().subscribe(
//       (favoriteNews) => {
//         this.favoriteNews = favoriteNews;
//       },
//       (error) => {
//         console.error('Error loading favorite news:', error);
//       }
//     );
//   }
// }



// favourites.component.ts

// FavouritesComponent.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/News';
import { FavService } from 'src/app/services/fav.service';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favoriteNews: News[] = [];
  newsobj: News = new News();
  username:any;


  constructor(private favService: FavService, private http: HttpClient) {}

  ngOnInit() {
    this.loadFavoriteNews();
    this.LoadFavNews();
    if(localStorage.getItem("username") !=null)
    {
      this.username=localStorage.getItem("username");
    }
  }

  loadFavoriteNews() {
    this.favService.getFavorites().subscribe(
      (favorites: News[]) => {
        this.favoriteNews = favorites;
      },
      (error) => {
        console.error('Error loading favorite news:', error);
      }
    );

  }

  AddToFav(news: any) {
    console.log("Adding to favourite");

    this.newsobj.title = news.title;
    this.newsobj.author = news.author; // Assuming author is an array
    this.newsobj.description = news.description;
    this.newsobj.urlToImage = news.urlToImage;

    const username = localStorage.getItem("username");
    if (username != null) {
      this.newsobj.username = username;
    }

    console.log(this.newsobj);

    this.favService.addfav(this.newsobj).subscribe({
      next: (res) => {
        console.log(res);
        // Reload the favorites after adding a new one
        this.loadFavoriteNews();
      },
      error: (err) => {
        console.log(err?.message); // Use optional chaining
        // Handle the error appropriately
      }
    });
  }
//   DeleteFav(news:any){
//     this.newsobj.title=news.title;
//     if(localStorage.getItem("username") !=null)
//     {
//     this.newsobj.username=localStorage.getItem("username")?.toString();
//     this.http.delete<any>("http://localhost:7035/api/News?username="+news.username+"&title="+news.title);
//     }
//   this.favService.deletefav(this.newsobj).subscribe({
//   next:(res=>{
//     console.log(res);
//   }),
//   error:(err=>{
//     console.log(err?.error.message)
//   })
// })
// }
DeleteFav(news: any) {
  console.log('Deleting fav:', news);

  this.newsobj.title = news.title;
  if (localStorage.getItem("username") != null) {
    this.newsobj.username = localStorage.getItem("username")?.toString();
    this.http.delete<any>(`http://localhost:7035/api/News?username=${news.username}&title=${news.title}`)
      .subscribe(data => {
        console.log('News deleted from API:', data);
      });
  }

  this.favService.deletefav(this.newsobj).subscribe({
    next: (res => {
      console.log('News deleted from Angular service:', res);
    }),
    error: (err => {
      console.log('Error deleting news:', err?.error.message);
    })
  });
}

LoadFavNews(){
  this.favService.addfav(this.newsobj).subscribe({
    next: (res) => {
      console.log(res);
      // Reload the favorites after adding a new one
      this.loadFavoriteNews();
    }
  }
  );
}
}