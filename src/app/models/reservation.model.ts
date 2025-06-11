// src/app/models/reservation.model.ts

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
}

export interface Seat {
  id: string;
  label: string;
  type: 'individual' | 'team_pod';
  x: number;
  y: number;
  isWalkway?: boolean;
}

export interface Room {
  id: string;
  name: string;
  buildingId: string;
  capacity: number;
  floorPlan: {
    rows: number;
    cols: number;
    seats: Seat[];
    unavailableSeatIds?: string[];
  };
  imageUrl?: string;
}

export interface Reservation {
  id: string;
  userId: string;
  seatIds: string[];
  roomId: string;
  buildingId: string;
  startTime: Date;
  endTime: Date;
  status: 'confirmed' | 'checked-in' | 'cancelled' | 'expired' | 'pending_check_in';
  teamName?: string;
}

export type SeatStatus = 'available' | 'selected' | 'reserved' | 'occupied' | 'unavailable';

export interface DisplaySeat extends Seat {
  status: SeatStatus;
}

// --- MOCK DATA ---

export const mockUser: User = {
  id: 'user123',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatarUrl: 'https://placehold.co/100x100.png',
};

export const mockBuildings: Building[] = [
  { id: 'b1', name: 'Headquarters', address: '123 Main St, Anytown', imageUrl: 'https://placehold.co/600x400.png?text=Headquarters' },
  { id: 'b2', name: 'Innovation Center', address: '456 Tech Park, Anytown', imageUrl: 'https://placehold.co/600x400.png?text=Innovation+Center' },
  { id: 'b3', name: 'Downtown Hub', address: '789 Business Ave, Anytown', imageUrl: 'https://placehold.co/600x400.png?text=Downtown+Hub' },
];

const generateSeats = (rows: number, cols: number): Seat[] => {
  const seats: Seat[] = [];
  let idCounter = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c === Math.floor(cols / 3) || c === Math.floor(cols * 2 / 3)) {
        seats.push({ id: `w-${r}-${c}`, label: `W${r}${c}`, type: 'individual', x: c, y: r, isWalkway: true });
      } else {
        seats.push({ id: `s-${r}-${c}-${idCounter++}`, label: `${String.fromCharCode(65 + r)}${c + 1}`, type: 'individual', x: c, y: r });
      }
    }
  }
  return seats;
};

export const mockRooms: Room[] = [
  {
    id: 'r1',
    name: 'Open Space Alpha',
    buildingId: 'b1',
    capacity: 20,
    floorPlan: { rows: 5, cols: 6, seats: generateSeats(5,6), unavailableSeatIds: ['s-0-0-1'] },
    imageUrl: 'https://placehold.co/600x400.png?text=Open+Space+Alpha',
  },
  {
    id: 'r2',
    name: 'Collaboration Zone',
    buildingId: 'b1',
    capacity: 10,
    floorPlan: { rows: 3, cols: 5, seats: generateSeats(3,5) },
    imageUrl: 'https://placehold.co/600x400.png?text=Collaboration+Zone',
  },
  {
    id: 'r3',
    name: 'Quiet Focus Area',
    buildingId: 'b2',
    capacity: 15,
    floorPlan: { rows: 4, cols: 5, seats: generateSeats(4,5) },
    imageUrl: 'https://placehold.co/600x400.png?text=Quiet+Focus+Area',
  },
   {
    id: 'r4',
    name: 'Project Room Gamma',
    buildingId: 'b3',
    capacity: 8,
    floorPlan: { rows: 2, cols: 4, seats: generateSeats(2,4) },
    imageUrl: 'https://placehold.co/600x400.png?text=Project+Room+Gamma',
  },
];

export const mockReservations: Reservation[] = [
  {
    id: 'res1',
    userId: 'user123',
    seatIds: [mockRooms[0].floorPlan.seats.find(s=>!s.isWalkway && !mockRooms[0].floorPlan.unavailableSeatIds?.includes(s.id))?.id || 's1'],
    roomId: 'r1',
    buildingId: 'b1',
    startTime: new Date(new Date().setDate(new Date().getDate() + 1)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(17)),
    status: 'confirmed',
  },
  {
    id: 'res2',
    userId: 'user123',
    seatIds: [mockRooms[2].floorPlan.seats.find(s=>!s.isWalkway)?.id || 's2'],
    roomId: 'r3',
    buildingId: 'b2',
    startTime: new Date(new Date().setDate(new Date().getDate() + 3)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 3)).setHours(18)),
    status: 'pending_check_in',
    teamName: 'Project Phoenix',
  },
  {
    id: 'res3',
    userId: 'user123',
    seatIds: [mockRooms[1].floorPlan.seats.find(s=>!s.isWalkway)?.id || 's3'],
    roomId: 'r2',
    buildingId: 'b1',
    startTime: new Date(new Date().setDate(new Date().getDate() - 2)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(17)),
    status: 'checked-in',
  },
  {
    id: 'res4',
    userId: 'user123',
    seatIds: [mockRooms[0].floorPlan.seats.filter(s=>!s.isWalkway)[2]?.id || 's4'],
    roomId: 'r1',
    buildingId: 'b1',
    startTime: new Date(new Date().setDate(new Date().getDate() - 5)),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 5)).setHours(17)),
    status: 'cancelled',
  },
];

export const getRoomSeats = (roomId: string, reservationTime?: Date): Seat[] => {
  const room = mockRooms.find(r => r.id === roomId);
  if (!room) return [];
  return room.floorPlan.seats.map(seat => {
    let status: 'available' | 'reserved' | 'unavailable' = 'available';
    if (room.floorPlan.unavailableSeatIds?.includes(seat.id)) {
      status = 'unavailable';
    } else if (reservationTime && Math.random() < 0.3 && !seat.isWalkway) {
      const isReservedInMock = mockReservations.some(res =>
        res.roomId === roomId &&
        res.seatIds.includes(seat.id) &&
        res.status !== 'cancelled' && res.status !== 'expired' &&
        new Date(res.startTime).toDateString() === reservationTime.toDateString()
      );
      if (isReservedInMock) {
        status = 'reserved';
      }
    }
    return { ...seat, status };
  });
};
