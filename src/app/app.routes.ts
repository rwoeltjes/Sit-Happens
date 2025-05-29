import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { ReservationComponent } from './reservation/reservation.component';

export const routes: Routes = [
  { path: 'scanner', component: ScannerComponent }, // Scanner route
  { path: 'reservation', component: ReservationComponent }
];
