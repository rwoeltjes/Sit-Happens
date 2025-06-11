import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ReservationsComponent } from './reservations/reservations.component';

export const routes: Routes = [
  { path: 'scanner', component: ScannerComponent, canActivate: [authGuard] }, // Scanner route
  { path: 'reservation', component: ReservationComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'reservations', component: ReservationsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
  { path: '**', redirectTo: 'dashboard' } // Catch-all route
];
