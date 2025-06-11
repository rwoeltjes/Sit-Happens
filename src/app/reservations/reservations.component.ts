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

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  userName: string | null = null;
  reservations: Reservation[] = [];
  isLoading = true;
  cancellingId: string | null = null;
  reservationToCancel: string | null = null;

  mockReservations: Reservation[] = [
    {
      id: '1',
      userId: 'MockedUser',
      buildingId: 'B001',
      roomId: 'R101',
      seatIds: ['A1', 'A2'],
      startTime: new Date(Date.now() + 3600000).toISOString(),
      endTime: new Date(Date.now() + 7200000).toISOString(),
      status: 'pending_check_in',
      teamName: 'Product Team'
    },
    {
      id: '2',
      userId: 'MockedUser',
      buildingId: 'B001',
      roomId: 'R102',
      seatIds: ['C3'],
      startTime: new Date(Date.now() + 86400000).toISOString(),
      endTime: new Date(Date.now() + 90000000).toISOString(),
      status: 'confirmed'
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    setTimeout(() => {
      this.reservations = this.mockReservations.filter(r => r.userId === this.userName);
      this.isLoading = false;
    }, 500);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString();
  }

  handleCancelReservation(reservationId: string) {
    this.reservationToCancel = reservationId;
  }

  confirmCancelReservation() {
    if (!this.reservationToCancel) return;
    this.cancellingId = this.reservationToCancel;
    setTimeout(() => {
      this.reservations = this.reservations.map(r =>
        r.id === this.reservationToCancel ? { ...r, status: 'cancelled' } : r
      );
      this.cancellingId = null;
      this.reservationToCancel = null;
      // Optionally show a toast here
    }, 1000);
  }

  cancelDialogClose() {
    this.reservationToCancel = null;
  }
}
