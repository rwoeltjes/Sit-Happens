// src/app/room-layout/room-layout.component.ts

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplaySeat } from '../models/reservation.model';

@Component({
  selector: 'app-room-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-layout.component.html',
  styleUrls: ['./room-layout.component.css']
})
export class RoomLayoutComponent implements OnChanges {
  @Input() seats: DisplaySeat[] = [];
  @Input() rows: number = 0;
  @Input() cols: number = 0;

  // SVG dimensions for rendering
  svgWidth = 500;
  svgHeight = 300;
  seatSize = 40; // Size of each square seat
  padding = 10;  // Padding around the layout
  rowSpacing = 50; // Vertical spacing between rows
  colSpacing = 50; // Horizontal spacing between columns

  // Calculated properties based on room layout
  viewBox = '0 0 500 300'; // Default, will be updated

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateSvgDimensions();
  }

  calculateSvgDimensions(): void {
    const contentWidth = this.cols * this.colSpacing;
    const contentHeight = this.rows * this.rowSpacing;

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

  getSeatClass(seat: DisplaySeat): string {
    // Add CSS classes based on seat status
    return `seat ${seat.status}`;
  }

  getSeatTooltip(seat: DisplaySeat): string {
    // Show tooltip with reservation or occupation information
    if (seat.status === 'reserved') {
      return 'Reserved';
    } else if (seat.status === 'occupied') {
      return 'Occupied';
    } else if (seat.status === 'unavailable') {
      return 'Unavailable';
    } else {
      return 'Available';
    }
  }

  getRows(): number[] {
    return Array.from({ length: this.rows }, (_, i) => i);
  }

  getCols(): number[] {
    return Array.from({ length: this.cols }, (_, i) => i);
  }

  getSeatAt(row: number, col: number): DisplaySeat | undefined {
    return this.seats.find(seat => seat.x === col && seat.y === row);
  }

  getRowLabel(row: number): string {
    return String.fromCharCode(65 + row); // A, B, C, ...
  }
}
