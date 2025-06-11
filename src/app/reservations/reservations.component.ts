import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { mockReservations, Reservation, mockBuildings, mockRooms } from '../models/reservation.model';

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
  mockReservations: Reservation[] = mockReservations;
  public mockBuildings = mockBuildings;
  public mockRooms = mockRooms;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = 'MockedUser'; // Replace with real user if available
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

  getBuildingName(buildingId: string): string {
    const b = this.mockBuildings.find(b => b.id === buildingId);
    return b ? b.name : buildingId;
  }

  getRoomName(roomId: string): string {
    const r = this.mockRooms.find(r => r.id === roomId);
    return r ? r.name : roomId;
  }
}
