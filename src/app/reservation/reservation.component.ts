// src/app/reservation/reservation.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { formatDate } from '@angular/common';

// Import the RoomLayoutComponent and the data model
import { RoomLayoutComponent } from '../room-layout/room-layout.component';
import { Building, Room, DUMMY_BUILDINGS } from '../models/reservation.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, RoomLayoutComponent],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  buildings: Building[] = DUMMY_BUILDINGS;
  selectedBuilding: Building | null = null;
  selectedRoom: Room | null = null;
  reservationDate: string = this.getToday();
  startTime: string = '09:00';
  endTime: string = '17:00';
  selectedSeats: string[] = [];
  isTeamBooking: boolean = false;
  teamName: string = '';
  maxSeats: number = 1;
  currentStep: number = 1;
  reservationComplete: boolean = false;
  isSubmitting: boolean = false;

  getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  ngOnInit(): void {}

  // Step navigation
  nextStep() {
    if (this.currentStep === 1 && !this.selectedBuilding) return;
    if (this.currentStep === 2 && !this.selectedRoom) return;
    if (this.currentStep === 3 && (!this.reservationDate || !this.startTime || !this.endTime)) return;
    if (this.currentStep === 4 && this.selectedSeats.length === 0) return;
    this.currentStep++;
  }
  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  // Team booking toggle
  toggleTeamBooking() {
    this.isTeamBooking = !this.isTeamBooking;
    if (!this.isTeamBooking) {
      this.maxSeats = 1;
      this.teamName = '';
      if (this.selectedSeats.length > 1) this.selectedSeats = [this.selectedSeats[0]];
    } else {
      this.maxSeats = this.selectedRoom?.capacity || 5;
    }
  }

  // Seat selection logic
  onSeatSelect(seatId: string) {
    if (this.selectedSeats.includes(seatId)) {
      this.selectedSeats = this.selectedSeats.filter(id => id !== seatId);
    } else if (this.selectedSeats.length < this.maxSeats) {
      this.selectedSeats = [...this.selectedSeats, seatId];
    }
  }

  isSeatSelected(seatId: string): boolean {
    return this.selectedSeats.includes(seatId);
  }

  // Confirm reservation
  makeReservation() {
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.reservationComplete = true;
    }, 1200);
  }

  // Reset for new reservation
  resetReservation() {
    this.selectedBuilding = null;
    this.selectedRoom = null;
    this.reservationDate = this.getToday();
    this.startTime = '09:00';
    this.endTime = '17:00';
    this.selectedSeats = [];
    this.isTeamBooking = false;
    this.teamName = '';
    this.maxSeats = 1;
    this.currentStep = 1;
    this.reservationComplete = false;
    this.isSubmitting = false;
  }
}
