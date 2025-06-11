// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router'; // Import Router
import { AuthService } from './services/auth.service'; // Import AuthService
import { Observable } from 'rxjs';
import { RoomLayoutComponent } from './room-layout/room-layout.component';
import { Room } from './models/reservation.model';
import { HeaderComponent } from './header/header.component'; // Import the header component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent // Import the header component
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Awesome Angular App';
  isLoggedIn$: Observable<boolean>; // To track login status
  currentUser: string | null = null; // To display current user
  loggedInUser: string | undefined;
  selectedRoom: Room = {
    id: 'room1',
    name: 'Conference Room',
    capacity: 10,
    buildingId: '',
    floorPlan: {
      rows: 0,
      cols: 0,
      seats: [],
      unavailableSeatIds: undefined
    }
  }; // Initialize with a valid Room object
  userName: string | null = null; // To display the user's name

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$; // Assign the observable
    this.userName = this.authService.getUserName(); // Get the user's name
  }

  ngOnInit(): void {
    // Subscribe to login status changes to update currentUser and userName
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.currentUser = loggedIn ? this.authService.getCurrentUser() : null;
      this.userName = loggedIn ? this.authService.getUserName() : null; // Update userName dynamically

      if (loggedIn) {
        this.router.navigate(['/']); // Redirect to the home page if user is logged in
      } else if (!this.loggedInUser) {
        this.router.navigate(['/login']); // Redirect to login page if user is undefined
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.loggedInUser = undefined; // Clear logged-in user
    this.userName = null; // Clear user name
    this.router.navigate(['/login']); // Redirect to login page
  }
}
