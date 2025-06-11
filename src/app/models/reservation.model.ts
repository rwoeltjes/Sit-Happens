// src/app/models/reservation.model.ts

export interface Building {
  id: string;
  name: string;
  rooms: Room[];
  address?: string; // Optional address property
  imageUrl?: string; // Optional image URL property
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  layout: Seat[][]; // A 2D array representing rows and columns of seats
}

export interface Seat {
  id: string; // Unique ID for the seat (e.g., "A1", "B5")
  row: string; // Row identifier (e.g., "A", "B")
  column: number; // Column number (e.g., 1, 2, 3)
  state: 'available' | 'reserved' | 'occupied'; // Current status
  reservedBy?: string; // Optional property to track the user who reserved the seat
}

// Helper function to generate seats for a given capacity and layout
function generateSeats(capacity: number, rows: number, colsPerRow: number): Seat[][] {
  const layout: Seat[][] = [];
  let seatCount = 0;
  const rowChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let r = 0; r < rows; r++) {
    const row: Seat[] = [];
    const currentRowChar = rowChars[r];
    for (let c = 0; c < colsPerRow; c++) {
      if (seatCount < capacity) {
        const seatId = `${currentRowChar}${c + 1}`;
        row.push({
          id: seatId,
          row: currentRowChar,
          column: c + 1,
          state: 'available' // Default to available
        });
        seatCount++;
      } else {
        // Stop adding seats if capacity is reached
        break;
      }
    }
    if (row.length > 0) { // Only add rows that actually have seats
      layout.push(row);
    }
    if (seatCount >= capacity) {
      break; // Stop adding rows if capacity is reached
    }
  }

  // Set some random states for demonstration
  let states = ['available', 'reserved', 'occupied'];
  layout.forEach(row => {
    row.forEach(seat => {
      // Small chance for occupied or reserved for demo purposes
      const rand = Math.random();
      if (rand < 0.1) { // 10% chance to be occupied
        seat.state = 'occupied';
      } else if (rand < 0.25) { // 15% chance to be reserved (after occupied check)
        seat.state = 'reserved';
      } else {
        seat.state = 'available';
      }
    });
  });

  return layout;
}


// Example Data (now with layouts matching capacity)
export const DUMMY_BUILDINGS: Building[] = [
  {
    id: 'B1',
    name: 'Main Auditorium',
    rooms: [
      {
        id: 'R1',
        name: 'Grand Hall',
        capacity: 25, // Capacity of 25
        layout: generateSeats(25, 5, 5), // 5 rows of 5 seats = 25 seats
      },
      {
        id: 'R2',
        name: 'Lecture Room 201',
        capacity: 18, // Capacity of 18
        layout: generateSeats(18, 6, 3), // 6 rows of 3 seats = 18 seats
      },
    ],
  },
  {
    id: 'B2',
    name: 'Conference Center',
    rooms: [
      {
        id: 'CR1',
        name: 'Conference Room A',
        capacity: 8, // Capacity of 8
        layout: generateSeats(8, 4, 2), // 4 rows of 2 seats = 8 seats
      },
      {
        id: 'CR2',
        name: 'Executive Lounge',
        capacity: 6, // Capacity of 6
        layout: generateSeats(6, 3, 2), // 3 rows of 2 seats = 6 seats
      },
    ],
  },
  {
    id: 'B3',
    name: 'Training Hub',
    rooms: [
      {
        id: 'TR1',
        name: 'Tech Lab 1',
        capacity: 12, // Capacity of 12
        layout: generateSeats(12, 3, 4), // 3 rows of 4 seats = 12 seats
      },
    ],
  },
];
