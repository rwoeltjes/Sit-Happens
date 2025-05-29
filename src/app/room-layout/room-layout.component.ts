// src/app/room-layout/room-layout.component.ts

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor
import { Room, Seat } from '../models/reservation.model';

@Component({
  selector: 'app-room-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-layout.component.html',
  styleUrls: ['./room-layout.component.css']
})
export class RoomLayoutComponent implements OnChanges {
  @Input() room!: Room; // Input from the parent ReservationComponent

  // SVG dimensions for rendering
  svgWidth = 500;
  svgHeight = 300;
  seatSize = 40; // Size of each square seat
  padding = 10;  // Padding around the layout
  rowSpacing = 50; // Vertical spacing between rows
  colSpacing = 50; // Horizontal spacing between columns

  // Calculated properties based on room layout
  viewBox = '0 0 500 300'; // Default, will be updated
  totalRows = 0;
  totalCols = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['room'] && this.room) {
      this.calculateSvgDimensions();
    }
  }

  calculateSvgDimensions(): void {
    this.totalRows = this.room.layout.length;
    this.totalCols = Math.max(...this.room.layout.map(row => row.length));

    // Calculate dynamic SVG dimensions based on layout
    const contentWidth = this.totalCols * this.colSpacing;
    const contentHeight = this.totalRows * this.rowSpacing;

    this.svgWidth = contentWidth + (this.padding * 2);
    this.svgHeight = contentHeight + (this.padding * 2) + 20; // +20 for row labels

    // Define the viewBox for responsive scaling
    this.viewBox = `0 0 ${this.svgWidth} ${this.svgHeight}`;
  }

  getSeatX(colIndex: number): number {
    return this.padding + (colIndex * this.colSpacing) + (this.colSpacing - this.seatSize) / 2;
  }

  getSeatY(rowIndex: number): number {
    return this.padding + (rowIndex * this.rowSpacing) + 20; // +20 for row labels
  }

  getRowLabelY(rowIndex: number): number {
    return this.padding + (rowIndex * this.rowSpacing) + 15; // Position for row labels
  }

  getSeatClass(seat: Seat): string {
    // Add CSS classes based on seat state
    return `seat ${seat.state}`;
  }

  onSeatClick(seat: Seat): void {
    if (seat.state === 'available') {
      // Toggle selection for available seats
      seat.state = 'reserved'; // Or 'selected', then 'reserved' on confirm
      console.log(`Seat ${seat.id} selected`);
    } else {
      // 'occupied' seats cannot be clicked
      alert(`Seat ${seat.id} is already ${seat.state}.`);
    }
    // In a real app, you'd track selected seats in a service
    // and send this updated state to the backend on confirmation.
  }
}
