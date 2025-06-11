import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface Reservation {
  id: string;
  userId: string;
  buildingId: string;
  roomId: string;
  seatIds: string[];
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending_check_in' | 'checked_in' | 'completed' | 'cancelled';
  teamName?: string;
}

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

  // Mock reservations data
  mockReservations: Reservation[] = [
    {
      id: '1',
      userId: 'MockedUser',
      buildingId: 'B001',
      roomId: 'R101',
      seatIds: ['A1', 'A2'],
      startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      endTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
      status: 'pending_check_in',
      teamName: 'Product Team'
    },
    {
      id: '2',
      userId: 'MockedUser',
      buildingId: 'B001',
      roomId: 'R102',
      seatIds: ['C3'],
      startTime: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
      endTime: new Date(Date.now() + 90000000).toISOString(), // 1 day + 1 hour from now
      status: 'confirmed'
    }
  ];

  metrics: DashboardMetric[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    
    // Filter upcoming reservations
    this.upcomingReservations = this.mockReservations
      .filter(res => 
        res.userId === this.userName && 
        new Date(res.startTime) >= new Date() && 
        (res.status === 'confirmed' || res.status === 'pending_check_in')
      )
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 2); // Show max 2 upcoming

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
