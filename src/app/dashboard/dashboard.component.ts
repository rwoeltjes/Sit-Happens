import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { mockBuildings, mockRooms, mockReservations, Reservation, Building, Room } from '../models/reservation.model';

interface DashboardMetric {
  title: string;
  value: string;
  icon: string;
  bgColor: string;
  textColor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string | null = null;
  upcomingReservations: Reservation[] = [];
  isLoading = false;
  mockBuildings: Building[] = mockBuildings;
  mockRooms: Room[] = mockRooms;
  mockReservations: Reservation[] = mockReservations;
  metrics: DashboardMetric[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = 'MockedUser'; // Replace with real user if available
    this.upcomingReservations = this.mockReservations
      .filter(res =>
        res.userId === this.userName &&
        new Date(res.startTime) >= new Date() &&
        (res.status === 'confirmed' || res.status === 'pending_check_in')
      )
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 2);

    // Setup metrics
    this.metrics = [
      { 
        title: "Upcoming Reservations", 
        value: this.upcomingReservations.length.toString(), 
        icon: "calendar_today", 
        bgColor: "bg-blue-100", 
        textColor: "text-blue-600" 
      },
      { 
        title: "Total Bookings", 
        value: this.mockReservations.filter(r => r.userId === this.userName).length.toString(), 
        icon: "confirmation_number", 
        bgColor: "bg-green-100", 
        textColor: "text-green-600" 
      }
    ];
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString();
  }
}
