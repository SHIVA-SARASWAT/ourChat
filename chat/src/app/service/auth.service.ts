// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(username: string, password: string): boolean {
    // Simple validation for username and password
    if (username === 'simran' && password === '25042025' || username === 'Zul' && password === 'Zul') {
      // Store user information in local storage
      localStorage.setItem('currentUser', username);
      return true;
    }
    return false;
  }

  logout(): void {
    // Remove user information from local storage
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(){
    // Check if user information exists in local storage
    let user = localStorage.getItem('currentUser');
    if(user){
      return true
    }
    return false
    
  }
}
