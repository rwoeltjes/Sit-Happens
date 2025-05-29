import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { ReservationComponent } from './reservation/reservation.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'scanner', component: ScannerComponent, canActivate: [authGuard] }, // Scanner route
  { path: 'reservation', component: ReservationComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent }
];
