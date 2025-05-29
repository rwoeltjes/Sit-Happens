// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserName(): string | null {
    // Return the current user's name if logged in, otherwise null
    return this.currentUser ? this.currentUser : null;
  }
  // BehaviorSubject to hold the current login status, defaulting to false
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  // Expose as an Observable for components to subscribe to
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  // Store a dummy user for demonstration
  private currentUser: string | null = null;

  constructor() {
    // Check if user was previously logged in (e.g., from localStorage)
    if (typeof localStorage !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
      this._isLoggedIn.next(true);
      this.currentUser = localStorage.getItem('username');
    }
  }

  // Simulate a login call to a backend
  login(username: string, password: string): Observable<boolean> {
    // In a real app, you'd send these credentials to your backend API
    // and receive a token or confirmation.
    console.log(`Attempting to log in with: ${username}/${password}`);

    // Simulate API call delay and success based on dummy credentials
    if (username === 'user' && password === 'password') {
      return of(true).pipe(
        delay(1000), // Simulate network delay
        tap(() => {
          this._isLoggedIn.next(true);
          this.currentUser = username;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
          }
          console.log('Login successful!');
        })
      );
    } else {
      return of(false).pipe(
        delay(1000), // Simulate network delay
        tap(() => {
          console.log('Login failed: Invalid credentials.');
        })
      );
    }
  }

  logout(): void {
    this._isLoggedIn.next(false);
    this.currentUser = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
    }
    console.log('Logged out.');
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
