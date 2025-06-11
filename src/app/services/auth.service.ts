// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserName(): string | null {
    // Return the mocked user's name
    return this.currentUser;
  }
  // BehaviorSubject to hold the current login status, defaulting to true (always logged in)
  private _isLoggedIn = new BehaviorSubject<boolean>(true);
  // Expose as an Observable for components to subscribe to
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  // Store a mocked user
  private currentUser: string = 'MockedUser';

  constructor() {
    // Always set logged in state to true
    this._isLoggedIn.next(true);
    
    // Store the mocked user in localStorage for persistence
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', this.currentUser);
    }
  }

  // Login method still available but now always returns success
  login(username: string, password: string): Observable<boolean> {
    return of(true).pipe(
      delay(100), // Minimal delay
      tap(() => {
        console.log('Using mocked user login - always successful');
      })
    );
  }

  // Logout method is now a no-op - it won't actually log the user out
  logout(): void {
    console.log('Logout disabled - using mocked user');
    // We don't change the logged in state or clear the user
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
