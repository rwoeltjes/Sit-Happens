// src/app/reservation/reservation.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // For [(ngModel)]

// Import the RoomLayoutComponent and the data model
import { RoomLayoutComponent } from '../room-layout/room-layout.component';
import { Building, Room, DUMMY_BUILDINGS } from '../models/reservation.model';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, RoomLayoutComponent], // Import RoomLayoutComponent
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  buildings: Building[] = DUMMY_BUILDINGS;
  selectedBuilding: Building | null = null;
  selectedRoom: Room | null = null;

  constructor() { }

  ngOnInit(): void {
    // Optionally pre-select the first building/room for quick testing
    // if (this.buildings.length > 0) {
    //   this.selectedBuilding = this.buildings[0];
    //   if (this.selectedBuilding.rooms.length > 0) {
    //     this.selectedRoom = this.selectedBuilding.rooms[0];
    //   }
    // }
  }

  onBuildingChange(): void {
    this.selectedRoom = null; // Reset selected room when building changes
  }

  onRoomSelected(room: Room): void {
    this.selectedRoom = room;
  }

  // Placeholder for a real reservation process
  makeReservation(): void {
    if (this.selectedRoom) {
      alert(`Attempting to make reservation for ${this.selectedRoom.name}`);
      // In a real app: send data to backend, update seat states
    } else {
      alert('Please select a room first.');
    }
  }
}
