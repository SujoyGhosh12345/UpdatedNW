import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { RecomendationComponent } from './components/recomendation/recomendation.component';

//import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent},
  {path:'search-bar',component:SearchBarComponent},
  {path:'Favourites',component:FavouritesComponent, canActivate:[AuthGuard]},
  {path:'Recomendation',component:RecomendationComponent, canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
