// UserService.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
