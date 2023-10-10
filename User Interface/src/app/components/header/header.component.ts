// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {

//   constructor(private auth:AuthService){}
//   ngOnInit(){}

  
//   logout(){
//     this.auth.logout();
//   }
//   isLoggedIn():boolean{
//     return !!localStorage.getItem(`token`)
// }
// }

import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NewsServiceService } from 'src/app/news-service.service';
import { Router } from '@angular/router'; // Import the Router module
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  // isMenuOpen = false;

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  // }
  isMenuOpen = false;
  username:any;
  
  constructor(private newsService: NewsServiceService, private router: Router, private renderer: Renderer2, private el: ElementRef , public authService: AuthService) {} // Inject the Router module


  logout() {
    // Implement your logout logic here
    this.authService.logout();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Is Logged In:', this.authService.isLoggedIn);
    // ... rest of the code
  }

  ngOnInit(): void {
    console.log('Is Logged In:', this.authService.isLoggedIn);
    if(localStorage.getItem("username") !=null)
    {
      this.username=localStorage.getItem("username");
    }
  }

  onSearch() {
    if (this.searchTerm) {
      this.newsService.searchNews(this.searchTerm).subscribe((data) => {
        // Handle search results here
      });
    }
  }


}

